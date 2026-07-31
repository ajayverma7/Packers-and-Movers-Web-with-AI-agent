/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


menuBtn.addEventListener("click", function () {

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

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});



/* =========================
   QUOTE CALCULATOR
========================= */

const quoteForm =
    document.getElementById("quoteForm");


quoteForm.addEventListener("submit", function (event) {

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
