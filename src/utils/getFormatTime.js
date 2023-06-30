// Вернет минуты
export const getMinutes = (mins) => {
    let minutes = mins;

    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes;
}

// Вернет часы
export const getHours = (hour) => {
    let hours = hour;

    if(hours < 10) {
        hours = "0" + hours;
    }

    return hours;
}


// Вернет число даты
export const getDate = (date) => {
    return date.getDate();
}

// Вернет сокращенное название месяца
export const getMonth = (date, locale = 'en-US') => {
    return date.toLocaleDateString(locale, {month: 'short'})
}

// Вернет год
export const getYear = (date) => {
    return date.getFullYear();
}


// Вывыдет подробную инфу о дате
export const dateInfo = (msgTime, type="chat") => {
    let date = msgTime.getDate();

    let minutes = getMinutes(msgTime.getMinutes());
    let hours = getHours(msgTime.getHours());
    
    let time = `${hours}:${minutes}`;
    let month = msgTime.toLocaleDateString('en-US', {month: 'short'}); 

    return type === "chat" ? (date + " " + month + ", " + time) : (date + " " + month + " " + time)
}


// Название дня недели 
export const getDayName = (date, locale = 'en-US') => {
    return date.toLocaleDateString(locale, {weekday: 'long'});
}



// Выведет время в часах и минутах для сообщения
export const formatTimeMessage = (msgTime) => {
    let time = new Date(msgTime);
    let minutes = getMinutes(time.getMinutes());
    let hours = getHours(time.getHours());

    return `${hours}:${minutes}`;
}




// Выведет инфу о том, когда в последний раз был пользователь в сети
export const formatTimeLastActive = (lastTimeActive) => {

    let wasOnline = '';

    let currTime = new Date();

    let lastTimeUserActive = new Date(lastTimeActive);
    
    // Если пользователь был в сети в последний раз меньше 24 часов назад
    if((currTime.getTime() - lastTimeUserActive.getTime()) < 86400000) {

        const timeFormat = currTime.getTime() - lastTimeUserActive.getTime();

        // Если пользователь был меньше 1 часа назад
        if(timeFormat < 3600000) {
            let minutes = Math.round(timeFormat / 60000);
            wasOnline = `${minutes} minutes ago`;
        }
        
        else {
            let hours = Math.round(timeFormat / 3600000);
            wasOnline = `${hours} hours ago`;
        }

    }

    // Если пользователя не было уже больше 24 часа
    else {
        
        // Если пользователь был вчера
        let condition = (currTime.getDate() - lastTimeUserActive.getDate() === 1)

        if(condition) {
            let minutes = getMinutes(lastTimeUserActive.getMinutes());
            let hours = getHours(lastTimeUserActive.getMinutes());

            wasOnline = `yesterday at ${hours}:${minutes}`;
        } 
        else {
            wasOnline = dateInfo(lastTimeUserActive, "user");
        }

    }

    return wasOnline;

}



// Время последнего сообщения чата 
const getFormatTime = (msgTime) => { 

    let currTime = new Date();

    let messageTime = new Date(msgTime);

    let messageTimeDay = currTime.getDate() - messageTime.getDate();

    switch(messageTimeDay) {
        case 0:
            messageTimeDay = "Today";
            break;
        case 1:
            messageTimeDay = "Yesterday";
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            messageTimeDay = getDayName(messageTime);
            break;
        default:
            messageTimeDay = dateInfo(messageTime);
    }

    return messageTimeDay;

};

export default getFormatTime;