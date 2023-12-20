const User = require("../models/User");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/mailer");
const { verificationTemplate, passwordResetTemplate } = require("../utils/mailTemplates");
const Activity = require("../models/Activity");

const jwt = require("jsonwebtoken");

const signup = async(req, res, next)=>{
    
    const {
        username,
        email,
        password,
        firstName,
        lastName,
    } = req.body;

    //Check if required fields are provided
    if(!username || !email || !password){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Please provide all required information"
            }
        })
    }
    

    try{
        //Check if user with username exists
        let existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "User with username already exists"
                }
            })
        }
    
        //Check if user with email exists
        existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "User with email already exists"
                }
            })
        }
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
    
        let emailVerificationCode = Math.random().toString(36).slice(-6);

        while (await User.exists({emailVerificationCode})){
            emailVerificationCode = Math.random().toString(36).slice(-6);
        }
        
        const emailVerificationCodeExpiry = Date.now() + 3600000;
    
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            emailVerificationCode,
            emailVerificationCodeExpiry,
        })


        //Send email to user with emailVerificationToken
        const info = sendEmail({
            from: process.env.MAILER_EMAIL,
            to: user.email,
            subject: "Email Verification",
            html: verificationTemplate(emailVerificationCode, emailVerificationCodeExpiry)
        })

        res.status(201).json({
            message: "success",
            data: {
                user
            }
        })    

    }

    catch(err){
        return res.status(400).json({
            message: "fail",
            data: {
                message: err.message
            }
        })
    }


}

const verifyEmail = async(req, res, next)=>{

    const {emailVerificationCode} = req.body;
    if(!emailVerificationCode){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Please provide email verification code"
            }
        })
    }
    
    //Check if user with emailVerification code exists and hasnt expired
    let userWithCode = null;
    try{
        userWithCode = await User.findOne({emailVerificationCode});
    
    }catch(err){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Invalid email verification code"
            }
        })
    }

    if(!userWithCode){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Invalid email verification code"
            }
        })
    }

    if(Date.now() > new Date(userWithCode.emailVerificationCodeExpiry)){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Email verification code has expired"
            }
        })
    }

    //Update the verified status of the user to true
    userWithCode.emailVerified = true;
    userWithCode.emailVerificationCode = null;
    userWithCode.emailVerificationCodeExpiry = null;
    await userWithCode.save();

    //Create an activity
    await Activity.create({
        message: "Email verified",
        type: "create",
        path:"/",
        user: userWithCode._id
    })
    
    res.status(200).json({
        message: "success",
        data: {
            userWithCode
        }
    })

}

const deleteUser = async(req, res)=>{
    const {userId} = req.body;

    try {
        await User.findByIdAndDelete(userId);
        
        // Create Activity
        await Activity.create({
            message: "You deleted a user",
            path:"/alumni",
            type: "delete",
            user: "65769c2b60965b35130ab36d"
        })


        res.status(200).json({
            message: "success",
            data: {
                message: "User deleted successfully"
            }
        })
        
    } catch (error) {
        res.status(400).json({
            message: "fail",
            data: {
                message: error.message
            }
        })
        
    }
}

const getAllUsers = async(req, res, next)=>{

    try {       

        const users = await User.find().select('-password -emailVerificationCode -emailVerificationCodeExpiry');
        // Aggregate total alumnis, total unique job titles, unique companies
        const totalAlumnis = await User.countDocuments({role: "alumni"});
        const uniqueJobTitles = await User.distinct("jobTitle");
        const uniqueCompanies = await User.distinct("company");       
        
        res.status(200).json({
            message: "success",
            data: {
                users,
                totalAlumnis,
                uniqueJobTitles,
                uniqueCompanies
            }
        })
        
    } catch (error) {
        res.status(400).json({
            message: "fail",
            data: {
                message: error.message
            }
        })
        
    }
}

const getOneUser = async(req, res)=>{
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json({
            message: "success",
            data: {
                user
            }
        })               
            
    } catch (error) {
        res.status(400).json({
            message: "fail",
            data: {
                message: error.message
            }
        })
        
    }
}

const resendVerificationCode = async(req, res, next)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Please provide email"
            }
        })
    }

    //Check if user with email exists
    let user = null;
    try{
        user = await User.findOne({email});
    
    }catch(err){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Invalid email"
            }
        })
    }

    if(!user){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Invalid email"
            }
        })
    }

    if(user.emailVerified){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Email already verified"
            }
        })
    }

    let emailVerificationCode = Math.random().toString(36).slice(-6);

    while (await User.exists({emailVerificationCode})){
        emailVerificationCode = Math.random().toString(36).slice(-6);
    }
    
    const emailVerificationCodeExpiry = Date.now() + 3600000;

    user.emailVerificationCode = emailVerificationCode;
    user.emailVerificationCodeExpiry = emailVerificationCodeExpiry;
    await user.save();


    //Send email to user with emailVerificationToken
    const info = sendEmail({
        from: process.env.MAILER_EMAIL,
        to: user.email,
        subject: "Email Verification",
        html: verificationTemplate(emailVerificationCode, emailVerificationCodeExpiry)
    })

    res.status(201).json({
        message: "success",
        data: {
            user
        }
    })
}

const login = async(req, res, next)=>{
    const {email, password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Please provide email and password"
                }
            })
        }
    
        let user = null;

        //Check if user email exists and is verified
        user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Invalid email or password"
                }
            })
        }
        //Check if user is verified
        if(!user.emailVerified){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Please verify your email"
                }
            })
        }

        //Check if user was softdeleted
        if(user.softDeleted){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Account deleted! Please contact the admin."
                }
            })
        }

        //Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Invalid email or password"
                }
            })
        }

        //Generate a jwt token 
        const token = jwt.sign({id: user._id, email, role:user.role}, process.env.JWT_SECRET);
        
        res.cookie('jwt', token, {
            httpOnly: true, 
          });
        
        res.status(200).json({
            message: "success",
            data: {
                token,
                user
            }
        })

    }
    catch(err){
        return res.status(400).json({
            message: "fail",
            data: {
                message: err.message
            }
        })
    }    
}

const logout = async(req, res, next)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).json({
        message: "success",
        data: {
            message: "Logged out successfully"
        }
    })
}

const getCurrentUser = async(req, res)=>{

    const {token} = req.body;

    if(!token){
        return res.status(400).json({
            message: "fail",
            data: {
                message: "Please login"
            }
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id} = decoded;

    try{
        let user = await User.findById(id)
        .select('-password -emailVerificationCode -emailVerificationCodeExpiry');
        if(!user){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "User not found"
                }
            })
        }

        res.status(200).json({
            message: "success",
            data: {
                user
            }
        })

    }catch(err){
        res.status(400).json({
            message: "fail",
            data: {
                message: err.message
            }
        })
    }
        
    
}

const updateUser = async(req, res)=>{
    const {id} = req.params;
    const {
        firstName, 
        lastName, 
        middleName,
        email, 
        username, 
        role, 
        company, 
        jobTitle, 
        location, 
        about,
        nationality,
        yearOfGraduation
        } = req.body;

    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "User not found"
                }
            })
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.middleName = middleName;
        user.email = email;
        user.username = username;
        user.role = role;
        user.company = company;
        user.jobTitle = jobTitle;
        user.location = location;
        user.about = about;
        user.nationality = nationality,
        user.yearOfGraduation = yearOfGraduation;

        await user.save();

        // Create Activity
        await Activity.create({
            message: "You updated your profile",
            path:"/profile",
            type: "update",
            user: user._id
        })

        res.status(200).json({
            message: "success",
            data: {
                user
            }
        })
        
    } catch (error) {
        res.status(400).json({
            message: "fail",
            data: {
                message: error.message
            }
        })
        
    }

}

const changePassword = async(req, res)=>{
    const {id} = req.params;
    const {currentPassword, newPassword} = req.body

    try {
        const user = await User.findById(id);        
        //Check if old password matches current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Invalid old password"
                }
            })
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        // Create Activity
        await Activity.create({
            message: "You changed your password",
            path:"/",
            type: "update",
            user: user._id
        })

        res.status(200).json({
            message: "success",
            data: {
                message: "Password changed successfully"
            }
        })
        
    } catch (error) {
        
    }
}

const softDeleteUser = async(req, res)=>{
    const {id} = req.params;
    try {

        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "User not found"
                }
            })
        }

        user.softDeleted = true;
        await user.save();

        // Create Activity
        await Activity.create({
            message: "You deleted a user",
            path:"/alumni",
            type: "delete",
            user: "65769c2b60965b35130ab36d"
        })

        res.status(200).json({
            message: "success",
            data: {
                message: "User deleted successfully"
            }
        })        
    } catch (error) {
        res.status(400).json({
            message: "fail",
            data: {
                message: error.message
            }
        })        
    }

}

const changeProfilePicture = async(req, res)=>{
    const {id} = req.params;

    const imagePath = req?.file?.filename;

    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "User not found"
                }
            })
        }

        user.profilePicture = imagePath;
        await user.save();

        // Create Activity
        await Activity.create({
            message: "You changed your profile picture",
            path:"/",
            type: "update",
            user: user._id
        })

        res.status(200).json({
            message: "success",
            data: {
                user
            }
        })
        
    } catch (error) {
        res.status(400).json({
            message: "fail",
            data: {
                message: error.message
            }
        })
        
    }

}

const forgotPassword = async(req, res)=>{
    const {email} = req.body

    try {
        if(!email){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Please provide email"
                }
            })
        }

        //Check if user with email exists and 
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Invalid email"
                }
            })
        }

        // Check is user emailVerified
        if(!user.emailVerified){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Please verify your email"
                }
            })
        }

        //Check if user was softdeleted
        if(user.softDeleted){
            return res.status(400).json({
                message: "fail",
                data: {
                    message: "Account deleted! Please contact the admin."
                }
            })
        }

        //Generate temporary password of 7 characters
        let temporaryPassword = Math.random().toString(36).slice(-7);
        // Update users password field to generated one
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(temporaryPassword, salt);
        user.password = hashedPassword;
        
        await user.save();

        //Send email to user with temporary password
        const info = sendEmail({
            from: process.env.MAILER_EMAIL,
            to: user.email,
            subject: "ALUmineers Account Password Reset",
            html: passwordResetTemplate(user.lastName, temporaryPassword)
        })

        return res.status(200).json({
            message: "success",
            data: {
                user
            }
        })
        
    } catch (error) {
        return res.status(401).json({
            message: "fail",
            data: {
                message: error.message
            }
        })
        
    }
}


//Export
module.exports = {
    signup,
    verifyEmail,
    getAllUsers,
    resendVerificationCode,
    login,
    logout,
    deleteUser,
    getCurrentUser,
    getOneUser,
    updateUser,
    changePassword,
    softDeleteUser,
    changeProfilePicture,
    forgotPassword
}