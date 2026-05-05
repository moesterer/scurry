
(function () {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    reveals.forEach(function (item) {
      item.classList.add('visible');
    });
  }

  const form = document.querySelector('#waitlist-form');
  const success = document.querySelector('.success-message');
  if (form && success) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      success.classList.add('show');
      form.reset();
    });
  }

  const phoneDemo = document.querySelector('.phone-demo');

  if (phoneDemo) {
    const slides = Array.from(phoneDemo.querySelectorAll('.mockup-slide'));
    let currentIndex = 0;
  
    function clearSlideStates() {
      slides.forEach(function (slide) {
        slide.classList.remove('active');
        slide.classList.remove('leaving');
        slide.classList.remove('scroll-inside');
      
        const img = slide.querySelector('img');
      
        if (img) {
          img.style.removeProperty('--scroll-distance');
          img.style.animation = 'none';
          img.offsetHeight;
          img.style.animation = '';
        }
      });
    }
  
    function prepareLongScreen(slide) {
      const img = slide.querySelector('img');
      const clip = phoneDemo.querySelector('.phone-screen-clip');
    
      if (!img || !clip) {
        return false;
      }
    
      const scrollDistance = img.offsetHeight - clip.offsetHeight;
    
      if (scrollDistance > 8) {
        img.style.setProperty('--scroll-distance', `-${scrollDistance}px`);
        slide.classList.add('scroll-inside');
        return true;
      }
    
      return false;
    }
  
    function showNextSlide() {
      const currentSlide = slides[currentIndex];
      const nextIndex = (currentIndex + 1) % slides.length;
      const nextSlide = slides[nextIndex];
    
      currentSlide.classList.remove('active');
      currentSlide.classList.remove('scroll-inside');
      currentSlide.classList.add('leaving');
    
      nextSlide.classList.add('active');
    
      window.setTimeout(function () {
        currentSlide.classList.remove('leaving');
        prepareLongScreen(nextSlide);
      }, 800);
    
      currentIndex = nextIndex;
    }
  
    function startMockupCycle() {
      if (!slides.length) {
        return;
      }
    
      clearSlideStates();
      slides[0].classList.add('active');
      prepareLongScreen(slides[0]);
    
      window.setInterval(showNextSlide, 4200);
    }
  
    window.addEventListener('load', startMockupCycle);
  }
})();
