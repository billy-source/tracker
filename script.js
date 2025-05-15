const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');


let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


function saveToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}


function addTransaction(e) {
  e.preventDefault();
  alert('Transaction added successfully!');
  const description = descriptionInput.value.trim();
  if (description === '') {
      alert('Please enter a description.');
      return;
  }
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (description === '' || isNaN(amount) || amount <= 0) {
      alert('Please enter a description and amount.');
        return;
    }

    const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

    transactions.push(transaction);
    saveToLocalStorage();
    renderTransactions();
    form.reset();
    updateSummary();
  }



function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveToLocalStorage();
  renderTransactions();
  alert('Transaction deleted successfully!');
  updateSummary();
}

function renderTransactions() {
    
  transactionList.innerHTML = '';

  transactions.forEach(t => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="px-4 py-2">${t.description}</td>
      <td class="px-4 py-2">${t.type}</td>
      <td class="px-4 py-2">${t.amount.toFixed(2)}</td>
      <td class="px-4 py-2">
        <button onclick="deleteTransaction(${t.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </td>
    `;
    

    transactionList.appendChild(row);
  });
}

function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === 'income') {
      income += t.amount;
    } else if (t.type === 'expense') {
      expense += t.amount;
    }
  });

  const balance = income - expense;

  totalIncomeEl.textContent = income.toFixed(2);
  totalExpenseEl.textContent = expense.toFixed(2);
  balanceEl.textContent = balance.toFixed(2);
}

form.addEventListener('submit', addTransaction);

renderTransactions();
updateSummary();

