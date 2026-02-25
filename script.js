function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    tablet: { smooth: true },
    smartphone: { smooth: true },
  });

  locoScroll.on("scroll", (args) => {
    ScrollTrigger.update();

    const nav = document.getElementById("mainNav");
    if (nav) {
      nav.classList.toggle("scrolled", args.scroll.y > 10);
    }
  });

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  window._locoScroll = locoScroll;
}

function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from("#page1", {
    opacity: 0,
    duration: 0.2,
    delay: 0.2,
  });
  tl.from("#page1", {
    transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
    borderRadius: "150px",
    duration: 2,
    ease: "expo.out",
  });
  tl.from("nav", {
    opacity: 0,
    delay: -0.2,
  });
  tl.from("#page1 h1, #page1 p, #page1 div", {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
  });
}

function navAnimation() {
  var nav = document.querySelector("nav");

  nav.addEventListener("mouseenter", function () {
    if (document.getElementById("mobileMenu").classList.contains("open")) return;

    let tl = gsap.timeline();
    tl.to("#nav-bottom", {
      height: "21vh",
      duration: 0.5,
    });
    tl.to(".nav-part2 h5", {
      display: "block",
      duration: 0.1,
    });
    tl.to(".nav-part2 h5 span", {
      y: 0,
      stagger: { amount: 0.5 },
    });
  });

  nav.addEventListener("mouseleave", function () {
    let tl = gsap.timeline();
    tl.to(".nav-part2 h5 span", {
      y: 25,
      stagger: { amount: 0.2 },
    });
    tl.to(".nav-part2 h5", {
      display: "none",
      duration: 0.1,
    });
    tl.to("#nav-bottom", {
      height: 0,
      duration: 0.2,
    });
  });
}

function page2Animation() {
  var rightElems = document.querySelectorAll(".right-elem");

  rightElems.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to(elem.childNodes[3], { opacity: 1, scale: 1 });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(elem.childNodes[3], { opacity: 0, scale: 0 });
    });
    elem.addEventListener("mousemove", function (dets) {
      gsap.to(elem.childNodes[3], {
        x: dets.x - elem.getBoundingClientRect().x - 90,
        y: dets.y - elem.getBoundingClientRect().y - 215,
      });
    });
  });
}

function page3VideoAnimation() {
  var page3Center = document.querySelector(".page3-center");
  var video = document.querySelector("#page3 video");

  page3Center.addEventListener("click", function () {
    video.play();
    gsap.to(video, {
      transform: "scaleX(1) scaleY(1)",
      opacity: 1,
      borderRadius: 0,
    });
  });

  video.addEventListener("click", function () {
    video.pause();
    gsap.to(video, {
      transform: "scaleX(0.7) scaleY(0)",
      opacity: 0,
      borderRadius: "30px",
    });
  });

  var sections = document.querySelectorAll(".sec-right");
  sections.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      elem.childNodes[3].style.opacity = 1;
      elem.childNodes[3].play();
    });
    elem.addEventListener("mouseleave", function () {
      elem.childNodes[3].style.opacity = 0;
      elem.childNodes[3].load();
    });
  });
}

function page6Animations() {
  gsap.from("#btm6-part2 h4", {
    x: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#btm6-part2",
      scroller: "#main",
      start: "top 80%",
      end: "top 10%",
      scrub: true,
    },
  });
}

function burgerMenuAnimation() {
  const burger     = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const backdrop   = document.getElementById("menuBackdrop"); // ← NEW

  if (!burger || !mobileMenu) return;

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle("open");
    burger.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    // Toggle dark backdrop behind the panel ← NEW
    if (backdrop) backdrop.classList.toggle("open", isOpen);

    // Pause / resume Locomotive scroll
    if (window._locoScroll) {
      isOpen ? window._locoScroll.stop() : window._locoScroll.start();
    }
  }

  burger.addEventListener("click", toggleMenu);

  burger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") toggleMenu();
  });

  // Close when a nav link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) toggleMenu();
    });
  });

  // Close when backdrop is clicked ← NEW
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) toggleMenu();
    });
  }

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) toggleMenu();
  });
}

// ── Init ──────────────────────────────────────────
locomotiveAnimation();
navAnimation();
page2Animation();
page3VideoAnimation();
page6Animations();
loadingAnimation();
burgerMenuAnimation();
