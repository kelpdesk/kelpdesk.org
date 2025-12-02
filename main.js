document.addEventListener('DOMContentLoaded', () => {
  // --- Existing Header & Scroll Animation Logic ---
  const header = document.getElementById('main-header');
  const heroSpacer = document.getElementById('hero-spacer');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
      header.classList.add('shrink');
      if (heroSpacer) heroSpacer.classList.add('shrink-spacer');
      } else {
      header.classList.remove('shrink');
      if (heroSpacer) heroSpacer.classList.remove('shrink-spacer');
      }
    });
  }

  // --- Existing Intersection Observer for Fade-ins ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

  // --- Dynamic Help Text Logic ---
  const radioButtons = document.querySelectorAll('input[name="userType"]');
  const helpContainer = document.getElementById('dynamic-help-text');

  // Content to switch between
  const helpContent = {
    individual: {
      title: "How we assist Individuals",
      text: "We investigate cybercrime incidents, report them to the correct service providers, and document these tactics to educate the public and authorities."
    },
    organization: {
      title: "How we assist Organizations",
      text: "We identify and resolve active threats while helping you align internal objectives to build your own robust Trust & Safety operation."
    }
  };

  // Listen for changes on the radio buttons
  radioButtons.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const selected = e.target.value;
      const content = helpContent[selected];

      if (helpContainer && content) {
        helpContainer.innerHTML = `
          <h4 class="font-bold text-deep-sea mb-1">${content.title}</h4>
          <p class="text-sm">${content.text}</p>
          `;

          // Optional: Change border color style based on selection
          if (selected === 'organization') {
            helpContainer.classList.remove('border-jade-water', 'bg-jade-water/10');
            helpContainer.classList.add('border-coral-dust', 'bg-coral-dust/10');
          } else {
            helpContainer.classList.add('border-jade-water', 'bg-jade-water/10');
            helpContainer.classList.remove('border-coral-dust', 'bg-coral-dust/10');
          }
      }
    });
  });
});

// --- Modal Logic ---
const setupModal = (btnId, modalId, closeBtnId, closeBgId) => {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);
    const closeBg = document.getElementById(closeBgId);

    const openModal = () => {
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
      }
    };

    const closeModal = () => {
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
      }
    };

    if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBg) closeBg.addEventListener('click', closeModal);
};

// Initialize both modals
setupModal('btn-privacy', 'modal-privacy', 'close-privacy-btn', 'close-privacy-bg');
setupModal('btn-terms', 'modal-terms', 'close-terms-btn', 'close-terms-bg');

// --- Unified Form Handling (Validation + AJAX) ---
const contactForm = document.getElementById('kelp-contact-form');
const successMessage = document.getElementById('success-message');
const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Script URL for Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbxx9U1I-pX5rtRiT8bQy4cweS9BQaGnNUylXWVRlNc5RWd8Mg6VmAjBjzo96edj3Tvelw/exec';