let isCollapsed = true;
let bars = document.getElementsByClassName('fa-bars')[0];
let menu = document.getElementsByClassName('navigation')[0];

function toggleMenu() {
    if (isCollapsed) {
        console.log(menu.classList.replace('collapsed', 'not-collapsed'));
    } else {
        console.log(menu.classList.replace('not-collapsed', 'collapsed'));
    }
    isCollapsed = !isCollapsed;
}



bars.addEventListener('click', toggleMenu);