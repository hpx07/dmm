let cards = document.querySelectorAll(".card");
let stackArea = document.querySelector(".stack-area");

function rotateCards() {
  let angle = 0;
  cards.forEach((card, index) => {
    if (card.classList.contains("away")) {
      card.style.transform = `translateX(-50%) translateY(-120vh) rotate(-48deg)`;
    } else {
      card.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      angle = angle - 10;
      card.style.zIndex = cards.length - index;
    }
  });
}

// Check if we're on mobile/tablet
function isMobile() {
  return window.innerWidth <= 1024;
}

if (!isMobile()) {
  rotateCards();
  
  window.addEventListener("scroll", () => {
    if (isMobile()) return; // Skip animation on mobile
    
    let distance = window.innerHeight * 0.27;
    let topVal = stackArea.getBoundingClientRect().top;
    let index = -1 * (topVal / distance + 1);
    index = Math.floor(index);

    for (let i = 0; i < cards.length; i++) {
      if (i <= index) {
        cards[i].classList.add("away");
      } else {
        cards[i].classList.remove("away");
      }
    }
    rotateCards();
  });
}

// Smooth scroll for down arrow
document.querySelector('.down-arrow')?.addEventListener('click', () => {
  document.querySelector('.stack-area')?.scrollIntoView({ 
    behavior: 'smooth' 
  });
});

// Hide/show navbar on scroll
let lastScrollTop = 0;
let navbar = document.getElementById("navbar");
let ticking = false;

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (!ticking) {
    window.requestAnimationFrame(function() {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.top = "-100px";
        navbar.style.opacity = "0";
      } else {
        navbar.style.top = "0";
        navbar.style.opacity = "1";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      ticking = false;
    });
    ticking = true;
  }
});

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.h-img');
  if (heroImg && window.innerWidth > 768) {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3;
    heroImg.style.transform = `translateY(${parallax}px)`;
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards on mobile
if (isMobile()) {
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

