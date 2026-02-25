// BADGE ANIMATION FUNCTIONALITY
function initBadgeAnimation() {
    const badgeContainer = document.querySelector(".badges");
    const badges = Array.from(document.querySelectorAll(".badges img"));

    if (!badgeContainer || badges.length === 0) {
        console.log('No badge container or badges found');
        return;
    }

    // Add initial hidden state to badges
    badges.forEach(badge => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Animate badges from left to right (original order)
                badges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.style.opacity = '0.7';
                        badge.style.transform = 'translateY(0)';
                    }, index * 150); // 150ms stagger between each badge
                });

                // Stop observing once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(badgeContainer);
    console.log('Badge animation initialized');
}

// Initialize badge animation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initBadgeAnimation();
});

// TESTIMONIAL SLIDER FUNCTIONALITY
function testimonialSlider() {
    return {
        currentIndex: 0,
        isTransitioning: false,
        testimonials: [
            {
                quote: "Her dedication to supporting the business community shines through in everything she does, from her comprehensive service offerings to her regular 'Limelight' series where she highlights other exceptional business owners. If you're looking for someone who is truly great at what they do, extremely helpful, and genuinely invested in your success, I highly recommend connecting with Ruth. She's the real deal!",
                name: "HP",
                title: "HMF Balling, Inc.",
                image: "./assets/images/hmf-balling.png"
            },
            {
                quote: "Ruth and her team of business partners are truly here to help and can provide such a wide variety of supportive and expansive needs for businesses and communities we all live in. Such a great individual and 5 STARS recommended!",
                name: "DD",
                title: "Primerica Financial Services",
                image: "./assets/images/primerica-financial-services.png"
            },
            {
                quote: "Ruth can help you get your business organized and growing. A godsend for the Solopreneur!",
                name: "YB",
                title: "Revitalized Communities Funding",
                image: "./assets/images/revitalized-communities-funding.png"
            },
            {
                quote: "Ruth and her team of business partners are truly here to help and can provide such a wide variety of supportive and expansive needs for businesses and communities we all live in. Such a great individual and 5 STARS recommended!",
                name: "BS",
                title: "Colorado Luxury Life",
                image: "./assets/images/colorado-luxury-life.png"
            },
            {
                quote: "I recently connected with Ruth, and even though we've only known each other a short time, it's easy to see why she receives such outstanding recommendations. I took time to read through several of them, and it's clear they weren't given lightly. The consistency and sincerity in what others say about her speak volumes. From what I've seen so far, Ruth truly reflects the professionalism and dedication people describe. I'm looking forward to getting to know her better and seeing more of the impact she makes in our business community.",
                name: "SP",
                title: "Kaizen Forward Solutions, Inc.",
                image: "./assets/images/kaizen-forward-solutions.jpg"
            },
            {
                quote: "Ruth's energy and kindness really shine through in everything she does. Her recognition as Local Business of the Year and one of the Top 20 Businesses is so well-deserved! I truly admire how Ruth uplifts others, shares valuable insights, and brings such a positive spirit to the Alignable community. She's the kind of person who makes this platform better for everyone.",
                name: "FM",
                title: "TekCheck Computer Services",
                image: "./assets/images/tekcheck-computer-services.png"
            },
        ],

        get currentTestimonial() {
            return this.testimonials[this.currentIndex];
        },

        nextTestimonial() {
            if (!this.isTransitioning) {
                this.isTransitioning = true;
                setTimeout(() => {
                    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
                    this.updateTestimonialDisplay();
                    this.isTransitioning = false;
                }, 300);
            }
        },

        previousTestimonial() {
            if (!this.isTransitioning) {
                this.isTransitioning = true;
                setTimeout(() => {
                    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
                    this.updateTestimonialDisplay();
                    this.isTransitioning = false;
                }, 300);
            }
        },

        goToTestimonial(index) {
            if (!this.isTransitioning && index !== this.currentIndex) {
                this.isTransitioning = true;
                this.currentIndex = index;
                setTimeout(() => {
                    this.updateTestimonialDisplay();
                    this.isTransitioning = false;
                }, 300);
            }
        },

        updateTestimonialDisplay() {
            const testimonial = this.currentTestimonial;
            const quoteElement = document.querySelector('.testimonial-quote');
            const nameElement = document.querySelector('.testimonial-name');
            const titleElement = document.querySelector('.testimonial-title');
            const imageElement = document.querySelector('.testimonial-image');
            const dots = document.querySelectorAll('.testimonial-dot');

            // Add transition class
            if (quoteElement) {
                quoteElement.classList.add('transitioning');
                setTimeout(() => {
                    quoteElement.textContent = testimonial.quote;
                    quoteElement.classList.remove('transitioning');
                }, 150);
            }

            if (nameElement) nameElement.textContent = testimonial.name;
            if (titleElement) titleElement.textContent = testimonial.title;
            if (imageElement) imageElement.src = testimonial.image;

            dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('bg-[#d4a373]', 'scale-125');
                    dot.classList.remove('bg-[#d4a373]/30');
                } else {
                    dot.classList.remove('bg-[#d4a373]', 'scale-125');
                    dot.classList.add('bg-[#d4a373]/30');
                }
            });
        },

        init() {
            this.updateTestimonialDisplay();

            // Add event listeners
            const prevBtn = document.querySelector('.testimonial-prev');
            const nextBtn = document.querySelector('.testimonial-next');
            const dots = document.querySelectorAll('.testimonial-dot');

            if (prevBtn) prevBtn.addEventListener('click', () => this.previousTestimonial());
            if (nextBtn) nextBtn.addEventListener('click', () => this.nextTestimonial());

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToTestimonial(index));
            });
        }
    };
}

// Initialize testimonial slider
document.addEventListener('DOMContentLoaded', function () {
    // Listen for testimonial component loaded event
    window.addEventListener('testimonialLoaded', function () {
        console.log('Testimonial loaded event received, initializing...');
        const testimonialSection = document.querySelector('[data-testimonial-slider]');
        if (testimonialSection) {
            const slider = testimonialSlider();
            slider.init();
        }
    });

    // Also try immediate initialization in case component loads first
    setTimeout(() => {
        const testimonialSection = document.querySelector('[data-testimonial-slider]');
        if (testimonialSection) {
            console.log('Initializing testimonial slider (immediate)...');
            const slider = testimonialSlider();
            slider.init();
        } else {
            console.log('Testimonial section not found, waiting for load event...');
        }
    }, 100);
});


//  SERVICES PAGE
// Tab switching functionality for services page
function openService(evt, serviceName) {
    var i, panels, btns;

    // Hide all panels
    panels = document.getElementsByClassName("tabs-panel");
    for (i = 0; i < panels.length; i++) {
        panels[i].classList.remove("active");
        panels[i].style.display = "none";
    }

    // Remove active class from all buttons
    btns = document.getElementsByClassName("services-tab-btn");
    for (i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
    }

    // Show selected panel and activate button
    var targetPanel = document.getElementById(serviceName);
    if (targetPanel) {
        targetPanel.classList.add("active");
        targetPanel.style.display = "block";
        evt.currentTarget.classList.add("active");
    }
}
