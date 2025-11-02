const sections = document.querySelectorAll(".section")
const sectBtns = document.querySelectorAll(".controls")
const sectBtn = document.querySelectorAll(".control")
const allSections = document.querySelector(".main-content")


function PageTransitions(){
    //Button Click Actiive Class
    for(let i=0 ; i< sectBtn.length; i++) {
        sectBtn[i].addEventListener('click', function() {
            let crrBtn = document.querySelectorAll('.active-btn')
            crrBtn[0].className = crrBtn[0].className.replace("active-btn", "")
            this.className +=" active-btn"
        })
    }
    // Section Active Class
    allSections.addEventListener('click', (e) => {
        const id = e.target.dataset.id
        if(id){
            //remove selected from the other btn
            sectBtns.forEach((btn) => {
                btn.classList.remove('active')
            })
            sections.forEach((sec)=>{
                sec.classList.remove('active')
            })
            const ele = document.getElementById(id)
            ele.classList.add('active')
        }
    })
    // Toggle theam
    const theambtn = document.querySelector(".theam-btn")

    function updateThemeIcon(){
        if(document.body.classList.contains('ligth-mode')){
            theambtn.title = "Dark"
            theambtn.innerHTML = '<i class="fa-solid fa-moon"></i>'
        }
        else{
            theambtn.title = "Light"
            theambtn.innerHTML = '<i class="fa-solid fa-sun"></i>'
        }
    }

    theambtn.addEventListener('click', ()=>{
        document.body.classList.toggle("ligth-mode");
        updateThemeIcon()
    })

    updateThemeIcon()
}

PageTransitions()
function sendMail(e){
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    const now = new Date();
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');
    const senderName = document.getElementById('input-name').value;
    let params = {
        name : senderName,
        email : document.getElementById("input-email").value,
        message : document.getElementById("input-message").value,
        time : `${hours}:${minutes}:${seconds}`
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