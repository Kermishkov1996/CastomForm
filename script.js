let form = document.querySelector('.form'),
    allInputs = document.querySelectorAll('.input'),
    inputPhone = document.querySelector('.input-phone'),
    inputEmail = document.querySelector('.input-email'),
    inputCheckbox = document.querySelector('.input-checkbox');

// form.onsubmit = function() {
//     let phoneValue = inputPhone.value;
//     let emailValue = inputEmail.value;
//     let emptyInputs = Array.from(formInputs).filter(input => input.value === '');
//
//
//     formInputs.forEach(function(input) {
//         if (input.value === '') {
//             input.classList.add('error');
//         } else {
//             input.classList.remove('error');
//         }
//     });
//
//     if (emptyInputs.length !== 0) {
//         console.log("inputs not filled");
//         return false;
//     }
// }


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
        let reg = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
        return reg.test(String(email).toLowerCase());
    }

    let result = true;
    for (const input of allInputs) {
        removeError(input);

            if (input.value == '') {
                removeError(input);
                createError(input, 'Поле не заполнено');
                result = false;
            }
    }

    let emailValue = inputEmail.value;
    if(!validateEmail(emailValue)) {
        console.log('email not valid')
        inputEmail.classList.add('error');
        result = false;
    } else {
        inputEmail.classList.remove('error');
    }

    if (!inputCheckbox.checked) {
        console.log('checkbox not checked')
        inputCheckbox.classList.add('error');
        result = false;
    } else {
        inputCheckbox.classList.remove('error');
    }

    return result
}

document.getElementById('add-form').addEventListener('submit', function(event) {
    event.preventDefault()

    if (validation(this) === true) {
        alert('Форма проверена')
    }
})

