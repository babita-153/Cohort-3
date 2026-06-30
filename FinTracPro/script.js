const resister = document.querySelector(".register");
const loginCard = document.querySelector(".login-card");
const login = document.querySelector(".login");
const resisterCard = document.querySelector(".Resister-card");
const loginForm = document.querySelector("#login-form");
const resisterForm = document.querySelector("#resister-form");
const loginAccount = document.querySelector(".account");
const AddBtn = document.querySelector(".add-btn");
const addtranForm = document.querySelector(".overlayForm");
const transectionForm = document.querySelector("#tran-Form");
const profile = document.querySelector(".profile");
const incomeCard = document.querySelector(".income");
const expenseCard = document.querySelector(".expense");
const balanceCard = document.querySelector(".balance");
const transactionCard = document.querySelector(".transaction");
const table = document.querySelector("tbody");
const settingBtn=document.querySelector(".setting")

//click resistered link funcionality
resister.addEventListener("click", (e) => {
  if (e.target.nodeName === "A") {
    loginCard.style.display = "none";
    resisterCard.style.display = "block";
  } else {
    console.log("no");
  }
});

//click login link functionality
login.addEventListener("click", (e) => {
  if (e.target.nodeName === "A") {
    resisterCard.style.display = "none";
    loginCard.style.display = "block";
  } else {
    console.log("no");
  }
});

//make resistersd user details array
const userData = JSON.parse(localStorage.getItem("userData")) || [];

//resister
resisterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName = e.target.name.value;
  let password = e.target.password.value;
  console.log(userName, password);
  resisterForm.reset();
  let user = {
    userName,
    password,
  };
  userData.push(user);
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("You are sucessfully resistered you are login now👉");
  resisterCard.style.display = "none";
  loginCard.style.display = "block";
});
console.log(userData);

//login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName = e.target.name.value;
  let password = e.target.password.value;
  let validUser = userData.find((elem) => {
    return elem.userName === userName && elem.password === password;
  });
  if (validUser) {
    console.log(validUser);
    localStorage.setItem("currentUser",userName);
    alert("yehhh you are login in your account🥳🥳");
    loginAccount.classList.add("overlay");
    loadDashboard();
  } else {
    alert("Invalid username and password!❌");
  }
});

// let currentUser = localStorage.getItem("currentUser");
//  const transactions =
//     JSON.parse(localStorage.getItem(`tansaction_${currentUser}`)) || [];
// loadDashboard()
//Define transaction array
// let currentUser = localStorage.getItem("currentUser");
// const transactions =
//   JSON.parse(localStorage.getItem(`tansaction_${currentUser}`)) || [];

//transaction form close
addtranForm.addEventListener("click", (e) => {
  if (e.target.className === "close") {
    addtranForm.style.display = "none";
  }
});

let currentUser = localStorage.getItem("currentUser");
const transactions =
  JSON.parse(localStorage.getItem(`tansaction_${currentUser}`)) || [];

//add new transaction detail
transectionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  let type = e.target[0].value;
  let description = e.target[1].value;
  let amount = e.target[2].value;
  let date = e.target[3].value;
  let category = e.target[4].value;
  console.log(type, description, amount, date, category);
  newTransaction = {
    type,
    description,
    amount,
    date,
    category,
  };
  let currentUser=localStorage.getItem("currentUser")
  transactions.push(newTransaction);
  localStorage.setItem(
    `tansaction_${currentUser}`,
    JSON.stringify(transactions),
  );

  loadDashboard();
  transectionForm.reset();
});

function loadDashboard() {
  let currentUser = localStorage.getItem("currentUser");
  const transaction = JSON.parse(
    localStorage.getItem(`tansaction_${currentUser}`),
  );
  let income = 0;
  let expense = 0;
  let totalTransaction = transaction.length;
  transaction.forEach((item) =>{
    if (item.type === "Income") {
      income += Number(item.amount);
    } else {
      expense += Number(item.amount);
    }

    let tr = createTable();
    tr.children[0].textContent = item.date;
    tr.children[1].textContent = item.category;
    tr.children[2].textContent = item.description;
    tr.children[3].textContent = item.amount;
   
  });
  let balance = (Number(income - expense));
  incomeCard.children[1].textContent = `$${income}`;
  expenseCard.children[1].textContent = `$${expense}`;
  balanceCard.children[1].textContent =`$${balance}`;
  transactionCard.children[1].textContent = `${totalTransaction}`;
  profile.children[0].textContent = `${currentUser}`;
}

function createTable(item) {
  let tr = document.createElement("tr");
  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  let th3 = document.createElement("th");
  let th4 = document.createElement("th");
  tr.append(th1, th2, th3, th4);
  table.appendChild(tr);
  return tr;
}
//click add button to show new transaction form
AddBtn.addEventListener("click", () => {
  console.log("task Add!");
  addtranForm.style.display = "flex";
});

//logout and darks theme functionality
profile.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.className === "logout") {
    loginAccount.classList.remove("overlay");
    localStorage.removeItem("currentUser");
  } else if (e.target.className === "theme") {
    loginAccount.classList.toggle("darkTheme");
  }
});


