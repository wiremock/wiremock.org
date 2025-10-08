// Sidebar search functionality
"use strict";
window.addEventListener("DOMContentLoaded", function () {
  let searchInitialized = false;

  function initializeSidebarSearch() {
    if (searchInitialized) return;

    const sidebarSearch = document.querySelector(
      ".md-nav__search-simple .md-search__input",
    );
    const searchCheckbox = document.getElementById("__search");

    // Try different selectors for the main search overlay
    let mainSearchOverlay = document.querySelector(
      '[data-md-component="search"]',
    );
    if (!mainSearchOverlay) {
      mainSearchOverlay = document.querySelector(".md-search");
    }

    if (sidebarSearch && searchCheckbox) {
      searchInitialized = true;

      // Close on Escape key
      document.addEventListener("keydown", function escapeHandler(e) {
        if (e.key === "Escape") {
          closeSearch();
          document.removeEventListener("keydown", escapeHandler);
        }
      });

      function closeSearch() {
        searchCheckbox.checked = false;
        mainSearchOverlay.removeAttribute("data-md-state");
        mainSearchOverlay.setAttribute("hidden", "");
        document.body.removeAttribute("data-md-state");
      }

      window.addEventListener("keydown", function (e) {
        if (!e.target.classList.contains("md-search__input")) {
          return;
        }

        if (e.key === "Enter") {
          e.preventDefault();

          // Get the search query
          const query = sidebarSearch.value.trim();

          if (!query) return;

          if (mainSearchOverlay) {
            // Open search overlay by checking the checkbox

            searchCheckbox.checked = true;
            searchCheckbox.dispatchEvent(
              new Event("change", { bubbles: true }),
            );

            // Force show the overlay
            mainSearchOverlay.removeAttribute("hidden");
            mainSearchOverlay.setAttribute("data-md-state", "active");
            document.body.setAttribute("data-md-state", "search");

            // Wait a moment for the overlay to render
            setTimeout(() => {
              const mainSearchInput =
                mainSearchOverlay.querySelector(".md-search__input");

              if (mainSearchInput) {
                mainSearchInput.value = query;
                mainSearchInput.focus();

                // Trigger search events to start the search
                const inputEvent = new Event("input", { bubbles: true });
                mainSearchInput.dispatchEvent(inputEvent);

                // Also trigger keyup to ensure search worker gets triggered
                const keyupEvent = new KeyboardEvent("keyup", {
                  bubbles: true,
                  key: "Enter",
                  keyCode: 13,
                });
                mainSearchInput.dispatchEvent(keyupEvent);

                // Set up close functionality
                const overlay = mainSearchOverlay.querySelector(
                  ".md-search__overlay",
                );
                const closeButton = mainSearchOverlay.querySelector(
                  'button[type="reset"]',
                );

                if (overlay) {
                  overlay.addEventListener("click", closeSearch);
                }
                if (closeButton) {
                  closeButton.addEventListener("click", closeSearch);
                }
              }
            }, 150);
          }
        }
      });
    }
  }

  initializeSidebarSearch();
});

