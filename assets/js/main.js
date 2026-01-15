// Main JavaScript file for Flying Mouse Lab
console.log('Flying Mouse Lab - JS loaded successfully!');

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
        // If current scroll is greater than 150px (to prevent jitter at the very top)
        if (window.scrollY > 150) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollY = window.scrollY;
    });
	
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
        });
    })();

    // Portfolio Logic
    const carousel = document.getElementById('carousel');
    const lightbox = document.getElementById('arctic-lightbox');
    const lbStack = document.getElementById('lb-visual-stack');
    const lbScroll = document.getElementById('lb-scroll');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    const lbCounter = document.getElementById('lb-counter');
    const lbClose = document.getElementById('lb-close-btn');

    if(carousel) {
        let portRot = 0;
        let isPaused = false;
        let currentIndex = 0;

    const projectData = [
        {
            cover: 'kvs-port-cover.gif',
            title: "KAY'S VIRTUAL SOLUTIONS",
            category: 'WEBSITE REDESIGN',
            description: 'Transformed a legacy logistics platform into a high-performance digital engine.',
            before: 'kvs-before.png',
            after: 'kvs-after.png'
        },
        {
            cover: 'luxe-port-cover.gif',
            title: 'LUXE PET PARLOR',
            category: 'BRANDING + WEB DESIGN',
            description: 'A premium visual identity built for high-scale digital commerce.',
            before: '', 
            after: 'luxe-after.png'
        },
		{
            cover: 'nhc-port-cover.gif',
            title: 'NOVA HEALTH COLLECTIVE',
            category: 'BRANDING + WEB DESIGN',
            description: 'A premium visual identity built for high-scale digital commerce.',
            before: '', 
            after: 'nhc-after.png'
        },
		{
            cover: 'colliance-port-cover.gif',
            title: 'COLLIANCE',
            category: 'WEBSITE REDESIGN',
            description: 'A premium visual identity built for high-scale digital commerce.',
            before: 'colliance-before.png', 
            after: 'colliance-after.png'
        },
		{
            cover: 'das-port-cover.gif',
            title: 'DAMARIS ACCOUNTING SERVICES',
            category: 'WEB DESIGN',
            description: 'A premium visual identity built for high-scale digital commerce.',
            before: '', 
            after: 'das-after.png'
        },
		{
            cover: 'gg-port-cover.gif',
            title: 'GRATEFUL GRAZE',
            category: 'BRANDING + WEB DESIGN',
            description: 'A premium visual identity built for high-scale digital commerce.',
            before: '', 
            after: 'gg-after.png'
        }
        // Add more objects here for each project...
    ];

    projectData.forEach((project, i) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        const angle = i * (360 / projectData.length);
        
        // Ensure the cards are far enough out to rotate
        card.style.transform = `rotateY(${angle}deg) translateZ(550px)`;
        
        const pathBase = 'assets/images/';
        const path = `${pathBase}${project.cover}`;
        card.innerHTML = `<div class="card-image" style="background-image:url('${path}')"></div>`;

        card.addEventListener('mouseenter', () => isPaused = true);
        card.addEventListener('mouseleave', () => { if(!lightbox.classList.contains('active')) isPaused = false; });

        card.addEventListener('click', () => {
            currentIndex = i;
            updateLightbox();
            lightbox.classList.add('active');
            isPaused = true;
        });

        carousel.appendChild(card);
    });

    function updateLightbox() {
        const project = projectData[currentIndex];
        const pathBase = 'assets/images/';
        
        lbScroll.scrollTop = 0;
        document.getElementById('lb-title').innerText = project.title;
        document.getElementById('lb-category').innerText = `// CATEGORY: ${project.category}`;
        document.getElementById('lb-description').innerText = project.description;
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
        currentIndex = (currentIndex + 1) % projectData.length;
        updateLightbox();
    });

    // PREVIOUS BUTTON
    lbPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + projectData.length) % projectData.length;
        updateLightbox();
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
            if (!isPaused) {
                portRot -= 0.15;
                carousel.style.transform = `rotateY(${portRot}deg)`; 
            }
            requestAnimationFrame(animPort); 
        }
        animPort();
    }

    // Testimonials Logic
    const track = document.getElementById('testiTrack');
    const quoteImgUrl = "assets/images/glass-quotes-dark.svg"; 

        const reviews = [
            { 
                badge: "Incredible Design + Deep Expertise", 
                q: "[Flying Mouse Lab] is our go-to web designer. She's always on top of any task we give her and does incredible design work. I'm always impressed with her subject matter knowledge and professionalism.", 
                /* qb: "Cassandra is our go-to web designer. She's always on top of any task we give her and does incredible design work. I'm always impressed with her subject matter knowledge and professionalism.", */ 
                n: "Sandy L.", 
                b: "Colliance Online Business Management",
                i: "./assets/images/colliance-profile.jpg" 
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
                badge: "SEO Audit + Backend Rescue", 
                q: "This was my second time working with Cass, and both experiences were fantastic. Many of her thoughtful suggestions turned out to be game changers for my photography business.", 
                /* qb: "I highly recommend reaching out to Cassandra before attempting any bold backend maneuvers on your website!. [Flying Mouse Lab] is my go-to for all website-related issues, queries, and strategies.This was my second time working with Cass, and both experiences were fantastic. She is attentive, professional, and very easy to talk to. I had a series of self-inflicted backend issues that I couldn’t resolve on my own, and Cassandra was a great listener who understood my goals thoroughly. She executed everything in a timely manner, kept me updated with progress reports, and made thoughtful suggestions along the way - many of which turned out to be game changers for my photography business. Her patience and lovely demeanor made the whole process a pleasure. Highly recommend!",  */
                n: "Kathy C.", 
                b: "KCruts Photography",
                i: "./assets/images/kcruts-profile.jpg"
            },
            { 
                badge: "Custom Pro Site + Personal Touch", 
                q: "I lovvvvvve the website - it is beautiful!! I'm so happy with the website and your work!!! She took the 'hard' parts of website design away from me and made the intimidating and daunting task of building my company's website completely manageable.", 
                /* qb: "[Flying Mouse Lab] helps take the stress of building your website away from you. She'll take the time necessary to make sure she fully understands your needs and the direction you'd like your site to take. She took the 'hard' parts of website design away from me and made the intimidating and daunting task of building my company's website completely manageable. I feel very satisfied with the entire process especially the final product.",  */
                n: "Robin P.", 
                b: "Dos Gatos Property Management",
                i: "./assets/images/dgpm-profile.png"
            },
            { 
                badge: "100% On-Brand", 
                q: "[Flying Mouse Lab] created a website that is FABULOUS and really speaks to my personality and branding! [They are] very knowledgeable and will make sure [they] create a site that aligns with your expectations and vision.", 
                /* qb: "I wanted a site that spoke to my brand and came across as professional and modern. I suppose my main hesitation was if the site would speak to my vision. I would say that Cassandra is very knowledgeable and will make sure she creates a site that aligns with your expectations and vision. [Flying Mouse Lab] created a website that is FABULOUS and really speaks to my personality and branding!",  */
                n: "Kayla S.", 
                b: "Kay's Virtual Solutions",
                i: "./assets/images/kvs-profile.jpg"
            },
            { 
                badge: "Brand Vision Mastery", 
                q: "The entire process was smooth and collaborative, and [Flying Mouse Lab] made sure every idea was not just heard but brought to life better than I imagined.", 
                /* qb: "The entire process was smooth and collaborative, and Cass made sure every idea was not just heard but brought to life better than I imagined. I genuinely enjoyed the process—she was patient, knowledgeable, and always on top of things. <br><br> What I love most about my new website is how perfectly it reflects my brand. It feels professional, modern, and uniquely tailored to my grooming business, which makes it stand out from competitors. She captured my style and values, and the functionality is so intuitive—my clients love it, too! <br><br>The thing I liked most about working with Cass was how easy she made everything. I could focus on my business without feeling stressed about the technical side of things, and her communication was excellent throughout the project.", */ 
                n: "Cheyanne F.", 
                b: "Luxe Pet Parlor",
                i: "./assets/images/lpp-profile.jpg"
            },
            { 
                badge: "Rare Find: Honest & Visionary Designer", 
                q: "[Flying Mouse Lab] is phenomenal, extremely honest, and accurate. [They are] incredibly reliable, and have gone above and beyond the call of duty on numerous occasions. [They are] wonderful to work with, a true visionaries.", 
                /* qb: "Cassandra is AMAZING. You made my dreams come true. You made the entire experience perfect. I felt like we had known each other for years. It is with immense pleasure to highly recommend Cassandra Parisi. Finding Cassandra was a most fortuitous occurrence. She is an exceptional web designer. I had a horrible experience with my previous web designer, lost time, and a lot of money. Cassandra is phenomenal, extremely honest, and accurate. She communicates quickly and will make your site better than you ever dreamed. During my interaction with my prior web designer, I developed a disdain for the myriad of excuses and lack of communication that was all too prevalent. These problems were NEVER encountered with Cassandra. She is virtually always available, is incredibly reliable, and has gone above and beyond the call of duty on numerous occasions. Cassandra even went as far as helping to EDUCATE me about what exactly she is doing to my site and why certain steps need to be taken, etc. She is not merely a web designer, but also a quasi-business consultant with in-depth understanding of topics including but not limited to search engine optimization, data encryption, design, and hosting. Cassandra worked with my ideas and made sure everything was perfect. Her expertise is beyond words and her willingness to help and suggest ideas is phenomenal, she cares about her clients and is a wonderful person to work with, a true visionary. One of her greatest assets is the ability to articulate ideas over emails. I can navigate my way around a computer with ease, but compared to her, I am a novice. Cassandra – you have been wonderful to work with. You have worked wonders with our new website. We have only compliments from our clients. I was a bit hesitant working with someone “out of state” and via “internet”- Your communication skills, quickness of reply and accuracy sure proved me wrong. You are very competent but above all it is your professionalism, responsiveness, and high degree of integrity that I found refreshing. You are a rare find and I highly recommend everyone that is need of a website inquiring about your services. I will use you again for my next site and recommend you to everyone I know who needs a top-notch web designer.",  */
                n: "Suzanne H.", 
                b: "Bookkeeping Concepts",
                i: "./assets/images/bkkg-concepts-profile.png"
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
                            <strong>${item.n}</strong><br>
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
     * Handles: 1. Scroll-trigger for 3D card flight
     * 2. Parallax depth for background text
     */
    (function() {
        const initTriptych = () => {
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
        };

        // Initialize once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initTriptych);
        } else {
            // Initialize about lightbox
    initAboutLightbox();

    // Footer Logic
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

    initTriptych();
        }
    })();
});
