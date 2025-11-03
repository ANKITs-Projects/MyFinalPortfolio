const configUrl =
  "https://raw.githubusercontent.com/ANKITs-Projects/MyPortfolioData/refs/heads/main/config.json";

fetch(configUrl)
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load JSON");
    return res.json();
  })
  .then((data) => {
    document.getElementById("role").innerText = data.role;
    document.getElementById("landingPageLine").innerText = data.landingPageLine;
    document.getElementById("profileImage").src = data.profileImage;
    // document.getElementById("iconTag").href = data.profileImage;
    document.querySelectorAll(".resume").forEach((e) => (e.href = data.resume));

    // for about section
    document.getElementById("about-content").innerText = data.aboutContent;

    // Education cart
    const educationModule = document.getElementById("education");
    data.education.forEach((e) => {
      let div = document.createElement("div");
      div.className = "timeline-item";
      div.innerHTML = `<div class="tl-icon">
              <i class="fa-solid fa-user-graduate"></i>
            </div>
            <p class="tl-duration">${e.year}</p>
            <h5>${e.degree}</h5>
            <p>
              ${e.institution}
            </p>`;
      educationModule.appendChild(div);
    });

    // skills cart
    const techStack = document.getElementById("techStack");
    data.techStack.forEach((e) => {
      let div = document.createElement("div");
      div.className = "skill-cart";
      div.innerHTML = `<div class="image">
              <img src=${e.linke} alt=${e.title}>
            </div>
            <h5>${e.title}</h5>`;
      techStack.appendChild(div);
    });

    const techTools = document.getElementById("techTools");
    data.techStack.forEach((e) => {
      let div = document.createElement("div");
      div.className = "skill-cart";
      div.innerHTML = `<div class="image">
              <img src=${e.linke} alt=${e.title}>
            </div>
            <h5>${e.title}</h5>`;
      techTools.appendChild(div);
    });

    // For Project section
    const projects = document.getElementById("projects");
    data.projects.forEach((e) => {
      const div = document.createElement("div");
      div.className = "portfolio-item";
      div.innerHTML = `<div class="portfolio-img">
              <div class="image">
                <img src=${e.image} alt=${e.title} />
              </div>
              <div class="hover-item">
                <h3>Project Source</h3>
                <div class="icons">
                  <a href=${e.github} target="_blank" class="icon">
                    <i class="fab fa-github"></i>
                  </a>
                  <a href=${e.link} target="_blank" class="icon">
                    <i class="fa-solid fa-link"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="portfolio-text">
              <h4>${e.title}</h4>
              <p class="tech-stack">Tech-Stack :- ${e.tech.join(", ")}</p>
              <p>
                ${e.description}
              </p>
            </div>`;
      projects.appendChild(div)
    });

    // Contact info
    document.getElementById("socialsEmail").innerText = data.socials.email
    document.getElementById("socialsPhone").innerText = data.socials.phone
    document.getElementById("socialsLocation").innerText = data.socials.location
    document.getElementById("socialsTwitter").href = data.socials.twitter
    document.getElementById("socialsLinkedin").href = data.socials.linkedin
    document.getElementById("socialsGithub").href = data.socials.github
  })
  .catch((err) => console.error("Error loading data:", err));
