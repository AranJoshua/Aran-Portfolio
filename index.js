// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleBall = document.querySelector('.theme-toggle-ball');
const body = document.body;

// Check for saved theme preference or default to 'dark'  
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeToggleBall.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Listen for theme changes from other tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    const newTheme = e.newValue || 'dark';
    body.setAttribute('data-theme', newTheme);
    updateThemeIcon(newTheme);
  }
});

// Smooth scrolling and section highlighting
class SinglePageNavigation {
  constructor() {
    this.sections = ['about', 'experience', 'skills'];
    this.navLinks = document.querySelectorAll('.nav-link[data-section]');
    this.mobileNavItems = document.querySelectorAll('.mobile-nav-item[data-section]');
    this.currentSection = 'about';
    this.isScrolling = false;
    
    this.init();
  }

  init() {
    // Add click handlers for navigation
    [...this.navLinks, ...this.mobileNavItems].forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        this.scrollToSection(section);
      });
    });

    // Add scroll listener for section highlighting
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        this.updateActiveSection();
      }
    });

    // Handle hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (this.sections.includes(hash)) {
        this.scrollToSection(hash, false);
      }
    });

    // Handle initial hash
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      if (this.sections.includes(hash)) {
        setTimeout(() => {
          this.scrollToSection(hash, false);
        }, 100);
      }
    }
  }

  scrollToSection(section, updateHash = true) {
    const targetSection = document.getElementById(section);
    if (!targetSection) return;

    this.isScrolling = true;
    
    // Update hash if needed
    if (updateHash) {
      window.location.hash = section;
    }

    // Smooth scroll to section
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Update active navigation
    this.updateActiveNavigation(section);

    // Reset scrolling flag after animation
    setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  updateActiveSection() {
    const scrollPosition = window.scrollY + 150; // Offset for header

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.sections[i]);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (this.currentSection !== this.sections[i]) {
            this.currentSection = this.sections[i];
            this.updateActiveNavigation(this.sections[i]);
          }
          break;
        }
      }
    }
  }

  updateActiveNavigation(section) {
    // Remove active class from all navigation items
    [...this.navLinks, ...this.mobileNavItems].forEach(item => {
      item.classList.remove('active');
    });

    // Add active class to current section items
    this.navLinks.forEach(link => {
      if (link.getAttribute('data-section') === section) {
        link.classList.add('active');
      }
    });

    this.mobileNavItems.forEach(item => {
      if (item.getAttribute('data-section') === section) {
        item.classList.add('active');
      }
    });
  }
}

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
  
  // Handle scroll-triggered animation for extended content
  handleScrollAnimation();
});

// Scroll-triggered animation for extended content
function handleScrollAnimation() {
  const extendedContent = document.querySelector('.extended-content');
  if (!extendedContent) return;
  
  const rect = extendedContent.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Trigger animation when element is 20% visible
  if (rect.top < windowHeight * 0.8) {
    extendedContent.classList.add('revealed');
  }
}

// Enhanced Floating Animation
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach((element, index) => {
  element.addEventListener('mouseenter', () => {
    element.style.animationPlayState = 'paused';
    element.style.transform = 'scale(1.5)';
    element.style.filter = 'blur(0px)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.animationPlayState = 'running';
    element.style.transform = 'scale(1)';
    element.style.filter = 'blur(1px)';
  });
});

// Keyboard Navigation for sections
document.addEventListener('keydown', (e) => {
  const sections = ['about', 'experience', 'skills'];
  const currentSection = window.location.hash.slice(1) || 'about';
  const currentIndex = sections.indexOf(currentSection);
  
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % sections.length;
    singlePageNav.scrollToSection(sections[nextIndex]);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
    singlePageNav.scrollToSection(sections[prevIndex]);
  }
});

// Performance optimization: Reduce animations on low-end devices
const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
if (isLowEndDevice) {
  document.documentElement.style.setProperty('--animation-duration', '0.3s');
  floatingElements.forEach(el => {
    el.style.animation = 'none';
  });
}

// Add intersection observer for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Gallery functionality
const galleryData = {
  vives: {
    title: 'VIVES Summer School Program - Belgium',
    images: [
      'images/vivescert.jpg',
      'images/vives1.jpg',
      'images/vives2.jpg',
      'images/vives3.jpg'
    ]
  },
  valedictorian: {
    title: 'Highschool Valedictorian Achievement',
    images: [
      'images/valedictorian1.jpg',
      'images/valedictorian2.jpg'
    ]
  },
  college: {
    title: 'College Academic Awards',
    images: [
      'images/college1.jpg',
      'images/college2.jpg',
      'images/college3.jpg'
    ]
  }
};

class Gallery {
  constructor() {
    this.currentGallery = null;
    this.currentIndex = 0;
    this.images = [];
    this.title = '';
    this.fadeTimeout = null;
    
    // Elements
    this.modal = document.getElementById('galleryModal');
    this.title_el = document.getElementById('galleryTitle');
    this.image = document.getElementById('galleryImage');
    this.loader = document.getElementById('galleryLoader');
    this.counter = document.getElementById('galleryCounter');
    this.currentImage = document.getElementById('currentImage');
    this.totalImages = document.getElementById('totalImages');
    this.thumbnails = document.getElementById('galleryThumbnails');
    this.prevBtn = document.getElementById('galleryPrev');
    this.nextBtn = document.getElementById('galleryNext');
    this.closeBtn = document.getElementById('galleryClose');
    this.backdrop = document.querySelector('.modal-backdrop');

    this.initEvents();
  }

  initEvents() {
    // Gallery button clicks
    document.querySelectorAll('.gallery-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const galleryType = btn.dataset.gallery;
        this.openGallery(galleryType);
      });
    });

    // Navigation
    this.prevBtn.addEventListener('click', () => this.previousImage());
    this.nextBtn.addEventListener('click', () => this.nextImage());
    
    // Close events
    this.closeBtn.addEventListener('click', () => this.closeGallery());
    this.backdrop.addEventListener('click', () => this.closeGallery());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        if (e.key === 'ArrowLeft') {
          this.previousImage();
        } else if (e.key === 'ArrowRight') {
          this.nextImage();
        }
        return false;
      }
      
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.closeGallery();
        return false;
      }
    }, true);

    // Prevent tab navigation when modal is active
    document.addEventListener('keydown', (e) => {
      if (this.modal.classList.contains('active') && e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    }, true);

    // Image load events
    this.image.addEventListener('load', () => {
      this.loader.classList.remove('active');
      this.image.style.opacity = '1';
    });

    this.image.addEventListener('error', () => {
      this.loader.classList.remove('active');
      console.error('Failed to load image:', this.images[this.currentIndex]);
    });
  }

  openGallery(galleryType) {
    const data = galleryData[galleryType];
    if (!data) return;

    this.currentGallery = galleryType;
    this.images = data.images;
    this.title = data.title;
    this.currentIndex = 0;

    this.title_el.textContent = this.title;
    this.totalImages.textContent = this.images.length;
    
    this.createThumbnails();
    this.showImage(0);
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    this.modal.focus();
  }

  closeGallery() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    this.currentGallery = null;
    this.currentIndex = 0;
    this.images = [];
    this.image.src = '';
    this.thumbnails.innerHTML = '';
  }

  showImage(index) {
    if (index < 0 || index >= this.images.length) return;
    
    this.currentIndex = index;
    this.currentImage.textContent = index + 1;
    
    this.loader.classList.add('active');
    this.image.style.opacity = '0';
    
    this.image.src = this.images[index];
    this.image.alt = `${this.title} - Image ${index + 1}`;
    
    this.updateThumbnails();
    this.updateNavigation();
    
    this.counter.classList.remove('fade-out');
    clearTimeout(this.fadeTimeout);
    this.fadeTimeout = setTimeout(() => {
      this.counter.classList.add('fade-out');
    }, 1000);
  }

  previousImage() {
    const newIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.showImage(newIndex);
  }

  nextImage() {
    const newIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    this.showImage(newIndex);
  }

  createThumbnails() {
    this.thumbnails.innerHTML = '';
    
    this.images.forEach((imageSrc, index) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = imageSrc;
      thumbnail.alt = `Thumbnail ${index + 1}`;
      thumbnail.className = 'gallery-thumbnail';
      thumbnail.addEventListener('click', () => this.showImage(index));
      
      this.thumbnails.appendChild(thumbnail);
    });
  }

  updateThumbnails() {
    const thumbnails = this.thumbnails.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentIndex);
    });
    
    const activeThumbnail = thumbnails[this.currentIndex];
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }

  updateNavigation() {
    this.prevBtn.disabled = false;
    this.nextBtn.disabled = false;
  }
}

// Certificate Modal Functions
function openCertificate(type) {
  const modal = document.getElementById('certificateModal');
  const certificateImage = document.getElementById('certificateImage');
  const certificateContent = modal.querySelector('.certificate-content');
  
  if (type === 'data-analyst') {
    certificateImage.src = 'images/mlbbcert.png';
    certificateImage.alt = 'Data Analyst Certificate';
    certificateContent.classList.remove('landscape');
  } else if (type === 'publicity') {
    certificateImage.src = 'images/buildscert.jpg';
    certificateImage.alt = 'Publicity Writing Certificate';
    certificateContent.classList.add('landscape');
  }
  
  modal.classList.add('active');
}

function closeCertificate() {
  document.getElementById('certificateModal').classList.remove('active');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize single page navigation
  window.singlePageNav = new SinglePageNavigation();
  
  // Initialize gallery
  new Gallery();
  
  // Initialize observer for sections
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
  
  // Close certificate modal when clicking outside
  document.getElementById('certificateModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeCertificate();
    }
  });
  
  // Set initial active section
  singlePageNav.updateActiveSection();
  
  // --- Reveal on Scroll Animation ---
  addRevealOnScroll();
  setupRevealOnScrollObserver();
});

// Page load animation
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.opacity = '1';
  }, 50);
  
  handleScrollAnimation();
});

// Ensure page stays at the top on load
window.scrollTo(0, 0);

// --- Reveal on Scroll Animation ---
function addRevealOnScroll() {
  // Add .reveal-on-scroll to key elements if not already present
  document.querySelectorAll('.section > .hero-content, .section > .hero-skills').forEach(el => {
    el.classList.add('reveal-on-scroll');
  });
  document.querySelectorAll('.experience-category').forEach(el => {
    el.classList.add('reveal-on-scroll');
  });
  document.querySelectorAll('.experience-item').forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  // Staggered reveal for about section paragraphs and gallery controls
  const aboutStaggerEls = [
    ...document.querySelectorAll('#about .info-paragraph'),
    ...document.querySelectorAll('#about .gallery-controls')
  ];
  aboutStaggerEls.forEach((el, i) => {
    el.classList.add('reveal-on-scroll', 'staggered');
    el.style.setProperty('--stagger-delay', `${i * 0.18 + 0.1}s`);
  });

  // Staggered reveal for skills section cards
  const skillCards = document.querySelectorAll('#skills .skill-category');
  skillCards.forEach((el, i) => {
    el.classList.add('reveal-on-scroll', 'staggered');
    el.style.setProperty('--stagger-delay', `${i * 0.15 + 0.1}s`);
  });

  // Staggered reveal for toolkit items
  const toolItems = document.querySelectorAll('#skills .tool-item');
  toolItems.forEach((el, i) => {
    el.classList.add('reveal-on-scroll', 'staggered');
    el.style.setProperty('--stagger-delay', `${i * 0.09 + 0.1}s`);
  });
}

function setupRevealOnScrollObserver() {
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
} 