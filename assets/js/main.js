// Active navigation highlighting based on scroll position
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id], .hero');
  const navLinks = document.querySelectorAll('.menu-button');
  
  function highlightNavigation() {
    let scrollPosition = window.scrollY + 150; // Offset for better UX
    
    // Default to About if at top of page
    if (window.scrollY < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#about') {
          link.classList.add('active');
        }
      });
      return;
    }
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Run on page load
});

// Photo lightbox functionality - DESKTOP ONLY
if (window.innerWidth > 768) {
  document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <img class="lightbox-image" src="" alt="">
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    // Open lightbox when photo is clicked
    photoItems.forEach(item => {
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });
    
    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  });
}

// Mobile photo tap to show title - MOBILE ONLY
if (window.innerWidth <= 768) {
  document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
      let isShowing = false;
      
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const overlay = this.querySelector('.photo-overlay');
        const title = this.querySelector('.photo-title');
        
        if (isShowing) {
          // Hide
          overlay.classList.remove('show-mobile');
          title.classList.remove('show-mobile');
          isShowing = false;
        } else {
          // Show
          overlay.classList.add('show-mobile');
          title.classList.add('show-mobile');
          isShowing = true;
        }
      });
    });
  });
}