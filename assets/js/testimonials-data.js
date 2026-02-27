// Testimonials Data
document.addEventListener('alpine:init', () => {
    Alpine.data('testimonialsData', () => ({
        testimonials: [
            {
                badge: 'Incredible Design + Deep Expertise',
                quote: '[Flying Mouse Labs] is our go-to web designer. She\'s always on top of any task we give her and does incredible design work. I\'m always impressed with her subject matter knowledge and professionalism.',
                name: 'Sandy L.',
                business: 'Colliance Online Business Management',
                image: './assets/images/colliance-profile.jpg'
            },
            {
                badge: 'SEO Audit + Backend Rescue',
                quote: 'This was my second time working with [Flying Mouse Labs], and both experiences were fantastic. Many of her thoughtful suggestions turned out to be game changers for my photography business.',
                name: 'Kathy C.',
                business: 'KCruts Photography',
                image: './assets/images/kcruts-profile.jpg'
            },
            {
                badge: '100% On-Brand',
                quote: '[Flying Mouse Labs] created a website that is FABULOUS and really speaks to my personality and branding! [They are] very knowledgeable and will make sure she creates a site that aligns with your expectations and vision.',
                name: 'Kayla S.',
                business: 'Kay\'s Virtual Solutions',
                image: './assets/images/kvs-profile.jpg'
            },
            {
                badge: 'Professional Site, Personal Touch',
                quote: 'I lovvvvvve the website - it is beautiful!! I\'m so happy with the website and your work!!! She took on \'hard\' parts of website design away from me and made it intimidating and daunting task of building my company\'s website completely manageable.',
                name: 'Robin P.',
                business: 'Dos Gatos Property Management',
                image: './assets/images/dgpm-profile.png'
            },
            {
                badge: '+450% Engagement',
                quote: 'Within the first two months of launching, I saw a huge increase in activity. Website clicks doubled, and profile interactions were up over 450% compared to the same time last year.',
                name: 'Damaris E.',
                business: 'Damaris Accounting Services',
                image: './assets/images/das-profile.jpg'
            },
            {
                badge: 'Honest & Visionary Designer',
                quote: '[Flying Mouse Labs] is phenomenal, extremely honest, and accurate. [They are] incredibly reliable, and have gone above and beyond the call of duty on numerous occasions.[They are] wonderful to work with, true visionaries.',
                name: 'Suzanne H.',
                business: 'Bookkeeping Concepts',
                image: './assets/images/bkkg-concepts-profile.png'
            },
            {
                badge: 'Brand Vision Mastery',
                quote: 'The entire process was smooth and collaborative, and [Flying Mouse Labs] made sure every idea was not just heard but brought to life better than I imagined.',
                name: 'Cheyanne F.',
                business: 'Luxe Pet Parlor',
                image: './assets/images/lpp-profile.jpg'
            }
        ],
        
        scroll(direction) {
            const container = this.$refs.slider;
            const scrollAmount = container.offsetWidth * 0.85; 
            container.scrollBy({
                left: direction === 'next' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    }));
});
