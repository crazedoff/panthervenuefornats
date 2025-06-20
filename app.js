document.addEventListener("DOMContentLoaded", () => {
    const pageWrapper = document.getElementById('page-wrapper');

    /**
     * Finds and executes script tags within a given HTML element.
     * This is CRUCIAL because innerHTML does not execute <script> tags.
     */
    const executeScripts = (element) => {
        const scripts = element.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            if (oldScript.src) {
                // For external scripts, we just need to re-create them.
                newScript.src = oldScript.src;
            } else if (oldScript.innerHTML) {
                // For inline scripts, copy the content.
                newScript.innerHTML = oldScript.innerHTML;
            }
            // Replace the old script with the new one, which forces the browser to execute it.
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    };

    /**
     * Fetches and loads a page fragment into the #page-wrapper.
     */
    const loadPage = async (url) => {
        // Normalize URL to ensure it points to a .html file
        let fetchUrl = url;
        if (fetchUrl.endsWith('/')) {
            fetchUrl = '/home.html';
        } else if (!fetchUrl.includes('.html')) {
            // This handles cases where links might be `/about` instead of `/about.html`
            fetchUrl = `${url}.html`;
        }

        try {
            document.body.classList.add('loading');
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                // If a page isn't found, redirect to the 404 page content
                console.warn(`Page not found: ${fetchUrl}. Loading 404 page.`);
                await loadPage('/404.html');
                return;
            }
            
            const html = await response.text();
            
            // Inject the new page's full HTML content
            pageWrapper.innerHTML = html;

            // Find the title from the loaded content (if exists) or create one
            const newTitle = pageWrapper.querySelector('title')?.innerText || 'PantherVenue';
            document.title = newTitle;

            // IMPORTANT: Execute any scripts that were in the loaded HTML
            executeScripts(pageWrapper);

        } catch (error) {
            console.error('Failed to load page:', error);
            pageWrapper.innerHTML = '<h2>Oops!</h2><p>Could not load the page content. Please try again.</p>';
        } finally {
            document.body.classList.remove('loading');
            window.scrollTo(0, 0); // Scroll to top on new page load
        }
    };

    /**
     * Intercepts all link clicks.
     */
    document.body.addEventListener('click', (event) => {
        const link = event.target.closest('a');

        // Only handle internal links, not external ones or those with special targets
        if (link && link.href && link.target !== '_blank' && new URL(link.href).origin === window.location.origin) {
            event.preventDefault(); 
            const targetUrl = new URL(link.href).pathname;

            // Don't reload if it's the same page
            if (location.pathname === targetUrl) return;

            history.pushState(null, '', targetUrl);
            loadPage(targetUrl);
        }
    });

    /**
     * Handle browser back/forward buttons.
     */
    window.addEventListener('popstate', () => {
        loadPage(location.pathname);
    });

    /**
     * Load the initial page content based on the URL.
     */
    const initialUrl = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html') 
        ? '/home.html' 
        : location.pathname;
    loadPage(initialUrl);
});