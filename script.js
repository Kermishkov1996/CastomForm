let form = document.querySelector('.form'),
    allInputs = document.querySelectorAll('.input'),
    inputName = document.querySelector('.input-name'),
    inputPhone = document.querySelector('.input-phone'),
    inputEmail = document.querySelector('.input-email'),
    inputCheckbox = document.querySelector('.input-checkbox');


function validation(form) {

    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.classList.remove('error');
            parent.querySelector('.error-label').remove();
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');

        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;

        parent.classList.add('error');
        parent.append(errorLabel);
    }

    function validateName(name) {
        const regName = /^[А-Яа-я]+$/;
        return regName.test(String(name));
    }

    function validatePhone(phone) {
        const regPh = /^[0-9\s]*$/;
        return regPh.test(String(phone));
    }

    function validateEmail(email) {
        const regEm = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regEm.test(String(email).toLowerCase());
    }

    let result = true;
    let nameValue = inputName.value;
    let phoneValue = inputPhone.value;
    let emailValue = inputEmail.value;

    for (const input of allInputs) {
        removeError(input);

            if (input.value == '') {
                removeError(input);
                createError(input, 'Поле не заполнено');
                result = false;
            }
    }

    if (!validateName(nameValue)) {
        removeError(inputName);
        createError(inputName, 'Только русские буквы');
        inputName.classList.add('error');
        result = false;
    } else {
        inputName.classList.remove('error');
    }

    if (!validatePhone(phoneValue)) {
        removeError(inputPhone);
        createError(inputPhone, 'Неверный телефон');
        inputPhone.classList.add('error');
        result = false;
    } else {
        inputPhone.classList.remove('error');
    }

    if(!validateEmail(emailValue)) {
        removeError(inputEmail);
        createError(inputEmail, 'Неверный эмайл');
        inputEmail.classList.add('error');
        result = false;
    } else {
        inputEmail.classList.remove('error');
    }

    // if (!inputCheckbox.checked) {
    //     removeError(inputCheckbox);
    //     createError(inputCheckbox, 'checkbox not checked');
    //     inputCheckbox.classList.add('error');
    //     result = false;
    // } else {
    //     inputCheckbox.classList.remove('error');
    // }

    return result
}

form.addEventListener('submit', function(event) {
    event.preventDefault()

    if (validation(this) === true) {
        alert('Форма отправлена успешно')
    }
})

