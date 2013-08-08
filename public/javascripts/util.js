// Helpers
function formatDate(date) {
    if (date) {
        return date.getFullYear() + "/"
          + twoDigits(date.getMonth()+1) + "/"
          + twoDigits(date.getDate()) + " "
          + twoDigits(date.getHours()) + ":"
          + twoDigits(date.getMinutes()) + ":"
          + twoDigits(date.getSeconds());
    } else {
        return "";
    }
}

function twoDigits(value) {
    if (value < 10) {
        return "0" + value;
    } else {
        return value;
    }
}
