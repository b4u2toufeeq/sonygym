const whatsappNumber = '919390989002';
const imageSets = {
  car: [
    'https://www.11cart.com/cdn/shop/files/Kids_jeep.jpg?v=1774690473&width=900',
    'https://www.11cart.com/cdn/shop/files/11CartAstonMartinAramcoF1LicensedElectricKidsCar_17_f937bb92-9b81-429f-948e-08e16150cca2.webp?v=1763631352&width=900',
    'https://www.11cart.com/cdn/shop/files/2_a1db14f8-fc64-4a35-9f79-370310b2d679.jpg?v=1788945246&width=900',
    'https://www.11cart.com/cdn/shop/files/Lexus_lx_1.jpg?v=1788268520&width=900',
    'https://www.11cart.com/cdn/shop/files/Chevrolet_Red.png?v=1788947638&width=900'
  ],
  bike: ['https://www.11cart.com/cdn/shop/files/8188-BLU_1.webp?v=1763631731&width=700'],
  parts: ['https://www.11cart.com/cdn/shop/products/KidsCarParts_2.png?v=1672688410&width=700']
};

// Product names and listed prices were transcribed from the public 11Cart collections.
// Prices and stock are indicative only; confirm with Sony Kids World before purchase.
const products = [
  // RIDE-ON CARS
  ['11CART Mini Thar 12V 4x4 Electric Ride-On Jeep for Kids','₹7,499','car','12V · 4x4 Jeep'],
  ['11CART Ford Ride-On Jeep for Kids','₹7,499','car','Electric ride-on jeep'],
  ['11CART Mini 4x4 Battery Operated Ride-On Jeep for Kids','₹7,499','car','4x4 · Battery operated'],
  ['11CART Mini Thar Electric Ride-On Jeep for Kids','₹7,499','car','Electric ride-on jeep'],
  ['Toyota Black Jeep','₹9,999','car','Kids ride-on SUV'],
  ['Mercedes G63 4WD Ride-On Jeep for Kids','₹9,999','car','4WD · SUV styling'],
  ['4x4 Battery Operated Kids Jeep Ride-On Car','₹9,999','car','4x4 · Battery operated'],
  ['Kids Battery Operated Ride On Jeep','₹9,999','car','Battery operated'],
  ['Rechargeable Ride-On Jeep for Kids','₹10,499','car','Rechargeable battery'],
  ['Kids Jeep Mercedes G63 4WD','₹10,500','car','4WD · Kids jeep'],
  ['Kids Jeep 4x4 Wheel Drive | Remote & Parent Control','₹10,499','car','4x4 · Parent remote'],
  ['11CART Kids Ride-On Jeep 4WD – Premium Electric Jeep for Kids','₹13,499','car','4WD · Premium jeep'],
  ['11CART Kids Ride-On Thar Jeep 4WD','₹13,499','car','4WD · Thar style'],
  ['11CART Toyota-Style Kids Ride-On Jeep 4WD','₹13,499','car','4WD · Toyota style'],
  ['11CART New Ferreri Kids Electric Ride-On Car','₹14,499','car','Sports car styling'],
  ['11CART Porsche GT3 RS Kids Electric Ride-On Car','₹14,499','car','Sports car styling'],
  ['Kids Ride-On Tractor – Big Size Electric Power Source','₹14,499','car','Electric tractor'],
  ['Rolls Royce Dual-Seat 12V Electric Ride-On Car for Kids','₹15,499','car','12V · Dual seat'],
  ['Kids Electric Ride-On Jeep Ford Edition 4WD','₹18,499','car','Ford edition · 4WD'],
  ['Mercedes Kids Jeep – Jumbo Size 4 Wheel Drive','₹18,499','car','Jumbo SUV · 4WD'],
  ['12V 4x4 Ride-On Jeep for Kids with Remote and Dual Seats','₹18,499','car','12V · Dual seat · Remote'],
  ['Kids Ride-On Lamborghini Car 12V with Remote Control','₹19,499','car','12V · Remote control'],
  ['11CART Lamborghini Huracan Kids Electric Ride-On Car','₹20,499','car','Sports car styling'],
  ['New Kids Electric Ride-On Auto Rickshaw','₹21,499','car','Electric auto rickshaw'],
  ['11Cart Chevrolet Kids 12V Dual Seater Ride-On Car','₹24,499','car','12V · Dual seat'],
  ['Mercedes Maybach Luxury Kids Electric Ride-On Car','₹24,499','car','Luxury styling'],
  ['11CART Lamborghini Urus Squadra Corse 2-Seater Kids SUV','₹26,499','car','2-seater · SUV'],
  ['Dual-Seater Discovery Electric Ride-On SUV for Kids','₹25,499','car','Dual seat · SUV'],
  ['Licensed Chevrolet Blazer 24V Kids Electric Car','₹37,499','car','24V · Licensed listing'],
  ['Licensed Kids Car Audi Horch 930V 12V Premium Electric Car','₹37,499','car','12V · Licensed listing'],
  ['Licensed Toyota Land Cruiser Police Kids Car','₹37,499','car','Licensed listing'],
  ['2026 Dual Seater BMW SUV Kids Jeep – 4 Motor 12V','₹27,499','car','12V · 4 motors · Dual seat'],
  ['Lamborghini Aventador SVJ 2-Seater Kids Ride-On Car','₹28,499','car','2-seater · Sports car'],
  ['24V EVA Tyre Vector X1-DLS UTV Electric Ride-On Jeep','₹34,500','car','24V · UTV'],
  ['Licensed Bentley Bentayaga Kids Car','₹37,500','car','Licensed listing'],
  ['Licensed Bentley GT Super Sports Kids Car White','₹38,499','car','Licensed listing'],
  ['Licensed Bentley Mulsanne Kids Ride-On Car','₹34,499','car','Licensed listing'],
  ['Aston Martin Aramco F1 Licensed Electric Kids Ride-On Race Car','₹35,500','car','F1 styling · Licensed listing'],
  ['Mercedes G-Wagon AMG Official Licensed Kids Ride-On SUV','₹26,499','car','Licensed listing · SUV'],
  // RIDE-ON BIKES
  ['11cart 3-Wheel Electric Ride-On Bike with Music & Lights','₹6,499','bike','3 wheels · Music · Lights'],
  ['Mini Scooter for Kids Dinosaur Model 6V','₹8,499','bike','6V · Kids scooter'],
  ['11CART Vintage Vespa Rechargeable Kids Scooty with Lights','₹6,999','bike','Vespa style · Lights'],
  ['Vespa Battery Operated Ride-On Scooty – Pink','₹7,499','bike','Pink · Battery operated'],
  ['Vespa Rechargeable Battery Operated Scooter – Blue','₹7,499','bike','Blue · Rechargeable'],
  ['Battery Operated Red Vespa Scooter for Kids','₹7,499','bike','Red · Battery operated'],
  ['12V Electric Ride-On Vespa Mini for Kids – 3-Wheel Scooty','₹8,499','bike','12V · 3 wheels'],
  ['11CART Premium Kids Battery Operated Ride-On Scooter','₹8,499','bike','Rechargeable scooter'],
  ['Kids Electric Motorcycle Ride-On Bike 3 Wheels – Model JD-EM-402','₹8,499','bike','3 wheels · Model JD-EM-402'],
  ['Dual Seater Vespa Ride-On 12V Scooter with 3 Wheels','₹12,499','bike','12V · Dual seat'],
  ['Vespa Matee Finish Kids Bike','₹16,499','bike','Vespa style'],
  ['Electric Motorcycle N-888 for Kids','₹12,499','bike','Electric motorcycle'],
  ['Kids Ride-On Bike R3 with Hand Accelerator and Foot Brake','₹12,499','bike','Hand accelerator · Foot brake'],
  ['Kids Ride-On Bike S1000RR Hand Accelerator Foot Brake Big Size','₹13,499','bike','S1000RR style'],
  ['Ducati Kids Motorcycle Electric Ride-On','₹15,499','bike','Ducati style'],
  ['Harley-Style 12V Electric Ride-On Bike for Kids','₹16,499','bike','12V · Cruiser styling'],
  ['11Cart Big Size Kids Battery Operated Bike','₹18,499','bike','Large size'],
  ['Premium Hayabusa Electric Ride-On Bike 12V','₹18,499','bike','12V · Hayabusa style'],
  ['Kids Electric Motorcycle – 3 Wheels','₹18,499','bike','3 wheels'],
  ['11CART Harley Cruiser Edition 12V Kids Electric Ride-On Bike','₹20,499','bike','12V · Cruiser styling'],
  ['Red BMW S1000RR Superbike for Kids with Rechargeable Battery','₹13,499','bike','BMW style · Rechargeable'],
  ['Kids Electric Harley Motorcycle 12V Ride-On Bike – BDL 1288','₹13,499','bike','12V · Model BDL 1288'],
  ['11CART Ultimate Harley Cruiser Electric Motorcycle for Kids','₹20,499','bike','Cruiser styling'],
  ['R15 Kids Electric Ride-On Bike','₹12,499','bike','R15 styling'],
  // REPLACEMENT PARTS — collection showed these as sold out at time checked
  ['Electric Off-Road Car Jeep Steering Wheel 005','₹999','parts','SKU 005 · Check fitment and stock'],
  ['Steering Wheel for Electric Car – Kids Car Parts','₹999','parts','Replacement steering wheel'],
  ['11Cart Steering Wheel 0010 – Kids Electric Car Parts','₹999','parts','Model 0010 · Check fitment'],
  ['Ride-On Car Steering Wheel 007 – Kids Car Parts','₹999','parts','Model 007 · Check fitment'],
  ['Electric Car Steering Wheel 006 – Kids Car Parts','₹999','parts','Model 006 · Check fitment'],
  ['Electric Jeep Steering Wheel for Kids Cars','₹999','parts','Jeep steering wheel'],
  ['Jeep Car Steering Wheel – Kids Car Parts','₹999','parts','Replacement steering wheel'],
  ['Battery Operated Car Steering Wheel','₹999','parts','Replacement steering wheel'],
  ['Kids Ride-On Car Parts Steering Wheel 0011','₹999','parts','Model 0011 · Check fitment'],
  ['Ride-On Car Parts Steering Wheel 009','₹999','parts','Model 009 · Check fitment'],
  ['11Cart Toy Ride-On Car Steering Wheel 008 for Kids','₹999','parts','Model 008 · Check fitment'],
  ['Kids Off-Road Steering Wheel for Jeep Car','₹999','parts','Off-road steering wheel'],
  ['Children Car Steering Wheel','₹999','parts','Replacement steering wheel']
].map((p, i) => ({
  id: i,
  title: p[0], price: p[1], category: p[2], meta: p[3],
  image: imageSets[p[2]][i % imageSets[p[2]].length]
}));

function orderUrl(product) {
  const message = `Hi Sony Kids World! I am interested in: ${product.title}. Reference listed price: ${product.price}. Please confirm current stock, final price, compatibility/specifications and delivery.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('productSearch');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
let activeFilter = 'all';
function renderProducts() {
  const term = (searchInput.value || '').trim().toLowerCase();
  const visible = products.filter(p => (activeFilter === 'all' || p.category === activeFilter) && `${p.title} ${p.meta}`.toLowerCase().includes(term));
  grid.innerHTML = visible.map(p => `
    <div class="col-6 col-lg-3 product-item">
      <article class="product-card">
        <div class="product-image-wrap">
          <span class="product-tag ${p.category === 'parts' ? 'tag-gold' : p.category === 'bike' ? 'tag-red' : ''}">${p.category === 'car' ? 'RIDE-ON CAR' : p.category === 'bike' ? 'RIDE-ON BIKE' : 'REPLACEMENT PART'}</span>
          <img src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/${p.category === 'bike' ? 'audi-rideon.webp' : p.category === 'parts' ? 'red-suv.jpg' : 'lime-supercar.jpg'}'">
        </div>
        <div class="product-info">
          <div class="product-type">${p.category === 'car' ? 'ELECTRIC KIDS CAR' : p.category === 'bike' ? 'ELECTRIC KIDS BIKE' : 'SPARE / REPLACEMENT PART'}</div>
          <h3>${escapeHtml(p.title)}</h3>
          <div class="price-line"><strong>${p.price}</strong></div>
          <div class="product-meta"><span><i class="bi bi-info-circle"></i> ${escapeHtml(p.meta)}</span></div>
          <a class="btn btn-order w-100" href="${orderUrl(p)}" target="_blank" rel="noopener">Enquire on WhatsApp <i class="bi bi-whatsapp"></i></a>
        </div>
      </article>
    </div>`).join('');
  document.getElementById('noResults').classList.toggle('d-none', visible.length !== 0);
  document.getElementById('catalogCount').textContent = `${visible.length} products shown · Prices and stock are indicative; confirm by WhatsApp before ordering.`;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active'); activeFilter = btn.dataset.filter; renderProducts();
}));
searchInput.addEventListener('input', renderProducts);
document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => {
  const category = link.dataset.categoryLink;
  activeFilter = category;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === category));
  renderProducts();
}));
document.getElementById('year').textContent = new Date().getFullYear();
renderProducts();
