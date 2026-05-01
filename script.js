lucide.createIcons();

const totalBillInput = document.getElementById("totalBill");
const dynamicContent = document.getElementById("dynamicContent");
const splitByDisplay = document.getElementById("splitByDisplay");
const tipAmountDisplay = document.getElementById("tipAmountDisplay");
const tipPercentageDisplay = document.getElementById("tipPercentageDisplay");
const totalPerPersonDisplay = document.getElementById("totalPerPersonDisplay");
const tipSlider = document.getElementById("tipSlider");
const btnPlus = document.getElementById("btnPlus");
const btnMinus = document.getElementById("btnMinus");
const btnClear = document.getElementById("btnClear");

let splitBy = 1;
let tipPercentage = 0;

function calculateTotalTip(totalBill, tipPercentage) {
  if (totalBill > 1) {
    return (totalBill * tipPercentage) / 100;
  }
  return 0.0;
}

function calculateTotalPerPerson(totalBill, splitBy, tipPercentage) {
  const tip = calculateTotalTip(totalBill, tipPercentage);
  const bill = tip + totalBill;
  return splitBy > 0 ? bill / splitBy : 0.0;
}

function updateUI() {
  const totalBill = parseFloat(totalBillInput.value) || 0;

  if (totalBill > 0) {
    dynamicContent.classList.remove("hidden");
  } else {
    dynamicContent.classList.add("hidden");
  }

  const tipAmount = calculateTotalTip(totalBill, tipPercentage);
  const totalPerPerson = calculateTotalPerPerson(
    totalBill,
    splitBy,
    tipPercentage,
  );

  splitByDisplay.textContent = splitBy;
  tipPercentageDisplay.textContent = `${tipPercentage}%`;
  tipAmountDisplay.textContent = `$ ${tipAmount.toFixed(2)}`;
  totalPerPersonDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

totalBillInput.addEventListener("input", updateUI);

tipSlider.addEventListener("input", (e) => {
  tipPercentage = parseInt(e.target.value);
  updateUI();
});

btnPlus.addEventListener("click", () => {
  if (splitBy < 100) splitBy++;
  updateUI();
});

btnMinus.addEventListener("click", () => {
  if (splitBy > 1) splitBy--;
  updateUI();
});

btnClear.addEventListener("click", () => {
  totalBillInput.value = "";
  splitBy = 1;
  tipPercentage = 0;
  tipSlider.value = 0;
  updateUI();
});
