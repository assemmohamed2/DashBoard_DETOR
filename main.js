// location.href = "/register.html"

const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn")
const themeTogger = document.querySelector(".theme-toggler")
const addProduct = document.querySelector(".add-product")
const productName = document.getElementById("name")
const productNumber = document.getElementById("number")
const addBtn = document.querySelector(".add-btn")
const addProductSection = document.querySelector(".add-product-section")
const nameError = document.querySelector(".name-error")
const numberError = document.querySelector(".number-error")
const paymentError = document.querySelector(".payment-error")
const statusError = document.querySelector(".status-error")
const addProductSectionContent = document.querySelector(".add-product-section .content")
const detailsProductSection = document.querySelector(".product-details-section")
const popup = document.querySelectorAll(".popup");

const productNameDetails = document.getElementById("productNameDetails")
const productNumberDetails = document.getElementById("productNumberDetails")
const productPaymentDetails = document.getElementById("productPaymentDetails")
const productStatusDetails = document.getElementById("productStatusDetails")

const editName = document.querySelector(".edit-name")
const editNumber = document.querySelector(".edit-number")
const editPayment = document.querySelector(".edit-payment")
const editStatus = document.querySelector(".edit-status")

const userNameProfile = document.querySelector(".userNameProfile")
const logout = document.querySelector(".logout")
const profilePhoto = document.querySelector(".profile-photo img")
const logoutPopup = document.querySelector(".logout-popup")
const logoutPopupYes = document.querySelector(".logout-popup .yes")
const logoutPopupNo = document.querySelector(".logout-popup .no")


let ordersArr;

if (localStorage.orders != null) {
  ordersArr = JSON.parse(localStorage.orders);
} else {
  ordersArr = []
}


// SHOW SIDEBAR
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = 'block';
})

// CLOSE SIDEBAR
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = 'none';
})

// CHANGE THEME
themeTogger.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables');
  themeTogger.querySelector('i:nth-child(1)').classList.toggle('active');
  themeTogger.querySelector('i:nth-child(2)').classList.toggle('active');
})

// FILL ORDERS IN TABLE
function displayProducts() {
  let trContent = '';
  for (let i = 0; i < ordersArr.length; i++) {
    trContent += `
  <tr>
  <td>${ordersArr[i].productName}</td>
  <td>${ordersArr[i].productNumber}</td>
  <td>${ordersArr[i].productPayment}</td>
  <td class="${ordersArr[i].productStatus === 'Declined' ? 'danger' : ordersArr[i].productStatus === 'Pending' ? 'warning' : 'primary'}">${ordersArr[i].productStatus}</td>
  <td class="primary details" onclick="showDetails(${i})">Details</td>
  </tr>
  `
  }
  document.querySelector("table tbody").innerHTML = trContent;
}
displayProducts();



// Add PRODUCT
addProduct.addEventListener("click", () => {
  addProductSection.style.transform = 'scale(100%)';
  addProductSection.style.opacity = '1';
})
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validation()) {
    let pName = productName.value;
    let pNumber = productNumber.value;
    let pPayment = document.querySelector('input[type=radio]:checked').value;
    let pStatus;
    if (document.querySelector('select option:checked').innerHTML != "Select Payment") {
      pStatus = document.querySelector('select option:checked').innerHTML
    }
    let productObj = {
      productName: pName,
      productNumber: pNumber,
      productPayment: pPayment,
      productStatus: pStatus,
    }
    ordersArr.push(productObj)
    localStorage.setItem("orders", JSON.stringify(ordersArr))
    displayProducts();
    setTimeout(() => {
      addProductSection.style.transform = 'scale(0)';
      addProductSection.style.opacity = '0';
    }, 2000)
  }
})


// HIDE POPUP WHEN PREE OUT OF THIS
popup.forEach(el => {
  el.addEventListener("click", (e) => {
    if (e.target.dataset.section == 'popup') {
      el.style.opacity = "0"
      el.style.transform = "scale(0)"
    }
  })
})




// DETAILS OF PRODUCT
const productDetails = document.querySelectorAll(".details")
productDetails.forEach(el => {
  el.addEventListener("click", () => {
    detailsProductSection.style.transform = 'scale(100%)';
    detailsProductSection.style.opacity = '1';
  })
})



function showDetails(i) {
  productNameDetails.innerHTML = ordersArr[i].productName;
  productNumberDetails.innerHTML = (ordersArr[i].productNumber).toString();
  productPaymentDetails.innerHTML = ordersArr[i].productPayment;
  productStatusDetails.innerHTML = ordersArr[i].productStatus;
}










editName.addEventListener("click", (e) => {
  e.preventDefault();
  let input = document.createElement("input")
  input.setAttribute("type", "text")
  input.classList.add("input-edit-name")
  if (editName.classList.contains("fa-square-check")) {
    console.log(input.value);
  }
  if (editName.classList.contains("fa-pen-to-square")) {
    console.log(productNameDetails.innerHTML);
    document.getElementById('productNameDetails').after(input);
    productNameDetails.style.display = 'none'
    editName.classList.replace("fa-pen-to-square", "fa-square-check")
  } else {
    console.log("edit");
    console.log(input.value);
  }
})
editNumber.addEventListener("click", () => {
  if (editNumber.classList.contains("fa-pen-to-square")) {
    console.log(productNumberDetails.innerHTML);
    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.classList.add("input-edit-name")
    input.value = productNumberDetails.innerHTML
    document.getElementById('productNumberDetails').after(input);
    productNumberDetails.style.display = 'none'
    editNumber.classList.replace("fa-pen-to-square", "fa-square-check")
  } else {
    console.log("edit");
  }
})
editPayment.addEventListener("click", () => {
  if (editPayment.classList.contains("fa-pen-to-square")) {
    console.log(productPaymentDetails.innerHTML);
    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.classList.add("input-edit-name")
    input.value = productPaymentDetails.innerHTML
    document.getElementById('productPaymentDetails').after(input);
    productPaymentDetails.style.display = 'none'
    editPayment.classList.replace("fa-pen-to-square", "fa-square-check")
  } else {
    console.log("edit");
  }
})
editStatus.addEventListener("click", () => {
  if (editStatus.classList.contains("fa-pen-to-square")) {
    console.log(productStatusDetails.innerHTML);
    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.classList.add("input-edit-name")
    input.value = productStatusDetails.innerHTML
    document.getElementById('productStatusDetails').after(input);
    productStatusDetails.style.display = 'none'
    editStatus.classList.replace("fa-pen-to-square", "fa-square-check")
  } else {
    console.log("edit");
  }
})



// VALIDATION
function validation() {
  if (validationName() && validationNumber() && validationPayment()) {
    return true;
  } else {
    false
  }
}
function validationName() {
  if (productName.value !== '') {
    nameError.style.display = 'none';
    return true;
  } else {
    nameError.style.display = 'block';
    return false
  }
}

function validationNumber() {
  let numAJAX = /^[0-9]{4}$/;
  if (numAJAX.test(productNumber.value)) {
    numberError.style.display = 'none';
    return true;
  } else {
    numberError.style.display = 'block';
    return false
  }
}
function validationPayment() {
  if (document.querySelector('input[type=radio]:checked') != null) {
    paymentError.style.display = 'none';
    return true
  } else {
    paymentError.style.display = 'block';
    return false
  }
}


userNameProfile.innerHTML = localStorage.userName
profilePhoto.addEventListener("click", () => {
  logout.classList.toggle("active")
})
logout.addEventListener("click", () => {
  logoutPopup.style.opacity = "1"
  logoutPopup.style.transform = "scale(100%)"
})
logoutPopupYes.addEventListener("click", () => {
  location.href = './register.html'
})
logoutPopupNo.addEventListener("click", () => {
  logoutPopup.style.opacity = "0"
  logoutPopup.style.transform = "scale(0)"
})