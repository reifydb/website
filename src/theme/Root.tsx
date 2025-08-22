import React, { useEffect } from 'react';

export default function Root({ children }) {
  useEffect(() => {
    // Fetch GitHub stars
    const fetchGitHubStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/reifydb/reifydb');
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

    // Also fetch when navigation occurs (for SPA navigation)
    const interval = setInterval(() => {
      const starsElement = document.getElementById('github-stars');
      if (starsElement && !starsElement.textContent) {
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
          if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('dropdown--show');
            dropdown.classList.remove('dropdown--hovering');
          }
        });
      });
    };
    
    // Run dropdown improvements
    setTimeout(improveDropdowns, 100);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}