/**
 * Component Loader for Flying Mouse Labs
 * Dynamically loads external HTML components and initializes global UI elements.
 */

async function loadComponents() {
    const includes = document.querySelectorAll("include[src]");

    for (const include of includes) {
        const src = include.getAttribute("src");
        try {
            const response = await fetch(src);

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}: ${response.statusText}`,
                );
            }

            const html = await response.text();

            // Create a document fragment to parse the HTML
            // This allows for cleaner injection and better handling of multiple root nodes
            const range = document.createRange();
            const fragment = range.createContextualFragment(html);

            include.replaceWith(fragment);
        } catch (error) {
            console.error(`[Component Loader] Failed to load "${src}":`, error);
            // Remove the failed placeholder to prevent layout issues
            include.remove();
        }
    }

    // Update dynamic elements that might have been loaded (like the Footer)
    updateDynamicElements();
}

/**
 * Handles updates for elements that depend on the current state/time
 */
function updateDynamicElements() {
    // Update Copyright Year
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize when the DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadComponents);
} else {
    loadComponents();
}
