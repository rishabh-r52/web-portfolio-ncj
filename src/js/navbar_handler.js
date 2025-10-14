// src/js/navbar_handler.js
window.addEventListener("includesLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const navbar = document.querySelector(".navbar");

  if (menuButton && navbar) {
    menuButton.addEventListener("click", () => {
      navbar.classList.toggle("open");
    });
  }

  // Hide current page link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) link.style.display = "none";
  });
});
