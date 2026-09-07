function toggleMenu() { document.getElementById("mobileMenu").classList.toggle("open"); }
function closeMenu() { document.getElementById("mobileMenu").classList.remove("open"); }

// ── Contact Form Handler (Web3Forms AJAX) ──
const form = document.getElementById("contactForm");
const btn = document.getElementById("submitBtn");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const originalText = btn.textContent;
  btn.textContent = "Sending...";
  btn.disabled = true;
  btn.style.opacity = "0.6";
  status.style.display = "block";
  status.style.color = "var(--accent2)";
  status.textContent = "Sending your message...";

  const formData = new FormData(form);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      btn.textContent = "✓ Sent!";
      btn.style.background = "#00E5C3";
      status.style.color = "#00E5C3";
      status.textContent = "Thanks for reaching out! Hariprasath will get back to you within 24 hours.";
      form.reset();
    } else {
      throw new Error("Submission failed");
    }

  } catch (error) {
    console.error("Web3Forms Error:", error);
    btn.textContent = "✗ Failed";
    btn.style.background = "#ff4757";
    status.style.color = "#ff4757";
    status.textContent = "Oops! Something went wrong. Please email directly at anbuhari65@gmail.com";
  }

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = "";
    btn.style.opacity = "";
    btn.disabled = false;
  }, 3000);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" }); }
  });
});

// Scroll top button
const st = document.getElementById("scrollTop");
window.addEventListener("scroll", () => { st.classList.toggle("visible", window.scrollY > 400); });

// Fade-in on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".svc-card, .proj-card, .testi-card, .about-point, .contact-row, .tl-item").forEach(el => {
  el.style.opacity = "0"; el.style.transform = "translateY(20px)";
  el.style.transition = "opacity .5s ease, transform .5s ease";
  obs.observe(el);
});
