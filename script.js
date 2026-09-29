/* =========================================================
   PUNISHER PORTFOLIO — SCRIPT
   ========================================================= */


/* =========================================================
   SECTION INDEX — 6 SECTIONS (starts from Origin)
   01 = Origin
   02 = Arsenal
   03 = Missions
   04 = Training
   05 = CV
   06 = Contact
   ========================================================= */

const sections = document.querySelectorAll("main > section");
const indexItems = document.querySelectorAll(".side-index .index-item");

const sectionMap = {
    "home":     -1,
    "origin":   0,
    "arsenal":  1,
    "missions": 2,
    "training": 3,
    "cv":       4,
    "contact":  5
};

/* Ignore non-mapped sections (method, etc.) */

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;
            const index = sectionMap[id];

            if (index === undefined) return;

            indexItems.forEach(item => item.classList.remove("active"));

            if (indexItems[index]) {
                indexItems[index].classList.add("active");
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: "-80px 0px -20% 0px"
    }
);

sections.forEach(section => {
    if (section.id && sectionMap[section.id] !== undefined) {
        sectionObserver.observe(section);
    }
});


/* =========================================================
   HEADER SCROLL — CINEMATIC
   ========================================================= */

const header = document.querySelector(".site-header");

if (header) {
    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 60);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}


/* =========================================================
   HERO PARALLAX
   ========================================================= */

const heroBackground = document.querySelector(".hero-background");

if (heroBackground) {
    let ticking = false;

    const updateParallax = () => {
        const scroll = Math.min(window.scrollY, 700);
        heroBackground.style.transform =
            `scale(1.035) translateY(${scroll * 0.055}px)`;
        ticking = false;
    };

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        },
        { passive: true }
    );
}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".tool-card, .project-case, .training-card, .cv-box"
);

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.10 }
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";
    revealObserver.observe(element);
});


/* =========================================================
   MOBILE MENU TOGGLE
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });

    /* Close menu when a nav link is clicked */
    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.classList.remove("active");
        });
    });
}