const expect = chai.expect;

// Helper to clear localStorage keys used by the app
function clearStorage() {
  localStorage.removeItem('products');
  localStorage.removeItem('cart');
}

describe('Products', function() {
  beforeEach(function() {
    clearStorage();

    // reset DOM state
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';
    document.getElementById('product-list').innerHTML = '';
    document.getElementById('product-message').textContent = '';
    document.getElementById('add-product-btn').disabled = true;

    // reload in-memory products from storage
    window.products = JSON.parse(localStorage.getItem('products')) || [];
  });

  it('should not add a product with an empty name', function() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '100';

    // try to add
    addProduct();

    const p = JSON.parse(localStorage.getItem('products')) || [];
    expect(p.length).to.equal(0);
    expect(document.getElementById('product-message').classList.contains('error')).to.be.true;
  });

  it('should add a product when valid', function() {
    document.getElementById('name').value = 'Chair';
    document.getElementById('price').value = '150';

    // emulate enabling the button
    document.getElementById('add-product-btn').disabled = false;
    addProduct();

    const p = JSON.parse(localStorage.getItem('products')) || [];
    expect(p.length).to.equal(1);
    expect(p[0].name).to.equal('Chair');
    expect(document.getElementById('product-message').classList.contains('success')).to.be.true;
  });
});

describe('Cart', function() {
  beforeEach(function() {
    clearStorage();
    window.cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-items').innerHTML = '';
  });

  it('addToCart should add an item to localStorage', function() {
    addToCart('Chair', 150);
    const c = JSON.parse(localStorage.getItem('cart')) || [];
    expect(c.length).to.equal(1);
    expect(c[0].name).to.equal('Chair');
  });

  it('displayCart should generate encoded WhatsApp and mailto links', function() {
    // seed cart
    localStorage.setItem('cart', JSON.stringify([{name: 'Chair', price: 150}, {name: 'Table', price: 250}]));
    window.cart = JSON.parse(localStorage.getItem('cart')) || [];

    displayCart();

    const box = document.getElementById('cart-items');
    const links = box.querySelectorAll('a');
    expect(links.length).to.equal(2);

    const wa = links[0].href;
    expect(wa).to.include('wa.me');
    expect(wa).to.include('text=');
    expect(wa).to.match(/%[0-9A-F]{2}/); // URL-encoded components present

    const mailto = links[1].href;
    expect(mailto).to.include('mailto:sirdaniel@example.com');
    expect(mailto).to.include('subject=');
  });
});