/* ─── vCard download ───────────────────────────────────────── */
function descargarVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:María José Bernal Gaviria',
    'N:Bernal Gaviria;María José;;;',
    'ORG:Fenalco Antioquia',
    'TITLE:Directora Ejecutiva',
    'URL:https://www.fenalco.com.co',
    'URL;type=LinkedIn:https://www.linkedin.com/in/maria-jose-bernal-gaviria',
    'URL;type=Instagram:https://www.instagram.com/mjbernalgaviria/',
    'ADR;TYPE=WORK:;;Medellín;;Antioquia;;Colombia',
    'NOTE:Directora Ejecutiva de Fenalco Antioquia. Federación Nacional de Comerciantes.',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'maria-jose-bernal-gaviria.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ─── Navbar scroll effect ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── Mobile hamburger ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── AOS (Animate On Scroll) – minimal built-in ──────────── */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.querySelectorAll('[data-aos]')]
          : [];
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 80;

        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

/* ─── Hero image fallback ──────────────────────────────────── */
function initHeroImage() {
  const img         = document.getElementById('heroImg');
  const placeholder = document.getElementById('photoPlaceholder');

  if (!img) return;

  const testLoad = () => {
    if (img.naturalWidth > 0) {
      placeholder.style.display = 'none';
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
      placeholder.style.display = 'flex';
    }
  };

  img.addEventListener('load',  testLoad);
  img.addEventListener('error', () => {
    img.style.display = 'none';
    placeholder.style.display = 'flex';
  });

  // Check again in case it already loaded from cache
  if (img.complete) testLoad();
}

/* ─── Fenalco logo fallback ────────────────────────────────── */
function initBadgeLogo() {
  const logo     = document.getElementById('fenalcoLogo');
  const textOnly = document.getElementById('badgeTextOnly');

  if (!logo) return;

  logo.addEventListener('load', () => {
    logo.style.display  = 'block';
    textOnly.style.display = 'none';
  });
  logo.addEventListener('error', () => {
    logo.style.display  = 'none';
    textOnly.style.display = 'block';
  });

  if (logo.complete && logo.naturalWidth > 0) {
    logo.style.display  = 'block';
    textOnly.style.display = 'none';
  }
}

/* ─── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initHeroImage();
  initBadgeLogo();
});
