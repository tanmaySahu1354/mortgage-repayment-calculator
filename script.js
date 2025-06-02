// Get elements
const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");
const mortgageTypeInputs = document.getElementsByName("type");
const calculateBtn = document.querySelector(".calculate-btn");
const resultContent = document.querySelector(".result-content");
const clearLink = document.querySelector(".form-header a");

// Reset to default display
function resetResult() {
  resultContent.innerHTML = `
    <img src="./assets/illustration-empty.svg" class="result-img" alt="empty result" />
    <h2>Results shown here</h2>
    <p>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
  `;
}

// Display calculation result
function showResult(monthly, total) {
  resultContent.innerHTML = `
    <h2>Your monthly repayments</h2>
    <h1 style="color: hsl(61, 70%, 52%); margin-bottom: 1rem;">
      £${monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </h1>
    <p>Total you'll repay over the term</p>
    <h3 style="margin-top: 0.5rem;">
      £${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </h3>
  `;
}

// Calculate repayments
calculateBtn.addEventListener("click", () => {
  const principal = parseFloat(amountInput.value);
  const years = parseFloat(termInput.value);
  const annualRate = parseFloat(rateInput.value);
  const selected = [...mortgageTypeInputs].find(r => r.checked);
  const type = selected ? selected.value : null;

  if (
    isNaN(principal) || isNaN(years) || isNaN(annualRate) ||
    principal <= 0 || years <= 0 || annualRate < 0 || !type
  ) {
    resultContent.innerHTML = '<p style="color: red;">Please fill in all fields correctly.</p>';
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  let monthlyPayment, totalRepayment;

  if (type === "repayment") {
    monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else {
    monthlyPayment = principal * monthlyRate;
  }

  totalRepayment = monthlyPayment * totalPayments;

  showResult(monthlyPayment, totalRepayment);
});

// Handle Clear All
clearLink.addEventListener("click", (e) => {
  e.preventDefault();
  amountInput.value = "";
  termInput.value = "";
  rateInput.value = "";
  if (mortgageTypeInputs[0]) mortgageTypeInputs[0].checked = true;
  resetResult();
});
