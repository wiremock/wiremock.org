// Sidebar search functionality
(function() {
  'use strict';
  
  let searchInitialized = false;
  
  function initializeSidebarSearch() {
    if (searchInitialized) return;
    
    const sidebarSearch = document.querySelector('.md-nav__search-simple .md-search__input');
    const searchCheckbox = document.getElementById('__search');
    
    console.log('Initializing sidebar search...');
    console.log('Sidebar search input:', sidebarSearch);
    console.log('Search checkbox:', searchCheckbox);
    
    if (sidebarSearch && searchCheckbox) {
      searchInitialized = true;
      
      sidebarSearch.addEventListener('keydown', function(e) {
        console.log('Key pressed:', e.key);
        
        if (e.key === 'Enter') {
          e.preventDefault();
          console.log('Enter pressed, opening search overlay...');
          
          // Get the search query
          const query = sidebarSearch.value.trim();
          console.log('Search query:', query);
          
          if (!query) return;
          
          // Debug: Let's find all search components
          const allSearchElements = document.querySelectorAll('[data-md-component="search"]');
          console.log('All search elements:', allSearchElements);
          
          // Try different selectors for the main search overlay
          let mainSearchOverlay = document.querySelector('[data-md-component="search"]');
          if (!mainSearchOverlay) {
            mainSearchOverlay = document.querySelector('.md-search');
          }
          
          console.log('Found main search overlay:', mainSearchOverlay);
          
          if (mainSearchOverlay) {
            // Open search overlay by checking the checkbox
            searchCheckbox.checked = true;
            searchCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
            
            // Force show the overlay
            mainSearchOverlay.removeAttribute('hidden');
            mainSearchOverlay.setAttribute('data-md-state', 'active');
            document.body.setAttribute('data-md-state', 'search');
            
            // Wait a moment for the overlay to render
            setTimeout(() => {
              const mainSearchInput = mainSearchOverlay.querySelector('.md-search__input');
              
              console.log('Main search input found:', mainSearchInput);
              
              if (mainSearchInput) {
                mainSearchInput.value = query;
                mainSearchInput.focus();
                
                // Trigger search events to start the search
                const inputEvent = new Event('input', { bubbles: true });
                mainSearchInput.dispatchEvent(inputEvent);
                
                // Also trigger keyup to ensure search worker gets triggered
                const keyupEvent = new KeyboardEvent('keyup', { 
                  bubbles: true, 
                  key: 'Enter', 
                  keyCode: 13 
                });
                mainSearchInput.dispatchEvent(keyupEvent);
                
                console.log('Search triggered with query:', query);
                
                // Set up close functionality
                const overlay = mainSearchOverlay.querySelector('.md-search__overlay');
                const closeButton = mainSearchOverlay.querySelector('button[type="reset"]');
                
                if (overlay) {
                  overlay.addEventListener('click', closeSearch);
                }
                if (closeButton) {
                  closeButton.addEventListener('click', closeSearch);
                }
                
                // Close on Escape key
                document.addEventListener('keydown', function escapeHandler(e) {
                  if (e.key === 'Escape') {
                    closeSearch();
                    document.removeEventListener('keydown', escapeHandler);
                  }
                });
                
                function closeSearch() {
                  searchCheckbox.checked = false;
                  mainSearchOverlay.removeAttribute('data-md-state');
                  mainSearchOverlay.setAttribute('hidden', '');
                  document.body.removeAttribute('data-md-state');
                }
              }
            }, 150);
          } else {
            console.warn('Could not find main search overlay');
          }
        }
      });
      
      console.log('Sidebar search initialized successfully');
    } else {
      console.warn('Could not find sidebar search elements');
    }
  }
  
  // Try multiple initialization strategies
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSidebarSearch);
  } else {
    initializeSidebarSearch();
  }
  
  // Also try after a delay for Material theme to fully load
  setTimeout(initializeSidebarSearch, 1000);
  setTimeout(initializeSidebarSearch, 2000);
  
})();