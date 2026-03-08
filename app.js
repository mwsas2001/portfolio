/* ═══════════════════════════════════════════════════════
   PORTFOLIO — محمد وسام | app.js
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════ DEFAULT DATA ══════════════════════════════ */

const DEFAULT_PROJECTS = [
  {
    id: 'p1',
    name: 'تطبيق صحة رقمية',
    desc: 'إعادة تصميم كاملة لتطبيق صحي، قلّصنا معدل الهجر 40% بعد دراسة معمّقة لسلوك المستخدمين.',
    icon: '🏥',
    bg: 'linear-gradient(135deg,#1a0030,#6b21a8)',
    tags: [{ label: 'UX Research', cls: 'pt-purple' }, { label: 'UI Design', cls: 'pt-cyan' }],
    year: '2024',
  },
  {
    id: 'p2',
    name: 'متجر أزياء راقية',
    desc: 'تصميم تجربة تسوق تجعل العميل يشعر بالترف. رفعنا معدل التحويل 28% عبر checkout سلس.',
    icon: '🛒',
    bg: 'linear-gradient(135deg,#001a30,#0369a1)',
    tags: [{ label: 'E-commerce', cls: 'pt-cyan' }, { label: 'Conversion UX', cls: 'pt-green' }],
    year: '2024',
  },
  {
    id: 'p3',
    name: 'منصة تعلّم تفاعلي',
    desc: 'تصميم منصة تعليمية تحفيزية مع عناصر ألعاب ولوحة تقدم — رفعت معدل الإنجاز 60%.',
    icon: '📚',
    bg: 'linear-gradient(135deg,#1a1500,#854d0e)',
    tags: [{ label: 'EdTech', cls: 'pt-yellow' }, { label: 'Gamification', cls: 'pt-pink' }],
    year: '2023',
  },
  {
    id: 'p4',
    name: 'محفظة مالية ذكية',
    desc: 'بناء نظام تصميم كامل لتطبيق مالي من الصفر — مكوّنات وتجربة مستخدم متسقة بالكامل.',
    icon: '💳',
    bg: 'linear-gradient(135deg,#001a1a,#065f46)',
    tags: [{ label: 'Fintech', cls: 'pt-green' }, { label: 'Design System', cls: 'pt-cyan' }],
    year: '2023',
  },
  {
    id: 'p5',
    name: 'تطبيق بث موسيقي',
    desc: 'تجربة استماع غامرة مع انتقالات موشن سلسة وتصميم مظلم أنيق يعكس جماليات الموسيقى.',
    icon: '🎵',
    bg: 'linear-gradient(135deg,#1a0018,#9d174d)',
    tags: [{ label: 'Entertainment', cls: 'pt-pink' }, { label: 'Motion UI', cls: 'pt-purple' }],
    year: '2022',
  },
  {
    id: 'p6',
    name: 'لوحة تحكم AI',
    desc: 'تصميم لوحة بيانات معقدة لأداة ذكاء اصطناعي — جعلنا البيانات قصصاً بصرية قابلة للفهم.',
    icon: '🤖',
    bg: 'linear-gradient(135deg,#0a0a1a,#1e1b4b)',
    tags: [{ label: 'AI Product', cls: 'pt-purple' }, { label: 'Dashboard', cls: 'pt-cyan' }],
    year: '2022',
  },
];

const DEFAULT_SERVICES = [
  { id: 's1', name: 'تصميم UI', icon: '🎨', desc: 'واجهات مستخدم بصرية مذهلة تتسم بالاتساق والجمال لجميع المنصات.', color: 'pink' },
  { id: 's2', name: 'بحث UX', icon: '🔍', desc: 'دراسة سلوك المستخدمين وتحليل احتياجاتهم لبناء تجارب حقيقية.', color: 'cyan' },
  { id: 's3', name: 'الهوية البصرية', icon: '✨', desc: 'تصميم هوية بصرية متكاملة تعكس شخصية علامتك التجارية بفرادة.', color: 'purple' },
  { id: 's4', name: 'النماذج الأولية', icon: '📱', desc: 'نماذج تفاعلية عالية الدقة تسمح باختبار المنتج قبل التطوير.', color: 'yellow' },
  { id: 's5', name: 'نظام التصميم', icon: '🗂️', desc: 'بناء مكتبة مكوّنات موحدة تضمن الاتساق عبر كامل المنتج.', color: 'green' },
  { id: 's6', name: 'الحركة والتفاعل', icon: '🎬', desc: 'انيميشن وموشن ديزاين يمنح المنتج شخصية حيوية وتجربة لا تُنسى.', color: 'pink' },
];

/* ══════════════════════════════ DATA STORE (localStorage) ═════════════════ */

const STORE = {
  KEY_PROJECTS: 'mw_projects',
  KEY_SERVICES: 'mw_services',

  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },

  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
  },

  getProjects() { return this.get(this.KEY_PROJECTS, DEFAULT_PROJECTS); },
  getServices()  { return this.get(this.KEY_SERVICES,  DEFAULT_SERVICES); },
  saveProjects(p){ this.set(this.KEY_PROJECTS, p); },
  saveServices(s){ this.set(this.KEY_SERVICES,  s); },

  addProject(proj) {
    const list = this.getProjects();
    list.push(proj);
    this.saveProjects(list);
  },
  removeProject(id) {
    this.saveProjects(this.getProjects().filter(p => p.id !== id));
  },
  addService(svc) {
    const list = this.getServices();
    list.push(svc);
    this.saveServices(list);
  },
  removeService(id) {
    this.saveServices(this.getServices().filter(s => s.id !== id));
  },
};

/* ══════════════════════════════ RENDER HELPERS ════════════════════════════ */

const COLOR_MAP = {
  pink:   { accent: 'var(--pink)',   cls: 'pt-pink' },
  cyan:   { accent: 'var(--cyan)',   cls: 'pt-cyan' },
  purple: { accent: 'var(--purple)', cls: 'pt-purple' },
  yellow: { accent: 'var(--yellow)', cls: 'pt-yellow' },
  green:  { accent: 'var(--green)',  cls: 'pt-green' },
};

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const projects = STORE.getProjects();

  if (!projects.length) {
    grid.innerHTML = '<p style="color:var(--dim);text-align:center;padding:3rem 0">لا توجد مشاريع بعد. أضف مشاريعك من لوحة التحكم!</p>';
    return;
  }

  grid.innerHTML = projects.map(p => {
    const tagsHtml = (p.tags || []).map(t =>
      `<span class="p-tag ${t.cls}">${t.label}</span>`
    ).join('');
    return `
      <a href="#" class="project-card reveal">
        <div class="p-thumb" style="background:${p.bg}">
          ${p.icon}
          <div class="p-overlay">استعراض ↗</div>
        </div>
        <div class="p-body">
          <div class="p-tags">${tagsHtml}</div>
          <div class="p-name">${p.name}</div>
          <p class="p-desc">${p.desc}</p>
        </div>
        <div class="p-footer">
          <span class="p-link">استعراض الحالة ↗</span>
          <span class="p-year">${p.year}</span>
        </div>
      </a>`;
  }).join('');

  // Re-observe new cards
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    revealObserver.observe(el);
  });
}

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  const services = STORE.getServices();

  if (!services.length) {
    grid.innerHTML = '<p style="color:var(--dim);text-align:center;padding:3rem 0">لا توجد خدمات بعد. أضف خدماتك من لوحة التحكم!</p>';
    return;
  }

  grid.innerHTML = services.map(s => {
    const accent = (COLOR_MAP[s.color] || COLOR_MAP.pink).accent;
    return `
      <div class="service-card reveal">
        <span class="service-icon">${s.icon}</span>
        <div class="service-name">${s.name}</div>
        <p class="service-desc">${s.desc}</p>
        <div class="service-accent" style="background:${accent}"></div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    revealObserver.observe(el);
  });
}

/* ══════════════════════════════ DASHBOARD LIST RENDERS ════════════════════ */

function renderDashProjects() {
  const list = document.getElementById('projectsList');
  const projects = STORE.getProjects();

  if (!projects.length) {
    list.innerHTML = '<p style="color:var(--dim);font-size:.85rem;text-align:center;padding:1rem 0">لا توجد مشاريع.</p>';
    return;
  }

  list.innerHTML = projects.map(p => `
    <div class="dash-item">
      <div class="dash-item-info">
        <div class="dash-item-name">${p.icon} ${p.name}</div>
        <div class="dash-item-sub">${p.year} — ${(p.tags || []).map(t => t.label).join(', ')}</div>
      </div>
      <button class="dash-item-del" data-id="${p.id}" data-type="project">🗑 حذف</button>
    </div>`).join('');

  list.querySelectorAll('[data-type="project"]').forEach(btn =>
    btn.addEventListener('click', () => {
      STORE.removeProject(btn.dataset.id);
      renderProjects();
      renderDashProjects();
      showToast('تم حذف المشروع ✓');
    })
  );
}

function renderDashServices() {
  const list = document.getElementById('servicesList');
  const services = STORE.getServices();

  if (!services.length) {
    list.innerHTML = '<p style="color:var(--dim);font-size:.85rem;text-align:center;padding:1rem 0">لا توجد خدمات.</p>';
    return;
  }

  list.innerHTML = services.map(s => `
    <div class="dash-item">
      <div class="dash-item-info">
        <div class="dash-item-name">${s.icon} ${s.name}</div>
        <div class="dash-item-sub">${s.desc.slice(0, 50)}...</div>
      </div>
      <button class="dash-item-del" data-id="${s.id}" data-type="service">🗑 حذف</button>
    </div>`).join('');

  list.querySelectorAll('[data-type="service"]').forEach(btn =>
    btn.addEventListener('click', () => {
      STORE.removeService(btn.dataset.id);
      renderServices();
      renderDashServices();
      showToast('تم حذف الخدمة ✓');
    })
  );
}

/* ══════════════════════════════ SCROLL REVEAL ═════════════════════════════ */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('up');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function initReveal() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    revealObserver.observe(el);
  });
}

/* ══════════════════════════════ CUSTOM CURSOR ═════════════════════════════ */

function initCursor() {
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left  = (mx - 6) + 'px';
    cur.style.top   = (my - 6) + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = (rx - 18) + 'px';
    ring.style.top  = (ry - 18) + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverEls = 'a, button, .project-card, .service-card, .social-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) {
      cur.style.transform  = 'scale(2.5)';
      ring.style.transform = 'scale(1.4)';
      ring.style.borderColor = 'var(--pink)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) {
      cur.style.transform  = 'scale(1)';
      ring.style.transform = 'scale(1)';
      ring.style.borderColor = 'var(--cyan)';
    }
  });
}

/* ══════════════════════════════ NAVBAR ════════════════════════════════════ */

function initNavbar() {
  const toggle   = document.getElementById('navToggle');
  const links    = document.getElementById('navLinks');
  const navbar   = document.getElementById('navbar');

  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click (mobile)
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Navbar shadow on scroll
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,.4)'
      : 'none';

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAs.forEach(a => {
      const match = a.getAttribute('href') === '#' + current;
      a.style.color = match ? 'var(--white)' : '';
    });
  }, { passive: true });
}

/* ══════════════════════════════ DASHBOARD ═════════════════════════════════ */

const DASH_PASSWORD = 'admin123'; // Change this!

function initDashboard() {
  const overlay     = document.getElementById('dashboardOverlay');
  const openBtn     = document.getElementById('openDashboard');
  const closeBtn    = document.getElementById('closeDashboard');
  const loginScreen = document.getElementById('loginScreen');
  const dashContent = document.getElementById('dashContent');
  const passInput   = document.getElementById('dashPassword');
  const loginBtn    = document.getElementById('loginBtn');

  let unlocked = false;

  openBtn?.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (!unlocked) {
      loginScreen.classList.remove('hidden');
      dashContent.classList.add('hidden');
    }
  });

  const close = () => {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  };
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', e => { if (e.target === overlay) close(); });

  // Login
  const tryLogin = () => {
    if (passInput.value === DASH_PASSWORD) {
      unlocked = true;
      loginScreen.classList.add('hidden');
      dashContent.classList.remove('hidden');
      renderDashProjects();
      renderDashServices();
      passInput.value = '';
    } else {
      passInput.style.borderColor = 'var(--pink)';
      passInput.style.boxShadow   = '0 0 0 4px rgba(255,45,120,.12)';
      showToast('كلمة المرور غير صحيحة ✗');
      setTimeout(() => {
        passInput.style.borderColor = '';
        passInput.style.boxShadow   = '';
      }, 1500);
    }
  };

  loginBtn?.addEventListener('click', tryLogin);
  passInput?.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

  // Tabs
  document.querySelectorAll('.dash-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.dash-panel').forEach(p => p.classList.add('hidden'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab)?.classList.remove('hidden');
    });
  });

  // Add project
  document.getElementById('addProjectBtn')?.addEventListener('click', () => {
    const name = document.getElementById('pName').value.trim();
    const year = document.getElementById('pYear').value.trim() || new Date().getFullYear();
    const desc = document.getElementById('pDesc').value.trim();
    const icon = document.getElementById('pIcon').value.trim() || '🎨';
    const bg   = document.getElementById('pBg').value.trim()   || 'linear-gradient(135deg,#1a0030,#6b21a8)';
    const rawTags = document.getElementById('pTags').value.trim();

    if (!name || !desc) { showToast('يرجى ملء الاسم والوصف ✗'); return; }

    const tagColors = ['pt-pink', 'pt-cyan', 'pt-purple', 'pt-yellow', 'pt-green'];
    const tags = rawTags
      ? rawTags.split(',').map((t, i) => ({ label: t.trim(), cls: tagColors[i % tagColors.length] }))
      : [];

    STORE.addProject({ id: 'p_' + Date.now(), name, year, desc, icon, bg, tags });
    renderProjects();
    renderDashProjects();
    showToast('تمت إضافة المشروع ✓');

    // Clear inputs
    ['pName','pYear','pDesc','pIcon','pBg','pTags'].forEach(id => {
      document.getElementById(id).value = '';
    });
  });

  // Add service
  document.getElementById('addServiceBtn')?.addEventListener('click', () => {
    const name  = document.getElementById('sName').value.trim();
    const icon  = document.getElementById('sIcon').value.trim() || '🛠';
    const desc  = document.getElementById('sDesc').value.trim();
    const color = document.getElementById('sColor').value;

    if (!name || !desc) { showToast('يرجى ملء الاسم والوصف ✗'); return; }

    STORE.addService({ id: 's_' + Date.now(), name, icon, desc, color });
    renderServices();
    renderDashServices();
    showToast('تمت إضافة الخدمة ✓');

    ['sName','sIcon','sDesc'].forEach(id => { document.getElementById(id).value = ''; });
  });
}

/* ══════════════════════════════ CONTACT FORM ══════════════════════════════ */

function initContactForm() {
  document.getElementById('sendBtn')?.addEventListener('click', () => {
    const form   = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        inp.style.borderColor = 'var(--pink)';
        valid = false;
        setTimeout(() => { inp.style.borderColor = ''; }, 2000);
      }
    });

    if (!valid) { showToast('يرجى ملء جميع الحقول ✗'); return; }

    showToast('🎉 تم إرسال رسالتك! سأتواصل معك خلال 24 ساعة.');
    inputs.forEach(inp => { inp.value = ''; });
  });
}

/* ══════════════════════════════ TOAST UTILITY ═════════════════════════════ */

let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

/* ══════════════════════════════ SMOOTH SCROLL FIX ═════════════════════════ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar')?.offsetHeight || 70;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });
}

/* ══════════════════════════════ INIT ══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderServices();
  initReveal();
  initCursor();
  initNavbar();
  initDashboard();
  initContactForm();
  initSmoothScroll();
});
