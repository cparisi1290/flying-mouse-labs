// Simple component loader for static HTML
async function loadComponents() {
    const includes = document.querySelectorAll('include[src]');
    
    for (const include of includes) {
        try {
            const response = await fetch(include.getAttribute('src'));
            const html = await response.text();
            include.outerHTML = html;
        } catch (error) {
            console.error('Failed to load component:', include.getAttribute('src'), error);
            include.outerHTML = '';
        }
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
