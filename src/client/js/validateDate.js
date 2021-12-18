import moment from "moment";

export function validateDate(startdate, endDate) {
    let start = moment(startdate, "YYYY-MM-DD");
    let end = moment(endDate, "YYYY-MM-DD");
    let diff = end.diff(start, "days");
    if (diff < 0) {
        return false;
    } else if (diff >= 7) {
        let error = document.querySelector(".error-message");
        return error.innerHTML = "Date must be within 7 days";
    }

    return true;
}
