const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav_links");
const links = document.querySelectorAll(".nav_links li");

// check if an element is in the viewport or not
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// hamburger menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
  hamburger.classList.toggle("toggle");
});

// close the hamburger menu when a link is clicked
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    links.forEach((link) => {
      link.classList.toggle("fade");
    });
    hamburger.classList.toggle("toggle");
  });
});

// accordion animation
const acc = document.querySelectorAll(".accordion");
acc.forEach((currentAcc) => {
  currentAcc.addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    var isOpen = panel.style.maxHeight;

    // close all other accordion panels
    acc.forEach((otherAcc) => {
      if (otherAcc !== currentAcc) {
        otherAcc.classList.remove("active");
        otherAcc.nextElementSibling.style.maxHeight = null;
        otherAcc.nextElementSibling.setAttribute("aria-expanded", "false");
        otherAcc.nextElementSibling.setAttribute("aria-hidden", "true");
      }
    });

    // toggle the current accordion panel
    if (isOpen) {
      panel.style.maxHeight = null;
      panel.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.setAttribute("aria-expanded", "true");
      panel.setAttribute("aria-hidden", "false");
    }
  });
});

const showMoreBtn = document.querySelector(".show_more");

const sampleProjects = [
  {
    title: "ERP Application",
    description:
      "An enterprise resource planning (ERP) application for CEG Tech Forum(CTF) such as accounting, inventory, sales, and HR. Developed with Flutter for the frontend and Node.js for the backend. The app functions as a centralized platform for managing logistics items. ",
    technologies: "Flutter, Node.js, PostgreSQL",
    type: "App",
  },
  {
    title: "Riddle of the Sphinx",
    description:
      "Riddle of the Sphinx is an interactive web-based game that challenges players to solve a series of puzzles and riddles. Our team designed and developed the game with a focus on engaging gameplay, captivating visuals, and immersive storytelling, resulting in an experience that transports players to a separate world.",
    technologies: "React.js, Express.js, PostgreSQL",
    type: "Website",
    link: "https://ros.kurukshetraceg.org.in/",
  },
  {
    title: "Xceed & Karnival",
    description:
      "We developed a website for Xceed and Karnival, two annual cultural festivals organized by CEG Tech Forum(CTF). The website provides information about the events, such as the schedule, rules, and registration details. The website also allows participants to register for the events online.",
    technologies: "React.js",
    type: "Website",
    link: "https://xceed.kurukshetraceg.org.in/",
  },
  {
    title: "CEG Tech Forum",
    description:
      "We developed a website for CEG Tech Forum(CTF), a student-run organization at the College of Engineering, Guindy. The website provides information about the organization, such as its history, vision, and mission. This website showcases the various events organized by CTF, such as such as Kurukshetra and Vyuhaa. ",
    technologies: "React.js",
    type: "Website",
    link: "https://cegtechforum.in/",
  },
];

// Function to generate HTML for a project card
const generateProjectCard = (project) => {
  return `
    
        <div class="project_card animate">
          <div class="project_content">
            <h3 class="project_subtitle">${project.type}</h3>
            <h2 class="project_title">${project.title}</h2>

            <p class="project_description">
            ${project.description}
            </p>
          </div>

          <div class="project_buttons">
            <div class="project_techstack">
              <i class="ri-stack-line"></i>${project.technologies}
            </div>

            <a
              href=${project.link ? project.link : ""}
              target="_blank"
              class=${project.link ? "project_techstack" : "project_link__hide"}
            >
              <i class="ri-links-line"></i> View
            </a>
          </div>
        </div>
  `;
};

const showSpinner = () => (showMoreBtn.innerHTML = "Loading...");

const hideSpinner = () => (showMoreBtn.innerHTML = "Show more");

const loadMoreProjects = () => {
  showSpinner();

  setTimeout(function () {
    const worksWrapper = document.querySelector(".works_wrapper");

    const projects = document.querySelectorAll(".project_card");

    for (var i = projects.length - 4; i < projects.length - 4 + 4; i++) {
      const projectHTML = generateProjectCard(sampleProjects[i]);
      worksWrapper.insertAdjacentHTML("beforeend", projectHTML);
    }

    hideSpinner();

    if (projects.length >= sampleProjects.length) {
      showMoreBtn.style.display = "none";
    }
  }, 3000);
};

showMoreBtn.addEventListener("click", loadMoreProjects);

// scroll animation
const animateElement = (element, className) => {
  if (isInViewport(element)) {
    element.classList.add(className);
  }
};

// scroll animation for multiple elements
const animateAllElement = (elements, className, delay) => {
  elements.forEach((el, index) => {
    setTimeout(() => {
      if (isInViewport(el)) {
        el.classList.add(className);
      }
    }, (index + 1) * delay);
  });
};

// testimonial carousel
const testimonialCarousel = () => {
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".prev_btn");
  const nextBtn = document.querySelector(".next_btn");
  let currentIndex = 0;
  let intervalId;
  let touchstartX = 0;
  let touchendX = 0;

  const showTestimonial = (index, side) => {
    testimonials.forEach((testimonial, i) => {
      const isVisible = i === index;
      const ariaHidden = isVisible ? "false" : "true";
      const ariaLabel = isVisible ? "true" : "false";

      testimonial.setAttribute("aria-hidden", ariaHidden);
      testimonial.setAttribute("aria-label", ariaLabel);
      if (testimonial.classList.contains("active_left"))
        testimonial.classList.remove("active_left");
      if (testimonial.classList.contains("active_right"))
        testimonial.classList.remove("active_right");
    });
    if (side === "left") {
      testimonials[index].classList.add("active_left");
    }
    if (side === "right") {
      testimonials[index].classList.add("active_right");
    }
  };

  const nextTestimonial = () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex, "right");
    resetInterval();
  };

  const prevTestimonial = () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex, "left");
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(nextTestimonial, 5000);
  };

  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);

  // Swipe and drag events for touch devices
  testimonials.forEach((testimonial) => {
    testimonial.addEventListener("touchstart", (e) => {
      touchstartX = e.changedTouches[0].screenX;
    });

    testimonial.addEventListener("touchend", (e) => {
      touchendX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    testimonial.addEventListener("mousedown", (e) => {
      touchstartX = e.screenX;
    });

    testimonial.addEventListener("mouseup", (e) => {
      touchendX = e.screenX;
      handleSwipe();
    });
  });

  const handleSwipe = () => {
    if (touchstartX - touchendX > 50) {
      nextTestimonial();
    }
    if (touchendX - touchstartX > 50) {
      prevTestimonial();
    }
  };

  intervalId = setInterval(nextTestimonial, 5000);
};

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("scroll", () => {
  animateElement(document.querySelector("#service_title h1"), "animate");
  animateElement(document.querySelector("#works_title h1"), "animate");
  animateElement(document.querySelector("#techstack_title h1"), "animate");
  animateElement(document.querySelector("#testimonial_title h1"), "animate");
  animateAllElement(
    document.querySelectorAll(".accordion_panel"),
    "animate",
    400
  );
  animateAllElement(document.querySelectorAll(".project_card"), "animate", 400);
  animateAllElement(
    document.querySelectorAll(".techstack_card"),
    "animate",
    400
  );
  animateElement(document.querySelector(".show_more"), "animate");
  animateElement(document.querySelector(".testimonial_wrapper"), "animate");
});

document.addEventListener("DOMContentLoaded", testimonialCarousel);
