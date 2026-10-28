
document.addEventListener("DOMContentLoaded", () => {

  // Typing animation
  const roles = [
    "Computer Science Graduate",
    "Aspiring Full Stack Developer",
    "Web Development Enthusiast",
     "Android App Developer"
  ];

  const typing = document.getElementById("typing");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const word = roles[roleIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typing.textContent = word.substring(0, charIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1600;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  if (typing) {
    if (window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches) {
      typing.textContent = roles[0];
    } else {
      typeEffect();
    }
  }

  // Reveal sections on scroll
  const elements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element =>
      element.classList.add("visible")
    );
  }

  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });

  // Current year
  document.getElementById("year").textContent =
    new Date().getFullYear();
});


/* Comet Trail Cursor */
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const trailCount = 12;
  const comets = [];

  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement("div");
    dot.className = "comet";
    document.body.appendChild(dot);

    comets.push({
      element: dot,
      x: 0,
      y: 0
    });
  }

  let mouseX = -100;
  let mouseY = -100;
  let started = false;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    started = true;

    comets.forEach(dot => {
      dot.element.classList.add("visible");
    });
  });

  function animateComet() {
    let x = mouseX;
    let y = mouseY;

    comets.forEach((dot, index) => {
      dot.x += (x - dot.x) * 0.35;
      dot.y += (y - dot.y) * 0.35;

      const size = 8 * (1 - index / trailCount);

      dot.element.style.left = `${dot.x}px`;
      dot.element.style.top = `${dot.y}px`;
      dot.element.style.width = `${Math.max(size, 2)}px`;
      dot.element.style.height = `${Math.max(size, 2)}px`;
      dot.element.style.opacity = started
        ? String(1 - index / trailCount)
        : "0";

      x = dot.x;
      y = dot.y;
    });

    requestAnimationFrame(animateComet);
  }

  animateComet();
}
