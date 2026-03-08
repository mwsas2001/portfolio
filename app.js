/* ═══════════════════════════════════════════════
   محمد وسام — app.js  (shared between portfolio & dashboard)
   ═══════════════════════════════════════════════ */
'use strict';

/* ════════════════ DEFAULT DATA ════════════════ */
const DEFAULT_PROJECTS = [
  { id:'p1', name:'تطبيق صحة رقمية',   desc:'إعادة تصميم كاملة لتطبيق صحي، قلّصنا معدل الهجر 40% بعد دراسة معمّقة لسلوك المستخدمين.', icon:'🏥', bg:'linear-gradient(135deg,#1a0030,#6b21a8)', tags:[{label:'UX Research',cls:'pt-purple'},{label:'UI Design',cls:'pt-cyan'}], year:'2024', link:'#' },
  { id:'p2', name:'متجر أزياء راقية',   desc:'تصميم تجربة تسوق تجعل العميل يشعر بالترف. رفعنا معدل التحويل 28% عبر checkout سلس.',       icon:'🛒', bg:'linear-gradient(135deg,#001a30,#0369a1)', tags:[{label:'E-commerce',cls:'pt-cyan'},{label:'Conversion',cls:'pt-green'}],  year:'2024', link:'#' },
  { id:'p3', name:'منصة تعلّم تفاعلي', desc:'تصميم منصة تعليمية تحفيزية مع عناصر ألعاب ولوحة تقدم — رفعت معدل الإنجاز 60%.',            icon:'📚', bg:'linear-gradient(135deg,#1a1500,#854d0e)', tags:[{label:'EdTech',cls:'pt-yellow'},{label:'Gamification',cls:'pt-pink'}],  year:'2023', link:'#' },
  { id:'p4', name:'محفظة مالية ذكية',  desc:'بناء نظام تصميم كامل لتطبيق مالي من الصفر — مكوّنات وتجربة مستخدم متسقة بالكامل.',         icon:'💳', bg:'linear-gradient(135deg,#001a1a,#065f46)', tags:[{label:'Fintech',cls:'pt-green'},{label:'Design System',cls:'pt-cyan'}],  year:'2023', link:'#' },
  { id:'p5', name:'تطبيق بث موسيقي',   desc:'تجربة استماع غامرة مع انتقالات موشن سلسة وتصميم مظلم أنيق يعكس جماليات الموسيقى.',         icon:'🎵', bg:'linear-gradient(135deg,#1a0018,#9d174d)', tags:[{label:'Entertainment',cls:'pt-pink'},{label:'Motion UI',cls:'pt-purple'}], year:'2022', link:'#' },
  { id:'p6', name:'لوحة تحكم AI',      desc:'تصميم لوحة بيانات معقدة لأداة ذكاء اصطناعي — جعلنا البيانات قصصاً بصرية قابلة للفهم.',    icon:'🤖', bg:'linear-gradient(135deg,#0a0a1a,#1e1b4b)', tags:[{label:'AI Product',cls:'pt-purple'},{label:'Dashboard',cls:'pt-cyan'}],  year:'2022', link:'#' },
];

const DEFAULT_SERVICES = [
  { id:'s1', name:'تصميم UI',           icon:'🎨', desc:'واجهات مستخدم بصرية مذهلة تتسم بالاتساق والجمال لجميع المنصات.',                          color:'pink'   },
  { id:'s2', name:'بحث UX',             icon:'🔍', desc:'دراسة سلوك المستخدمين وتحليل احتياجاتهم لبناء تجارب حقيقية.',                               color:'cyan'   },
  { id:'s3', name:'الهوية البصرية',     icon:'✨', desc:'تصميم هوية بصرية متكاملة تعكس شخصية علامتك التجارية بفرادة.',                              color:'purple' },
  { id:'s4', name:'النماذج الأولية',    icon:'📱', desc:'نماذج تفاعلية عالية الدقة تسمح باختبار المنتج قبل التطوير.',                               color:'yellow' },
  { id:'s5', name:'نظام التصميم',       icon:'🗂️', desc:'بناء مكتبة مكوّنات موحدة تضمن الاتساق عبر كامل المنتج.',                                   color:'green'  },
  { id:'s6', name:'الحركة والتفاعل',    icon:'🎬', desc:'انيميشن وموشن ديزاين يمنح المنتج شخصية حيوية وتجربة لا تُنسى.',                            color:'pink'   },
];

/* ════════════════ DATA STORE ════════════════ */
const STORE = {
  getProjects(){ return this._get('mw_projects', DEFAULT_PROJECTS); },
  getServices(){ return this._get('mw_services',  DEFAULT_SERVICES); },
  getMessages(){ return this._get('mw_messages',  []); },

  saveProjects(d){ this._set('mw_projects', d); },
  saveServices(d){ this._set('mw_services',  d); },
  saveMessages(d){ this._set('mw_messages',  d); },

  addProject(p)  { const l=this.getProjects(); l.push(p); this.saveProjects(l); },
  removeProject(id){ this.saveProjects(this.getProjects().filter(p=>p.id!==id)); },
  updateProject(id,data){
    const l=this.getProjects();
    const i=l.findIndex(p=>p.id===id);
    if(i>-1){ l[i]={...l[i],...data}; this.saveProjects(l); }
  },

  addService(s)  { const l=this.getServices(); l.push(s); this.saveServices(l); },
  removeService(id){ this.saveServices(this.getServices().filter(s=>s.id!==id)); },
  updateService(id,data){
    const l=this.getServices();
    const i=l.findIndex(s=>s.id===id);
    if(i>-1){ l[i]={...l[i],...data}; this.saveServices(l); }
  },

  addMessage(m)  {
    const l=this.getMessages();
    l.unshift(m);
    this.saveMessages(l);
  },
  markRead(id){
    const l=this.getMessages();
    const i=l.findIndex(m=>m.id===id);
    if(i>-1){ l[i].read=true; this.saveMessages(l); }
  },
  clearMessages(){ this.saveMessages([]); },

  _get(k,fb){ try{ const r=localStorage.getItem(k); return r?JSON.parse(r):fb; }catch{ return fb; } },
  _set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};

/* ════════════════ COLOR MAP ════════════════ */
const COLOR_ACCENT = {
  pink:'var(--pink)', cyan:'var(--cyan)', purple:'var(--purple)', yellow:'var(--yellow)', green:'var(--green)'
};

/* ════════════════ TOAST ════════════════ */
let _toastTimer;
function showToast(msg, duration=3000){
  const el=document.getElementById('toast');
  if(!el) return;
  el.textContent=msg;
  el.classList.remove('hidden');
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>el.classList.add('hidden'), duration);
}

/* ════════════════ REVEAL OBSERVER ════════════════ */
const revealObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('up'); revealObs.unobserve(e.target); }
  });
},{threshold:0.1});

function observeReveals(root=document){
  root.querySelectorAll('.reveal:not(.up)').forEach((el,i)=>{
    el.style.transitionDelay=`${i*0.06}s`;
    revealObs.observe(el);
  });
}

/* ════════════════ RENDER PORTFOLIO ════════════════ */
function renderProjects(){
  const grid=document.getElementById('projectsGrid');
  if(!grid) return;
  const projects=STORE.getProjects();
  if(!projects.length){
    grid.innerHTML='<p style="color:var(--dim);text-align:center;padding:3rem 0;grid-column:1/-1">لا توجد مشاريع بعد.</p>';
    return;
  }
  grid.innerHTML=projects.map(p=>{
    const tags=(p.tags||[]).map(t=>`<span class="p-tag ${t.cls}">${t.label}</span>`).join('');
    const href=p.link&&p.link!=='#'?p.link:'#';
    return `
    <a href="${href}" ${href!=='#'?'target="_blank"':''} class="project-card reveal">
      <div class="p-thumb" style="background:${p.bg}">${p.icon}<div class="p-overlay">استعراض ↗</div></div>
      <div class="p-body">
        <div class="p-tags">${tags}</div>
        <div class="p-name">${p.name}</div>
        <p class="p-desc">${p.desc}</p>
      </div>
      <div class="p-footer"><span class="p-link">استعراض الحالة ↗</span><span class="p-year">${p.year}</span></div>
    </a>`;
  }).join('');
  observeReveals(grid);
}

function renderServices(){
  const grid=document.getElementById('servicesGrid');
  if(!grid) return;
  const services=STORE.getServices();
  if(!services.length){
    grid.innerHTML='<p style="color:var(--dim);text-align:center;padding:3rem 0;grid-column:1/-1">لا توجد خدمات بعد.</p>';
    return;
  }
  grid.innerHTML=services.map(s=>`
    <div class="service-card reveal">
      <span class="service-icon">${s.icon}</span>
      <div class="service-name">${s.name}</div>
      <p class="service-desc">${s.desc}</p>
      <div class="service-accent" style="background:${COLOR_ACCENT[s.color]||'var(--pink)'}"></div>
    </div>`).join('');
  observeReveals(grid);
}

/* ════════════════ CURSOR ════════════════ */
function initCursor(){
  const cur=document.getElementById('cursor');
  const ring=document.getElementById('cursor-ring');
  if(!cur||!ring) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    cur.style.left=(mx-6)+'px'; cur.style.top=(my-6)+'px';
  });
  (function loop(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=(rx-18)+'px'; ring.style.top=(ry-18)+'px'; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover',e=>{
    if(e.target.closest('a,button,.project-card,.service-card,.social-card')){
      cur.style.transform='scale(2.5)'; ring.style.transform='scale(1.4)'; ring.style.borderColor='var(--pink)';
    }
  });
  document.addEventListener('mouseout',e=>{
    if(e.target.closest('a,button,.project-card,.service-card,.social-card')){
      cur.style.transform='scale(1)'; ring.style.transform='scale(1)'; ring.style.borderColor='var(--cyan)';
    }
  });
}

/* ════════════════ NAVBAR ════════════════ */
function initNavbar(){
  const toggle=document.getElementById('navToggle');
  const links=document.getElementById('navLinks');
  const navbar=document.getElementById('navbar');
  if(!navbar) return;

  toggle?.addEventListener('click',()=>{
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    toggle?.classList.remove('open'); links?.classList.remove('open');
  }));

  const sections=document.querySelectorAll('section[id]');
  const navAs=document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',()=>{
    navbar.style.boxShadow=window.scrollY>10?'0 4px 30px rgba(0,0,0,.4)':'none';
    let cur='';
    sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-120) cur=s.id; });
    navAs.forEach(a=>{ a.style.color=a.getAttribute('href')==='#'+cur?'var(--white)':''; });
  },{passive:true});
}

/* ════════════════ CONTACT FORM ════════════════ */
function initContactForm(){
  document.getElementById('sendBtn')?.addEventListener('click',()=>{
    const name  = document.getElementById('cf-name')?.value.trim();
    const email = document.getElementById('cf-email')?.value.trim();
    const type  = document.getElementById('cf-type')?.value;
    const msg   = document.getElementById('cf-msg')?.value.trim();

    if(!name||!email||!msg){
      showToast('يرجى ملء جميع الحقول الإلزامية ✗');
      [document.getElementById('cf-name'),document.getElementById('cf-email'),document.getElementById('cf-msg')]
        .forEach(el=>{ if(el&&!el.value.trim()){ el.style.borderColor='var(--pink)'; setTimeout(()=>{el.style.borderColor='';},2000); }});
      return;
    }

    // Save message to store
    STORE.addMessage({
      id: 'm_'+Date.now(),
      name, email,
      type: type||'غير محدد',
      msg,
      date: new Date().toLocaleString('ar-EG'),
      read: false,
    });

    showToast('🎉 تم إرسال رسالتك! سأتواصل معك خلال 24 ساعة.');
    ['cf-name','cf-email','cf-type','cf-msg'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.value='';
    });
  });
}

/* ════════════════ SMOOTH SCROLL ════════════════ */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); const off=document.getElementById('navbar')?.offsetHeight||68; window.scrollTo({top:t.offsetTop-off,behavior:'smooth'}); }
    });
  });
}

/* ════════════════ BOOT ════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  renderProjects();
  renderServices();
  observeReveals();
  initCursor();
  initNavbar();
  initContactForm();
  initSmoothScroll();
});
