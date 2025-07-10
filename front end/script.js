const form = document.getElementById('transaction-form');
const tableBody = document.querySelector('#transaction-table tbody');

const API_URL = 'http://127.0.0.1:5000/transactions';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  const newTransaction = {
    title,
    amount,
    type
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTransaction)
  });

  const data = await res.json();
  form.reset();
  loadTransactions(); // Reload data
});

// Fungsi untuk menampilkan transaksi
async function loadTransactions() {
  const res = await fetch(API_URL);
  const transactions = await res.json();

  tableBody.innerHTML = ''; 

  transactions.forEach((trx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${trx.title}</td>
      <td>Rp ${trx.amount.toLocaleString()}</td>
      <td>${trx.type}</td>
      <td>${new Date(trx.date).toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Muat data saat pertama kali dibuka
loadTransactions();
