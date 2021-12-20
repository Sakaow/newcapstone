import moment from "moment";

export function validateDate(startdate, endDate) {
    let start = moment(startdate, "YYYY-MM-DD");
    let end = moment(endDate, "YYYY-MM-DD");
    let diff = end.diff(start, "days");
    if (diff < 0) {
        return false;
    } else if (diff > 7) {
        let error = document.querySelector(".error-message");
        error.innerHTML = "Date must be within 7 days";
        error.style.display = 'block';
        error.textAlign = 'center';
        error.style.color = 'red';
        error.style.fontSize = '1.3rem';
        setTimeout(function() {
            error.style.display = 'none';
        } , 3000);
    } else {
        return diff;
    }   
    
}
