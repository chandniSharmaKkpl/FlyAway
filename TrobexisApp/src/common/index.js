const getTimeMessage = () => {
    var d = new Date();
    var hour = d.getHours();
    var amPm = ''
    let stringToRead = "";
    if (hour < 12) {
        amPm = "am"
        stringToRead = "Good morning!"
    } else {
        amPm = "pm"
        if (hour >= 12 && hour <= 17) {
            stringToRead = "Good Afternoon!";
        } else {
            if (hour > 17 && hour <= 24) {
                stringToRead = "Good Evening!";
            }
        }
    }
    return stringToRead;
}

export default {
    getTimeMessage
}