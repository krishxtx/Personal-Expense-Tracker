const STORAGE_KEY = 'fintrack_transactions_v1';
const BUDGET_KEY = 'fintrack_budget_v1';

const defaultTransactions = [
  { id: 101, title: 'Monthly Family Allowance', amount: 18000, type: 'income', category: 'Salary / Allowance', date: '2026-11-01' },
  { id: 102, title: 'Freelance Web Design Task', amount: 4500, type: 'income', category: 'Freelance / Bonus', date: '2026-11-05' },
  { id: 103, title: 'Hostel & Mess Rent', amount: 6500, type: 'expense', category: 'Rent & Utilities', date: '2026-11-03' },
  { id: 104, title: 'CSE Textbooks & Lab Manual', amount: 1450, type: 'expense', category: 'Education & Books', date: '2026-11-07' },
  { id: 105, title: 'Groceries & Cafeteria Meals', amount: 2200, type: 'expense', category: 'Food & Dining', date: '2026-11-10' },
  { id: 106, title: 'Gwalior Campus Bus Pass', amount: 850, type: 'expense', category: 'Transport', date: '2026-11-12' },
  { id: 107, title: 'Movie & Weekend Outing', amount: 750, type: 'expense', category: 'Entertainment', date: '2026-11-15' },
  { id: 108, title: 'Winter Jacket Purchase', amount: 1900, type: 'expense', category: 'Shopping', date: '2026-11-18' }
];

let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [...defaultTransactions];
let monthlyBudget = Number(localStorage.getItem(BUDGET_KEY)) || 15000;

const form = document.getElementById('transactionForm');
const tableBody = document.getElementById('transactionTableBody');
const filterType = document.getElementById('filterType');
const filterCategory = document.getElementById('filterCategory');
const searchInput = document.getElementById('searchInput');
const budgetInput = document.getElementById('budgetLimitInput');

document.getElementById('date').valueAsDate = new Date();
budgetInput.value = monthlyBudget;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  localStorage.setItem(BUDGET_KEY, String(monthlyBudget));
}

function formatINR(num) {
  return '₹' + Number(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Functionality 1: Form Validation
function validateForm(title, amount, date) {
  let isValid = true;
  document.getElementById('titleError').textContent = '';
  document.getElementById('amountError').textContent = '';
  document.getElementById('dateError').textContent = '';

  if (!title || title.trim().length < 3) {
    document.getElementById('titleError').textContent = 'Enter a description (at least 3 characters).';
    isValid = false;
  }
  if (isNaN(amount) || amount <= 0) {
    document.getElementById('amountError').textContent = 'Amount must be greater than ₹0.';
    isValid = false;
  }
  if (!date) {
    document.getElementById('dateError').textContent = 'Please select a valid date.';
    isValid = false;
  }
  return isValid;
}

// Functionality 2: Add Transaction
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  if (!validateForm(title, amount, date)) return;

  transactions.unshift({ id: Date.now(), title, amount, type, category, date });
  saveState();
  form.reset();
  document.getElementById('date').valueAsDate = new Date();
  renderAll();
});

// Functionality 3: Delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveState();
  renderAll();
}

// Functionality 4: Real-Time Summary & Budget Progress Calculation
function updateSummary() {
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;
  const savingsRate = income > 0 ? Math.max(0, ((balance / income) * 100)).toFixed(1) : 0;

  document.getElementById('totalIncome').textContent = formatINR(income);
  document.getElementById('totalExpense').textContent = formatINR(expense);
  document.getElementById('netBalance').textContent = formatINR(balance);
  document.getElementById('savingsRate').textContent = `Savings Rate: ${savingsRate}%`;

  const pct = monthlyBudget > 0 ? Math.min(100, (expense / monthlyBudget) * 100) : 0;
  const bar = document.getElementById('budgetProgressBar');
  bar.style.width = `${pct.toFixed(1)}%`;
  bar.style.background = pct >= 100 ? '#dc2626' : pct >= 80 ? '#f59e0b' : '#059669';

  document.getElementById('budgetUsedText').textContent = `Used: ${formatINR(expense)} / ${formatINR(monthlyBudget)}`;
  document.getElementById('budgetPercentText').textContent = `${pct.toFixed(1)}%`;
  document.getElementById('budgetAlert').textContent =
    expense > monthlyBudget ? 'Alert: Over Monthly Budget!' : 'Budget Status: Within Limit';
}

// Functionality 5: Category Breakdown Visualization
function renderCategoryBreakdown() {
  const container = document.getElementById('categoryBreakdown');
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExp = expenses.reduce((s, t) => s + t.amount, 0);

  if (totalExp === 0) {
    container.innerHTML = '<p class="muted">No expenses recorded yet.</p>';
    return;
  }

  const map = {};
  expenses.forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });

  container.innerHTML = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amt]) => {
      const share = ((amt / totalExp) * 100).toFixed(1);
      return `
        <div>
          <div class="cat-item-head"><span>${cat}</span><span>${formatINR(amt)} (${share}%)</span></div>
          <div class="cat-bar-bg"><div class="cat-bar-fill" style="width:${share}%"></div></div>
        </div>`;
    }).join('');
}

// Functionality 6: Search & Multi-Criteria Filtering
function renderTable() {
  const typeVal = filterType.value;
  const catVal = filterCategory.value;
  const query = searchInput.value.trim().toLowerCase();

  const filtered = transactions.filter(t => {
    const matchType = typeVal === 'all' || t.type === typeVal;
    const matchCat = catVal === 'all' || t.category === catVal;
    const matchText = t.title.toLowerCase().includes(query) || t.category.toLowerCase().includes(query);
    return matchType && matchCat && matchText;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#64748b;">No matching transactions found.</td></tr>';
    return;
  }

  tableBody.innerHTML = filtered.map(t => `
    <tr>
      <td>${t.date}</td>
      <td><strong>${t.title}</strong></td>
      <td>${t.category}</td>
      <td><span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">${t.type}</span></td>
      <td style="font-weight:700;color:${t.type === 'income' ? '#059669' : '#dc2626'}">
        ${t.type === 'income' ? '+' : '-'}${formatINR(t.amount)}
      </td>
      <td><button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button></td>
    </tr>
  `).join('');
}

// Functionality 7: Export CSV Report
document.getElementById('exportCsvBtn').addEventListener('click', () => {
  const headers = ['ID,Date,Description,Category,Type,Amount'];
  const rows = transactions.map(t => `${t.id},${t.date},"${t.title.replace(/"/g, '""')}",${t.category},${t.type},${t.amount}`);
  const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Personal_Expense_Report.csv';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('setBudgetBtn').addEventListener('click', () => {
  const val = parseFloat(budgetInput.value);
  if (val >= 500) {
    monthlyBudget = val;
    saveState();
    updateSummary();
  }
});

document.getElementById('resetDemoBtn').addEventListener('click', () => {
  transactions = [...defaultTransactions];
  saveState();
  renderAll();
});

[filterType, filterCategory].forEach(el => el.addEventListener('change', renderTable));
searchInput.addEventListener('input', renderTable);

function renderAll() {
  updateSummary();
  renderCategoryBreakdown();
  renderTable();
}

renderAll();
