//INPUT IDs
let birthDay = document.getElementById("inputDay");
let birthMonth = document.getElementById("inputMonth");
let birthYear = document.getElementById("inputYear");

let allInputValue = document.querySelectorAll("input").value;
let allInput = document.querySelectorAll("input");

let inputDay = document.getElementById("inputDay").value;
let inputMonth = document.getElementById("inputMonth").value;
let inputYear = document.getElementById("inputYear").value;

//OUTPUT IDs
let outputDays = document.getElementById("numDays");
let outputMonths = document.getElementById("numMonths");
let outputYears = document.getElementById("numYears");

//DATE
let fullDate = new Date();

let currentDay = fullDate.getDate();
let currentMonth = 1 + fullDate.getMonth();
let currentYear = fullDate.getFullYear();

//BUTTON AND LABELS
document.querySelector("button").addEventListener("click", handleClick);

let labelDay = document.getElementById("labelDay");
let labelMonth = document.getElementById("labelMonth");
let labelYear = document.getElementById("labelYear");

function handleClick() {
  //If there is no specified day, throw an error.
  if (!inputDay) {
    birthDay.style.borderColor = "hsl(0, 100%, 67%)";
    labelDay.style.color = "hsl(0, 100%, 67%)";
    document.getElementsByClassName("error")[0].innerHTML =
      "This field is required";
  }
  //If the specified month is greater than 31, throw an error.
  else if (inputDay > 31 || inputDay < 1) {
    birthDay.style.borderColor = "hsl(0, 100%, 67%)";
    labelDay.style.color = "hsl(0, 100%, 67%)";
    document.getElementsByClassName("error")[0].innerHTML =
      "Must be a valid day";
  } else {
    birthDay.style.borderColor = "hsl(0, 0%, 86%)";
    labelDay.style.color = "hsl(0, 1%, 44%)";
    document.getElementsByClassName("error")[0].innerHTML = "";

    calculateAge();
  }

  //If there is no specified month, throw an error.
  if (!inputMonth) {
    birthMonth.style.borderColor = "hsl(0, 100%, 67%)";
    labelMonth.style.color = "hsl(0, 100%, 67%)";
    document.getElementsByClassName("error")[1].innerHTML =
      "This field is required";
  }
  //If the specified month is greater than 12, throw an error.
  else if (inputMonth > 12 || inputMonth < 1) {
    birthMonth.style.borderColor = "hsl(0, 100%, 67%)";
    labelMonth.style.color = "hsl(0, 100%, 67%)";
    document.getElementsByClassName("error")[1].innerHTML =
      "Must be a valid month";
  } else {
    birthMonth.style.borderColor = "hsl(0, 0%, 86%)";
    labelMonth.style.color = "hsl(0, 1%, 44%)";
    document.getElementsByClassName("error")[1].innerHTML = "";

    calculateAge();
  }

  //If there is no specified year, throw an error.
  if (!inputYear) {
    birthYear.style.borderColor = "hsl(0, 100%, 67%)";
    labelYear.style.color = "hsl(0, 100%, 67%)";
    document.getElementsByClassName("error")[2].innerHTML =
      "This field is required";
  }
  //If the specified year is greater than the current year, throw an error. This year is 2023, I cannot specify a year beyond that.
  else if (inputYear > currentYear) {
    birthYear.style.borderColor = "hsl(0, 100%, 67%)";
    labelYear.style.color = "hsl(0, 100%, 67%)";
    document.getElementsByClassName("error")[2].innerHTML =
      "Must be in the past";
  } else {
    birthYear.style.borderColor = "hsl(0, 0%, 86%)";
    labelYear.style.color = "hsl(0, 1%, 44%)";
    document.getElementsByClassName("error")[2].innerHTML = "";

    calculateAge();
  }
}

//FOR CALCULATION
function calculateAge(calcDays, calcMonths, calcYears) {
  calcDays = inputDay - currentDay;
  outputDays.innerHTML = Math.abs(calcDays);

  calcMonths = inputMonth - currentMonth;
  outputMonths.innerHTML = Math.abs(calcMonths);

  calcYears = currentYear - inputYear;
  outputYears.innerHTML = Math.abs(calcYears);
}
