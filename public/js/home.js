window.addEventListener('DOMContentLoaded', function() {
   Array.from(document.querySelectorAll('.tabs')).forEach(function(tab) {
       setupTabs(tab);
   });
   setupNav();
});


const TAB_HIDDEN_CLASS = 'tab-content--hidden';

function setupTabs(container) {
    const triggers = new Map();
    const contents = new Map();

    Array.from(container.querySelectorAll('.tabs-list a')).forEach(function(trigger, index) {
        const name = trigger.getAttribute('href');
        const content = container.querySelector(name);

        triggers.set(name, trigger);
        contents.set(name, content);

        trigger.addEventListener('click', function(e) {
            e.preventDefault();

            contents.forEach(function(content, name) {
                content.classList.add(TAB_HIDDEN_CLASS);
            });

            content.classList.remove(TAB_HIDDEN_CLASS);

            triggers.forEach(function(trigger, name) {
                trigger.classList.remove('active');
            });

            trigger.classList.add('active');
        });

        if (index !== 0) {
            content.classList.add(TAB_HIDDEN_CLASS);
        }
        if (index === 0) {
            trigger.classList.add('active');
        }
    });
}


function setupNav() {
    const hamburgerMenuIcon = document.getElementById("hamburgerMenuIcon");
    const closeMenuIcon = document.getElementById("closeMenuIcon");
    const overlayMenuClick = document.getElementById("overlay-menu");
    const overlayMenu = document.getElementsByClassName("overlay-menu");
    const mobileMenuWrapper = document.getElementsByClassName(
        "mobile-menu-wrapper"
    );

    closeMenuIcon.addEventListener("click", () => {
        closeMenu();
    });

    overlayMenuClick.addEventListener("click", () => {
        closeMenu();
    });

    hamburgerMenuIcon.addEventListener("click", () => {
        overlayMenu[0].classList.add("active-overlay");
        mobileMenuWrapper[0].classList.add("active-menu");
    });

    function closeMenu() {
        overlayMenu[0].classList.remove("active-overlay");
        mobileMenuWrapper[0].classList.remove("active-menu");
    }
}
