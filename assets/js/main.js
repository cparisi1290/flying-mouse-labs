// Main JavaScript file for Flying Mouse Labs
console.log('Flying Mouse Labs - JS loaded successfully!');

// Example: Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing scripts...');
    // Add your JavaScript code here
    
    // 1. Reveal Animation Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
     threshold: 0.2 
    });

    document.querySelectorAll('.section-reveal').forEach(el => revealObserver.observe(el));

	/* --- NAV BAR LOGIC --- */
	let lastScrollY = window.scrollY;
    const nav = document.getElementById('bespoke-nav');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // If scrolling down and past 150px, hide nav
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            nav.classList.add('nav-hidden');
        } 
        // If scrolling up, show nav
        else if (currentScrollY < lastScrollY) {
            nav.classList.remove('nav-hidden');
        }
        
        // Always show nav if at the very top
        if (currentScrollY <= 150) {
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;
    });

    /* --- MOBILE NAV BAR LOGIC --- */
    const hamburger = document.getElementById('hamburger-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navOverlayClose = document.getElementById('nav-overlay-close');
    const navLinks = document.querySelectorAll('.nav-overlay-links .nav-item, .nav-overlay-cta .btn-frame');

    if (hamburger && navOverlay && navOverlayClose) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('nav-overlay-open');
        });

        // Close overlay when clicking X button
        navOverlayClose.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('nav-overlay-open');
        });

        // Close overlay when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('nav-overlay-open');
            });
        });

        // Close overlay when clicking outside
        navOverlay.addEventListener('click', (e) => {
            if (e.target === navOverlay) {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('nav-overlay-open');
            }
        });
    }

    
        /* --- SERVICES LOGIC --- */
    (function() {
        const container = document.querySelector('#services-accordion');
        if (!container) return;

        const blades = container.querySelectorAll('.blade');

        blades.forEach(blade => {
            blade.addEventListener('mouseenter', () => {
                // Remove active from all siblings in THIS container
                blades.forEach(b => b.classList.remove('active'));
                // Add active to current
                blade.classList.add('active');
                
                // Debugging: uncomment the line below if it still doesn't work 
                // console.log('Blade active:', blade);
            });
            
            // Add touch events for mobile support
            blade.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent default touch behavior
                // Remove active from all siblings in THIS container
                blades.forEach(b => b.classList.remove('active'));
                // Add active to current
                blade.classList.add('active');
                
                // Debugging: uncomment the line below if it still doesn't work 
                // console.log('Blade active (touch):', blade);
            });
        });
    }()); // Fix IIFE closure here

    // Portfolio Logic
    const carousel = document.getElementById('carousel');
    const lightbox = document.getElementById('arctic-lightbox');
    const lbStack = document.getElementById('lb-visual-stack');
    const lbScroll = document.getElementById('lb-scroll');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    const lbCounter = document.getElementById('lb-counter');
    const lbClose = document.getElementById('lb-close-btn');

    // Mobile detection
    const isMobile = window.innerWidth <= 768;

    if(carousel) {
        let portRot = 0;
        let isPaused = false;
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;

    const projectData = [
        {
            cover: 'kvs-port-cover.gif',
            title: "Kay's Virtual Solutions",
            category: 'Website Design',
            description: `Kayla came to us knowing her old website just wasn’t cutting it. She wanted something that actually reflected her vibe of being polished, feminine and ready to attract her dream clients. Using her existing logo, colors, and fonts, we built a site that felt like her and resonated with the people she wanted to work with. 
            
            As her business evolved into business efficiency consulting, we updated her site with the same brand but with fresh brand photos and a custom AI-scripted chatbot.`,
            quote: `"I always fall in love with Cassandra's designs. She consistently delivers on professionalism and impact. Seriously, I'm always impressed with Cassandra and her design abilities. She's my go to girl for web design."`,
            before: 'kvs-before.png',
            after: 'kvs-after.png'
        },
        {
            cover: 'luxe-port-cover.gif',
            title: 'Luxe Pet Parlor',
            category: 'Branding + Web Design',
            description: `Cheyanne came to us needing a rebrand from loud and disheveled to calming and luxurious. Inspired by her Cajun roots and spa-like vision, we created a soothing visual identity using pastel greens, soft purples, and natural wood tones.`,
            quote: '“The thing I liked most about working with Cass was how easy she made everything. I could focus on my business without feeling stressed about the technical side of things, and her communication was excellent throughout the project.”',
            before: '', 
            after: 'luxe-after.png'
        },
		{
            cover: 'nhc-port-cover.gif',
            title: 'Nova Health Collective',
            category: 'Branding + Web Design',
            description: `Mason came to [us] ready to level up her brand and expand her offerings from midwifery to include psychedelic facilitation. She needed a brand that felt aligned with her vision so we left behind a partner-chosen logo and created something entirely new. The result: a grounded, modern and strategic brand identity and a custom 5-page website with a client portal for resources and an events page to support her growing practice. Now, Mason’s online presence feels as expansive and intentional as her work.`,
            quote: `I really like [the logo]!  I love it, this looks really wonderful and I don't have any revisions to the website to request.`,
            before: '', 
            after: 'nhc-after.png'
        },
		{
            cover: 'colliance-port-cover.gif',
            title: 'Colliance Online Business Management',
            category: 'Website Redesign',
            description: 'After their original designer ghosted them, Sandy needed someone to step in and bring her vision to life. Using the existing branding, we rebuilt her website to feel brighter, more inviting, and easy to navigate. I expanded the site to include individual service pages, team intros, and tiered offerings specific to different business stages. We also designed two strategic sales funnels for their project management and bookkeeping services. The result is a warm, well-structured site that truly reflects their professionalism and builds trust with potential clients.',
            quote: '[Flying Mouse Labs] is always on top of any task we give [them] and does incredible design work.',
            before: 'colliance-before.png', 
            after: 'colliance-after.png'
        },
		{
            cover: 'das-port-cover.gif',
            title: 'Damaris Accounting Services',
            category: 'Web Design',
            description: 'Damaris, an accountant offering bookkeeping, tax prep, business formation, and accounting services, needed a site that matched the quality of her work. Her original site fell short, so we rebuilt it on Squarespace using her existing logo and elevated the branding to feel modern, professional, and luxurious. The new single-page site clearly presents her services, with on-page SEO and Google tools in place to support future growth. Damaris said I brought her vision to life and that she didn’t know her site could look this good.',
            quote: `I had a website that was done for free, but it wasn’t finished, and it definitely didn’t reflect the quality of my business. I knew I needed something more professional, but I wasn’t sure who to trust with the redesign. I was concerned about finding someone who could understand my business and make the process feel manageable.

            [Flying Mouse Labs] made it incredibly easy. From strategy to Google Business Profile to the design itself, she brought everything together beautifully. My new website is even better than I imagined it could be!`,
            before: '', 
            after: 'das-after.png'
        },
		{
            cover: 'gg-port-cover.gif',
            title: 'Grateful Graze',
            category: 'Branding + Web Design',
            description: 'A premium visual identity built for high-scale digital commerce.',
            quote: `We have worked together remotely and to say it’s been a breeze during the whole website design would be an understatement! Cassandra is so great to work with, she created exactly what I had envisioned and I couldn’t be happier with how the new website turned out. 

            If you need any design or website development done for your business please reach out to Cassandra, you won’t be disappointed!`,
            before: '', 
            after: 'gg-after.png'
        }
        // Add more objects here for each project...
    ];

    projectData.forEach((project, i) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        
        if (isMobile) {
            // Mobile: Create horizontal slider cards with smaller gap
            card.style.transform = `translateX(${i * 105}%)`; // Reduced spacing from 120% to 105%
            card.style.position = 'absolute';
            card.style.width = '85%'; // Increased from 80% to reduce gap
            card.style.height = '100%';
            card.style.left = '7.5%'; // Adjusted start offset for centering
            card.style.top = '0';
        } else {
            // Desktop: Create 3D rotating carousel
            const angle = i * (360 / projectData.length);
            card.style.transform = `rotateY(${angle}deg) translateZ(550px)`;
        }
        
        const pathBase = 'assets/images/';
        const path = `${pathBase}${project.cover}`;
        card.innerHTML = `<div class="card-image" style="background-image:url('${path}')"></div>`;

        if (isMobile) {
            // Mobile: Add touch events
            card.addEventListener('touchstart', handleTouchStart, { passive: true });
            card.addEventListener('touchmove', handleTouchMove, { passive: true });
            card.addEventListener('touchend', handleTouchEnd, { passive: true });
        } else {
            // Desktop: Keep existing mouse events
            card.addEventListener('mouseenter', () => {
                isPaused = true;
            });
            card.addEventListener('mouseleave', () => { 
                if(!lightbox.classList.contains('active')) {
                    isPaused = false; 
                    animPort(); // Restart animation when mouse leaves
                }
            });
        }

        card.addEventListener('click', () => {
            currentIndex = i;
            updateLightbox();
            lightbox.classList.add('active');
            isPaused = true;
        });

        carousel.appendChild(card);
    });

    // For infinite scroll, duplicate the projects on mobile
    if (isMobile) {
        projectData.forEach((project, i) => {
            const duplicateCard = document.createElement('div');
            duplicateCard.className = 'portfolio-card';
            duplicateCard.style.transform = `translateX(${(i + projectData.length) * 105}%)`; // Match new spacing
            duplicateCard.style.position = 'absolute';
            duplicateCard.style.width = '85%'; // Match original cards
            duplicateCard.style.height = '100%';
            duplicateCard.style.left = '7.5%'; // Match original cards
            duplicateCard.style.top = '0';
            
            const pathBase = 'assets/images/';
            const path = `${pathBase}${project.cover}`;
            duplicateCard.innerHTML = `<div class="card-image" style="background-image:url('${path}')"></div>`;

            duplicateCard.addEventListener('touchstart', handleTouchStart, { passive: true });
            duplicateCard.addEventListener('touchmove', handleTouchMove, { passive: true });
            duplicateCard.addEventListener('touchend', handleTouchEnd, { passive: true });

            duplicateCard.addEventListener('click', () => {
                const originalIndex = i; // Use original project index for lightbox
                currentIndex = originalIndex;
                updateLightbox();
                lightbox.classList.add('active');
                isPaused = true;
            });

            carousel.appendChild(duplicateCard);
        });
    }

    // Mobile touch handlers
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        carousel.style.transition = 'none';
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        touchEndX = e.touches[0].clientX;
        const diff = touchEndX - touchStartX;
        const maxTranslate = -(projectData.length - 1) * 105; // Updated for new spacing
        const minTranslate = 7.5; // Updated start position
        const currentTranslate = currentIndex * -105; // Updated for new spacing
        const newTranslate = Math.max(maxTranslate, Math.min(minTranslate, currentTranslate + (diff / window.innerWidth) * 120));
        carousel.style.transform = `translateX(${newTranslate}%)`;
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.transition = 'transform 0.3s ease';
        
        const diff = e.changedTouches[0].clientX - touchStartX;
        const threshold = window.innerWidth / 6; // Reduced threshold for better UX
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex > 0) {
                // Swipe right - go to previous
                currentIndex--;
            } else if (diff < 0 && currentIndex < projectData.length * 2 - 1) {
                // Swipe left - go to next (include duplicated cards)
                currentIndex++;
            } else if (diff < 0 && currentIndex >= projectData.length * 2 - 1) {
                // Swipe left from last duplicated card - go to first
                currentIndex = 0;
            } else if (diff > 0 && currentIndex === 0) {
                // Swipe right from first card - go to last duplicated
                currentIndex = projectData.length * 2 - 1;
            }
            updateMobileSlider();
        } else {
            // Not enough swipe - snap back to current
            updateMobileSlider();
        }
    }

    function updateMobileSlider() {
        carousel.style.transform = `translateX(${currentIndex * -105}%)`; // Updated for new spacing
    }

    function updateLightbox() {
        // Use modulo to get correct project index for infinite scroll
        const projectIndex = currentIndex % projectData.length;
        const project = projectData[projectIndex];
        const pathBase = 'assets/images/';
        
        lbScroll.scrollTop = 0;
        document.getElementById('lb-title').innerText = project.title;
        document.getElementById('lb-category').innerText = `// CATEGORY: ${project.category}`;
        document.getElementById('lb-description').innerText = project.description;
        document.getElementById('lb-quote').innerText = project.quote;
        //document.getElementById('lb-index').innerText = `PROJECT: ${currentIndex + 1} / ${projectData.length}`;

        let visualHtml = '';
        if (project.before && project.before !== "") {
            visualHtml = `
                <div class="comparison-grid">
                <div class="lb-image-block">
                    <p class="pane-label">01_BEFORE</p>
                    <img src="${pathBase}${project.before}">
                </div>
                <div class="lb-image-block">
                    <p class="pane-label">02_AFTER</p>
                    <img src="${pathBase}${project.after}">
                </div>
            </div>`;
        } else {
            visualHtml = `<div class="lb-image-block"><img src="${pathBase}${project.after}"></div>`;
        }
        lbStack.innerHTML = visualHtml;
    }

    // NEXT BUTTON
    lbNext.addEventListener('click', () => {
        if (isMobile) {
            currentIndex = (currentIndex + 1) % (projectData.length * 2);
            updateMobileSlider();
            updateLightbox(); // Also update lightbox content on mobile
        } else {
            currentIndex = (currentIndex + 1) % projectData.length;
            updateLightbox();
        }
    });

    // PREVIOUS BUTTON
    lbPrev.addEventListener('click', () => {
        if (isMobile) {
            currentIndex = (currentIndex - 1 + projectData.length * 2) % (projectData.length * 2);
            updateMobileSlider();
            updateLightbox(); // Also update lightbox content on mobile
        } else {
            currentIndex = (currentIndex - 1 + projectData.length) % projectData.length;
            updateLightbox();
        }
    });

    // CLOSE LIGHTBOX
    lbClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        isPaused = false;
    });

    // CLICK OUTSIDE TO CLOSE
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            isPaused = false;
        }
    });

    function animPort() { 
        if (!isPaused && !isMobile) {
            portRot -= 0.15;
            carousel.style.transform = `rotateY(${portRot}deg)`; 
            requestAnimationFrame(animPort); 
        }
    }
    
    // Only start desktop animation if not mobile
    if (!isMobile) {
        animPort();
    }

    // 4. Mobile Contact Lightbox Functionality
    const mobileContactBtn = document.getElementById('mobile-contact-btn');
    const contactLightbox = document.getElementById('contact-lightbox');
    const contactLightboxClose = document.getElementById('contact-lightbox-close');
    const lightboxInquiryForm = document.getElementById('lightbox-inquiry-form');

    // Debug logging
    console.log('Mobile Contact Debug:');
    console.log('isMobile:', isMobile);
    console.log('mobileContactBtn:', mobileContactBtn);
    console.log('contactLightbox:', contactLightbox);
    console.log('contactLightboxClose:', contactLightboxClose);
    console.log('lightboxInquiryForm:', lightboxInquiryForm);

    // Mobile: Show contact button and setup lightbox
    if (isMobile && mobileContactBtn && contactLightbox) {
        console.log('Setting up mobile contact lightbox...');
        
        // Show mobile contact button
        mobileContactBtn.style.display = 'inline-block';
        console.log('Mobile contact button shown');

        // Open lightbox when button is clicked
        mobileContactBtn.addEventListener('click', () => {
            console.log('Mobile contact button clicked!');
            contactLightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            console.log('Lightbox opened');
        });

        // Close lightbox when close button is clicked
        contactLightboxClose.addEventListener('click', () => {
            console.log('Close button clicked');
            contactLightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close lightbox when clicking outside the content
        contactLightbox.addEventListener('click', (e) => {
            if (e.target === contactLightbox) {
                console.log('Outside click - closing lightbox');
                contactLightbox.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });

        // Handle form submission in lightbox
        if (lightboxInquiryForm) {
            lightboxInquiryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simple form validation
                const formData = new FormData(lightboxInquiryForm);
                const requiredFields = lightboxInquiryForm.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = 'red';
                    } else {
                        field.style.borderColor = '#ddd';
                    }
                });

                if (isValid) {
                    // Show success message
                    const submitBtn = lightboxInquiryForm.querySelector('.submit-btn');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<span>✓ Message Sent!</span>';
                    submitBtn.style.background = '#4CAF50';
                    
                    // Reset form after delay
                    setTimeout(() => {
                        lightboxInquiryForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        contactLightbox.classList.remove('active');
                        document.body.style.overflow = '';
                    }, 2000);
                } else {
                    // Show error message
                    const submitBtn = lightboxInquiryForm.querySelector('.submit-btn');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<span>Please fill required fields</span>';
                    submitBtn.style.background = '#f44336';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                    }, 2000);
                }
            });
        }

        // Close lightbox on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactLightbox.classList.contains('active')) {
                console.log('Escape key pressed - closing lightbox');
                contactLightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.log('Mobile contact lightbox setup skipped');
        console.log('Reasons:');
        console.log('- isMobile:', isMobile);
        console.log('- mobileContactBtn exists:', !!mobileContactBtn);
        console.log('- contactLightbox exists:', !!contactLightbox);
    }
    }
    }());

    // Testimonials Logic
    const track = document.getElementById('testiTrack');
    /* if (track) {
        const displayList = [...reviews, ...reviews, ...reviews];
        track.innerHTML = displayList.map(createCard).join('');
    } */

    // Mobile Testimonials Swipe Functionality
    let testimonialsData = [];
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    // Initialize testimonials data
    function initTestimonialsData() {
        testimonialsData = [
            {
                badge: "Incredible Design + Deep Expertise",
                q: "[Flying Mouse Labs] is our go-to web designer. She's always on top of any task we give her and does incredible design work. I'm always impressed with her subject matter knowledge and professionalism.",
                n: "Sandy L.",
                b: "Colliance Online Business Management",
                i: "./assets/images/colliance-profile.jpg"
            },
            {
                badge: "SEO Audit + Backend Rescue",
                q: "This was my second time working with [Flying Mouse Labs], and both experiences were fantastic. Many of her thoughtful suggestions turned out to be game changers for my photography business.",
                n: "Kathy C.",
                b: "KCruts Photography",
                i: "./assets/images/kcruts-profile.jpg"
            },
            {
                badge: "100% On-Brand",
                q: "[Flying Mouse Labs] created a website that is FABULOUS and really speaks to my personality and branding! [They are] very knowledgeable and will make sure she creates a site that aligns with your expectations and vision.",
                n: "Robin P.",
                b: "Dos Gatos Property Management",
                i: "./assets/images/dgpm-profile.png"
            },
            {
                badge: "Professional Site, Personal Touch",
                q: "I lovvvvvve the website - it is beautiful!! I'm so happy with the website and your work!!! She took on 'hard' parts of website design away from me and made it intimidating and daunting task of building my company's website completely manageable. I feel very satisfied with the entire process especially the final product.",
                n: "Kayla S.",
                b: "Kay's Virtual Solutions",
                i: "./assets/images/kvs-profile.jpg"
            },
            {
                badge: "+450% Engagement",
                q: "Within the first two months of launching, I saw a huge increase in activity. Website clicks doubled, and profile interactions were up over 450% compared to the same time last year.",
                n: "Damaris E.",
                b: "Damaris Accounting Services",
                i: "./assets/images/das-profile.jpg"
            },
            {
                badge: "Honest & Visionary Designer",
                q: "[Flying Mouse Labs] is phenomenal, extremely honest, and accurate. [They are] incredibly reliable, and have gone above and beyond the call of duty on numerous occasions. [They are] wonderful to work with, true visionaries.",
                n: "Kathy C.",
                b: "KCruts Photography",
                i: "./assets/images/kcruts-profile.jpg"
            },
            {
                badge: "Brand Vision Mastery",
                q: "Beauty and performance are not mutually exclusive. We specialize in creating experiences that are both visually stunning and technically optimized. Every millisecond counts, every pixel matters.",
                n: "Partnership Over Projects",
                q: "We don't just deliver projects—we build partnerships. Our success is measured by your success, and we're committed to being there long after the launch to ensure continued growth and optimization.",
                n: "Suzanne H.",
                b: "Bookkeeping Concepts",
                i: "./assets/images/bkkg-concepts-profile.png"
            }
        ];
    }

    function createCard(item) {
        return `
            <div class="glass-card">
                <img src="${quoteImgUrl}" class="quote-img" alt="Quote">
                <div class="result-badge">${item.badge}</div>
                <div class="quote">"${item.q}"</div>
                <div class="client-box">
                    <div class="avatar" style="background-image: url('${item.i}')"></div>
                    <div>
                        ${item.n}<br>
                        <small style="color: #666; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase;">${item.b}</small>
                    </div>
                </div>
            </div>
        `;
    }

    // Mobile touch event handlers
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        // Prevent default touch behavior
        e.preventDefault();
        
        // Swipe threshold - increased for better detection
        if (Math.abs(diff) > 80) {
            if (diff > 0) {
                // Swipe right - go to next
                currentIndex = (currentIndex + 1) % testimonialsData.length;
            } else {
                // Swipe left - go to previous
                currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
            }
            updateTestimonialsSlider();
        }
    }

    function handleTouchEnd(e) {
        isDragging = false;
    }

    function updateTestimonialsSlider() {
        const cards = track.querySelectorAll('.glass-card');
        
        // Set z-index for proper stacking
        cards.forEach((card, index) => {
            const position = (index - currentIndex + testimonialsData.length) % testimonialsData.length;
            card.style.transform = `translateX(${position * 100}%)`;
            card.style.opacity = index === currentIndex ? '1' : '0.3';
            card.style.zIndex = index === currentIndex ? '10' : '5'; // Active card on top
        });
    }

    // Initialize testimonials on page load
    document.addEventListener('DOMContentLoaded', () => {
        initTestimonialsData();
        
        // Add touch event listeners for mobile
        const testimonialsSection = document.querySelector('#testimonials');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('touchstart', handleTouchStart, { passive: true });
            testimonialsSection.addEventListener('touchmove', handleTouchMove, { passive: true });
            testimonialsSection.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
    });
    const quoteImgUrl = "assets/images/glass-quotes-dark.svg"; 

        const reviews = [
            { 
                badge: "Incredible Design + Deep Expertise", 
                q: "[Flying Mouse Labs] is our go-to web designer. She's always on top of any task we give her and does incredible design work. I'm always impressed with her subject matter knowledge and professionalism.", 
                /* qb: "Cassandra is our go-to web designer. She's always on top of any task we give her and does incredible design work. I'm always impressed with her subject matter knowledge and professionalism.", */ 
                n: "Sandy L.", 
                b: "Colliance Online Business Management",
                i: "./assets/images/colliance-profile.jpg" 
            },
            { 
                badge: "SEO Audit + Backend Rescue", 
                q: "This was my second time working with [Flying Mouse Labs], and both experiences were fantastic. Many of her thoughtful suggestions turned out to be game changers for my photography business.", 
                /* qb: "I highly recommend reaching out to Cassandra before attempting any bold backend maneuvers on your website!. [Flying Mouse Lab] is my go-to for all website-related issues, queries, and strategies.This was my second time working with Cass, and both experiences were fantastic. She is attentive, professional, and very easy to talk to. I had a series of self-inflicted backend issues that I couldn’t resolve on my own, and Cassandra was a great listener who understood my goals thoroughly. She executed everything in a timely manner, kept me updated with progress reports, and made thoughtful suggestions along the way - many of which turned out to be game changers for my photography business. Her patience and lovely demeanor made the whole process a pleasure. Highly recommend!",  */
                n: "Kathy C.", 
                b: "KCruts Photography",
                i: "./assets/images/kcruts-profile.jpg"
            },
            { 
                badge: "Professional Site, Personal Touch", 
                q: "I lovvvvvve the website - it is beautiful!! I'm so happy with the website and your work!!! She took the 'hard' parts of website design away from me and made the intimidating and daunting task of building my company's website completely manageable.", 
                /* qb: "[Flying Mouse Labs] helps take the stress of building your website away from you. She'll take the time necessary to make sure she fully understands your needs and the direction you'd like your site to take. She took the 'hard' parts of website design away from me and made the intimidating and daunting task of building my company's website completely manageable. I feel very satisfied with the entire process especially the final product.",  */
                n: "Robin P.", 
                b: "Dos Gatos Property Management",
                i: "./assets/images/dgpm-profile.png"
            },
            { 
                badge: "100% On-Brand", 
                q: "[Flying Mouse Labs] created a website that is FABULOUS and really speaks to my personality and branding! [They are] very knowledgeable and will make sure [they] create a site that aligns with your expectations and vision.", 
                /* qb: "I wanted a site that spoke to my brand and came across as professional and modern. I suppose my main hesitation was if the site would speak to my vision. I would say that Cassandra is very knowledgeable and will make sure she creates a site that aligns with your expectations and vision. [Flying Mouse Lab] created a website that is FABULOUS and really speaks to my personality and branding!",  */
                n: "Kayla S.", 
                b: "Kay's Virtual Solutions",
                i: "./assets/images/kvs-profile.jpg"
            },
            { 
                badge: "+450% Engagement", 
                q: "Within the first two months of launching, I saw a huge increase in activity. Website clicks doubled, and profile interactions were up over 450% compared to the same time last year.", 
                /* qb: "The process is collaborative and thoughtful and Cass is professional and truly committed to helping your business succeed.. Before working with [Fly Mouse Lab], I had a website that was done for free, but it wasn’t finished, and it definitely didn’t reflect the quality of my business. I knew I needed something more professional, but I wasn’t sure who to trust with the redesign. I was concerned about finding someone who could understand my business and make the process feel manageable. <br> <br> Cass made it incredibly easy. From strategy to Google Business Profile to the design itself, she brought everything together beautifully. My new website is even better than I imagined it could be!",  */
                n: "Damaris E.", 
                b: "Damaris Accounting Services",
                i: "./assets/images/das-profile.jpg" 
            },
            { 
                badge: "Brand Vision Mastery", 
                q: "The entire process was smooth and collaborative, and [Flying Mouse Labs] made sure every idea was not just heard but brought to life better than I imagined.", 
                /* qb: "The entire process was smooth and collaborative, and Cass made sure every idea was not just heard but brought to life better than I imagined. I genuinely enjoyed the process—she was patient, knowledgeable, and always on top of things. <br><br> What I love most about my new website is how perfectly it reflects my brand. It feels professional, modern, and uniquely tailored to my grooming business, which makes it stand out from competitors. She captured my style and values, and the functionality is so intuitive—my clients love it, too! <br><br>The thing I liked most about working with Cass was how easy she made everything. I could focus on my business without feeling stressed about the technical side of things, and her communication was excellent throughout the project.", */ 
                n: "Cheyanne F.", 
                b: "Luxe Pet Parlor",
                i: "./assets/images/lpp-profile.jpg"
            },
            { 
                badge: "Honest & Visionary Designer", 
                q: "[Flying Mouse Labs] is phenomenal, extremely honest, and accurate. [They are] incredibly reliable, and have gone above and beyond the call of duty on numerous occasions. [They are] wonderful to work with, true visionaries.", 
                /* qb: "Cassandra is AMAZING. You made my dreams come true. You made the entire experience perfect. I felt like we had known each other for years. It is with immense pleasure to highly recommend Cassandra Parisi. Finding Cassandra was a most fortuitous occurrence. She is an exceptional web designer. I had a horrible experience with my previous web designer, lost time, and a lot of money. Cassandra is phenomenal, extremely honest, and accurate. She communicates quickly and will make your site better than you ever dreamed. During my interaction with my prior web designer, I developed a disdain for the myriad of excuses and lack of communication that was all too prevalent. These problems were NEVER encountered with Cassandra. She is virtually always available, is incredibly reliable, and has gone above and beyond the call of duty on numerous occasions. Cassandra even went as far as helping to EDUCATE me about what exactly she is doing to my site and why certain steps need to be taken, etc. She is not merely a web designer, but also a quasi-business consultant with in-depth understanding of topics including but not limited to search engine optimization, data encryption, design, and hosting. Cassandra worked with my ideas and made sure everything was perfect. Her expertise is beyond words and her willingness to help and suggest ideas is phenomenal, she cares about her clients and is a wonderful person to work with, a true visionary. One of her greatest assets is the ability to articulate ideas over emails. I can navigate my way around a computer with ease, but compared to her, I am a novice. Cassandra – you have been wonderful to work with. You have worked wonders with our new website. We have only compliments from our clients. I was a bit hesitant working with someone “out of state” and via “internet”- Your communication skills, quickness of reply and accuracy sure proved me wrong. You are very competent but above all it is your professionalism, responsiveness, and high degree of integrity that I found refreshing. You are a rare find and I highly recommend everyone that is need of a website inquiring about your services. I will use you again for my next site and recommend you to everyone I know who needs a top-notch web designer.",  */
                n: "Suzanne H.", 
                b: "Bookkeeping Concepts",
                i: "./assets/images/bkkg-concepts-profile.png"
            },
            { 
                badge: "Virtual Yet Professional", 
                q: "We have worked together remotely and to say it’s been a breeze during the whole website design would be an understatement! [Flying Mouse Labs] listened to exactly what my scattered website design vision was and delivered it beautifully!", 
                n: "Ericka M.", 
                b: "Grateful Graze",
                i: "./assets/images/gg-profile.jpg"
            }
        ];

        function createCard(item) {
            return `
                <div class="glass-card">
                    <img src="${quoteImgUrl}" class="quote-img" alt="Quote">
                    <div class="result-badge">${item.badge}</div>
                    <div class="quote">"${item.q}"</div>
                    <!--<div class="quote-body">${item.qb}</div>-->
                    <div class="client-box">
                        <div class="avatar" style="background-image: url('${item.i}')"></div>
                        <div>
                            ${item.n}<br>
                            <small style="color: #666; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase;">${item.b}</small>
                        </div>
                    </div>
                </div>
            `;
        }
    
        const displayList = [...reviews, ...reviews, ...reviews];
        track.innerHTML = displayList.map(createCard).join('');
		

    // --- ADD COUNTER ANIMATION (OPTIONAL BUT COOL) ---
    // This makes the numbers like "+142%" count up when you scroll to them
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metrics = entry.target.querySelectorAll('.metric-value');
                metrics.forEach(m => {
                    const target = parseFloat(m.innerText.replace(/[^0-9.]/g, ''));
                    let current = 0;
                    const increment = target / 50;
                    const updateCount = () => {
                        if (current < target) {
                            current += increment;
                            m.innerText = (m.innerText.includes('+') ? '+' : '') + 
                                        (m.innerText.includes('$') ? '$' : '') + 
                                        current.toFixed(target % 1 === 0 ? 0 : 1) + 
                                        (m.innerText.includes('%') ? '%' : '') +
                                        (m.innerText.includes('s') ? 's' : '');
                            setTimeout(updateCount, 20);
                        }
                    };
                    updateCount();
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const perfSection = document.querySelector('.perf-glass-grid');
    if(perfSection) observer.observe(perfSection);


    // ABOUT Logic
    /**
     * ARC TRIPTYCH ENGINE
     * Handles: 1. Scroll-trigger for 3D card flight */

    function initTriptych() {
        const wrapper = document.getElementById('arc-triptych-wrapper');
        const bgText = wrapper ? wrapper.querySelector('.arc-bg-text') : null;
        
        if (!wrapper) return;

        // --- 1. THE TRIGGER (Card Flight) ---
        // This fires the animation once when 40% of the section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wrapper.classList.add('is-active');
                } else {
                    // Resets if you scroll away so it can "re-play"
                    wrapper.classList.remove('is-active');
                }
            });
        }, { 
            threshold: 0.4 
        });

        observer.observe(wrapper);

        // --- 2. THE PARALLAX (Background Text) ---
        // This makes the "ABOUT" text move slower than the scroll for depth
        window.addEventListener('scroll', () => {
            const wrapper = document.getElementById('arc-triptych-wrapper');
            const bgText = document.querySelector('.arc-bg-text');
            if (!wrapper || !bgText) return;

            const rect = wrapper.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Reduced the multiplier to 0.05 for a subtler, more controlled drift
                const shiftValue = (window.innerHeight / 2 - rect.top) * 0.05;
                bgText.style.transform = `translate(-50%, calc(-50% + ${shiftValue}px))`;
            }
        }, { passive: true }); // 'passive' improves scroll performance
    }

    (function() {
        // Any other triptych-related code can go here
    })(); 

    // Initialize functions
    initTriptych();
    initAboutLightbox();
    initFooter();


// --- ABOUT SECTION LIGHTBOX ---
const aboutData = [
    {
        title: "Values",
        subtitle: "// 01 Ethos",
        image: "https://picsum.photos/seed/about-1/800/1200",
        content: `
            <h3>Architectural Precision</h3>
            <p>We believe that exceptional digital experiences are built on a foundation of precision and intentionality. Every line of code, every pixel placement, and every interaction is crafted with purpose and attention to detail.</p>
            
            <h3>Crystalline Transparency</h3>
            <p>Our process is open and collaborative. We work with you as partners, ensuring that every decision is understood and every milestone is celebrated together. No black boxes, no hidden agendas—just clear, honest communication.</p>
            
            <h3>Integrity First</h3>
            <p>We stand by our work and our word. When we commit to a timeline, we meet it. When we promise quality, we deliver it. Our reputation is built on trust, and we protect it fiercely.</p>
            
            <ul>
                <li>100% transparent development process</li>
                <li>Code that's clean, documented, and maintainable</li>
                <li>Performance benchmarks that are met and exceeded</li>
                <li>Security-first approach to every project</li>
            </ul>
        `,
        stats: [
            { number: "100%", label: "Client Satisfaction" },
            { number: "0", label: "Compromises on Quality" },
            { number: "24/7", label: "Support Availability" }
        ]
    },
    {
        title: "Mission",
        subtitle: "// 02 Drive",
        image: "https://picsum.photos/seed/about-3/800/1200",
        content: `
            <h3>Building the Digital Future</h3>
            <p>We're not just building websites—we're crafting digital ecosystems that grow with your business. Our mission is to create high-performance, scalable solutions that serve as the foundation for your digital transformation.</p>
            
            <h3>High-Performance Aesthetics</h3>
            <p>Beauty and performance are not mutually exclusive. We specialize in creating experiences that are both visually stunning and technically optimized. Every millisecond counts, every pixel matters.</p>
            
            <h3>Partnership Over Projects</h3>
            <p>We don't just deliver projects—we build partnerships. Our success is measured by your success, and we're committed to being there long after the launch to ensure continued growth and optimization.</p>
            
            <ul>
                <li>Lightning-fast load times (under 2 seconds)</li>
                <li>SEO-optimized from day one</li>
                <li>Mobile-first responsive design</li>
                <li>Scalable architecture for future growth</li>
            </ul>
        `,
        stats: [
            { number: "<2s", label: "Average Load Time" },
            { number: "98", label: "Performance Score" },
            { number: "100%", label: "Mobile Optimized" }
        ]
    },
    {
        title: "Philosophy",
        subtitle: "// 03 Core",
        image: "https://picsum.photos/seed/about-2/800/1200",
        content: `
            <h3>Beauty Through Logic</h3>
            <p>Beauty is not an afterthought—it's the natural result of perfectly functioning logic and code. When the architecture is sound and the code is clean, the user experience naturally becomes beautiful.</p>
            
            <h3>Code as Craft</h3>
            <p>We approach every project with the mindset of master craftspeople. Each function is carefully considered, each component is thoughtfully designed, and each interaction is deliberately crafted.</p>
            
            <h3>Continuous Evolution</h3>
            <p>The digital landscape is always changing, and so are we. We stay on the cutting edge of technology and design trends, ensuring that your digital presence remains relevant and effective for years to come.</p>
            
            <ul>
                <li>Clean, semantic HTML5 markup</li>
                <li>Modern CSS with future-proof techniques</li>
                <li>JavaScript that's fast and maintainable</li>
                <li>Progressive enhancement for all users</li>
            </ul>
        `,
        stats: [
            { number: "A+", label: "Code Quality" },
            { number: "0", label: "Technical Debt" },
            { number: "∞", label: "Possibilities" }
        ]
    }
];

function initAboutLightbox() {
    // About lightbox specific variables - completely encapsulated
    let aboutCurrentIndex = 0;
    let aboutIsPaused = false;
    let aboutLightbox;
    
    // All helper functions inside the scope
    function openAboutLightbox(index) {
        aboutCurrentIndex = index;
        updateAboutLightbox();
        aboutLightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        aboutIsPaused = true;
    }

    function closeAboutLightbox() {
        aboutLightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        aboutIsPaused = false;
    }

    function updateAboutLightbox() {
        const data = aboutData[aboutCurrentIndex];
        
        // Populate content
        document.getElementById('about-lb-title').textContent = data.title;
        document.getElementById('about-lb-subtitle').textContent = data.subtitle;
        document.getElementById('about-lb-image').style.backgroundImage = `url('${data.image}')`;
        document.getElementById('about-lb-content').innerHTML = data.content;
        
        // Populate stats
        const statsContainer = document.getElementById('about-lb-stats');
        statsContainer.innerHTML = data.stats.map(stat => `
            <div class="stat">
                <div class="stat-number">${stat.number}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    // Initialize the about lightbox
    aboutLightbox = document.getElementById('about-lightbox');
    const closeBtn = document.getElementById('about-lb-close-btn');
    const prevBtn = document.getElementById('about-lb-prev');
    const nextBtn = document.getElementById('about-lb-next');
    const panels = document.querySelectorAll('.arc-triptych-panel');
    
    // Add click handlers to panels
    panels.forEach((panel, index) => {
        panel.style.cursor = 'pointer';
        panel.addEventListener('click', () => {
            aboutCurrentIndex = index;
            openAboutLightbox(aboutCurrentIndex);
        });
    });
    
    // Navigation handlers
    prevBtn.addEventListener('click', () => {
        aboutCurrentIndex = (aboutCurrentIndex - 1 + aboutData.length) % aboutData.length;
        updateAboutLightbox();
    });
    
    nextBtn.addEventListener('click', () => {
        aboutCurrentIndex = (aboutCurrentIndex + 1) % aboutData.length;
        updateAboutLightbox();
    });
    
    // Close button handler
    closeBtn.addEventListener('click', closeAboutLightbox);
    
    // Close on background click
    aboutLightbox.addEventListener('click', (e) => {
        if (e.target === aboutLightbox) {
            closeAboutLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutLightbox.classList.contains('active')) {
            closeAboutLightbox();
        }
    });
}

function initFooter() {
    // 1. Update Year Automatically
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // 2. Smooth Scroll for Footer Links
    document.querySelectorAll('.footer-nav-col a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Newsletter Form Handler
    const newsletterForm = document.querySelector('.newsletter-form-horizontal');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const consent = this.querySelector('input[type="checkbox"]').checked;
            
            if (email && consent) {
                // Here you would normally send to your backend
                console.log('Newsletter signup:', { email, consent });
                alert('Thank you for signing up for our newsletter!');
                this.reset();
            } else {
                alert('Please provide your email and consent to receive communications.');
            }
        });
    }
}

// Initialize functions
initTriptych();
initAboutLightbox();
initFooter();

