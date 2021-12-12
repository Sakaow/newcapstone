import moment from 'moment';

const saveTrip = document.querySelector('button > #saveBtn');
const deleteBtn = document.querySelector('button > #deleteBtn');

let dataOfTrip = {};
saveTrip.addEventListener('submit', handleSubmit);

export const handleSubmit = function (event) {
    event.preventDefault();
    
    const addCity = document.querySelector('#destination');
    const startDate = document.querySelector('#startDate');
    const endDate = document.querySelector('#endDate');
    const message = document.querySelector('.error-message');

    


};