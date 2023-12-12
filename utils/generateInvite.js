const ical = require('ical-generator').default;


function generateInviteAlternatives(
    startTime, 
    endTime, 
    summary, 
    description, 
    location, 
    url, 
    organizerName,
    organizerEmail,
    recepientName,
    recepientEmail,
    ) {

    const cal = ical({ name: 'My test calendar event', method: 'PUBLISH' });
    
    // cal.domain("mytestwebsite.com");
    
    cal.createEvent({
            start: startTime,         // eg : moment()
            end: endTime,             // eg : moment(1,'days')
            summary: summary,         // 'Summary of your event'
            description: description, // 'More description'
            location: location,       // 'Delhi'
            url: url,                 // 'event url'
            organizer: {              // 'organizer details'
                name: organizerName,
                email: organizerEmail,
            },
            attendees: [
                {
                  email: recepientEmail,
                  name: recepientName,
                  partstat: 'ACCEPTED', // Set the participation status (ACCEPTED, DECLINED, TENTATIVE, NEEDS-ACTION, etc.)
                },
            ],
        });

        
    let alternatives = {
        "Content-Type": "text/calendar; charset=utf-8; method=REQUEST; name=invite.ics",
        "method": "REQUEST",
        "content": new Buffer(cal.toString()),
        "component": "VEVENT",
        "Content-Class": "urn:content-classes:calendarmessage",
        "Content-Transfer-Encoding": "Base64",
        "Content-Disposition": "attachment; filename=invite.ics",            
    }

   

    return alternatives;
}




module.exports = {generateInviteAlternatives}