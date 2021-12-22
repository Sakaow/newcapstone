import moment from "moment";

export function validateDate(startdate, endDate) {
    let start = moment(startdate, "MMM Do YY");
    let end = moment(endDate, "MMM Do YY");
    let diff = end.diff(start, "days");
    if (diff < 0) {
        return false;
    } else {
        return diff;
    }   
    
}

// calculate days away from start date and current date
export function daysAway(startDate) {
    let now = moment().format("MMM Do YY");

}

