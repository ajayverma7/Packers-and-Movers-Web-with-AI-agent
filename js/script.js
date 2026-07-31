/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


if (menuBtn && navMenu) menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("show");


    const icon = menuBtn.querySelector("i");


    if (navMenu.classList.contains("show")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});



/* =========================
   CLOSE MOBILE MENU
========================= */

const navLinks = document.querySelectorAll("#navMenu a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

        const icon = menuBtn && menuBtn.querySelector("i");

        if (!icon) return;
        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});



/* =========================
   QUOTE CALCULATOR
========================= */

const quoteForm =
    document.getElementById("quoteForm");


if (quoteForm) quoteForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const fromLocation =
        document.getElementById("fromLocation").value.trim();


    const toLocation =
        document.getElementById("toLocation").value.trim();


    const propertyType =
        document.getElementById("propertyType").value;


    const result =
        document.getElementById("quoteResult");


    if (!fromLocation || !toLocation) {

        alert(
            "Please enter both pickup and destination locations."
        );

        return;

    }


    /*
        This is only a DEMO calculation.

        Later we can connect this to:
        - Google Maps
        - Mapbox
        - A real backend
        - Database
    */


    const basePrice = 3000;


    const roomPrice =
        Number(propertyType) * 1000;


    const randomDistance =
        Math.floor(Math.random() * 500) + 20;


    const distancePrice =
        randomDistance * 20;


    const estimatedPrice =
        basePrice +
        roomPrice +
        distancePrice;


    result.style.display = "block";


    result.innerHTML = `

        Estimated moving cost:

        <strong>
            ₹${estimatedPrice.toLocaleString("en-IN")}
        </strong>

        <br>

        <small>

            ${fromLocation}

            →

            ${toLocation}

        </small>

    `;

});

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) enquiryForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const status = document.getElementById("enquiryStatus");
    const submitButton = enquiryForm.querySelector("button[type=submit]");
    submitButton.disabled = true;
    submitButton.textContent = "Sending enquiry...";

    try {
        const response = await fetch("/api/enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.getElementById("enquiryName").value.trim(),
                phone: document.getElementById("enquiryPhone").value.trim(),
                email: document.getElementById("enquiryEmail").value.trim(),
                message: document.getElementById("enquiryMessage").value.trim()
            })
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unable to send enquiry.");
        enquiryForm.reset();
        status.textContent = "Thanks. Your enquiry was sent successfully.";
    } catch (error) {
        status.textContent = error.message || "Could not send enquiry. Please call us directly.";
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Send enquiry <i class=\"fa-solid fa-paper-plane\"></i>";
    }
});



/* =========================
   SCROLL ANIMATION
========================= */

const animatedElements =
    document.querySelectorAll(
        ".service-card, .process-step, .testimonial, .feature"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-animation"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


animatedElements.forEach(function (element) {

    observer.observe(element);

});



/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", function () {

    let currentSection = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;


        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        const target =
            link.getAttribute("href");


        if (
            target === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});
