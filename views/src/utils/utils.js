

//Method to convert a date from "2023-10-20T08:30:00.000Z" to a format Sunday, 12 April | 10:00 am
export const formatDate = (date) => {
    const newDate = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('en-US', options);
    return formattedDate;
}