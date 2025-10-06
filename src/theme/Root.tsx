import React, {useEffect} from 'react';
import {ConnectionProvider} from '@reifydb/react';
import {REIFYDB_CONFIG} from '../config';

export default function Root({children}) {
    useEffect(() => {
        // Track if we've already attempted to fetch stars
        let hasAttemptedFetch = false;
        let hasFailed403 = false;

        // Fetch GitHub stars
        const fetchGitHubStars = async () => {
            // Don't retry if we got a 403 error
            if (hasFailed403) {
                return;
            }

            // Only try once per page load
            if (hasAttemptedFetch) {
                return;
            }
            hasAttemptedFetch = true;

            try {
                const response = await fetch('https://api.github.com/repos/reifydb/reifydb');
                if (response.status === 403) {
                    // Rate limited - don't try again
                    hasFailed403 = true;
                    console.log('GitHub API rate limited - not retrying');
                    return;
                }
                if (response.ok) {
                    const data = await response.json();
                    const starsElement = document.getElementById('github-stars');
                    if (starsElement) {
                        const stars = data.stargazers_count;
                        // Format stars count (e.g., 1.2k, 10.5k)
                        let formattedStars;
                        if (stars >= 1000) {
                            formattedStars = (stars / 1000).toFixed(1) + 'k';
                        } else {
                            formattedStars = stars.toString();
                        }
                        starsElement.textContent = formattedStars;
                    }
                }
            } catch (error) {
                console.error('Failed to fetch GitHub stars:', error);
            }
        };

        // Fetch stars on mount
        fetchGitHubStars();

        // Check for stars element periodically but don't refetch if already attempted
        const interval = setInterval(() => {
            const starsElement = document.getElementById('github-stars');
            if (starsElement && !starsElement.textContent && !hasAttemptedFetch && !hasFailed403) {
                fetchGitHubStars();
            }
        }, 1000);

        // Improve dropdown behavior
        const improveDropdowns = () => {
            const dropdowns = document.querySelectorAll('.navbar__item.dropdown');

            dropdowns.forEach(dropdown => {
                let hoverTimeout;
                let isHovering = false;

                const showDropdown = () => {
                    clearTimeout(hoverTimeout);
                    dropdown.classList.add('dropdown--hovering');
                    isHovering = true;
                };

                const hideDropdown = () => {
                    isHovering = false;
                    hoverTimeout = setTimeout(() => {
                        if (!isHovering) {
                            dropdown.classList.remove('dropdown--hovering');
                            dropdown.classList.remove('dropdown--show');
                        }
                    }, 100); // Shorter delay for smoother experience
                };

                // Handle dropdown trigger hover
                dropdown.addEventListener('mouseenter', showDropdown);
                dropdown.addEventListener('mouseleave', hideDropdown);

                // Handle dropdown menu hover
                const menu = dropdown.querySelector('.dropdown__menu');
                if (menu) {
                    menu.addEventListener('mouseenter', () => {
                        clearTimeout(hoverTimeout);
                        isHovering = true;
                    });
                    menu.addEventListener('mouseleave', () => {
                        isHovering = false;
                        hideDropdown();
                    });
                }

                // Handle click for mobile/touch devices
                const link = dropdown.querySelector('.navbar__link');
                if (link) {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        // Toggle the dropdown
                        const isOpen = dropdown.classList.contains('dropdown--show');

                        // Close all other dropdowns
                        document.querySelectorAll('.navbar__item.dropdown').forEach(d => {
                            if (d !== dropdown) {
                                d.classList.remove('dropdown--show');
                                d.classList.remove('dropdown--hovering');
                            }
                        });

                        if (!isOpen) {
                            dropdown.classList.add('dropdown--show');
                            dropdown.classList.add('dropdown--hovering');
                        } else {
                            dropdown.classList.remove('dropdown--show');
                            dropdown.classList.remove('dropdown--hovering');
                        }
                    });
                }

                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    // @ts-ignore
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('dropdown--show');
                        dropdown.classList.remove('dropdown--hovering');
                    }
                });
            });
        };

        // Run dropdown improvements
        setTimeout(improveDropdowns, 100);

        // Enhanced sticky navbar scroll effects
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const scrolled = window.scrollY > 20;
                if (scrolled) {
                    navbar.setAttribute('data-scrolled', 'true');
                } else {
                    navbar.removeAttribute('data-scrolled');
                }
            }
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        // Cleanup
        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ConnectionProvider config={{
            url: REIFYDB_CONFIG.getWebSocketUrl(), options: {
                timeoutMs: 10_000,
            }
        }}>
            {children}
        </ConnectionProvider>
    );
}