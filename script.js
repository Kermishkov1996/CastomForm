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

    function validateEmail(email) {
        let regEm = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regEm.test(String(email).toLowerCase());
    }


    let result = true;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;

    for (const input of allInputs) {
        removeError(input);

            if (input.value == '') {
                removeError(input);
                createError(input, 'Поле не заполнено');
                result = false;
            }
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
        alert('Форма проверена')
    }
})

