document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navbarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
