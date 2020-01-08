const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav_links');
  const navLinks = document.querySelectorAll('.nav_links li');

  burger.addEventListener('click', () => {
    //toggle nav
    nav.classList.toggle('nav-active');
    //animate links
    navLinks.forEach((link, index) => {
      if(link.style.animation){
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${(index / 3) + 0.4}s`;
      }
    });
    //burger animation
    burger.classList.toggle('toggle');
  });
}

const app = () => {
  navSlide();
}

app();