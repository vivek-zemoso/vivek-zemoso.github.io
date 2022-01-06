import submitForm, { checkFormValidation } from './validation.mjs';

let form = document.getElementById('contact-form');
let feild_name = document.getElementById('name');
let feild_email = document.getElementById('email');
let feild_message = document.getElementById('message');
let feilds = [feild_name, feild_email, feild_message];

checkFormValidation(feilds);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let res = submitForm(feilds);
    if (res) {
        alert('Thank you for contacting me !');
    }
});
