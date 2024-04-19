const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav_links");
const links = document.querySelectorAll(".nav_links li");
const acc = document.querySelectorAll(".accordion");

// HAMBURGER MENU
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
  hamburger.classList.toggle("toggle");
});

// ACCORDION ANIMATION
acc.forEach((item) => {
  item.addEventListener("click", function () {
    this.classList.toggle("active");
    var parent = this.parentElement;
    var panel = this.nextElementSibling;
    var allPanels = parent.getElementsByClassName("panel");
    for (var j = 0; j < allPanels.length; j++) {
      if (allPanels[j] !== panel) {
        allPanels[j].style.maxHeight = null;
        allPanels[j].previousElementSibling.classList.remove("active");
      }
    }
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      parent.style.maxHeight =
        parseInt(parent.style.maxHeight) + panel.scrollHeight + "px";
    }
  });
});
