(function () {
    var date = new Date(2015, 10, 15, 22);
    var year = document.querySelector('#year'),
        month = document.querySelector('#month'),
        day = document.querySelector('#day'),
        hour = document.querySelector('#hour'),
        minute = document.querySelector('#minute'),
        second = document.querySelector('#second');
    window.setInterval(() => {
        var current = new Date();

        var seconds = current.getSeconds() - date.getSeconds();
        if (seconds < 0) {
            seconds += 60;
            current.setMinutes(current.getMinutes() - 1);
        }
        var minutes = current.getMinutes() - date.getMinutes();
        if (minutes < 0) {
            minutes += 60;
            current.setHours(current.getHours() - 1);
        }
        var hours = current.getHours() - date.getHours();
        if (hours < 0) {
            hours += 24;
            current.setDate(current.getDate() - 1);
        }

        var days = current.getDate() - date.getDate();
        if (days < 0) {
            var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            days += daysInMonth[current.getMonth()];
            current.setDate(current.getDate() - 1);
        }
        var months = current.getMonth() - date.getMonth();
        if (months < 0) {
            months += 12;
            current.setYear(current.getFullYear() - 1);
        }
        var years = current.getFullYear() - date.getFullYear();

        if (seconds.toString().length < 2) {
            second.textContent = '0' + seconds;
        } else {
            second.textContent = seconds;
        }
        if (minutes.toString().length < 2) {
            minute.textContent = '0' + minutes;
        } else {
            minute.textContent = minutes;
        }
        if (hours.toString().length < 2) {
            hour.textContent = '0' + hours;
        } else {
            hour.textContent = hours;
        }
        if (days.toString().length < 2) {
            day.textContent = '0' + days;
        } else {
            day.textContent = days;
        }
        if (months.toString().length < 2) {
            month.textContent = '0' + months;
        } else {
            month.textContent = months;
        }
        year.textContent = years;
    }, 500);
})();