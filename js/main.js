// Pro Shine Hand Car Wash - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Smooth scroll values with lerp (linear interpolation)
    let currentScroll = 0;
    let targetScroll = 0;
    const scrollEase = 0.08; // Lower = slower/smoother

    // Lerp function for smooth interpolation
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Update scroll position smoothly
    function updateScroll() {
        targetScroll = window.scrollY;
        currentScroll = lerp(currentScroll, targetScroll, scrollEase);
        
        const heroHeight = hero.offsetHeight;
        const scrollProgress = Math.min(currentScroll / heroHeight, 1);

        // Parallax effect on hero background (moves slower than scroll)
        const parallaxOffset = currentScroll * 0.4;
        heroBg.style.transform = `translateY(${parallaxOffset}px) scale(${1 + scrollProgress * 0.08})`;
        heroOverlay.style.transform = `translateY(${parallaxOffset}px)`;

        // Hero content fades out and moves up as you scroll
        heroContent.style.transform = `translateY(${currentScroll * 0.25}px)`;
        heroContent.style.opacity = 1 - scrollProgress * 1.2;

        // Scroll indicator fades out
        if (scrollIndicator) {
            scrollIndicator.style.opacity = 1 - scrollProgress * 2.5;
        }

        // Show navbar after scrolling past 80% of hero
        if (currentScroll > heroHeight * 0.8) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }

        requestAnimationFrame(updateScroll);
    }

    // Start the animation loop
    requestAnimationFrame(updateScroll);

    // Fade up animation on scroll
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links with custom duration
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1500; // ms - longer = slower
                let start = null;

                function smoothScroll(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Easing function for smooth deceleration
                    const easing = 1 - Math.pow(1 - percentage, 4);
                    
                    window.scrollTo(0, startPosition + distance * easing);
                    
                    if (progress < duration) {
                        requestAnimationFrame(smoothScroll);
                    }
                }

                requestAnimationFrame(smoothScroll);
            }
        });
    });
});
