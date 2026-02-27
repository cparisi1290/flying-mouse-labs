// Projects Data
document.addEventListener('alpine:init', () => {
    Alpine.data('projectsData', () => ({
        activeProject: null,
        currentIndex: 0,
        projects: [
            { cover: 'assets/images/nhc-port-cover.gif', title: 'Nova Health Collective', category: 'Branding + Web Design', description: 'Mason came ready to level up her brand and expand her offerings from midwifery to include psychedelic facilitation. She needed a brand that felt aligned with her vision so we created something entirely new.', quote: 'I really like the logo! I love it, this looks really wonderful.', before: '', after: 'assets/images/nhc-after.png' },
            { cover: 'assets/images/kvs-port-cover.gif', title: 'Kay\'s Virtual Solutions', category: 'Website Design', description: 'Kayla wanted something that reflected her vibe of being polished and feminine. We built a site that felt like her and resonated with her dream clients.', quote: 'I always fall in love with Cassandra\'s designs.', before: 'assets/images/kvs-before.png', after: 'assets/images/kvs-after.png' },
            { cover: 'assets/images/luxe-port-cover.gif', title: 'Luxe Pet Parlor', category: 'Branding + Web Design', description: 'Cheyanne needed a rebrand from loud and disheveled to calming and luxurious. Inspired by her Cajun roots, we created a soothing visual identity.', quote: 'The thing I liked most about working with Cass was how easy she made everything.', before: '', after: 'assets/images/luxe-after.png' },
            { cover: 'assets/images/colliance-port-cover.gif', title: 'Colliance OBM', category: 'Website Redesign', description: 'We rebuilt Sandy\'s website to feel brighter and more inviting. I expanded the site to include individual service pages.', quote: 'Flying Mouse Labs does incredible design work.', before: 'assets/images/colliance-before.png', after: 'assets/images/colliance-after.png' },
            { cover: 'assets/images/das-port-cover.gif', title: 'Damaris Accounting', category: 'Web Design', description: 'Damaris needed a site that matched the quality of her accounting work. We rebuilt it on Squarespace, elevating the branding.', quote: 'My new website is even better than I imagined it could be!', before: '', after: 'assets/images/das-after.png' },
            { cover: 'assets/images/gg-port-cover.gif', title: 'Grateful Graze', category: 'Branding + Web Design', description: 'A premium visual identity built for high-scale digital commerce.', quote: 'Cassandra created exactly what I had envisioned.', before: '', after: 'assets/images/gg-after.png' }
        ],
        openProject(index) {
            this.currentIndex = index;
            this.activeProject = this.projects[index];
            document.body.style.overflow = 'hidden';
            // Tell the rest of the page a project is open
            window.dispatchEvent(new CustomEvent('modal-state', { detail: { open: true } }));
        },

        closeProject() {
            this.activeProject = null;
            document.body.style.overflow = 'auto';
            // Tell the rest of the page the project is closed
            window.dispatchEvent(new CustomEvent('modal-state', { detail: { open: false } }));
        },
        prev() {
            this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.projects.length - 1;
            this.activeProject = this.projects[this.currentIndex];
        },
        next() {
            this.currentIndex = this.currentIndex < this.projects.length - 1 ? this.currentIndex + 1 : 0;
            this.activeProject = this.projects[this.currentIndex];
        }
    }));
});
