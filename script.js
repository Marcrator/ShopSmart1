
// =============== ADMIN =================
const ADMIN_EMAIL = "admin@gmail.com"; // <-- MUST BE HERE, at the top


// =============== DATA ===============
let users = JSON.parse(localStorage.getItem("users")) || [];
let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let products = [
  { id: 1, name: "Laptop", price: 25000, image: "images/laptop.jpg" },
  { id: 2, name: "Shoe", price: 3500, image: "images/shoe.jpg" },
  { id: 3, name: "Book", price: 500, image: "images/book.jpg" },
  { id: 4, name: "Bag", price: 1599, image: "images/lbag.jpg" },
  { id: 5, name: "Watch", price: 5000, image: "images/watch.jpg" },
  { id: 6, name: "Smart Watch", price: 3000, image: "images/smartwatch.jpg" },
  { id: 7, name: "Monitor", price: 15000, image: "images/Monitor.jpg" },
  { id: 8, name: "Phone", price: 10000, image: "images/phone.jpg" },
  { id: 9, name: "Tablet", price: 15000, image: "images/tablet.jpg" },
  { id: 10, name: "Perfume", price: 149, image: "images/perfume.jpg" },
  { id: 11, name: "Pants", price: 800, image: "images/pants.jpg" },
  { id: 12, name: "Push up Board", price: 989, image: "images/bar.jpg" },
  { id: 13, name: "Phone Case", price: 138, image: "images/phonecase.jpg" },
  { id: 14, name: "Lamp", price: 600, image: "images/lamp.jpg" },
  { id: 15, name: "Earbuds", price: 1450, image: "images/earbuds.jpg" },
  { id: 16, name: "Sandals", price: 990, image: "images/sandals.jpg" },
  { id: 17, name: "Clog", price: 899, image: "images/clog.jpg" },
  { id: 18, name: "Mini Fan", price: 300, image: "images/fan.jpg" },
  { id: 19, name: "Phone Holder", price: 300, image: "images/holder.jpg" },
  { id: 20, name: "speaker", price: 300, image: "images/speaker.jpg" },
  { id: 21, name: "Cap", price: 200, image: "images/cap.jpg" },
  { id: 22, name: "Blet", price: 750, image: "images/belt.jpg" },
  { id: 23, name: "Collar", price: 140, image: "images/collar.jpg" },
  { id: 24, name: "Leash", price: 200, image: "images/leash.jpg" },
  { id: 25, name: "Electric Kettle", price: 860, image: "images/kettle.jpg" },
  { id: 26, name: "Blender", price: 1000, image: "images/blender.jpg" },
  { id: 27, name: "Mixer", price: 870, image: "images/mixer.jpg" },
  { id: 28, name: "SCHOOL BAG", price: 200, image: "images/bag.jpg" },
  { id: 29, name: "Polo", price: 280, image: "images/polo.jpg" },
  { id: 30, name: "Aquaflask", price: 1000, image: "images/tumbler.jpg" },
  { id: 31, name: "Racket", price: 1200, image: "images/rackets.jpg" },
  { id: 32, name: "Weight Scale", price: 300, image: "images/weight scale.jpg" },
  { id: 33, name: "Headset", price: 300, image: "images/headset.jpg" },
];
 localStorage.setItem("products", JSON.stringify(products));


let currentUser = null;
let cart = [];

const mainContent = document.getElementById("mainContent");

// =============== FUNCTIONS MUST BE GLOBAL ===============
window.login = login;
window.register = register;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.showShop = showShop;
window.showDashboard = showDashboard;
window.showOrders = showOrders;
window.logout = logout;
window.showAdmin = showAdmin;


// =============== HEADER UI (SHOPEE STYLE) ===============
function showHome() {
  mainContent.innerHTML = `
    <div style="display:flex;justify-content:center;align-items:center;height:calc(100vh - 70px);">
      <div class="login-card">
        <h2>Welcome to ShopSmart</h2>
        <p>Your online shopping solution.</p>
        <button onclick="showLogin()">Login</button>
        <button onclick="showRegister()">Register</button>
      </div>
    </div>
  `;
}

function updateHeaderUI() {
  const isLoggedIn = currentUser !== null;
  const isAdmin = currentUser && currentUser.email === ADMIN_EMAIL;

  const ids = [
    "loginBtn",
    "registerBtn",
    "shopBtn",
    "dashboardBtn",
    "ordersBtn",
    "logoutBtn",
    "adminBtn"
  ];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === "loginBtn" || id === "registerBtn") {
      el.style.display = isLoggedIn ? "none" : "inline-block";
    } else if (id === "adminBtn") {
      el.style.display = isAdmin ? "inline-block" : "none";
    } else {
      el.style.display = isLoggedIn ? "inline-block" : "none";
    }
  });
}
// =============== ADMIN ===============
function showAdmin() {
  if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
    return alert("Access denied");
  }

  mainContent.innerHTML = `
    <div class="card" style="max-width:500px;margin:auto;">
      <h2>Admin – Add Product</h2>

      <input id="prodName" placeholder="Product name">
      <input id="prodPrice" type="number" placeholder="Price">
      <input id="prodImage" placeholder="Image path (images/xxx.jpg)">

      <button onclick="addProduct()">Add Product</button>
    </div>
  `;
}
// =============== ADD PRODUCT ===============
  function addProduct() {
  const name = document.getElementById("prodName").value.trim();
  const price = document.getElementById("prodPrice").value;
  const image = document.getElementById("prodImage").value.trim();

  if (!name || !price || !image) {
    return alert("Fill all fields");
  }

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
    image
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product added successfully!");
  showShop();
}


// =============== LOGIN / REGISTER ===============

function showLogin() {
  if (currentUser) return alert("Already logged in. Logout first.");

  mainContent.innerHTML = `
    <div style="display:flex;justify-content:center;align-items:center;height:calc(100vh - 70px);">
      <div class="login-card">
        <h2>Login</h2>
        <input id="loginEmail" placeholder="Email">
        <input id="loginPass" type="password" placeholder="Password">
        <button type="button" onclick="login()">Login</button>
      </div>
    </div>
  `;
}

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (!email || !pass) return alert("Fill all fields");

  const user = users.find(u => u.email === email && u.password === pass);
  if (!user) return alert("Invalid credentials");

  currentUser = user;
  updateHeaderUI();
  showShop();
}

function showRegister() {
  if (currentUser) return alert("Logout first to register");

  mainContent.innerHTML = `
    <div style="display:flex;justify-content:center;align-items:center;height:calc(100vh - 70px);">
      <div class="login-card">
        <h2>Register</h2>
        <input id="regName" placeholder="Name">
        <input id="regEmail" placeholder="Email">
        <input id="regPass" type="password" placeholder="Password">
        <button type="button" onclick="register()">Register</button>
      </div>
    </div>
  `;
}

function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (!name || !email || !pass) return alert("Fill all fields");
  if (users.find(u => u.email === email)) return alert("Email already exists");

  users.push({ name, email, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully");
  showLogin();
}

// =============== LOGOUT ===============
function logout() {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (!confirmLogout) return;

  currentUser = null;
  cart = [];
  updateHeaderUI();
  showLogin();
}


// =============== SHOP ===============
function showShop() {
  if (!currentUser) return alert("Login first");

  mainContent.innerHTML = `
    <h2>Shop</h2>
    <input id="searchInput" placeholder="Search..." oninput="renderProducts()">
    <div id="productList" style="display:flex;flex-wrap:wrap;gap:15px;justify-content:center;"></div>
  `;
  renderProducts();
}

function renderProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const isAdmin = currentUser && currentUser.email === ADMIN_EMAIL;

  products
    .filter(p => p.name.toLowerCase().includes(search))
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <div class="price">₱${p.price.toLocaleString()}</div>
        <div class="actions"></div>
      `;

      const actions = div.querySelector(".actions");

      if (isAdmin) {
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editProduct(p.id);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => deleteProduct(p.id);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
      } else {
        const cartBtn = document.createElement("button");
        cartBtn.textContent = "Add to Cart";
        cartBtn.className = "cart-btn";
        cartBtn.onclick = () => addToCart(p.id);

        actions.appendChild(cartBtn);
      }

      list.appendChild(div);
    });
}




function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const newName = prompt("Edit product name:", product.name);
  if (newName === null) return;

  const newPrice = prompt("Edit product price:", product.price);
  if (newPrice === null) return;

  const newImage = prompt("Edit image path:", product.image);
  if (newImage === null) return;

  product.name = newName.trim();
  product.price = Number(newPrice);
  product.image = newImage.trim();

  localStorage.setItem("products", JSON.stringify(products));
  alert("Product updated!");
  renderProducts();
}
function deleteProduct(id) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product deleted!");
  renderProducts();
}



// =============== CART ===============
function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  alert("Added to cart");
}

function showDashboard() {
  if (!currentUser) return alert("Login first");

  let total = 0;
  let html = `<div class="card" style="max-width:500px;margin:auto;"><h2>Your Cart</h2>`;

  if (cart.length === 0) html += "<p>Cart is empty</p>";

  cart.forEach((p, i) => {
    total += p.price;
    html += `
      <div style="display:flex;gap:10px;align-items:center;">
        <img src="${p.image}" style="width:80px;height:80px;object-fit:cover;">
        <div style="flex:1">
          <strong>${p.name}</strong>
          <p>₱${p.price}</p>
        </div>
        <button onclick="removeFromCart(${i})">Remove</button>
      </div>
    `;
  });

  html += `<hr><h3>Total: ₱${total}</h3>
           <button onclick="checkout()">Checkout</button></div>`;

  mainContent.innerHTML = html;
}

function removeFromCart(i) {
  cart.splice(i, 1);
  showDashboard();
}

// =============== REVIEWS ===============
function addReview(id) {
  const text = document.getElementById(`reviewText-${id}`).value;
  if (!text) return;

  if (!reviews[id]) reviews[id] = [];
  reviews[id].push({ user: currentUser.name, text });

  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderProducts();
}

// =============== CHECKOUT ===============
function checkout() {
  if (cart.length === 0) return alert("Cart empty");

  mainContent.innerHTML = `
    <div class="card" style="max-width:500px;margin:auto;text-align:center;">
      <h2>Processing your order...</h2>
      <div class="loader"></div>
    </div>
  `;

  setTimeout(() => {
    orders.push({ user: currentUser.email, status: "Preparing" });
    localStorage.setItem("orders", JSON.stringify(orders));
    cart = [];

    mainContent.innerHTML = `
      <div class="card" style="max-width:500px;margin:auto;text-align:center;">
        <h2>✅ Order Placed!</h2>
        <button onclick="showShop()">Continue Shopping</button>
        <button onclick="showOrders()">View Orders</button>
      </div>
    `;
  }, 1500);
}

// =============== ORDERS ===============
function showOrders() {
  if (!currentUser) return alert("Login first");

  const myOrders = orders.filter(o => o.user === currentUser.email);
  let html = `<div class="card" style="max-width:500px;margin:auto;"><h2>My Orders</h2>`;

  if (myOrders.length === 0) html += "<p>No orders yet</p>";

  myOrders.forEach((o, i) => {
    html += `<p>Order #${i + 1} — <b>${o.status}</b></p>`;
  });

  html += `<button onclick="showShop()">Back</button></div>`;
  mainContent.innerHTML = html;
}

// =============== INIT ===============
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginBtn")?.addEventListener("click", showLogin);
  document.getElementById("registerBtn")?.addEventListener("click", showRegister);
  document.getElementById("shopBtn")?.addEventListener("click", showShop);
  document.getElementById("dashboardBtn")?.addEventListener("click", showDashboard);
  document.getElementById("ordersBtn")?.addEventListener("click", showOrders);
  document.getElementById("logoutBtn")?.addEventListener("click", logout);
  document.getElementById("adminBtn")?.addEventListener("click", showAdmin);



 updateHeaderUI();

// Show home if not logged in, else show shop
if (currentUser) {
  showShop();
} else {
  showHome();
}
});






























