// Organized products with categories and services
const defaultProducts = [
  // CUTTING LIST SERVICES
  { 
    name: 'Premium Cutting List Package', 
    price: 500, 
    image: 'images/img1.jpeg',
    category: 'cutting',
    service: 'Material Cutting & Sizing'
  },
  { 
    name: 'Standard Cutting Service', 
    price: 350, 
    image: 'images/img2.jpeg',
    category: 'cutting',
    service: 'Basic Material Cuts'
  },
  { 
    name: 'Custom Angle Cutting', 
    price: 450, 
    image: 'images/img3.jpeg',
    category: 'cutting',
    service: 'Precision Angle Cuts'
  },

  // JOINERY SERVICES
  { 
    name: 'Cabinet Joinery', 
    price: 2500, 
    image: 'images/daniel.jpeg',
    category: 'joinery',
    service: 'Cabinet Construction & Assembly'
  },
  { 
    name: 'Dovetail Joinery', 
    price: 1800, 
    image: 'images/img4.jpeg',
    category: 'joinery',
    service: 'Dovetail Joint Work'
  },
  { 
    name: 'Mortise & Tenon Joinery', 
    price: 1950, 
    image: 'images/img5.jpeg',
    category: 'joinery',
    service: 'Mortise & Tenon Joints'
  },
  { 
    name: 'Box Joinery', 
    price: 1700, 
    image: 'images/img6.jpeg',
    category: 'joinery',
    service: 'Box Joint Construction'
  },

  // INSTALLATIONS SERVICES
  { 
    name: 'Kitchen Cabinet Installation', 
    price: 2100, 
    image: 'images/img7.jpeg',
    category: 'installations',
    service: 'Professional Cabinet Installation'
  },
  { 
    name: 'Wardrobe Installation', 
    price: 2200, 
    image: 'images/img8.jpeg',
    category: 'installations',
    service: 'Fitted Wardrobe Installation'
  },
  { 
    name: 'Built-in Shelving Installation', 
    price: 1850, 
    image: 'images/img9.jpeg',
    category: 'installations',
    service: 'Custom Shelving Installation'
  },
  { 
    name: 'Bathroom Vanity Installation', 
    price: 2050, 
    image: 'images/img10.jpeg',
    category: 'installations',
    service: 'Bathroom Installation Services'
  },

  // CEILINGS SERVICES
  { 
    name: 'Suspended Ceiling Installation', 
    price: 2300, 
    image: 'images/img11.jpeg',
    category: 'ceilings',
    service: 'Suspended Ceiling Systems'
  },
  { 
    name: 'Wooden Ceiling Panels', 
    price: 2150, 
    image: 'images/img12.jpeg',
    category: 'ceilings',
    service: 'Wooden Ceiling Finishes'
  },
  { 
    name: 'Ceiling Repairs & Finishing', 
    price: 1900, 
    image: 'images/img13.jpeg',
    category: 'ceilings',
    service: 'Ceiling Repair Services'
  },
  { 
    name: 'Decorative Ceiling Design', 
    price: 2250, 
    image: 'images/img14.jpeg',
    category: 'ceilings',
    service: 'Custom Ceiling Design'
  },

  // LAMINATED FLOORING SERVICES
  { 
    name: 'Laminate Installation - Small Area', 
    price: 2000, 
    image: 'images/img15.jpeg',
    category: 'laminated',
    service: 'Small Area Flooring Installation'
  },
  { 
    name: 'Laminate Installation - Large Area', 
    price: 2080, 
    image: 'images/img16.jpeg',
    category: 'laminated',
    service: 'Full Room Flooring Installation'
  },
  { 
    name: 'Laminate with Underlay Installation', 
    price: 2120, 
    image: 'images/img17.jpeg',
    category: 'laminated',
    service: 'Premium Flooring with Underlay'
  },
  { 
    name: 'Flooring Edge Finishing', 
    price: 1880, 
    image: 'images/img18.jpeg',
    category: 'laminated',
    service: 'Finishing & Edging Work'
  },

  // TILING SERVICES
  { 
    name: 'Wall Tiling Service', 
    price: 2100, 
    image: 'images/img19.jpeg',
    category: 'tiling',
    service: 'Wall Tile Installation'
  },
  { 
    name: 'Floor Tiling Installation', 
    price: 2200, 
    image: 'images/img20.jpeg',
    category: 'tiling',
    service: 'Floor Tile Installation'
  },
  { 
    name: 'Bathroom Tiling Package', 
    price: 2050, 
    image: 'images/img21.jpeg',
    category: 'tiling',
    service: 'Complete Bathroom Tiling'
  },
  { 
    name: 'Specialty Tile Work', 
    price: 2150, 
    image: 'images/img22.jpeg',
    category: 'tiling',
    service: 'Custom Tile Designs'
  },
  { 
    name: 'Tile Grout & Finishing', 
    price: 1950, 
    image: 'images/img23.jpeg',
    category: 'tiling',
    service: 'Grout & Finishing Services'
  }
];

let products = JSON.parse(localStorage.getItem("products")) || defaultProducts;
let currentFilter = 'all';

if (products.length === 0) {
  localStorage.setItem('products', JSON.stringify(defaultProducts));
  products = defaultProducts;
}

function loadProducts() {
  const list = document.getElementById('product-list');
  if (!list) return;

  list.innerHTML = '';

  const filtered = currentFilter === 'all'
    ? products
    : products.filter(p => p.category === currentFilter);

  const grouped = {};

  filtered.forEach(product => {
    const key = product.service || 'Other Services';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(product);
  });

  Object.keys(grouped).forEach(serviceName => {
    const header = document.createElement('div');
    header.className = 'service-category-header';
    header.innerHTML = `<h3>${serviceName}</h3>`;
    list.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'service-products-grid';

    grouped[serviceName].forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';

      const img = document.createElement('img');
      img.src = p.image;
      img.alt = p.name;
      img.onclick = () => openImageModal(p.image, p.name);

      const h4 = document.createElement('h4');
      h4.textContent = p.name;

      const price = document.createElement('p');
      price.textContent = `R ${p.price.toFixed(2)}`;

      const btn = document.createElement('button');
      btn.textContent = 'Add to Cart';
      btn.onclick = () => addToCart(p.name, p.price, p.service);

      div.appendChild(img);
      div.appendChild(h4);
      div.appendChild(price);
      div.appendChild(btn);

      grid.appendChild(div);
    });

    list.appendChild(grid);
  });
}

function openImageModal(src, name) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  modalImg.src = src;
  modalImg.alt = name;
  modal.classList.add('show');
}

function closeImageModal() {
  document.getElementById('image-modal').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.filter-btn')
        .forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.category;
      loadProducts();
    });
  });

  document.querySelector('.modal-close')
    .addEventListener('click', closeImageModal);
});
