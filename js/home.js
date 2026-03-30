const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
  if (slides.length < 2) {
    return;
  }

  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

if (slides.length > 1) {
  setInterval(nextSlide, 4500);
}