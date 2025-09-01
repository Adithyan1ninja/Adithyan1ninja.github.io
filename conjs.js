// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = level + '%';
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show success message (in a real app, you'd send this to a server)
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});

// Dropdown functions for contact page
function show_hide() {
    var dropdown = document.getElementById("list-items");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

function show_hide2() {
    var dropdown = document.getElementById("list-items2");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const buttons = document.querySelectorAll('.dropdown-btn');
    
    dropdowns.forEach((dropdown, index) => {
        if (!buttons[index].contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent;
        typeWriter(typingElement, originalText, 150);
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Legacy function for backward compatibility
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    console.log("hello");
}