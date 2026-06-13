/* Dilham Hall Retreats — prototype interactions */
(function () {
  "use strict";

  // Sticky header colour switch
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const close = document.querySelector(".nav__close");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.add("is-open"));
  }
  if (close && nav) {
    close.addEventListener("click", () => nav.classList.remove("is-open"));
  }
  nav && nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("is-open"))
  );

  // Scroll reveal
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // Booking widget demo (prototype only — real availability comes from SuperControl)
  document.querySelectorAll("[data-booking]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector("[data-booking-note]");
      if (note) {
        note.hidden = false;
        note.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // Photo gallery lightbox
  const triggers = Array.prototype.slice.call(document.querySelectorAll("[data-full]"));
  if (triggers.length) {
    const items = triggers.map((t) => ({
      src: t.getAttribute("data-full"),
      cap: t.getAttribute("data-cap") || "",
    }));
    let idx = 0;

    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous photo">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg></button>' +
      '<button class="lb-btn lb-next" aria-label="Next photo">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(lb);

    const img = lb.querySelector("img");
    const cap = lb.querySelector("figcaption");
    const show = (i) => {
      idx = (i + items.length) % items.length;
      img.src = items[idx].src;
      img.alt = items[idx].cap;
      cap.textContent = items[idx].cap + "  ·  " + (idx + 1) + " / " + items.length;
    };
    const open = (i) => {
      show(i);
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    triggers.forEach((t, i) =>
      t.addEventListener("click", (e) => {
        e.preventDefault();
        open(i);
      })
    );
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }
})();
