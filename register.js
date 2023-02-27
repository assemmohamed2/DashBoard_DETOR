const loginText = document.querySelector(".title-text .login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

const nameInputSignup = document.getElementById("nameInputSignup")
const emailInputSignup = document.getElementById("emailInputSignup")
const passwordInputSignup = document.getElementById("passwordInputSignup")
const confirmPasswordInputSignup = document.getElementById("confirmPasswordInputSignup")
const emailInputLogin = document.getElementById("emailInputLogin")
const passwordInputLogin = document.getElementById("passwordInputLogin")
const loginForm = document.getElementById("loginForm")
const signupForm = document.getElementById("signupForm")

const validName = document.getElementById("validName")
const validEmail = document.getElementById("validEmail")
const validPassword = document.getElementById("validPassword")
const validConfirmPassword = document.getElementById("validConfirmPassword")
const validEmailRegister = document.getElementById("validEmailRegister")
const validEmailLogin = document.getElementById("validEmailLogin")
const validPasswordLogin = document.getElementById("validPasswordLogin")



signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});



let registerArr;
if (localStorage.registerData != null) {
  registerArr = JSON.parse(localStorage.registerData);
} else {
  registerArr = []
}
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validation()) {
    let registerObj = {
      name: nameInputSignup.value,
      email: emailInputSignup.value,
      password: passwordInputSignup.value,
      confirmPassword: confirmPasswordInputSignup.value,
    }
    registerArr.push(registerObj)
    localStorage.setItem('registerData', JSON.stringify(registerArr))
    loginBtn.click();
    emptyValues()
  } else {
    validation()
  }
})

function emptyValues() {
  nameInputSignup.value = ''
  emailInputSignup.value = ''
  passwordInputSignup.value = ''
  confirmPasswordInputSignup.value = ''
}
// VALIDATION NAME
function validation() {
  if (validationName() && validationEmail() && validationPassword() && validationConfirmPassword() && validationEmailRestired()) {
    console.log("yes");
    return true
  } else {
    return false
  }
}
function validationName() {
  let nameajax = /^[a-zA-Z]{4,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/
  if (nameajax.test(nameInputSignup.value)) {
    validName.style.display = 'none';
    return true;
  } else {
    validName.style.display = 'block';
    return false
  }
}

// console.log(registerArr.length);
function validationEmailRestired() {
  console.log(registerArr.length);
  if (registerArr.length > 0) {
    let v;
    registerArr.forEach(el => {
      // console.log(el.email);
      if (emailInputSignup.value == el.email) {
        validEmailRegister.style.display = 'block';
        v = false;
      } else {
        validEmailRegister.style.display = 'none';
        v = true;
      }
    })
    return v
  } else {
    return true
  }
}
function validationEmail() {
  let emailajax = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
  if (emailajax.test(emailInputSignup.value)) {
    validEmail.style.display = 'none';
    return true;
  } else {
    validEmail.style.display = 'block';
    return false
  }
}
function validationPassword() {
  let passwordajax = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  if (passwordajax.test(passwordInputSignup.value)) {
    validPassword.style.display = 'none';
    return true;
  } else {
    validPassword.style.display = 'block';
    return false
  }
}
function validationConfirmPassword() {
  if (confirmPasswordInputSignup.value === passwordInputSignup.value) {
    validConfirmPassword.style.display = 'none';
    return true;
  } else {
    validConfirmPassword.style.display = 'block';
    return false
  }
}



// LOGIN FORM
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let statusEmail;
  let statusPassword;
  registerArr.forEach(ele => {
    if (emailInputLogin.value === ele.email) {
      statusEmail = "success"
      validEmailLogin.style.display = "none"
      registerArr.forEach(ele => {
        if (ele.email === emailInputLogin.value) {
          localStorage.setItem("userName", "")
          localStorage.userName = ele.name
        }
      })
      if (passwordInputLogin.value === ele.password) {
        statusPassword = "success"
        validPasswordLogin.style.display = "none"
      } else {
        validPasswordLogin.style.display = "block"
      }
    } else {
      validEmailLogin.style.display = "block"
    }
  })
  if (statusEmail === "success" && statusPassword === "success") {
    location.href = '/index.html'
    validEmailLogin.style.display = "none"
  } else {
    validEmailLogin.style.display = "block"
  }
})