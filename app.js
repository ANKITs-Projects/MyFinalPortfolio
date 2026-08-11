// Toggle theme
const theambtn = document.querySelector(".theam-btn");
const navLinks = document.querySelectorAll(".nav-links li a");
const sections = document.querySelectorAll("header, section");

function updateThemeIcon() {
  if (document.body.classList.contains("ligth-mode")) {
    theambtn.title = "Dark";
    theambtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    theambtn.title = "Light";
    theambtn.innerHTML =
      '<i class="fa-solid fa-sun" style="color: #FFD700;"></i>';
  }
}

theambtn.addEventListener("click", () => {
  document.body.classList.toggle("ligth-mode");
  updateThemeIcon();
});

// Run icon update on start
updateThemeIcon();

// Mobile navigation menu toggle
function toggleMobileMenu() {
  const navLinksContainer = document.querySelector(".nav-links");
  const hamburgerBtn = document.querySelector(".hamburger");
  navLinksContainer.classList.toggle("mobile-active");
  hamburgerBtn.classList.toggle("open");
}

document.querySelectorAll(".nav-links li a").forEach((link) => {
  link.addEventListener("click", () => {
    const navLinksContainer = document.querySelector(".nav-links");
    const hamburgerBtn = document.querySelector(".hamburger");
    if (navLinksContainer.classList.contains("mobile-active")) {
      navLinksContainer.classList.remove("mobile-active");
      hamburgerBtn.classList.remove("open");
    }
  });
});

// --- SCROLL SPY LOGIC ---
function highlightMenu() {
  let current = "";

  if (window.scrollY < 150) {
    current = "home";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 180) {
        current = section.getAttribute("id");
      }
    });
  }

  // Map education_section back to Education navbar link if needed
  // In index.html navbar, we have links: #home, #about, #education_section, #skills_section, #portfolio, #contact
  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (current) {
      const href = link.getAttribute("href").replace("#", "");
      if (href === current) {
        link.classList.add("active-link");
      }
    }
  });
}

window.addEventListener("scroll", highlightMenu);
window.addEventListener("load", highlightMenu);
highlightMenu();

// --- SCROLL REVEAL OBSERVER ---
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px"
  }
);
reveals.forEach((reveal) => revealObserver.observe(reveal));

// --- HTML5 CANVAS NEURAL BACKGROUND ANIMATION ---
const canvas = document.getElementById("neural-canvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const numParticles = 55;
const particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.radius = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = document.body.classList.contains("ligth-mode")
      ? "rgba(37, 99, 235, 0.15)"
      : "rgba(99, 102, 241, 0.25)";
    ctx.fill();
  }
}

for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

function animate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  ctx.clearRect(0, 0, width, height);
  const isLightMode = document.body.classList.contains("ligth-mode");
  const lineColor = isLightMode
    ? "rgba(37, 99, 235, 0.05)"
    : "rgba(99, 102, 241, 0.07)";

  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i];
    p1.update();
    p1.draw();

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = (1 - dist / 130) * 1.2;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// Email Validation Helper
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Email Function
function sendMail(e) {
  if (e && typeof e.preventDefault === "function") e.preventDefault();

  const nameInput = document.getElementById("input-name");
  const emailInput = document.getElementById("input-email");
  const messageInput = document.getElementById("input-message");

  const senderName = nameInput.value.trim();
  const senderEmail = emailInput.value.trim();
  const senderMessage = messageInput.value.trim();

  if (!senderName) {
    alert("Please enter your name.");
    nameInput.focus();
    return;
  }

  if (!senderEmail) {
    alert("Please enter your email.");
    emailInput.focus();
    return;
  }

  if (!validateEmail(senderEmail)) {
    alert("Please enter a valid email address.");
    emailInput.focus();
    return;
  }

  if (!senderMessage) {
    alert("Please enter a message.");
    messageInput.focus();
    return;
  }

  // Prepare Data
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  let params = {
    name: senderName,
    email: senderEmail,
    message: senderMessage,
    time: `${hours}:${minutes}:${seconds}`
  };

  // Send
  emailjs
    .send("service_yd52p3d", "template_wxfn3em", params)
    .then((response) => {
      console.log("EmailJS success:", response);
      alert("Email sent successfully");

      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Failed to send email — check console for details.");
    });
}
