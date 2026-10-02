const whatsappNumber = '919390989002';
const productData = {
  aston: {title:'Aston Martin Aramco F1 Licensed Electric Kids Ride On Race Car', image:'https://www.11cart.com/cdn/shop/files/11CartAstonMartinAramcoF1LicensedElectricKidsCar_17_f937bb92-9b81-429f-948e-08e16150cca2.webp?v=1763631352&width=1000', description:'F1-inspired ride-on with parent remote control, working lights, music connectivity and a three-point seat belt. Confirm current specifications and availability before ordering.', specs:['12V battery listing','Parent remote','Working lights','Seat belt'] ,price:'₹35,500'},
  bentley: {title:'Licensed Bentley Bentayga Kids Car', image:'https://www.11cart.com/cdn/shop/files/2_a1db14f8-fc64-4a35-9f79-370310b2d679.jpg?v=1788945246&width=1000', description:'Luxury SUV-inspired ride-on with parent remote, working lights, push-start dashboard and music features. Confirm current specifications and availability before ordering.', specs:['12V battery listing','2 motors listed','2.4G parent remote','Working lights'],price:'₹37,500'},
  lexus: {title:'Officially Licensed Lexus LX 12V Kids Ride-On SUV', image:'https://www.11cart.com/cdn/shop/files/Lexus_lx_1.jpg?v=1788268520&width=1000', description:'A luxury SUV-style ride-on with remote-control operation, rechargeable battery and premium cabin styling. Confirm current specifications and availability before ordering.', specs:['12V battery listing','4WD listed','Parent remote','Two-seater listing'],price:'₹28,499'},
  chevrolet: {title:'Licensed Chevrolet Blazer 24V Kids Electric Car', image:'https://www.11cart.com/cdn/shop/files/Chevrolet_Red.png?v=1788947638&width=1000', description:'Sporty electric SUV-style ride-on. Contact Sony Kids World to confirm the current model specifications, stock and delivery options.', specs:['24V listing','Parent remote listing','Electric ride-on','Red colour shown'],price:'₹37,499'}
};
function orderUrl(name, price){
  const message = `Hi Sony Kids World! I am interested in: ${name}. Listed price: ${price}. Please confirm current availability, final price, specifications and delivery.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
document.querySelectorAll('[data-order]').forEach(button => button.addEventListener('click', () => {
  window.open(orderUrl(button.dataset.order, button.dataset.price || 'Please confirm'), '_blank', 'noopener');
}));
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const productItems = [...document.querySelectorAll('.product-item')];
const searchInput = document.getElementById('productSearch');
let activeFilter = 'all';
function updateProducts(){
  const term = (searchInput.value || '').trim().toLowerCase();
  let visible = 0;
  productItems.forEach(item => {
    const category = item.dataset.category.split(' ');
    const matchesFilter = activeFilter === 'all' || category.includes(activeFilter);
    const matchesSearch = item.dataset.name.toLowerCase().includes(term);
    const show = matchesFilter && matchesSearch;
    item.classList.toggle('d-none', !show);
    if(show) visible++;
  });
  document.getElementById('noResults').classList.toggle('d-none', visible !== 0);
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active'); activeFilter = button.dataset.filter; updateProducts();
}));
searchInput.addEventListener('input', updateProducts);
document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => {
  const category = link.dataset.categoryLink;
  activeFilter = category === 'bike' ? 'all' : category;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === activeFilter));
  setTimeout(updateProducts, 100);
}));
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const item = productData[button.dataset.product]; if(!item) return;
  document.getElementById('productModalTitle').textContent = item.title;
  const image = document.getElementById('modalProductImage'); image.src = item.image; image.alt = item.title;
  document.getElementById('modalProductDescription').textContent = item.description;
  document.getElementById('modalProductSpecs').innerHTML = item.specs.map(spec => `<span>${spec}</span>`).join('');
  const orderButton = document.getElementById('modalOrderButton'); orderButton.href = orderUrl(item.title, item.price);
  bootstrap.Modal.getOrCreateInstance(document.getElementById('productModal')).show();
}));
document.getElementById('year').textContent = new Date().getFullYear();
