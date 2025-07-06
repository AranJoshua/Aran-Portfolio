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
    
    // Set active navigation based on current page
    function setActiveNavigation() {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('.nav-link');
      const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
      
      // Remove active class from all items
      [...navLinks, ...mobileNavItems].forEach(item => {
        item.classList.remove('active');
      });
      
      // Add active class to current page items
      [...navLinks, ...mobileNavItems].forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
          item.classList.add('active');
        }
      });
    }
    
    // Smooth Page Navigation
    function navigateToPage(url) {
      // Add loading transition
      document.body.style.transition = 'opacity 0.2s ease-out';
      document.body.style.opacity = '0.8';
      
      // Navigate after a brief delay for visual effect
      setTimeout(() => {
        window.location.href = url;
      }, 100);
    }
    
    // Add click handlers for smooth navigation - FIXED VERSION
    document.addEventListener('DOMContentLoaded', () => {
      const internalLinks = document.querySelectorAll('a[href$=".html"]');
      
      internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          const currentPage = window.location.pathname.split('/').pop() || 'index.html';
          
          // Only apply smooth transition for internal pages and if not already on the same page
          if (href && href !== currentPage && 
              (href.includes('experience.html') || 
               href.includes('skills.html') || 
               href.includes('index.html'))) {
            e.preventDefault();
            navigateToPage(href);
          }
        });
      });
    });
    
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
    
    // Keyboard Navigation for pages
    document.addEventListener('keydown', (e) => {
      const pages = ['index.html', 'experience.html', 'skills.html'];
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const currentIndex = pages.indexOf(currentPage);
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % pages.length;
        navigateToPage(pages[nextIndex]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + pages.length) % pages.length;
        navigateToPage(pages[prevIndex]);
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
    
    // Page load animation
    window.addEventListener('load', () => {
      // Ensure page is at the top
      window.scrollTo(0, 0);
      
      // Set initial state
      document.body.style.opacity = '0';
      
      // Animate in
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.opacity = '1';
      }, 50);
      
      // Set active navigation after page loads
      setActiveNavigation();
      
      // Check scroll animation on load
      handleScrollAnimation();
    });
    
    // Add intersection observer for future sections
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
    
    // Initialize observer
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });

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
        
        // Keyboard navigation - more aggressive prevention
        document.addEventListener('keydown', (e) => {
          if (!this.modal.classList.contains('active')) return;
          
          // Prevent ALL arrow key events when modal is active
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // Handle left/right arrows for gallery navigation
            if (e.key === 'ArrowLeft') {
              this.previousImage();
            } else if (e.key === 'ArrowRight') {
              this.nextImage();
            }
            return false;
          }
          
          // Handle escape key
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            this.closeGallery();
            return false;
          }
        }, true); // Use capture phase to intercept events early

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
        
        // Focus the modal to capture keyboard events
        this.modal.focus();
      }

      closeGallery() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset state
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
        
        // Show loader
        this.loader.classList.add('active');
        this.image.style.opacity = '0';
        
        // Load new image
        this.image.src = this.images[index];
        this.image.alt = `${this.title} - Image ${index + 1}`;
        
        // Update thumbnails
        this.updateThumbnails();
        
        // Update navigation buttons
        this.updateNavigation();
        
        // Show counter and fade out after 1 second
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
        
        // Scroll active thumbnail into view
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
        // In loop mode, never disable buttons
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
      }
    }

    // Initialize gallery when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      new Gallery();
    });

    // Ensure page stays at the top on load
    window.scrollTo(0, 0);
    
    