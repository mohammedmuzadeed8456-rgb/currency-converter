const amountEl = document.getElementById('amount');
const fromEl = document.getElementById('fromCurrency');
const toEl = document.getElementById('toCurrency');
const resultEl = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

const CURRENCY_API = "https://api.exchangerate-api.com/v4/latest/USD";

let rates = {};

// Fetch currency list and rates
async function fetchCurrencies() {
  try {
    const res = await fetch(CURRENCY_API);
    const data = await res.json();
    rates = data.rates;

    const currencyList = Object.keys(rates);

    currencyList.forEach(currency => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');

      option1.value = option2.value = currency;
      option1.text = option2.text = currency;

      fromEl.appendChild(option1);
      toEl.appendChild(option2);
    });

    fromEl.value = "USD";
    toEl.value = "INR";

  } catch (err) {
    resultEl.textContent = "Failed to fetch currency data.";
    console.error(err);
  }
}

convertBtn.addEventListener('click', () => {
  const amount = parseFloat(amountEl.value);
  const from = fromEl.value;
  const to = toEl.value;

  if (isNaN(amount)) {
    resultEl.textContent = "Please enter a valid amount.";
    return;
  }

  const converted = (amount / rates[from]) * rates[to];
  resultEl.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
});

fetchCurrencies();
