function id(id) {return document.getElementById(id);}
function classes(classes) {return document.getElementsByClassName(classes);}
let form = id("form"),
    fname = id("fname"),
    email = id("email"),
    subject = id("subject"),
    mess = id("mess"),

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

// check name
function checkName() {
  const fnameValue = fname.value.trim();
  let valid = false;

  if(fnameValue === '') {setError(fname, 0, 'Please fill out your name.');} 
  else if(fnameValue.length > 100) {setError(fname, 0, 'Your name should not exceed 100 characters.')}
  else {setSuccess(fname, 0); valid = true;}
  return valid;
}

// check email
function validateEmail(eString) {
  if (eString.indexOf(" ") >= 0) return false; // no blankspace

  // check @ sign location, no two consecutive @
  let atSymbol = eString.indexOf("@");
  let atSymbol2 = eString.lastIndexOf("@");
  if (atSymbol < 0 || atSymbol != atSymbol2) return false;

  // split the email local and domain part
  const eArray = eString.split("@");

  // email local and domain part: .(dot) is not the first char, the last char or appear consecutively
  for(var i = 0; i < 2; i++) {
    let dot1 = eArray[i].indexOf(".");
    let dot2 = eArray[i].lastIndexOf(".");
    if (dot1 == 0 || dot2 == eArray[i].length - 1 || eArray[i].indexOf("..") > 0) return false;
  }
  
  // email domain part: at least 2 chars between @ and .(dot) and at least 2 chars at last domain's portion
  let dot1 = eArray[1].indexOf(".");
  let dot2 = eArray[1].length - eArray[1].lastIndexOf(".") - 1;
  if (dot1 < 2 || dot2 < 2) return false;

  // if all is correct
  return true;
}

function checkEmail() {
  const emailValue = email.value.trim();
  let valid = false;

  if(emailValue === '') {setError(email, 1, 'Please fill out your email.');} 
  else if(emailValue.length > 100) {setError(email, 1, 'Your email should not exceed 100 characters.')}
  else if(validateEmail(emailValue) == false) {setError(email, 1, 'Your email is not valid')}
  else {setSuccess(email, 1); valid = true;}
  return valid;
}

// check subject
function checkSubject() {
  const subjValue = subject.value.trim();
  let valid = false;

  if(subjValue === '') {setError(subject, 2, 'Please fill out the subject.');} 
  else if(subjValue.length < 50) {setError(subject, 2, 'Subject should not shorter than 50 characters.')}
  else if(subjValue.length > 250) {setError(subject, 2, 'Subject should not exceed 250 characters.')}
  else {setSuccess(subject, 2); valid = true;}
  return valid;
}

// check mess
function checkMess() {
  const messValue = mess.value.trim();
  let valid = false;

  if(messValue === '') {setError(mess, 3, 'Please fill out the message.');}
  else if(messValue.length > 500) {setError(mess, 3, 'Message should not exceed 500 characters.')}
  else {setSuccess(mess, 3); valid = true;}
  return valid;
}

// check form when user submit
form.addEventListener('submit', function(e) {
  let isUsernameValid = checkName(),
      isEmailValid = checkEmail(),
      isSubjectValid = checkSubject(),
      isMessValid = checkMess();

  let isFormValid = isUsernameValid && 
                    isEmailValid && 
                    isSubjectValid && 
                    isMessValid;
  if (isFormValid == false) {e.preventDefault();}
})

// check form when user input
form.addEventListener('input', function(e) {
  switch (e.target.id) {
    case 'fname': checkName(); break;
    case 'email': checkEmail(); break;
    case 'subject': checkSubject(); break;
    case 'mess': checkMess(); break;
  }
});