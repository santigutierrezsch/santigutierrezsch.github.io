

document.addEventListener('DOMContentLoaded', function() {
    "use strict";
  
    // ===== REMOVE PRELOAD CLASS =====
    // Remove preload class to enable animations after page load
    window.addEventListener('load', function() {
      document.body.classList.remove('preload');
    });
  
    // ===== CUSTOM CURSOR =====
    const cursor = document.querySelector('.custom-cursor');
    
    function updateCursor(e) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  
    function showCursor() {
      cursor.classList.add('active');
    }
  
    function hideCursor() {
      cursor.classList.remove('active');
    }
  
    function addHoverClass() {
      cursor.classList.add('hover');
    }
  
    function removeHoverClass() {
      cursor.classList.remove('hover');
    }
  
    // Add event listeners for cursor
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('mouseleave', hideCursor);
  
    // Add hover class to cursor when hovering over links and buttons
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .contact-card');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', addHoverClass);
      element.addEventListener('mouseleave', removeHoverClass);
    });
  
    // Detect if device has touch capabilities, if yes, hide custom cursor
    function isTouchDevice() {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.msMaxTouchPoints > 0));
    }
  
    if (isTouchDevice()) {
      cursor.style.display = 'none';
    }
  
    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    
    function hidePreloader() {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 1000); // 1 second delay before hiding preloader
    }
    
    window.addEventListener('load', hidePreloader);
    
    // ===== REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.reveal-element');
    
    function revealOnScroll() {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate reveal point (80% of the way from the top)
        const revealPoint = windowHeight * 0.8;
        
        // If element is within the reveal point
        if(elementTop < revealPoint && elementTop > -elementHeight) {
          // Get delay attribute if exists
          const delay = element.getAttribute('data-delay') || 0;
          setTimeout(() => {
            element.classList.add('revealed');
          }, delay * 1000);
        }
      });
    }
    
    // Initial check for elements already in view
    setTimeout(revealOnScroll, 100);
    
    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    
    // ===== STICKY HEADER =====
    const header = document.getElementById('header');
    
    function toggleStickyHeader() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Check on initial load
    toggleStickyHeader();
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleStickyHeader);
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    function toggleMobileMenu() {
      body.classList.toggle('menu-open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', body.classList.contains('menu-open'));
    }
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('menu-open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
    
    // Check on initial load
    setActiveLink();
    
    // Listen for scroll events
    window.addEventListener('scroll', setActiveLink);
    
    // ===== DARK MODE TOGGLE =====
    const themeToggle = document.querySelector('.theme-toggle');
    
    function toggleDarkMode() {
      body.classList.toggle('dark-theme');
      
      // Save preference to localStorage
      if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    }
    
    // Check for saved theme preference
    function loadThemePreference() {
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
      }
    }
    
    // Load theme preference on initial load
    loadThemePreference();
    
    // Add click event to theme toggle
    themeToggle.addEventListener('click', toggleDarkMode);
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.querySelector('.back-to-top');
    
    function toggleBackToTopBtn() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }
    
    // Check on initial load
    toggleBackToTopBtn();
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleBackToTopBtn);
    
    // ===== SMOOTH SCROLLING =====
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Check if it's a valid target
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Get offset for fixed header
          const headerOffset = header.offsetHeight;
          const targetOffset = targetElement.offsetTop - headerOffset;
          
          window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // ===== PROJECT FILTERING =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to current button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          // If "all" is selected or category matches filter
          if (filterValue === 'all' || category.includes(filterValue)) {
            card.style.display = 'block';
            
            // Add animation
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Hide after animation completes
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // ===== SKILL PROGRESS ANIMATION =====
    const skillBars = document.querySelectorAll('.progress-bar');
    
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const barValue = bar.getAttribute('data-value');
        
        // Use IntersectionObserver to detect when skill bar is in viewport
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Animate width based on data-value
              setTimeout(() => {
                bar.style.width = barValue;
              }, 300);
              
              // Unobserve after animation starts
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
      });
    }
    
    // Initialize skill bar animations
    animateSkillBars();
    
    // ===== FORM LABEL ANIMATION =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
      // Check if input has value on page load
      if (input.value !== '') {
        input.nextElementSibling.classList.add('active');
      }
      
      // Focus event
      input.addEventListener('focus', function() {
        this.nextElementSibling.classList.add('active');
      });
      
      // Blur event (only remove active class if input is empty)
      input.addEventListener('blur', function() {
        if (this.value === '') {
          this.nextElementSibling.classList.remove('active');
        }
      });
    });
    
    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        // Get form inputs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
          isValid = false;
          nameInput.classList.add('error');
        } else {
          nameInput.classList.remove('error');
        }
        
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
          isValid = false;
          emailInput.classList.add('error');
        } else {
          emailInput.classList.remove('error');
        }
        
        if (subjectInput.value.trim() === '') {
          isValid = false;
          subjectInput.classList.add('error');
        } else {
          subjectInput.classList.remove('error');
        }
        
        if (messageInput.value.trim() === '') {
          isValid = false;
          messageInput.classList.add('error');
        } else {
          messageInput.classList.remove('error');
        }
        
        // If form is not valid, prevent submission
        if (!isValid) {
          e.preventDefault();
        }
      });
    }
    
    // Email validation helper
    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
  });

    
