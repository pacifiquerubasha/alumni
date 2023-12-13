

//Method to convert a date from "2023-10-20T08:30:00.000Z" to a format Sunday, 12 April | 10:00 am
export const formatDate = (date) => {
    const newDate = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('en-US', options);
    return formattedDate;
}

export const isPastEvent = (date)=>{
    return new Date((date)?.split(" ")[0]) - new Date() < 0 
}

export const formatTime = (date)=>{
    // Return formatted string like "Now", "1 minute ago", "1 hour ago", "yesterday", 1 day ago, or just the date(DD/MM) if older than a week
    const now = new Date();

    const dateObj = new Date(date);
    const diff = now - dateObj;
    const diffInMinutes = (diff / (1000 * 60)).toFixed(0);
    const diffInHours = (diffInMinutes / 60).toFixed(0);

    if(diffInMinutes < 1){
        return "Now";
    }else if(Math.floor(diffInMinutes) < 60){
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }else if(Math.floor(diffInHours) < 24){
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }else{
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    }

}