const header = document.querySelector("[data-header]");
const revealEls = [...document.querySelectorAll(".reveal")];
const arc = document.querySelector("[data-arc]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));

  if (arc) {
    const arcObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            arc.classList.add("in");
            arcObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.28 }
    );

    arcObserver.observe(arc);
  }
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
  arc?.classList.add("in");
}
