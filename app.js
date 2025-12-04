// Toggle theme
const theambtn = document.querySelector(".theam-btn");
const navLinks = document.querySelectorAll('.nav-links li a');
const sections = document.querySelectorAll('section'); // Grabs header#home, section#about, etc.

function updateThemeIcon() {
    if (document.body.classList.contains('ligth-mode')) {
        theambtn.title = "Dark";
        theambtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        theambtn.title = "Light";
        theambtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

theambtn.addEventListener('click', () => {
    document.body.classList.toggle("ligth-mode");
    updateThemeIcon();
});

// Run icon update on start
updateThemeIcon();

// --- SCROLL SPY LOGIC ---
function highlightMenu() {
    let current = '';
    
    // Explicitly check if we are at the top of the page
    if (window.scrollY < 200) {
        current = 'home'; 
    } else {
        // Otherwise, check which section we are scrolling through
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 200px offset triggers the change slightly before the section hits the top
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
    }

    // Loop through links and add/remove class
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        
        // Safety check: ensure 'current' exists before checking match
        if (current) {
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.classList.add('active-link');
            }
        }
    });
}

// Event Listeners
window.addEventListener('scroll', highlightMenu);
window.addEventListener('load', highlightMenu); // Ensures Home is green immediately on refresh
highlightMenu(); // Run once on script load

// Email Function
function sendMail(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const senderName = document.getElementById('input-name').value;
    let params = {
        name: senderName,
        email: document.getElementById("input-email").value,
        message: document.getElementById("input-message").value,
        time: `${hours}:${minutes}:${seconds}`
    };

    emailjs.send("service_yd52p3d", "template_wxfn3em", params)
        .then((response) => {
            console.log("EmailJS success:", response);
            alert("Email sent successfully");
        })
        .catch((error) => {
            console.error("EmailJS error:", error);
            alert("Failed to send email — check console for details.");
        });
}

