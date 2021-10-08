window.onload = function() {
  if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
  }
}

const form = document.forms["ticket-form"];
let [from, to, dep, ret, priceSubtotal, priceVat, priceTotal, vipInput, firstInput, ecoInput] = [
  form.querySelector("#from"),
  form.querySelector("#to"),
  form.querySelector("#departure"),
  form.querySelector("#return"),
  form.querySelector("#subtotal"),
  form.querySelector("#vat"),
  form.querySelector("#total"),
  form.querySelector("#vip-ticket"),
  form.querySelector("#first-class-ticket"),
  form.querySelector("#economy-ticket"),
];

// Increase ticket
const increaseValue = (selector) => {
  var value = parseInt(document.getElementById(selector).value);
  value++;
  // console.log(value);
  switch (selector) {
    case "vip-ticket":
      subtotal += 7000;
      vipSeat++;
      priceUpdate();
      break;
    case "first-class-ticket":
      subtotal += 1500;
      firstSeat++;
      priceUpdate();
      break;
    case "economy-ticket":
      subtotal += 1000;
      ecoSeat++;
      priceUpdate();
      break;
    default:
      break;
  }
  document.getElementById(selector).value = value;
};

// Decrease ticket
const decreaseValue = (selector) => {
  var value = parseInt(document.getElementById(selector).value);
  if (value > 0) {
    value--;
  }
  switch (selector) {
    case "vip-ticket":
      if (vipSeat == 0) break;
      subtotal -= 7000;
      vipSeat--;
      priceUpdate();
      break;
    case "first-class-ticket":
      if (firstSeat == 0) break;
      subtotal -= 1500;
      firstSeat--;
      priceUpdate();
      break;
    case "economy-ticket":
      if (ecoSeat == 0) break;
      subtotal -= 1000;
      ecoSeat--;
      priceUpdate();
      break;
    default:
      break;
  }
  document.getElementById(selector).value = value;
};

// Time Validation
const validTime = (dateOne, dateTwo) => {
  let now = new Date();
  valueNow =  now.getFullYear() + now.getMonth() + now.getDate();
  valueDateOne = dateOne.getFullYear() + dateOne.getMonth() + dateOne.getDate();
  valueDateTwo = dateTwo.getFullYear() + dateTwo.getMonth() + dateTwo.getDate();
  return (valueDateOne >= valueNow && valueDateTwo >= valueNow);
}
// Live price update 
const priceUpdate = () => {
  let subtotal = vipSeat*7000 + firstSeat*1500 + ecoSeat*1000;
  priceSubtotal.innerText = `$${subtotal}`;
  priceVat.innerText = `$${subtotal / 10}`;
  priceTotal.innerText = `$${subtotal + subtotal / 10}`;
  // Store total price of all tickets
  info[4] = ([subtotal + subtotal / 10]);
}

let info = [undefined,undefined,undefined,undefined,undefined];
let [vipSeat, firstSeat, ecoSeat] = [0, 0, 0];

vipInput.addEventListener('change', (e) => {
  if (isNaN(parseInt(e.target.value))) e.target.value = 0;
  vipSeat = parseInt(e.target.value);
  priceUpdate();
});
firstInput.addEventListener('change', (e) => {
  if (isNaN(parseInt(e.target.value))) e.target.value = 0;
  firstSeat = parseInt(e.target.value);
  priceUpdate();
});
ecoInput.addEventListener('change', (e) => {
  if (isNaN(parseInt(e.target.value))) e.target.value = 0;
  ecoSeat = parseInt(e.target.value);
  priceUpdate();
});

// FORM EVENT LISTENER
form.addEventListener("submit", (e) => {
  
  let validationFail = false;

  //DESTINATON
  if (from.value == "From" || to.value == "To") {
    alert("Invalid destination!");
    validationFail = true;
  } else if (from.value === to.value) { 
    alert("Destinations cannot be the same!");
    validationFail = true;
  }else {
    // Store destination info
    info[0]=([from.options[from.selectedIndex].text, to.options[to.selectedIndex].text]);
  }

  //TIME
  const depDate = new Date(dep.value);
  const retDate = new Date(ret.value);
  if (retDate.getTime() < depDate.getTime() || !validTime(depDate,retDate)) {
    alert("Invalid Date");
    validationFail = true;
  } else {
    depVal =
      dep.value /*[depDate.getDate(), depDate.getMonth(), depDate.getFullYear()]*/;
    retVal =
      ret.value /*[retDate.getDate(), retDate.getMonth(), retDate.getFullYear()]*/;
    // Store time info
    info[1]=([depVal, retVal]);
  }

  //UPDATE INFO

  // THOSE CAN BE UPDATE UNTIL CLICKING BOOK NOW BUTTON AS THOSE ARE OUTSIDE OF EVENT LISTENER
  // Store seat amount
  info[2] = ([vipSeat, firstSeat, ecoSeat]);
  // Store total price of each ticket
  info[3] = ([vipSeat * 7000, firstSeat * 1500, ecoSeat * 1000]);

  if (info[2].reduce((a,b) => a+ b) == 0){
    alert("No tickets added");
    validationFail = true;
  }
  
  if (validationFail) {
    e.preventDefault();
    validationFail = false;
  }

  localStorage.setItem("from", info[0][0]);
  localStorage.setItem("to", info[0][1]);
  localStorage.setItem("dep", info[1][0]);
  localStorage.setItem("ret", info[1][1]);
  localStorage.setItem("vipSeat", info[2][0]);
  localStorage.setItem("firstSeat", info[2][1]);
  localStorage.setItem("ecoSeat", info[2][2]);
  localStorage.setItem("vipPrice", info[3][0]);
  localStorage.setItem("firstPrice", info[3][1]);
  localStorage.setItem("ecoPrice", info[3][2]);
  localStorage.setItem("totalPrice", info[4][0]);

});


