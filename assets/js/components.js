// Component Loader
document.addEventListener('DOMContentLoaded', function () {
    console.log('Components loader initialized');

    // Load navbar component
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            console.log('Navbar loaded successfully');
            const navbarContainer = document.querySelector('include[src="components/navbar.html"]');
            if (navbarContainer) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                navbarContainer.replaceWith(tempDiv.firstElementChild);
            }
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Load contact component
    fetch('components/contact.html')
        .then(response => {
            console.log('Contact response status:', response.status);
            return response.text();
        })
        .then(html => {
            console.log('Contact loaded successfully, length:', html.length);
            const contactContainer = document.getElementById('contact-container');
            if (contactContainer) {
                contactContainer.innerHTML = html;
                console.log('Contact component injected');
            } else {
                console.error('Contact container not found');
            }
        })
        .catch(error => console.error('Error loading contact:', error));

    // Load footer component
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            console.log('Footer loaded successfully');
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = html;

                // Update current year after footer loads
                const currentYearElement = document.getElementById('current-year');
                if (currentYearElement) {
                    currentYearElement.textContent = new Date().getFullYear();
                }
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});
