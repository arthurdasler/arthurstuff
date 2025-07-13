  document.addEventListener("DOMContentLoaded", () => {
    gsap.to("#page-content", {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  });