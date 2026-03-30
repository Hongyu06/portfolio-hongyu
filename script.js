document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("section.section"));
  const languageSelect = document.getElementById("language-select");

  const projectCard = document.getElementById("project-card");
  const projectImage = document.getElementById("project-image");
  const projectTitle = document.getElementById("project-title");
  const projectDescription = document.getElementById("project-description");
  const projectItems = Array.from(document.querySelectorAll(".project-item"));

  const translations = {
    es: {
      "nav.about": "About Me",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "about.name": "Hongyu Lin",
      "about.role": "Programador",
      "about.p1":
        "Soy un desarrollador apasionado por crear experiencias digitales pulidas, intuitivas y con buen rendimiento. Me gusta combinar diseño y código para que cada proyecto se sienta moderno y cuidado en los detalles.",
      "about.p2":
        "En este portfolio encontrarás algunos de los trabajos que he realizado, desde páginas web hasta proyectos más técnicos.",
      "skills.title": "Skills",
      "projects.title": "Projects",
      "projects.listTitle": "Mis proyectos",
      "contact.title": "Contact Me",
      "contact.nameLabel": "Nombre",
      "contact.emailLabel": "Email",
      "contact.messageLabel": "Mensaje",
      "contact.send": "Enviar",
      "contact.note":
        "El formulario abrirá tu cliente de correo para enviar el mensaje.",
    },
    en: {
      "nav.about": "About Me",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "about.name": "Hongyu Lin",
      "about.role": "Developer",
      "about.p1":
        "I am a developer who loves building polished, intuitive and high‑performance digital experiences, combining design and code so every project feels modern and carefully crafted.",
      "about.p2":
        "In this portfolio you will find some of my work, from web pages to more technical projects.",
      "skills.title": "Skills",
      "projects.title": "Projects",
      "projects.listTitle": "My projects",
      "contact.title": "Contact Me",
      "contact.nameLabel": "Name",
      "contact.emailLabel": "Email",
      "contact.messageLabel": "Message",
      "contact.send": "Send",
      "contact.note":
        "The form will open your email client to send the message.",
    },
    zh: {
      "nav.about": "关于我",
      "nav.skills": "技能",
      "nav.projects": "项目",
      "nav.contact": "联系我",
      "about.name": "林宏宇",
      "about.role": "开发者",
      "about.p1":
        "我是一名热爱编程的开发者，喜欢把设计与代码结合起来，打造现代、细致并且好用的数字体验。",
      "about.p2":
        "在这个作品集中，你可以看到我做过的一些项目，从网页到更技术性的练习。",
      "skills.title": "技能",
      "projects.title": "项目",
      "projects.listTitle": "我的项目",
      "contact.title": "联系我",
      "contact.nameLabel": "姓名",
      "contact.emailLabel": "邮箱",
      "contact.messageLabel": "留言",
      "contact.send": "发送",
      "contact.note": "表单会打开你的邮箱客户端来发送这条消息。",
    },
  };

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.es;
    document.documentElement.lang = lang;
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (dict[key]) {
        node.textContent = dict[key];
      }
    });
  }

  function setActiveLinkById(id) {
    const targetLink = navLinks.find((link) => link.getAttribute("href") === `#${id}`);
    if (!targetLink) return;

    navLinks.forEach((link) => link.classList.remove("active"));
    targetLink.classList.add("active");
  }

  setActiveLinkById("about");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLinkById(entry.target.id);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  sections.forEach((section) => observer.observe(section));

  if (languageSelect) {
    languageSelect.value = "es";
    applyLanguage("es");

    languageSelect.addEventListener("change", () => {
      const lang = languageSelect.value;
      applyLanguage(lang);
    });
  }

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  if (themeToggle && themeIcon) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      if (document.body.classList.contains("light-mode")) {
        themeIcon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      } else {
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth",
      });
    });
  });

  if (projectCard) {
    projectCard.addEventListener("click", () => {
      projectCard.classList.toggle("flipped");
    });
  }

  function setActiveProject(item) {
    if (item.classList.contains("active")) return;

    projectItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");

    const title = item.dataset.title;
    const description = item.dataset.description;
    const image = item.dataset.image;

    if (projectCard) {
      if (projectCard.classList.contains("flipped")) {
        projectCard.classList.remove("flipped");
      }
      
      projectCard.classList.add('project-fade');
      
      setTimeout(() => {
        if (projectTitle) projectTitle.textContent = title;
        if (projectDescription) projectDescription.textContent = description;
        if (projectImage) projectImage.src = image;
        
        projectCard.classList.remove('project-fade');
      }, 300);
    } else {
      if (projectTitle) projectTitle.textContent = title;
      if (projectDescription) projectDescription.textContent = description;
      if (projectImage) projectImage.src = image;
    }
  }

  projectItems.forEach((item) => {
    item.addEventListener("click", () => {
      setActiveProject(item);
    });
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const name = contactForm.querySelector("#name").value.trim();
      const email = contactForm.querySelector("#email").value.trim();
      const message = contactForm.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        alert("Por favor, rellena todos los campos antes de enviar.");
      }
    });
  }
  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});

// --- Sistema de Partículas de Fondo ---
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let particlesArray = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  let mouse = {
    x: null,
    y: null,
    radius: 150
  };

  window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  document.documentElement.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', function() {
    resizeCanvas();
    initParticles();
  });

  class Particle {
    constructor(x, y, dx, dy, size, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      const isLightMode = document.body.classList.contains("light-mode");
      ctx.fillStyle = isLightMode ? 'rgba(0, 0, 0, 0.4)' : this.color;
      ctx.fill();
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      // Rebote en los bordes
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.dy = -this.dy;
      }

      // Atraer partículas hacia el ratón
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 1.5;
          const directionY = forceDirectionY * force * 1.5;
          
          this.x += directionX;
          this.y += directionY;
        }
      }

      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    let numberOfParticles = Math.floor((canvas.height * canvas.width) / 9000);
    if (numberOfParticles > 200) numberOfParticles = 200; // Límite para rendimiento
    
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.5;
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let dx = (Math.random() * 0.6) - 0.3;
      let dy = (Math.random() * 0.6) - 0.3;
      let color = 'rgba(255, 255, 255, 0.6)';
      
      particlesArray.push(new Particle(x, y, dx, dy, size, color));
    }
  }

  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distanceSq = dx * dx + dy * dy;
        
        if (distanceSq < 10000) {
          let opacityValue = 1 - (distanceSq / 10000);
          const isLightMode = document.body.classList.contains("light-mode");
          ctx.strokeStyle = `rgba(${isLightMode ? '0, 0, 0' : '255, 255, 255'}, ${opacityValue * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
      
      // Conectar con el ratón atraído con el color temático
      if (mouse.x != null && mouse.y != null) {
        let dx = particlesArray[a].x - mouse.x;
        let dy = particlesArray[a].y - mouse.y;
        let distanceSq = dx * dx + dy * dy;
        
        if (distanceSq < 20000) {
          let opacityValue = 1 - (distanceSq / 20000);
          ctx.strokeStyle = `rgba(255, 48, 64, ${opacityValue * 0.6})`; // #ff3040 que se usa en main theme
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    connectParticles();
  }

  initParticles();
  animateParticles();
})();
