// Blog posts data
const blogPosts = [
    { 
        date: 'JAN 09 2026', 
        cat: 'ARCHITECTURE', 
        title: 'Building for the Cold: Why Performance Matters in 2026', 
        img: 'https://picsum.photos/seed/blog1/800/600',
        slug: 'building-for-the-cold-performance-2026'
    },
    { 
        date: 'JAN 02 2026', 
        cat: 'DESIGN', 
        title: 'The Psychology of Minimalist User Interfaces', 
        img: 'https://picsum.photos/seed/blog2/800/600',
        slug: 'psychology-minimalist-interfaces'
    },
    { 
        date: 'DEC 20 2025', 
        cat: 'ENGINEERING', 
        title: 'Optimizing Llama 3 for Edge Devices', 
        img: 'https://picsum.photos/seed/blog3/800/600',
        slug: 'optimizing-llama-3-edge-devices'
    },
    { 
        date: 'DEC 15 2025', 
        cat: 'STRATEGY', 
        title: 'Why Brand Identity is Your Strongest Moat', 
        img: 'https://picsum.photos/seed/blog4/800/600',
        slug: 'brand-identity-strongest-moat'
    },
    { 
        date: 'DEC 05 2025', 
        cat: 'FUTURE', 
        title: 'The Rise of Hyper-Personalized UX', 
        img: 'https://picsum.photos/seed/blog5/800/600',
        slug: 'rise-hyper-personalized-ux'
    },
    { 
        date: 'NOV 28 2025', 
        cat: 'LABS', 
        title: 'Behind the Scenes: Flying Mouse V2', 
        img: 'https://picsum.photos/seed/blog6/800/600',
        slug: 'behind-scenes-flying-mouse-v2'
    }
];

// Helper function to get blog data for Alpine.js
function getBlogData() {
    return {
        posts: blogPosts,
        // You can add computed properties here
        get latestPost() {
            return this.posts[0];
        },
        get postsByCategory() {
            return this.posts.reduce((acc, post) => {
                if (!acc[post.cat]) acc[post.cat] = [];
                acc[post.cat].push(post);
                return acc;
            }, {});
        }
    };
}
