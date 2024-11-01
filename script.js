
    // Retrieve balance and transactions from localStorage or set defaults

    let balance = parseFloat(localStorage.getItem("balance")) || 0;
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const balanceDisplay = document.getElementById("balance");
    const addMoneyBtn = document.getElementById("add-money-btn");
    const withdrawMoneyBtn = document.getElementById("withdraw-money-btn");
    const transactionHistoryBtn = document.getElementById("transaction-history-btn");
    const transactionModal = document.getElementById("transaction-modal");
    const transactionList = document.getElementById("transaction-list");
    const closeTransactionModal = document.getElementById("close-transaction-modal");

    function updateBalanceDisplay() {
        balanceDisplay.textContent = balance.toFixed(2);
    }

    function addTransaction(type, amount) {
        const date = new Date().toLocaleString();
        transactions.push({ date, type, amount });
        updateTransactionHistory();
        saveToLocalStorage();
    }

    function updateTransactionHistory() {
        transactionList.innerHTML = "";
        transactions.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="py-2">${transaction.date}</td>
                <td class="py-2">${transaction.type}</td>
                <td class="py-2">${transaction.amount.toFixed(2)}</td>
            `;
            transactionList.appendChild(row);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem("balance", balance);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function addMoney() {
        const amount = parseFloat(prompt("Enter amount to add:"));
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }
        balance += amount;
        updateBalanceDisplay();
        addTransaction("Add", amount);
    }

    function withdrawMoney() {
        const amount = parseFloat(prompt("Enter amount to withdraw:"));
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }
        if (amount > balance) {
            alert("Insufficient balance.");
            return;
        }
        balance -= amount;
        updateBalanceDisplay();
        addTransaction("Withdraw", amount);
    }

    addMoneyBtn.addEventListener("click", addMoney);
    withdrawMoneyBtn.addEventListener("click", withdrawMoney);
    transactionHistoryBtn.addEventListener("click", () => {
        transactionModal.classList.remove("hidden");
    });
    closeTransactionModal.addEventListener("click", () => {
        transactionModal.classList.add("hidden");
    });

    // Initialize balance and transaction history on page load
    updateBalanceDisplay();
    updateTransactionHistory();


    add.addEventListener ("beforeunload", (e) => {
        e.preventDefault();
        e.returnValue = "";
    })
