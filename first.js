const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
//https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

let couCode;

for (let select of dropdowns) {
  for (currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";

      couCode = currencyCode;
      console.log("after load the dropdown", couCode);
    } else if (select.name === "to" && currencyCode === "PKR") {
      newOption.selected = "selected";
      toCurrency = currencyCode;
      console.log(
        "printing currency code mean country name in to in dropdown",
        currencyCode
      );
    }
    select.append(newOption);
  }

  select.addEventListener("change", (eve) => {
    updateFlage(eve.target);
  });
}

const updateFlage = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");

  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal < 1 || amountVal =="") {
    amountVal= 1;
    amount.value=1;

  }
  //change the value of countryName in from Tab




  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  // api call for rate

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
 

  let finalAmount = amountVal*rate;
  finalAmount = finalAmount.toFixed(2);
  msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  console.log(msg);

  
});
