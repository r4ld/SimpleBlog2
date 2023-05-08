function id(id) {return document.getElementById(id);}
function classes(classes) {return document.getElementsByClassName(classes);}
let form = id("form"),
    cake = id("cake"),
    fname = id("fname"),
    mess = id("mess"),
    date = id("date"),
    address = id("address"),

    errorMsg = classes("error"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon");

function setError(id, serial, message) {
  errorMsg[serial].innerHTML = message;
  id.style.border = "1px solid red";
  failureIcon[serial].style.opacity = "1";
  successIcon[serial].style.opacity = "0";
}
function setSuccess(id, serial) {
  errorMsg[serial].innerHTML = "";
  id.style.border = "1px solid #00000020";
  failureIcon[serial].style.opacity = "0";
  successIcon[serial].style.opacity = "1";
};

// check cake
function checkCake() {
  const cakeValue = cake.value;
  let valid = false;

  if(cakeValue === '') {setError(cake, 0, 'Please select our product.');}
  else {setSuccess(cake, 0); valid = true;}
  return valid;
}

// check name
function checkName() {
  const fnameValue = fname.value.trim();
  let valid = false;

  if(fnameValue === '') {setError(fname, 1, 'Please fill out your name.');} 
  else if(fnameValue.length > 100) {setError(fname, 1, 'Your name should not exceed 100 characters.')}
  else {setSuccess(fname, 1); valid = true;}
  return valid;
}

// check mess
function checkMess() {
  const messValue = mess.value.trim();
  let valid = false;

  if(messValue.length > 30) {setError(mess, 2, 'Message should not exceed 30 characters.')}
  else {setSuccess(mess, 2); valid = true;}
  return valid;
}

// check date
function checkDate() {
  const dateValue = date.value;
  const compare = Date.parse(dateValue) - Date.now() + 86400000;
  let valid = false;

  if(dateValue === '') {setError(date, 3, 'Please fill out the deliver date.');}
  else if(compare < 0) {setError(date, 3, 'Please select an upcoming date');}
  else {setSuccess(date, 3); valid = true;}
  return valid;
}

// check address
function checkAddress() {
  const addrValue = address.value.trim();
  let valid = false;

  if(addrValue === '') {setError(address, 4, 'Please fill out the address.');} 
  else if(addrValue.length > 500) {setError(address, 4, 'Address should not exceed 500 characters.')}
  else {setSuccess(address, 4); valid = true;}
  return valid;
}


// check form when user submit
form.addEventListener('submit', function(e) {
  let isCakevalid = checkCake(),
      isUsernameValid = checkName(),
      isMessValid = checkMess(),
      isDateValid = checkDate(),
      isAddressValid = checkAddress();

  let isFormValid = isCakevalid &&
                    isUsernameValid &&
                    isMessValid &&
                    isDateValid &&
                    isAddressValid;
  if (isFormValid == false) {e.preventDefault();}
})

// check form when user input
form.addEventListener('input', function(e) {
  switch (e.target.id) {
    case 'cake': checkCake(); break;
    case 'fname': checkName(); break;
    case 'mess': checkMess(); break;
    case 'date': checkDate(); break;
    case 'address': checkAddress(); break;
  }
});