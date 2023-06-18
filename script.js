const inputs = document.querySelectorAll("input");
const inputDay = document.getElementById("inputDay");
const inputMonth = document.getElementById("inputMonth");
const inputYear = document.getElementById("inputYear");

const outputDays = document.getElementById("numDays");
const outputMonths = document.getElementById("numMonths");
const outputYears = document.getElementById("numYears");

const btn = document.querySelector("button");

const error = document.getElementsByClassName("error");

const inputValidation = document.querySelectorAll("input");
btn.addEventListener("click", () => {
  validate();
});

inputDay.addEventListener("input", () => {
  const inputDayValue = inputs[0].value;

  if (error[0].innerHTML === "Must be a valid date") {
    inputs[0].classList.remove("border-red");
    inputs[1].classList.remove("border-red");
    inputs[2].classList.remove("border-red");
  }

  if (inputDayValue > 31) {
    error[0].classList.add("error");
    error[0].innerHTML = "Must be a valid day";
    inputs[0].classList.add("border-red");
  } else {
    error[0].innerHTML = "";
    inputs[0].classList.remove("border-red");
  }
});

inputMonth.addEventListener("input", () => {
  const inputMonthValue = inputs[1].value;

  if (error[0].innerHTML === "Must be a valid date") {
    inputs[0].classList.remove("border-red");
    inputs[1].classList.remove("border-red");
    inputs[2].classList.remove("border-red");
  }

  if (inputMonthValue > 12) {
    error[1].classList.add("error");
    error[1].innerHTML = "Must be a valid month";
    inputs[1].classList.add("border-red");
  } else {
    error[1].innerHTML = "";
    inputs[1].classList.remove("border-red");
  }
});

inputYear.addEventListener("input", () => {
  const inputYearValue = inputs[2].value;
  const currentYear = dayjs().year();

  if (error[0].innerHTML === "Must be a valid date") {
    inputs[0].classList.remove("border-red");
    inputs[1].classList.remove("border-red");
    inputs[2].classList.remove("border-red");
  }

  if (inputYearValue > currentYear) {
    error[2].classList.add("error");
    error[2].innerHTML = "Must be in the past";
    inputs[2].classList.add("border-red");
  } else {
    error[2].innerHTML = "";
    inputs[2].classList.remove("border-red");
  }
});

function calculateAge() {
  const inputDayValue = parseInt(inputs[0].value);
  const inputMonthValue = parseInt(inputs[1].value);
  const inputYearValue = parseInt(inputs[2].value);

  const currentDate = dayjs();
  const dateString = `${inputYearValue}-${inputMonthValue
    .toString()
    .padStart(2, "0")}-${inputDayValue.toString().padStart(2, "0")}`;
  const inputDate = dayjs(dateString);

  const currentDay = dayjs().date();
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  let ageDay = 0;
  let ageMonth = 0;
  let ageYear = Math.abs(currentYear - inputYearValue);

  if (currentDate >= inputDate) {
    if (currentDate < dayjs(currentYear, inputMonthValue - 1, inputDayValue)) {
      ageYear = ageYear - 1;
      ageMonth = currentMonth + 1;
      ageDay = currentDay;
    } else {
      if (currentMonth + 1 === inputMonthValue) {
        ageDay = currentDay - inputDayValue;
      } else {
        ageMonth = Math.abs(currentMonth + 1 - inputMonthValue);
        if (currentDay < inputDayValue) {
          ageMonth = Math.abs(ageMonth - 1);
          ageDay =
            currentDay +
            new Date(currentYear, currentMonth, 0).getDate() -
            inputDayValue;
        } else {
          ageDay = currentDay - inputDayValue;
        }
      }
      if (
        currentMonth < inputMonthValue ||
        (currentMonth === inputMonthValue && currentDay === inputDayValue)
      ) {
        ageYear--;
      }
    }
  }

  outputYears.innerHTML = ageYear;
  outputMonths.innerHTML = ageMonth;
  outputDays.innerHTML = ageDay;
}

const validate = () => {
  const inputDayValue = inputs[0].value;
  const inputMonthValue = inputs[1].value;
  const inputYearValue = inputs[2].value;

  const currentDate = dayjs();
  const dateString = `${inputYearValue}-${inputMonthValue
    .toString()
    .padStart(2, "0")}-${inputDayValue.toString().padStart(2, "0")}`;
  const inputDate = dayjs(dateString);

  if (!inputDayValue) {
    error[0].classList.add("error");
    error[0].innerHTML = "This field is required";
    inputs[0].classList.add("border-red");
  }

  if (!inputMonthValue) {
    error[1].classList.add("error");
    error[1].innerHTML = "This field is required";
    inputs[1].classList.add("border-red");
  }

  if (!inputYearValue) {
    error[2].classList.add("error");
    error[2].innerHTML = "This field is required";
    inputs[2].classList.add("border-red");
  }

  if (!inputDayValue || !inputMonthValue | !inputYearValue) {
    return;
  }

  if (inputDate > currentDate) {
    error[0].innerHTML = "Must be a valid date";
    for (let i = 0; i < inputs.length; i++) {
      error[i].classList.add("error");
      inputs[i].classList.add("border-red");
    }

    console.log(daysInMonth[0]);
  }

  const checkDaysInMonth = () => {
    //An array that arranges the total number of days each month
    const daysInMonth = [
      31, // January
      28, // February
      31, // March
      30, // April
      31, // May
      30, // June
      31, // July
      31, // August
      30, // September
      31, // October
      30, // November
      31, // December
    ];

    if (inputDayValue > daysInMonth[inputMonthValue - 1]) {
      //inputDayValue(31) > daysInMonth[4-1] => 31 > daysInMonth[3] => 31 > 30 ????
      error[0].classList.add("error");
      error[0].textContent = "Must be a valid date";
      inputs[0].classList.add("border-red");

      console.log("ERROR");
    } else {
      error[0].textContent = "";
      inputs[0].classList.remove("border-red");

      calculateAge();
      console.log("NO ERROR");
    }

    //Check if leap year
    const isLeapYear = () => {
      if (
        (inputYearValue % 4 === 0 && inputYearValue % 100 !== 0) ||
        inputYearValue % 400 === 0
      ) {
        daysInMonth[1] = 29; //If true
      } else {
        daysInMonth[1] = 28; //If false
      }
    };

    return true;
  };
  checkDaysInMonth();
};
