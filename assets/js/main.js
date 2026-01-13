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
        
        const path = `../downloads/port cover images/${project.cover}`;
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
        const pathBase = '../downloads/port cover images/';
        
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
        const quoteImgUrl = "P (29).png"; 

        const reviews = [
            { badge: "8X Conversion", q: "Bold Arctic is a luxury asset.", qb: "The team transformed our digital DNA. Seriously, Cassandra, Kody and Dylan are the best.", n: "Julian V.", i: "https://i.pravatar.cc/100?u=1" },
            { badge: "40% Rev Lift", q: "Exactly what we needed.", qb: "Strategic design that actually moves the bottom line.", n: "Mila K.", i: "https://i.pravatar.cc/100?u=2" },
            { badge: "Brand Mastery", q: "Soul of luxury.", qb: "They don't just build sites; they build digital experiences.", n: "Alex R.", i: "https://i.pravatar.cc/100?u=3" }
        ];

        function createCard(item) {
            return `
                <div class="glass-card">
                    <img src="${quoteImgUrl}" class="quote-img" alt="Quote">
                    <div class="result-badge">${item.badge}</div>
                    <div class="quote">"${item.q}"</div>
                    <div class="quote-body">${item.qb}</div>
                    <div class="client-box">
                        <div class="avatar" style="background-image: url('${item.i}')"></div>
                        <div>
                            <strong>${item.n}</strong><br>
                            <small style="color: #666; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase;">Verified Partner</small>
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
            initTriptych();
        }
    })();
});

