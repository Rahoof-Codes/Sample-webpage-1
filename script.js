// Sample Products
const products = [
  // Men
  {id:1, category:"Men", name:"Men's Casual Shirt", material:"Cotton", sizes:["S","M","L","XL","XXL"], price:1200, artNumber:"M101", image:"images/men1.jpg"},
  {id:2, category:"Men", name:"Men's Jeans", material:"Denim", sizes:["S","M","L","XL","XXL"], price:1500, artNumber:"M102", image:"images/men2.jpg"},
  {id:3, category:"Men", name:"Men's Jacket", material:"Leather", sizes:["S","M","L","XL","XXL"], price:3000, artNumber:"M103", image:"images/men3.jpg"},
  // Women
  {id:4, category:"Women", name:"Women's Dress", material:"Silk", sizes:["S","M","L","XL","XXL"], price:1800, artNumber:"W101", image:"images/women1.jpg"},
  {id:5, category:"Women", name:"Women's Top", material:"Cotton", sizes:["S","M","L","XL","XXL"], price:900, artNumber:"W102", image:"images/women2.jpg"},
  {id:6, category:"Women", name:"Women's Skirt", material:"Denim", sizes:["S","M","L","XL","XXL"], price:1200, artNumber:"W103", image:"images/women3.jpg"},
  // Kids
  {id:7, category:"Kids", name:"Kids T-Shirt", material:"Cotton", sizes:["S","M","L","XL"], price:500, artNumber:"K101", image:"images/kids1.jpg"},
  {id:8, category:"Kids", name:"Kids Shorts", material:"Cotton", sizes:["S","M","L","XL"], price:600, artNumber:"K102", image:"images/kids2.jpg"},
  {id:9, category:"Kids", name:"Kids Jacket", material:"Polyester", sizes:["S","M","L","XL"], price:1200, artNumber:"K103", image:"images/kids3.jpg"}
];

// -------- Render Products on Index Page --------
function renderProducts(filtered = products) {
  const container = document.getElementById("product-container");
  if (!container) return; // Skip if on product page

  container.innerHTML = "";

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Create size options
    const sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join("");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Material: ${product.material}</p>
        <p>Price: ₹${product.price}</p>
        <label for="size-${product.id}">Size:</label>
        <select id="size-${product.id}">
          ${sizeOptions}
        </select>
        <div class="buttons">
          <button class="wishlist-btn" onclick="addToWishlist(${product.id})">Wishlist</button>
          <button class="whatsapp-btn" onclick="whatsappOrder(${product.id})">Order</button>
          <button onclick="viewProduct(${product.id})">View</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// -------- Filter Category --------
function filterCategory(category) {
  if(category === "all") renderProducts();
  else renderProducts(products.filter(p => p.category === category));
}

// -------- Wishlist --------
function addToWishlist(id) {
  const sizeSelect = document.getElementById(`size-${id}`);
  const selectedSize = sizeSelect ? sizeSelect.value : "S";

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Check if already exists
  const exists = wishlist.some(item => item.id === id && item.size === selectedSize);
  if(!exists) {
    wishlist.push({id: id, size: selectedSize});
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist!");
  } else {
    alert("Already in wishlist");
  }
}

// -------- WhatsApp Order (Index Page) --------
function whatsappOrder(id) {
  const product = products.find(p => p.id === id);
  const sizeSelect = document.getElementById(`size-${id}`);
  const selectedSize = sizeSelect ? sizeSelect.value : "S";

  const message = `Hello,%0AI'm interested in ordering:%0A- Product: ${product.name}%0A- Material: ${product.material}%0A- Price: ₹${product.price}%0A- Size: ${selectedSize}%0A- Art Number: ${product.artNumber}%0A- Image: ${product.image}`;
  window.open(`https://wa.me/919361034037?text=${message}`, "_blank");
}

// -------- View Product Page --------
function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

// -------- Render Product Page --------
function renderProductPage() {
  const page = document.getElementById("product-page");
  if(!page) return;

  const id = localStorage.getItem("selectedProduct");
  const product = products.find(p => p.id == id);
  if(!product) return;

  const sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join("");

  page.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>Material: ${product.material}</p>
    <p>Price: ₹${product.price}</p>
    <label for="size-page-${product.id}">Size:</label>
    <select id="size-page-${product.id}">
      ${sizeOptions}
    </select>
    <p>Art Number: ${product.artNumber}</p>
    <button class="wishlist-btn" onclick="addToWishlistPage(${product.id})">Add to Wishlist</button>
    <button class="whatsapp-btn" onclick="whatsappOrderPage(${product.id})">Order on WhatsApp</button>
    <br><br>
    <button onclick="window.history.back()">Back</button>
  `;
}

// -------- Wishlist for Product Page --------
function addToWishlistPage(id) {
  const sizeSelect = document.getElementById(`size-page-${id}`);
  const selectedSize = sizeSelect ? sizeSelect.value : "S";

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.some(item => item.id === id && item.size === selectedSize);
  if(!exists) {
    wishlist.push({id: id, size: selectedSize});
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist!");
  } else {
    alert("Already in wishlist");
  }
}

// -------- WhatsApp for Product Page --------
function whatsappOrderPage(id) {
  const product = products.find(p => p.id == id);
  const sizeSelect = document.getElementById(`size-page-${id}`);
  const selectedSize = sizeSelect ? sizeSelect.value : "S";

  const message = `Hello,%0AI'm interested in ordering:%0A- Product: ${product.name}%0A- Material: ${product.material}%0A- Price: ₹${product.price}%0A- Size: ${selectedSize}%0A- Art Number: ${product.artNumber}%0A- Image: ${product.image}`;
  window.open(`https://wa.me/919361034037?text=${message}`, "_blank");
}

// -------- Initialize --------
renderProducts();
renderProductPage();