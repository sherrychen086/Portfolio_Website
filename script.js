document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    target.setAttribute("tabindex", "-1");
  });
});

const navLinks = Array.from(document.querySelectorAll(".nav-links a[data-section]"));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

const setActiveNav = () => {
  const offset = window.innerHeight * 0.32;
  let activeId = sections[0]?.id;
  const isNearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) {
      activeId = section.id;
    }
  });

  if (isNearBottom && sections.length) {
    activeId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === activeId);
  });
};

const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const preferredTheme = localStorage.getItem("portfolio-theme");

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  if (!themeToggle || !themeLabel) return;

  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "切换日间模式" : "切换夜间模式");
  themeLabel.textContent = isDark ? "Day" : "Night";
};

applyTheme(preferredTheme || "light");
setActiveNav();

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("resize", setActiveNav);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.toggle("is-active", item === link);
    });
  });
});
