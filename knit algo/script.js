// Products data
const products = [
  { id:1, name:'Custom Mini-Me Doll Keychain', cat:'dolls', price:'Rs. 1,800', emoji:'🧸', bg:'#C9B8FF', tag:'New' },
  { id:8, name:'Anime Character Doll Charm', cat:'dolls', price:'Rs. 1,600', emoji:'🗡️', bg:'#FFD93D', tag:'Popular' },
  { id:2, name:'Beaded Anime Phone Charm', cat:'charms', price:'Rs. 650', emoji:'🔮', bg:'#FF4D8D', tag:'' },
  { id:3, name:'Kpop Photocard Bag Charm', cat:'charms', price:'Rs. 700', emoji:'🎤', bg:'#C9B8FF', tag:'New' },
  { id:4, name:'Snackcore Charm Bundle', cat:'charms', price:'Rs. 950', emoji:'🍙', bg:'#FFD93D', tag:'' },
  { id:5, name:'Sticker Bookmark Set', cat:'accessories', price:'Rs. 500', emoji:'🔖', bg:'#FF4D8D', tag:'Popular' },
  { id:6, name:'Charm Watch Bracelet', cat:'accessories', price:'Rs. 1,200', emoji:'⌚', bg:'#C9B8FF', tag:'' },
  { id:7, name:'Decoden Phone Case', cat:'accessories', price:'Rs. 1,400', emoji:'📱', bg:'#FFD93D', tag:'' },
];

let cartCount = 0;
let activeFilter = 'all';

function renderProducts(filter) {
  const grid = document.getElementById('product-grid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img" style="background:${p.bg};">${p.emoji}
        ${p.tag ? `<div class="product-tag ${p.tag === 'New' ? 'new' : ''}">${p.tag}</div>` : ''}
      </div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <span class="product-price">${p.price}</span>
          <button class="add-btn" onclick="addToCart(event, '${p.name}')">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(e, name) {
  e.stopPropagation();
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  showToast(`"${name}" added to cart ✓`);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// Filter tabs
document.querySelectorAll('.filter-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts(activeFilter);
  });
});

// Sticky nav shrink
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// Marquee duplicate for seamless loop
const track = document.getElementById('marquee');
track.innerHTML += track.innerHTML;

renderProducts('all');
