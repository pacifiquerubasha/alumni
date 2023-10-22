

const verificationTemplate = (code, expiration)=>{
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px;">
        
            <div style="background-color: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1>Email Verification</h1>
                <p>Thank you for registering with ALUmnis. To complete your registration, please enter the following verification code:</p>
        
                <p style="font-size: 24px; font-weight: bold;">${code}</p>
        
                <p>If you didn't request this verification code, please contact us immediately.</p>
        
                <p>This verification code will expire after ${new Date(expiration).toLocaleTimeString()}.</p>
        
                <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            </div>
        
            <p style="color: #777; font-size: 12px; margin-top: 20px;">ALUmnis &copy; ${new Date().getFullYear()}</p>
        </body>
        </html>
    
    `
}

module.exports = {verificationTemplate}