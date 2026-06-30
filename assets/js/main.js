/* Dilham Hall Retreats — site interactions */
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

  // Booking search — on submit, shows how to book (live availability to be wired via SuperControl)
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

  // Canoe booking — custom front-end. Availability + payment run through Checkfront behind it.
  // Go-live: set data-checkfront-host on [data-canoe-booking] to the real account
  // (e.g. "dilhamhall.checkfront.com") and fill each vessel's data-cf-item-early /
  // data-cf-item-afternoon with its Checkfront item id. For a fully in-page flow with no
  // redirect, wire these to the Checkfront API server-side instead of the reserve link below.
  const cbook = document.querySelector("[data-canoe-booking]");
  if (cbook) {
    const host = (cbook.getAttribute("data-checkfront-host") || "").trim();
    const hostReady = host && !/replace-me/i.test(host);
    const dateEl = cbook.querySelector("[data-cb-date]");
    const sessionBtns = Array.prototype.slice.call(cbook.querySelectorAll("[data-cb-session]"));
    const vessels = Array.prototype.slice.call(cbook.querySelectorAll("[data-cb-vessel]"));
    const totalEl = cbook.querySelector("[data-cb-total]");
    const checkoutBtn = cbook.querySelector("[data-cb-checkout]");
    const noteEl = cbook.querySelector("[data-cb-note]");
    let session = "early";

    const pad = (n) => String(n).padStart(2, "0");
    const money = (n) => "£" + n.toFixed(2);
    const qtyOf = (v) => parseInt(v.querySelector("[data-cb-qty]").textContent, 10) || 0;
    const priceOf = (v) => parseFloat(v.getAttribute("data-price-" + session)) || 0;

    // Block past dates
    if (dateEl) {
      const t = new Date();
      dateEl.min = t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());
    }

    // Capture any price qualifier (e.g. "per vessel, per day") once so re-renders keep it
    vessels.forEach((v) => {
      const em = v.querySelector("[data-cb-vprice] em");
      v._suffix = em ? em.textContent : "";
    });

    const showNote = (msg) => {
      if (!noteEl) return;
      noteEl.textContent = msg;
      noteEl.hidden = false;
      noteEl.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const longDate = (v) => {
      const d = new Date(v + "T00:00:00");
      return isNaN(d) ? v : d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    };

    const render = () => {
      let total = 0;
      let count = 0;
      vessels.forEach((v) => {
        const price = priceOf(v);
        const qty = qtyOf(v);
        total += price * qty;
        count += qty;
        v.querySelector("[data-cb-vprice]").innerHTML =
          money(price) + (v._suffix ? " <em>" + v._suffix + "</em>" : "");
        v.querySelector("[data-cb-dec]").disabled = qty === 0;
      });
      totalEl.textContent = money(total);
      checkoutBtn.disabled = count === 0;
      if (noteEl) noteEl.hidden = true;
    };

    sessionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        session = btn.getAttribute("data-cb-session");
        sessionBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-checked", active ? "true" : "false");
        });
        render();
      });
    });

    vessels.forEach((v) => {
      const qtyEl = v.querySelector("[data-cb-qty]");
      v.querySelector("[data-cb-inc]").addEventListener("click", () => {
        qtyEl.textContent = Math.min(qtyOf(v) + 1, 20);
        render();
      });
      v.querySelector("[data-cb-dec]").addEventListener("click", () => {
        qtyEl.textContent = Math.max(qtyOf(v) - 1, 0);
        render();
      });
    });

    checkoutBtn.addEventListener("click", () => {
      const chosen = vessels
        .filter((v) => qtyOf(v) > 0)
        .map((v) => ({
          name: v.getAttribute("data-name"),
          qty: qtyOf(v),
          item: v.getAttribute("data-cf-item-" + session),
        }));
      if (!chosen.length) return;
      if (dateEl && !dateEl.value) {
        dateEl.focus();
        showNote("Please choose a date for your paddle.");
        return;
      }

      if (hostReady) {
        // Hand off to Checkfront to confirm availability and take payment.
        const ymd = dateEl.value.replace(/-/g, "");
        const params = new URLSearchParams({ start_date: ymd, end_date: ymd });
        const firstItem = chosen.find((c) => c.item);
        if (firstItem) params.set("item_id", firstItem.item);
        window.location.href = "https://" + host + "/reserve/?" + params.toString();
        return;
      }

      // No live Checkfront account wired yet — show how to confirm and pay.
      const summary = chosen.map((c) => c.qty + " × " + c.name).join(", ");
      const slot = session === "early" ? "Early bird (9:30–11:30)" : "Afternoon (12:00–18:00)";
      showNote(
        summary + " — " + slot + " on " + longDate(dateEl.value) + ", total " +
        totalEl.textContent + ". To confirm and pay, call or text 07810 616920 or email paddle@dilhamhall.co.uk and we will get you on the water."
      );
    });

    render();
  }

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

  // Highlight the current section in the primary nav
  (function () {
    let page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (/^(pod-|tonnage-)/.test(page)) page = "stay.html";
    document.querySelectorAll(".nav a").forEach((a) => {
      if ((a.getAttribute("href") || "").toLowerCase() === page) {
        a.setAttribute("aria-current", "page");
      }
    });
  })();
})();
