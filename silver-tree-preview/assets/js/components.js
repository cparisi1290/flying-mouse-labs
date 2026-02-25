// Global testimonial data and function for Alpine.js
window.testimonialSlider = function () {
    return {
        testimonials: [
            {
                quote: "Her dedication to supporting the business community shines through in everything she does, from her comprehensive service offerings to her regular 'Limelight' series where she highlights other exceptional business owners. If you're looking for someone who is truly great at what they do, extremely helpful, and genuinely invested in your success, I highly recommend connecting with Ruth. She's the real deal!",
                name: "HP",
                title: "HMF Balling, Inc.",
                image: "assets/images/hmf-balling.png"
            },
            {
                quote: "Ruth and her team of business partners ARE Truly here to help and can provide such a wide variety of supportive and expansive needs for businesses and communities we all live in. Such a great individual and 5 STARS recommended!",
                name: "DD",
                title: "Primerica Financial Services",
                image: "assets/images/primerica-financial-services.png"
            },
            {
                quote: "Ruth can help you get your business organized and growing. A godsend for the Solopreneur!",
                name: "YB",
                title: "Revitalized Communities Funding",
                image: "assets/images/revitalized-communities-funding.png"
            },
            {
                quote: "Ruth and her team of business partners ARE Truly here to help and can provide such a wide variety of supportive and expansive needs for businesses and communities we all live in. Such a great individual and 5 STARS recommended!",
                name: "BS",
                title: "Colorado Luxury Life",
                image: "assets/images/colorado-luxury-life.png"
            },
            {
                quote: "I recently connected with Ruth, and even though we've only known each other a short time, it's easy to see why she receives such outstanding recommendations. I took time to read through several of them, and it's clear they weren't given lightly. The consistency and sincerity in what others say about her speak volumes. From what I've seen so far, Ruth truly reflects the professionalism and dedication people describe. I'm looking forward to getting to know her better and seeing more of the impact she makes in our business community.",
                name: "SP",
                title: "Kaizen Forward Solutions, Inc.",
                image: "assets/images/kaizen-forward-solutions.jpg"
            },
            {
                quote: "Ruth's energy and kindness really shine through in everything she does. Her recognition as Local Business of the Year and one of the Top 20 Businesses is so well-deserved! I truly admire how Ruth uplifts others, shares valuable insights, and brings such a positive spirit to the Alignable community. She's the kind of person who makes this platform better for everyone.",
                name: "FM",
                title: "TekCheck Computer Services",
                image: "assets/images/tekcheck-computer-services.png"
            }
        ],
        currentIndex: 0,
        isTransitioning: false,

        get currentTestimonial() {
            return this.testimonials[this.currentIndex];
        },

        nextTestimonial() {
            this.isTransitioning = true;
            setTimeout(() => {
                this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
                this.isTransitioning = false;
            }, 300);
        },

        previousTestimonial() {
            this.isTransitioning = true;
            setTimeout(() => {
                this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
                this.isTransitioning = false;
            }, 300);
        }
    }
};



// Function to load HTML components
async function loadComponent(elementId, filePath) {
    try {
        console.log(`Loading component: ${filePath}`);
        // Add aggressive cache-busting with timestamp and random number
        const cacheBuster = `?v=${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = await fetch(filePath + cacheBuster);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // Execute any script tags in the loaded HTML
        const scripts = document.getElementById(elementId).getElementsByTagName('script');
        for (let script of scripts) {
            if (script.innerHTML) {
                // Create new script element to execute the code
                const newScript = document.createElement('script');
                newScript.textContent = script.innerHTML;
                document.head.appendChild(newScript);
                document.head.removeChild(newScript);
            }
        }

        // Initialize testimonial if this is the testimonial component
        if (elementId === 'testimonial-placeholder') {
            console.log('Testimonial component loaded, triggering initialization...');
            // Trigger custom event for testimonial initialization
            window.dispatchEvent(new CustomEvent('testimonialLoaded'));
        }

        console.log(`Component loaded: ${filePath}`);
    } catch (error) {
        console.error(`Error loading component ${filePath}:`, error);
    }
}

// Load navigation, testimonial, CTA, and footer
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, starting component loading...');
    loadComponent('nav-placeholder', '/silver-tree-preview/components/nav.html');
    loadComponent('testimonial-placeholder', '/silver-tree-preview/components/testimonial.html?v=' + Date.now());
    loadComponent('cta-placeholder', '/silver-tree-preview/components/cta.html');
    loadComponent('footer-placeholder', '/silver-tree-preview/components/footer.html');
});
