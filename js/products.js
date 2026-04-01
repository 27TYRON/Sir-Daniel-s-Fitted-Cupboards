const folderGalleryImages = [
  'daniel.jpeg',
  'img1.jpeg',
  'img2.jpeg',
  'img3.jpeg',
  'img4.jpeg',
  'img5.jpeg',
  'img6.jpeg',
  'img7.jpeg',
  'img8.jpeg',
  'img9.jpeg',
  'img10.jpeg',
  'img11.jpeg',
  'img12.jpeg',
  'img13.jpeg',
  'img 14.jpeg',
  'img15.jpeg',
  'img 16.jpeg',
  'img 17.jpeg',
  'img 18.jpeg',
  'img19.jpeg',
  'img20.jpeg',
  'img21.jpeg',
  'img22.jpeg',
  'img 23.jpeg',
  'img 24.jpeg',
  'img 25.jpeg',
  'logo.jpeg'
];

const defaultProducts = [
  {
    name: 'Signature Wardrobe Package',
    
    image: '../images/img8.jpeg',
    category: 'wardrobes',
    service: 'Bedroom storage',
    description: 'Floor-to-ceiling wardrobe design with premium rails and a clean built-in finish.'
  },
  {
    name: 'Walk-In Closet Upgrade',
    
    image: '../images/img15.jpeg',
    category: 'wardrobes',
    service: 'Luxury organisation',
    description: 'Smart shelves, hanging space, and drawers built to maximise every corner.'
  },
  {
    name: 'Executive Kitchen Unit',
    
    image: '../images/img7.jpeg',
    category: 'kitchens',
    service: 'Kitchen cabinetry',
    description: 'Modern kitchen cupboards with durable finishes and elegant storage planning.'
  },
  {
    name: 'Compact Kitchen Refresh',
    
    image: '../images/img11.jpeg',
    category: 'kitchens',
    service: 'Budget-friendly upgrade',
    description: 'A polished refresh for apartments, rentals, and starter homes.'
  },
  {
    name: 'TV Wall and Shelving Set',
   
    image: '../images/img23.jpeg',
    category: 'living',
    service: 'Living room feature',
    description: 'A statement entertainment unit with practical display storage and a showroom look.'
  },
  {
    name: 'Floating Vanity Cabinet',
   
    image: '../images/img10.jpeg',
    category: 'living',
    service: 'Bathroom storage',
    description: 'Sleek vanity unit designed to keep bathrooms modern, neat, and functional.'
  },
  {
    name: 'Ceiling and Finish Package',
   
    image: '../images/img12.jpeg',
    category: 'finishes',
    service: 'Interior finishing',
    description: 'Decorative ceiling panels and finish work that give spaces a premium final touch.'
  },
  {
    name: 'Custom Shelving Solution',
   
    image: '../images/img9.jpeg',
    category: 'finishes',
    service: 'Display shelving',
    description: 'Built-in shelving that adds organised storage to offices, lounges, and retail spaces.'
  }
];

let currentFilter = 'all';
let products = readProductsFromStorage();
window.products = Array.isArray(window.products) ? window.products : products;

function readProductsFromStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem('products') || 'null');
    return Array.isArray(stored) ? stored : defaultProducts.map(product => ({ ...product }));
  } catch (error) {
    return defaultProducts.map(product => ({ ...product }));
  }
}

function syncProducts() {
  if (Array.isArray(window.products)) {
    products = window.products;
  } else {
    window.products = products;
  }

  return products;
}

function persistProducts() {
  syncProducts();
  localStorage.setItem('products', JSON.stringify(products));
}

function formatCurrency(value) {
  return `R ${Number(value || 0).toLocaleString('en-ZA')}`;
}

function setProductMessage(text, type) {
  const messageBox = document.getElementById('product-message');
  if (!messageBox) {
    return;
  }

  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
}

function validateProductForm() {
  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');
  const addButton = document.getElementById('add-product-btn');

  if (!nameInput || !priceInput || !addButton) {
    return;
  }

  const valid = nameInput.value.trim().length > 0 && Number(priceInput.value) > 0;
  addButton.disabled = !valid;
}

function addProduct() {
  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');
  const imageInput = document.getElementById('image');
  const categoryInput = document.getElementById('category');

  const name = nameInput ? nameInput.value.trim() : '';
  const price = Number(priceInput ? priceInput.value : 0);
  const image = imageInput && imageInput.value.trim() ? imageInput.value.trim() : '../images/img1.jpeg';
  const category = categoryInput && categoryInput.value
    ? categoryInput.value.toLowerCase().replace(/\s+/g, '-')
    : 'custom';

  if (!name) {
    setProductMessage('Please enter a product name.', 'error');
    return;
  }

  if (!price || price <= 0) {
    setProductMessage('Please enter a valid price.', 'error');
    return;
  }

  syncProducts();

  const newProduct = {
    name,
    price,
    image,
    category,
    service: 'Custom request',
    description: 'Added manually from the product form.'
  };

  products.push(newProduct);
  window.products = products;
  persistProducts();
  loadProducts();
  setProductMessage(`${name} added successfully.`, 'success');

  if (nameInput) nameInput.value = '';
  if (priceInput) priceInput.value = '';
  if (imageInput) imageInput.value = '';
  validateProductForm();
}

function formatImageLabel(fileName, index) {
  const baseName = fileName.replace(/\.[^.]+$/, '').trim();

  if (baseName.toLowerCase() === 'daniel') {
    return 'Founder Showcase';
  }

  if (baseName.toLowerCase() === 'logo') {
    return 'Sir Daniel Brand Style';
  }

  const number = baseName.replace(/img\s*/i, '').trim() || String(index + 1).padStart(2, '0');
  return `Custom Design ${number}`;
}

function renderFolderGallery() {
  const gallery = document.getElementById('folder-gallery');
  if (!gallery) {
    return;
  }

  gallery.innerHTML = '';

  folderGalleryImages.forEach((fileName, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-item';

    const image = document.createElement('img');
    image.src = `../images/${fileName}`;
    image.alt = fileName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';

    const title = document.createElement('strong');
    title.textContent = formatImageLabel(fileName, index);

    const hint = document.createElement('span');
    hint.textContent = 'View this design and add it to cart if you like it.';

    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'gallery-add-btn';
    action.textContent = 'Add to Cart';
    action.addEventListener('click', () => {
      if (typeof addToCart === 'function') {
        const added = addToCart(formatImageLabel(fileName, index), 0, 'Gallery design selection');
        action.textContent = added ? 'Added ✓' : 'Already in Cart';
        action.classList.add('selected');
      }
    });

    caption.appendChild(title);
    caption.appendChild(hint);
    card.appendChild(image);
    card.appendChild(caption);
    card.appendChild(action);
    gallery.appendChild(card);
  });
}

function loadProducts() {
  const list = document.getElementById('product-list');
  if (!list) {
    return;
  }

  syncProducts();
  list.innerHTML = '';

  const visibleProducts = currentFilter === 'all'
    ? products
    : products.filter(product => product.category === currentFilter);

  if (!visibleProducts.length) {
    list.innerHTML = '<p class="empty-state">No products available in this category yet.</p>';
    return;
  }

  visibleProducts.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;

    const body = document.createElement('div');
    body.className = 'product-body';

    const meta = document.createElement('div');
    meta.className = 'product-meta';

    const title = document.createElement('h3');
    title.textContent = product.name;

    const tag = document.createElement('span');
    tag.textContent = product.service || 'Premium fit';

    meta.appendChild(title);
    meta.appendChild(tag);

    const description = document.createElement('p');
    description.textContent = product.description || 'Elegant storage made for modern spaces.';

    const note = document.createElement('div');
    note.className = 'product-note';
    note.textContent = 'Available on request • Quote supplied after selection';

    const actions = document.createElement('div');
    actions.className = 'product-actions';

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => {
      if (typeof addToCart === 'function') {
        const added = addToCart(product.name, Number(product.price), product.service || 'Premium installation');
        addButton.textContent = added ? 'Added to Cart ✓' : 'Already in Cart';
        if (added) {
          addButton.classList.add('selected');
        }
      }
    });

    const askButton = document.createElement('button');
    askButton.type = 'button';
    askButton.textContent = 'Ask a Question';
    askButton.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });

    actions.appendChild(addButton);
    actions.appendChild(askButton);

    body.appendChild(meta);
    body.appendChild(description);
    body.appendChild(note);
    body.appendChild(actions);

    card.appendChild(image);
    card.appendChild(body);
    list.appendChild(card);
  });
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(button => {
    if (button.dataset.bound === 'true') {
      return;
    }

    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      currentFilter = button.dataset.category || 'all';
      loadProducts();
    });
  });
}

function setupProductForm() {
  ['name', 'price'].forEach(id => {
    const input = document.getElementById(id);
    if (!input || input.dataset.bound === 'true') {
      return;
    }

    input.dataset.bound = 'true';
    input.addEventListener('input', validateProductForm);
  });

  const addButton = document.getElementById('add-product-btn');
  if (addButton && addButton.dataset.bound !== 'true') {
    addButton.dataset.bound = 'true';
    addButton.addEventListener('click', addProduct);
  }

  validateProductForm();
}

function initializeProductsPage() {
  if (localStorage.getItem('products') === null && (!Array.isArray(window.products) || window.products.length === 0)) {
    window.products = defaultProducts.map(product => ({ ...product }));
    syncProducts();
    persistProducts();
  }

  renderFolderGallery();
  setupFilters();
  setupProductForm();
  loadProducts();
}

window.addProduct = addProduct;
window.loadProducts = loadProducts;

initializeProductsPage();
document.addEventListener('DOMContentLoaded', initializeProductsPage);
