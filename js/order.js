const forms = document.querySelectorAll("form");
var currentStep = 0;
var personalInfo;
showStep(currentStep);
validateAll();
document.querySelector("#btn-next").onclick = () => {
  if (validateAll()) {
    personalInfo = {
      FullName: document.querySelector("#full-name").value,
      Phone: document.querySelector("#phone").value,
      Email: document.querySelector("#email").value
    }
    console.log(personalInfo)
    showStep(++currentStep);
    validateAll();
  }
};
emailjs.init("user_urCFZKfuiIFI7H2tqqhfb");
document.querySelector("#btn-send").onclick = () => {
  if (validateAll()) {
    const confirmation = document.querySelector("#message-confirmation");
    confirmation.querySelector("#message").innerHTML = "Sending Message..."
    confirmation.querySelector("#detail").innerHTML = "Just a Moment..."
    var orderInfo = {
      Subject: document.querySelector("#subject").value,
      Message: document.querySelector("#message").value,
      Quantity40mm: document.querySelector("#quantity-40-mm").value,
      Quantity20mm: document.querySelector("#quantity-20-mm").value,
      Quantity6mm: document.querySelector("#quantity-6-mm").value,
      QuantityDust: document.querySelector("#quantity-dust").value
    }
    emailjs
      .send("SSCemailJSConfigSID", "SSCemailJSConfigTID", {...personalInfo, ...orderInfo})
      .then(
        (response) => {
          confirmation.setAttribute("class", "success-confirmation");
          confirmation.querySelector("#message").innerHTML = "Message Sent Successfully!"
          confirmation.querySelector("#detail").innerHTML = "We will get back to you soon."
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          confirmation.setAttribute("class", "error-confirmation");
          confirmation.querySelector("#message").innerHTML = "Sorry, the Message Could Not Be Sent"
          confirmation.querySelector("#detail").innerHTML = "Please try again later or directly Contact Us"
          console.error("FAILED...", error);
        }
      );
  }
  }
function validate(i) {
  switch (i.id) {
    case "full-name":
    case "email":
    case "phone":
      i.value.trim != ""
        ? i.parentElement.querySelector("i").classList.add("active")
        : i.parentElement.querySelector("i").classList.remove("active");
  }
  switch (i.id) {
    case "full-name":
    case "subject":
    case "message":
      i.value.trim() === ""
        ? showError(i, `${i.id.replace("-", " ")} is required`)
        : showSuccess(i);
      break;
    case "phone":
      i.value = i.value.replace(/[^0-9]+/, "");
      i.value.length != 10
        ? showError(i, "Please Enter a Valid Phone Number")
        : showSuccess(i);
      break;
    case "email":
      i.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ? showSuccess(i)
        : showError(i, "Please Enter a Valid E-Mail");
      break;
    case "quantity-40-mm":
    case "quantity-20-mm":
    case "quantity-6-mm":
    case "quantity-dust":
      Array.from(document.querySelectorAll("input[type='number']")).every((e) => e.value >= 0) ? showSuccess(i.parentElement): showError(i.parentElement, "Please make sure the Quantity is 0 / above");
      break;
  }
}

function validateAll() {
  let inputs = forms[currentStep].querySelectorAll(".input");
  inputs.forEach((e) => (e.onkeyup = (e) => validate(e.path[0])));
  return Array.from(inputs).every((i) => {return (i.id.includes("quantity") ? i.parentElement.classList.contains("success") : i.classList.contains("success"))});
}
function showStep(step) {
  forms.forEach((form) => form.removeAttribute("class"));
  forms[step].classList.add("current-step");
  document.querySelectorAll("#steps > *").forEach((i) => {i.removeAttribute("class")})
  document.querySelector(`#step-${currentStep}`).setAttribute("class", "active-step");
  step == 1 ? document.querySelector("#steps > span").setAttribute("class", "right") : '';
}
function showSuccess(input) {
  input.setAttribute("class", "success");
  input.parentElement.querySelector("span").innerHTML = "";
}
function showError(input, message) {
  input.setAttribute("class", "error");
  input.parentElement.querySelector("span").innerHTML = message;
}

document.querySelector("#message").onkeydown = function () { if (this.scrollTop != 0) this.style.height = this.scrollHeight + "px" };
