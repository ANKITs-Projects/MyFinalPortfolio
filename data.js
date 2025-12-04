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

    // Resume Logic: Open in new tab AND download with specific name
    // document.querySelectorAll(".resume").forEach((e) => {
    //     e.href = data.resume;
    //     e.target = "_blank";
    //     e.setAttribute("download", "Ankit-Gupta-Resume.pdf"); 
    // });

    // ... existing code ...
// --- NEW ROBUST RESUME LOGIC ---
    // document.querySelectorAll(".resume").forEach((btn) => {
    //   btn.setAttribute("href", data.resume);
      
    //   btn.addEventListener("click", (e) => {
    //     e.preventDefault(); 
        
    //     // 1. CONVERT LINK FOR VIEWING
    //     // GitHub Raw links force download. We convert to jsDelivr to view it.
    //     let viewUrl = data.resume;
    //     if (viewUrl.includes("raw.githubusercontent.com")) {
    //         // Regex to convert: raw.githubusercontent.com/User/Repo/Branch/Path 
    //         // to: cdn.jsdelivr.net/gh/User/Repo@Branch/Path
    //         viewUrl = viewUrl.replace(
    //             /raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)/, 
    //             "cdn.jsdelivr.net/gh/$1/$2@$3/$4"
    //         );
    //     }

    //     // 2. OPEN IN NEW TAB (View)
    //     // Opening immediately prevents popup blockers
    //     window.open(viewUrl, '_blank');

    //     // 3. DOWNLOAD IN BACKGROUND
    //     fetch(data.resume)
    //       .then(response => response.blob())
    //       .then(blob => {
    //         // Create a blob URL to force the name "Ankit-Gupta-Resume.pdf"
    //         const url = window.URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = "Ankit-Gupta-Resume.pdf"; 
    //         document.body.appendChild(link);
    //         link.click();
            
    //         // Cleanup
    //         setTimeout(() => {
    //             document.body.removeChild(link);
    //             window.URL.revokeObjectURL(url);
    //         }, 100);
    //       })
    //       .catch(err => console.error("Download failed:", err));
    //   });
    // });

    // // ... (rest of the code for about section) ...


    // --- RESUME LOGIC (SPLIT BUTTON) ---
    
    // 1. SETUP THE LINK (View Logic)
    document.querySelectorAll(".resume-view").forEach((btn) => {
        let viewUrl = data.resume;
        
        // Convert Github Raw to jsDelivr for viewing
        if (viewUrl.includes("raw.githubusercontent.com")) {
            viewUrl = viewUrl.replace(
                /raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)/, 
                "cdn.jsdelivr.net/gh/$1/$2@$3/$4"
            );
        }
        
        btn.setAttribute("href", viewUrl);
        btn.setAttribute("target", "_blank"); // Open in new tab
    });

    // 2. SETUP THE DOWNLOAD (Download Logic)
    document.querySelectorAll(".resume-download").forEach((btn) => {
        btn.setAttribute("href", "#"); // Prevent default navigation
        
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Visual feedback (optional)
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // Loading spinner

            fetch(data.resume)
              .then(response => response.blob())
              .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = "Ankit-Gupta-Resume.pdf"; 
                document.body.appendChild(link);
                link.click();
                
                // Cleanup
                setTimeout(() => {
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    btn.innerHTML = originalIcon; // Restore icon
                }, 100);
              })
              .catch(err => {
                  console.error("Download failed:", err);
                  btn.innerHTML = originalIcon;
                  alert("Download failed. Opening in new tab instead.");
                  window.open(data.resume, '_blank');
              });
        });
    });

    
    document.getElementById("profileImage").src = data.profileImage;

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