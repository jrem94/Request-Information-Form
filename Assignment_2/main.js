//DROP DOWN INTERACTION//

//Get dropdown fields and store as constants.
const degreeField = document.getElementById("degree");
const studyField = document.getElementById("study");

//When the degree dropdown is changed call functions.
degreeField.onchange = function(){
    toggleStudy();
    removeFormer();
    programGenerator();
};

//If the degree drop down is changed to a valid value, enable the study dropdown. If not, disable the dropdown.
function toggleStudy(){
    if(studyField.hasAttribute("disabled")){
        studyField.removeAttribute("disabled");
        degreeField.removeChild(select);
    } else if(degreeField.value === "select"){
        studyField.setAttribute("disabled", "true");
    }
};

// PROGRAM GENERATION //

//Create a conditional statement that calls the appropriate function below
function programGenerator(){
    if(degreeField.value === "ct"){
        showCertificate();
    }else if(degreeField.value === "as"){
        showAssociates();
    }else if(degreeField.value === "ba"){
        showBachelors();
    }
};

//Create three functions (one for each degree type) to generate programs.
function showCertificate(){
    const accountingCert = document.createElement("option");
    accountingCert.textContent = "CRT: Accounting";
    accountingCert.value = "accounting";
    studyField.appendChild(accountingCert);

    const applicationCert = document.createElement("option");
    applicationCert.textContent = "CRT: Application Development";
    applicationCert.value = "application-development";
    studyField.appendChild(applicationCert);

    const biblicalCert = document.createElement("option");
    biblicalCert.textContent = "CRT: Biblical Studies";
    biblicalCert.value = "biblical-studies";
    studyField.appendChild(biblicalCert);
};

function showAssociates(){
    const religionAs = document.createElement("option");
    religionAs.textContent = "AA: Religion";
    religionAs.value = "religion";
    studyField.appendChild(religionAs);

    const criminalAs = document.createElement("option");
    criminalAs.textContent = "AA: Criminal Justice";
    criminalAs.value = "criminal-justice";
    studyField.appendChild(criminalAs);

    const businessAs = document.createElement("option");
    businessAs.textContent = "AA: Business";
    businessAs.value = "business";
    studyField.appendChild(businessAs);
};

function showBachelors(){
    const aviationBa = document.createElement("option");
    aviationBa.textContent = "BS: Aviation";
    aviationBa.value = "aviation";
    studyField.appendChild(aviationBa);

    const historyBA = document.createElement("option");
    historyBA.textContent = "BS: History";
    historyBA.value = "history";
    studyField.appendChild(historyBA);

    const socialBa = document.createElement("option");
    socialBa.textContent = "BS: Social Work";
    socialBa.value = "social-work";
    studyField.appendChild(socialBa);
};

//Remove previously created elements

function removeFormer(){
    if (studyField.lastChild.value != "select-program" && degreeField.value != "select"){
        while (studyField.lastChild) {
            studyField.removeChild(studyField.lastChild);
        }
    }
};

// FORM VALIDATION //

const form = document.getElementById("form");
let firstName = document.getElementById("name");
let lastName = document.getElementById("surname");
let email = document.getElementById("mail");
let telephone = document.getElementById("telephone");
let address = document.getElementById("address");

//validate first and last name
function validateFirstName(firstName){
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(firstName);
};

function validateLastName(lastName){
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(lastName);
};

//validate email
function validateEmail(email){
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
};

//vailidate telephone
function validatePhone(telephone){
    return /[+]?[\d]? ?[(]?\d{3}[)]?[ -]?\d{3}-?\d{4}/g.test(telephone);
};

//validate address
function validateAddress(address){
    return /[A-Za-z0-9'\.\-\s\,]/g.test(address);
};

//Create validation tool tips\\

function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
      element.style.display = "inherit";
      displayInvalidToolTip(1);
    } else {
      element.style.display = "none";
      displayInvalidToolTip(0);
    }
  }
  
  function createListener(validator) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text !== "" && !valid;
      const tooltip = e.target.nextElementSibling;
      showOrHideTip(showTip, tooltip);
    };
  }
  
  /*Second createLister with known bug: because of the display properties if the invalid tool tip
  is present for both first and last name, correcting one with automatically remove the tool tip for
  both. This was done so that form would not break from the span interrupting the flow of the page.*/

  function createListenerName(validator) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text !== "" && !valid;
      const tooltip = e.target.nextElementSibling.nextElementSibling;
      showOrHideTip(showTip, tooltip);
    };
  }

  firstName.addEventListener("input", createListenerName(validateFirstName));
  lastName.addEventListener("input", createListener(validateLastName));
  email.addEventListener("input", createListener(validateEmail));
  telephone.addEventListener("input", createListener(validatePhone));
  address.addEventListener("input", createListener(validateAddress));
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Submit button pressed. Default behavior has been prevented.");
});