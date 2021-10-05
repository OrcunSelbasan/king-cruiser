const form = document.forms["ticket-form"];
let [from, to, dep, ret, priceSubtotal, priceVat, priceTotal] = [
  form.querySelector("#from"),
  form.querySelector("#to"),
  form.querySelector("#departure"),
  form.querySelector("#return"),
  form.querySelector("#subtotal"),
  form.querySelector("#vat"),
  form.querySelector("#total"),
];

let info = [];

// FORM EVENT LISTENER
form.addEventListener("submit", (e) => {

  //DESTINATON
  if (from.value == "From" || to.value == "To") {
    alert("Invalid destination!");
  } else if (from.value === to.value) { 
    alert("Destinations cannot be the same!");
  }else {
    // Store destination info
    info.push([from.options[from.selectedIndex].text, to.options[to.selectedIndex].text]);
  }

  //TIME
  const depDate = new Date(dep.value);
  const retDate = new Date(ret.value);
  if (retDate.getTime() < depDate.getTime()) {
    alert("Invalid Date");
  } else {
    depVal =
      dep.value /*[depDate.getDate(), depDate.getMonth(), depDate.getFullYear()]*/;
    retVal =
      ret.value /*[retDate.getDate(), retDate.getMonth(), retDate.getFullYear()]*/;
    // Store time info
    info.push([depVal, retVal]);
  }

  //UPDATE INFO

  // THOSE CAN BE UPDATE UNTIL CLICKING BOOK NOW BUTTON AS THOSE ARE OUTSIDE OF EVENT LISTENER
  // Store seat amount
  info.push([vipSeat, firstSeat, ecoSeat]);
  // Store total price of each ticket
  info.push([vipSeat * 7000, firstSeat * 1500, ecoSeat * 1000]);
  // Store total price of all tickets
  info.push([subtotal + subtotal / 10]);


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

let subtotal = 0;
let [vipSeat, firstSeat, ecoSeat] = [0, 0, 0];

// Live price update 
const priceUpdate = () => {
  priceSubtotal.innerText = `$${subtotal}`;
  priceVat.innerText = `$${subtotal / 10}`;
  priceTotal.innerText = `$${subtotal + subtotal / 10}`;
}

// INCREASE TICKET
const increaseValue = (selector) => {
  var value = parseInt(document.getElementById(selector).value);
  value++;
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

//DECREASE TICKET
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


// console.log(localStorage.getItem("items"));
// document.querySelector(".ticket-no").innerText = [...Array(9).keys()]
//   .map((x) => x * 0 + Math.floor(Math.random() * 10))
//   .join("");
// document.querySelector(".from").innerHTML = 
// document.querySelector(".to").innerHTML = 
// document.querySelector(".departure").innerHTML = 
// document.querySelector(".return").innerHTML = 
// document.querySelector(".vip-seat").innerHTML = 
// document.querySelector(".first-seat").innerHTML = 
// document.querySelector(".eco-seat").innerHTML = 
// document.querySelector(".vip-price").innerHTML = 
// document.querySelector(".first-price").innerHTML = 
// document.querySelector(".eco-price").innerHTML = 
// document.querySelector(".total").innerHTML = 

