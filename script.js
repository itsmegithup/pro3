const book = document.getElementById('book');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

let state = 1;

/* NAVIGATION */
function handleNavigation(direction) {
  const isMobile = window.innerWidth <= 768;

  if (direction === "next") {
    if (state === 1) {
      if (!isMobile) book.classList.add('open-desktop');

      p1.classList.add('flipped');
      p1.style.zIndex = 1;

      state = 2;
    } 
    else if (state === 2) {
      p2.classList.add('flipped');
      p2.style.zIndex = 4;

      state = 3;
    }
  }

  if (direction === "back") {
    if (state === 2) {
      p1.classList.remove('flipped');

      if (!isMobile) book.classList.remove('open-desktop');

      p1.style.zIndex = 3;

      state = 1;
    } 
    else if (state === 3) {
      p2.classList.remove('flipped');
      p2.style.zIndex = 2;

      state = 2;
    }
  }
}

/* SWIPE */
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  /* SWIPE */
  if (Math.abs(diff) > 40) {
    if (diff > 0) handleNavigation("next");
    else handleNavigation("back");
  } 
  /* TAP */
  else {
    const x = e.changedTouches[0].clientX;
    const half = window.innerWidth / 2;

    x > half ? handleNavigation("next") : handleNavigation("back");
  }
});

/* DESKTOP CLICK */
document.addEventListener('click', e => {
  if (window.innerWidth <= 768) return;

  const x = e.clientX;
  const half = window.innerWidth / 2;

  x > half ? handleNavigation("next") : handleNavigation("back");
});