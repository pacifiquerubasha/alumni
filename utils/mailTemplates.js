

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
        
            <p style="color: #777; font-size: 12px; margin-top: 20px;">ALUmineers &copy; ${new Date().getFullYear()}</p>
        </body>
        </html>
    
    `
}

const eventRegistrationTemplate = (id, user, event)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Event Registration Confirmation</title>
            <style>
                :root{                
                --color-whiteorange: #faeeee;
                --color-main: #BF2C34;
                --color-faded: #bf2c334b;
                --color-darkblue: rgb(2,3,129);
                }
                body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: var(--color-whiteorange);
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h2 {
                color: #BF2C34;
                }

                p {
                color: rgb(2,3,129);
                }

                .user-details {
                margin-bottom: 20px;
                }

                .event-details {
                border-top: 1px solid var(--color-faded);
                padding-top: 20px;
                }
            </style>
        </head>
        <body>
        <div class="container">
            <h2>Event Registration Successful</h2>
            <p>Good day, ${user.firstName},</p>

            <p>Thank you for registering for the event. Your participation is greatly appreciated. Don't forget to add the event to your calendar for a timely reminder!</p>

            <div class="user-details">
            <p><strong>First Name:</strong> ${user.firstName}</p>
            <p><strong>Last Name:</strong> ${user.lastName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Ticket ID:</strong> #${id}</p>
            </div>
        
            <div class="event-details">
            <h3>Event Details</h3>
            <p><strong>Event Name:</strong> ${event.title}</p>
            <p><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Organizer</strong> ${event.organizer}</p>
            </div>
                
            <p>If you have any questions or need further assistance, please contact us at <a href="mailto:p.kishinyambwe@alustudent.com">p.kishinyambwe@alustudent.com</a>.</p>
        
            <p>See you at the event!</p>
            <p style="color: #777; font-size: 12px; margin-top: 20px;">ALUmineers &copy; ${new Date().getFullYear()}</p>

        </div>
        </body>
    </html>
    
    
    `
}

const eventCancellationTemplate = (userName, event)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Cancellation Notice</title>
    <style>
        :root {
        --color-whiteorange: #faeeee;
        --color-main: #BF2C34;
        --color-faded: #bf2c334b;
        --color-darkblue: rgb(2, 3, 129);
        }

        body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 20px;
        }

        .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
        color: #BF2C34;
        }

        p {
        color: rgb(2, 3, 129);
        }

        .user-details {
        margin-bottom: 20px;
        }

        .event-details {
        border-top: 1px solid var(--color-faded);
        padding-top: 20px;
        }

        .signature {
        margin-top: 3rem;
        }
        
        .role{
            font-size:90%;
            opacity:0.5;
        }
    </style>
    </head>

    <body>
    <div class="container">
        <h2>Event Cancellation Notice</h2>
        <p>Dear ${userName},</p>

        <p>We regret to inform you that the following event has been canceled. We understand that this may cause inconvenience, and we apologize for any disruption to your plans.</p>

        <div class="event-details">
        <h3>Canceled Event Details</h3>
        <p><strong>Event Name:</strong> ${event.title}</p>
        <p><strong>Date:</strong> ${new Date(event.date).toDateString()}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Organizer:</strong> ${event.organizer}</p>
        </div>

        <p>If you have any questions or concerns regarding the cancellation, please contact us at <a href="mailto:p.kishinyambwe@alustudent.com">p.kishinyambwe@alustudent.com</a>.</p>

        <p>We appreciate your understanding and hope to serve you better in the future.</p>

        <div class="signature">
        <p>Best regards,</p>
        <p>Pacifique Rubasha</p>
        <p class="role">Event Coordinator</p>
        </div>

        <p style="color: #777; font-size: 12px; margin-top: 20px;">ALUmineers &copy; ${new Date().getFullYear()}</p>
    </div>
    </body>

    </html>



    `
}

const receivedContactInformationTemplate = (info)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Information Received</title>
        <style>
            :root {
            --color-whiteorange: #faeeee;
            --color-main: #BF2C34;
            --color-faded: #bf2c334b;
            --color-darkblue: rgb(2, 3, 129);
            }

            body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            }

            .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h2 {
            color: rgb(2, 3, 129);
            }

            p {
            color: rgb(2, 3, 129);
            }

            .user-details {
            margin-bottom: 20px;
            }

            .event-details {
            border-top: 1px solid var(--color-faded);
            padding-top: 20px;
            }

            .signature {
            margin-top: 3rem;
            }
            
            .role{
                font-size:90%;
                opacity:0.5;
            }
        </style>
    </head>

    <body>
    <div class="container">
        <h2>Contact Information Received</h2>
        <p>Dear Pacifique,</p>

        <p>You have received the following contact information from the ALUmineers website.</p>

        <div class="event-details">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${info.name}</p>
        <p><strong>Email:</strong> ${info.email}</p>
        <p><strong>Message:</strong> ${info.message}</p>
        </div>

        <div class="signature">
            <p>Best regards,</p>
            <p>ALUmineers Bot</p>
        </div>

        <p style="color: #777; font-size: 12px; margin-top: 20px;">ALUmineers &copy; ${new Date().getFullYear()}</p>
    </div>
    </body>
    </html>`;
}

const passwordResetTemplate = (username, password)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            :root {
            --color-whiteorange: #faeeee;
            --color-main: #BF2C34;
            --color-faded: #bf2c334b;
            --color-darkblue: rgb(2, 3, 129);
            }

            body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            }

            .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h2 {
            color: rgb(2, 3, 129);
            }

            p {
            color: rgb(2, 3, 129);
            }

            .user-details {
            margin-bottom: 20px;
            }

            .event-details {
            border-top: 1px solid var(--color-faded);
            padding-top: 20px;
            }

            .signature {
            margin-top: 3rem;
            }
            
            .role{
                font-size:90%;
                opacity:0.5;
            }
        </style>
    </head>

    <body>
    <div class="container">
        <h2>Password Reset</h2>
        <p>Dear ${username},</p>

        <p>You have requested a password reset on the ALUmineers website.</p>

        <div class="event-details">
        <h3>New temporary password</h3>
        <p><strong>Password:</strong> ${password}</p>
        </div>

        <div class="signature">
            <p>Best regards,</p>
            <p>ALUmineers Bot</p>
        </div>

        <p style="color: #777; font-size: 12px; margin-top: 20px;">ALUmineers &copy; ${new Date().getFullYear()}</p>
    </div>
    </body>
    </html>`;


}




module.exports = {
    verificationTemplate, 
    eventRegistrationTemplate, 
    eventCancellationTemplate,
    receivedContactInformationTemplate,
    passwordResetTemplate}