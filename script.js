let form = document.querySelector(".form"),
  allInputs = document.querySelectorAll(".input"),
  inputName = document.querySelector(".input-name"),
  inputPhone = document.querySelector(".input-phone"),
  inputEmail = document.querySelector(".input-email"),
  inputCheckbox = document.querySelector(".input-checkbox");

let maskOptions = {
  mask: "8(000)000-00-00",
  lazy: false,
};
let mask = new IMask(inputPhone, maskOptions);

function validation(form) {
  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.classList.remove("error");
      parent.querySelector(".error-label").remove();
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement("div");

    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;

    parent.classList.add("error");
    parent.append(errorLabel);
  }

  function validateName(name) {
    let regName = /^[а-яА-ЯЁё]+$/;
    return regName.test(String(name));
  }

  function validatePhone(phone) {
    let regPh = /^[8][(][0-9]{3}[)][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/;
    return regPh.test(String(phone));
  }

  function validateEmail(email) {
    let regEm = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEm.test(String(email).toLowerCase());
  }

  form.addEventListener("input", inputHandler);

  function inputHandler() {
    let result = true;
    let nameValue = inputName.value;
    let phoneValue = inputPhone.value;
    let emailValue = inputEmail.value;

    for (const input of allInputs) {
      removeError(input);

      if (!validateName(nameValue) && nameValue !== "") {
        removeError(inputName);
        createError(inputName, "Только русские буквы");
        inputName.classList.add("error");
        result = false;
      } else {
        inputName.classList.remove("error");
      }

      if (!validatePhone(phoneValue) && phoneValue !== "") {
        removeError(inputPhone);
        createError(inputPhone, "Неверный телефон");
        inputPhone.classList.add("error");
        result = false;
      } else {
        inputPhone.classList.remove("error");
      }

      if (!validateEmail(emailValue) && emailValue !== "") {
        removeError(inputEmail);
        createError(inputEmail, "Неверный эмайл");
        inputEmail.classList.add("error");
        result = false;
      } else {
        inputEmail.classList.remove("error");
      }

      if (!inputCheckbox.checked) {
        removeError(inputCheckbox);
        createError(inputCheckbox, "Принять соглашение");
        inputCheckbox.classList.add("error");
        result = false;
      } else {
        removeError(inputCheckbox);
      }

      if (input.value == "") {
        removeError(input);
        createError(input, "Поле не заполнено");
        result = false;
      }
    }
    return result;
  }
}

let select = function () {
  let selectHeader = document.querySelectorAll(".select__header");
  let selectItem = document.querySelectorAll(".select_item");

  selectHeader.forEach((item) => {
    item.addEventListener("click", selectToggle);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle("is-active");
  }

  function selectChoose() {
    let text = this.innerText;
    let select = this.closest(".select");
    let currentText = select.querySelector(".select__current");

    currentText.innerText = text;
    select.classList.remove("is-active");
  }
};

select();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validation(this) === true) {
    alert("Форма проверена");
  }
});
