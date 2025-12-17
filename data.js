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
    // Targets both buttons (or just one if you simplify your HTML)
    document.querySelectorAll(".resume-download").forEach((btn) => {
      // Set href so right-click "Save link as" still works natively
      btn.setAttribute("href", data.resume);

      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // --- ACTION 1: OPEN IN NEW TAB (Immediate) ---
        // We do this first to prevent popup blockers from stopping the tab
        let viewUrl = data.resume;

        // Convert Github Raw to jsDelivr for proper viewing in browser
        if (viewUrl.includes("raw.githubusercontent.com")) {
          viewUrl = viewUrl.replace(
            /raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)/,
            "cdn.jsdelivr.net/gh/$1/$2@$3/$4"
          );
        }
        window.open(viewUrl, "_blank");

        // --- ACTION 2: DOWNLOAD IN BACKGROUND ---
        // Optional: Loading state (store original content)
        const originalContent = btn.innerHTML;

        fetch(data.resume)
          .then((response) => response.blob())
          .then((blob) => {
            // Create a temporary link to force the specific filename
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "Ankit-Gupta-Resume.pdf";
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }, 100);
          })
          .catch((err) => {
            console.error("Background download failed:", err);
            // No need to alert aggressively since the tab opened successfully above
          });
      });
    });

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

    // Skills cart (Consolidated Stack and Tools)
    const techStack = document.getElementById("techStack");
    data.techStack.forEach((e) => {
      let div = document.createElement("div");
      div.className = "skill-cart";
      // Added quotes around src attribute to fix broken images
      div.innerHTML = `<div class="image">
              <img src="${e.linke}" alt="${e.title}"> 
            </div>
            <h5>${e.title}</h5>`;
      techStack.appendChild(div);
    });

    // REMOVED duplicate TechTools loop here

    // For Project section
    const projects = document.getElementById("projects");
    data.projects.forEach((e) => {
      const div = document.createElement("div");
      div.className = "portfolio-item";
      // Added quotes around src, href attributes. This fixes broken links.
      div.innerHTML = `<div class="portfolio-img">
              <div class="image">
                <img src="${e.image}" alt="${e.title}" />
              </div>
              <div class="hover-item">
                <h3>Project Source</h3>
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
            <div class="portfolio-text">
              <h4>${e.title}</h4>
              <p class="tech-stack">Tech-Stack :- ${e.tech.join(", ")}</p>
              <p style="white-space: pre-line;">
  ${e.description}
</p>

            </div>`;
      projects.appendChild(div);
    });

    // Contact info
    document.getElementById("socialsEmail").innerText = data.socials.email;
    document.getElementById("socialsPhone").innerText = data.socials.phone;
    document.getElementById("socialsLocation").innerText =
      data.socials.location;
    document.getElementById("socialsTwitter").href = data.socials.twitter;
    document.getElementById("socialsLinkedin").href = data.socials.linkedin;
    document.getElementById("socialsGithub").href = data.socials.github;
  })
  .catch((err) => console.error("Error loading data:", err));
