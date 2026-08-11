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

    // --- MERGED RESUME LOGIC ---
    document.querySelectorAll(".resume-download").forEach((btn) => {
      btn.setAttribute("href", data.resume);

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let viewUrl = data.resume;

        // Convert Github Raw to jsDelivr for proper viewing in browser
        if (viewUrl.includes("raw.githubusercontent.com")) {
          viewUrl = viewUrl.replace(
            /raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)/,
            "cdn.jsdelivr.net/gh/$1/$2@$3/$4"
          );
        }
        window.open(viewUrl, "_blank");

        // Download in background
        fetch(data.resume)
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "Ankit-Gupta-Resume.pdf";
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }, 100);
          })
          .catch((err) => {
            console.error("Background download failed:", err);
          });
      });
    });

    // About section content
    document.getElementById("about-content").innerText = data.aboutContent;

    // Education Timeline
    const educationModule = document.getElementById("education");
    educationModule.innerHTML = "";
    data.education.forEach((e) => {
      let div = document.createElement("div");
      div.className = "timeline-item";
      div.innerHTML = `
        <div class="timeline-item-content">
          <span class="tl-duration">${e.year}</span>
          <h5>${e.degree}</h5>
          <p>${e.institution}</p>
        </div>
      `;
      educationModule.appendChild(div);
    });

    // Categorized Tech Stack and Tools
    const techStack = document.getElementById("techStack");
    techStack.innerHTML = "";

    const groups = {
      "Frontend Development": [],
      "Backend & Databases": [],
      "Tools & Platforms": []
    };

    data.techStack.forEach((skill) => {
      const titleLower = skill.title.toLowerCase();
      if (
        ["html", "css", "javascript", "react", "redux", "tailwindcss", "chakraui"].includes(
          titleLower
        )
      ) {
        groups["Frontend Development"].push(skill);
      } else if (["nodejs", "express", "mongodb"].includes(titleLower)) {
        groups["Backend & Databases"].push(skill);
      } else {
        groups["Tools & Platforms"].push(skill);
      }
    });

    for (const [groupName, skills] of Object.entries(groups)) {
      if (skills.length === 0) continue;

      const groupCard = document.createElement("div");
      groupCard.className = "skills-category-card";

      let skillsHtml = "";
      skills.forEach((skill) => {
        skillsHtml += `
          <div class="skill-cart">
            <div class="image">
              <img src="${skill.linke}" alt="${skill.title}"> 
            </div>
            <h5>${skill.title}</h5>
          </div>
        `;
      });

      groupCard.innerHTML = `
        <h3>${groupName}</h3>
        <div class="skills-list">
          ${skillsHtml}
        </div>
      `;
      techStack.appendChild(groupCard);
    }

    // Projects alternating case-study presentation
    const projectsContainer = document.getElementById("projects");
    projectsContainer.innerHTML = "";

    data.projects.forEach((e, i) => {
      const div = document.createElement("div");
      div.className = "portfolio-item";

      const projectIndex = String(i + 1).padStart(2, "0");

      const imgHtml = `
        <div class="portfolio-img">
          <div class="image">
            <img src="${e.image}" alt="${e.title}" />
          </div>
          <div class="hover-item">
            <h3>${e.title}</h3>
            <div class="icons">
              <a href="${e.github}" target="_blank" class="icon">
                <i class="fab fa-github"></i>
              </a>
              <a href="${e.link}" target="_blank" class="icon">
                <i class="fa-solid fa-link"></i>
              </a>
            </div>
          </div>
        </div>
      `;

      const textHtml = `
        <div class="portfolio-text">
          <span class="project-number">// CASE STUDY ${projectIndex}</span>
          <a href="${e.link}" target="_blank" style="text-decoration: none;">
            <h4>${e.title}</h4>
          </a>
          <div class="tech-stack">
            ${e.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
          <p style="white-space: pre-line;">
            ${e.description}
          </p>
        </div>
      `;

      if (i % 2 === 0) {
        div.innerHTML = imgHtml + textHtml;
      } else {
        div.innerHTML = textHtml + imgHtml;
      }

      projectsContainer.appendChild(div);
    });

    // Contact info mappings
    document.getElementById("socialsEmail").innerText = data.socials.email;
    document.getElementById("socialsPhone").innerText = data.socials.phone;
    document.getElementById("socialsLocation").innerText = data.socials.location;
    document.getElementById("socialsTwitter").href = data.socials.twitter;
    document.getElementById("socialsLinkedin").href = data.socials.linkedin;
    document.getElementById("socialsGithub").href = data.socials.github;
  })
  .catch((err) => console.error("Error loading data:", err));
