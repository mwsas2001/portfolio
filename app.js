/* ═══════════════════════════════════════════════════════
   محمد وسام — app.js   (shared: portfolio + dashboard)
   ═══════════════════════════════════════════════════════ */
'use strict';

/* ════════ DEFAULT DATA ════════ */
const DEFAULT_SERVICES = [
  {
    id:'s1', name:'تصميم UI', icon:'🎨', color:'pink',
    desc:'واجهات مستخدم بصرية مذهلة تتسم بالاتساق والجمال لجميع المنصات.',
    fullDesc:'نصمم واجهات مستخدم احترافية تجمع بين الجمال البصري والوظيفية العملية. من الألوان والطباعة إلى المكوّنات التفاعلية، كل تفصيلة مدروسة لتقديم تجربة لا تُنسى.',
    features:['تصميم شاشات كاملة High-Fidelity','مكتبة مكوّنات قابلة للتوسع','أنظمة ألوان وطباعة متسقة','تصميم Responsive لكل الأحجام','ملف Figma منظم وقابل للتسليم'],
    process:['تحليل المتطلبات والمنافسين','مرحلة Wireframing والهيكل','التصميم البصري والألوان','المراجعة والتعديلات','التسليم النهائي'],
    duration:'2 – 4 أسابيع',
    startingPrice:'$500',
    deliverables:'ملف Figma كامل، Prototype تفاعلي، Style Guide',
  },
  {
    id:'s2', name:'بحث UX', icon:'🔍', color:'cyan',
    desc:'دراسة سلوك المستخدمين وتحليل احتياجاتهم لبناء تجارب حقيقية.',
    fullDesc:'نبني منتجات ناجحة من خلال فهم عميق للمستخدم. نُجري مقابلات، اختبارات قابلية الاستخدام، وتحليل البيانات لضمان أن كل قرار تصميمي مبني على دليل حقيقي لا على افتراضات.',
    features:['مقابلات المستخدمين User Interviews','اختبارات قابلية الاستخدام Usability Testing','تحليل تنافسي شامل','رسم خرائط رحلة المستخدم User Journey','Persona Development'],
    process:['تحديد أسئلة البحث','تصميم منهجية البحث','جمع البيانات والمقابلات','تحليل النتائج','تقرير وتوصيات'],
    duration:'1 – 3 أسابيع',
    startingPrice:'$400',
    deliverables:'تقرير بحثي، User Personas، Journey Maps، توصيات',
  },
  {
    id:'s3', name:'الهوية البصرية', icon:'✨', color:'purple',
    desc:'تصميم هوية بصرية متكاملة تعكس شخصية علامتك التجارية بفرادة.',
    fullDesc:'هويتك البصرية هي أول انطباع يتركه منتجك. نبني هويات قوية ومتميزة تتحدث عن قيمك وتميّزك في السوق — من الشعار إلى كامل نظام الألوان والطباعة.',
    features:['تصميم الشعار Logo Design','نظام ألوان Brand Colors','اختيار الخطوط Typography','دليل الهوية Brand Guidelines','تطبيق الهوية على المواد'],
    process:['استكشاف الهوية والقيم','مرحلة البحث والإلهام','تصميم مفاهيم أولية','التطوير والتنقيح','التسليم والدليل'],
    duration:'3 – 5 أسابيع',
    startingPrice:'$700',
    deliverables:'ملفات الشعار (SVG, PNG, PDF)، Brand Guidelines، Brand Kit',
  },
  {
    id:'s4', name:'النماذج الأولية', icon:'📱', color:'yellow',
    desc:'نماذج تفاعلية عالية الدقة تسمح باختبار المنتج قبل التطوير.',
    fullDesc:'قبل أن تبدأ التطوير، اختبر فكرتك. نبني Prototypes تفاعلية واقعية تُمكنك من اختبار تجربة المستخدم، جمع التغذية الراجعة، وتوفير وقت وتكاليف التطوير.',
    features:['Wireframes منخفضة الدقة','High-Fidelity Prototypes','Prototype تفاعلي كامل','اختبار مع مستخدمين حقيقيين','إصلاح المشكلات قبل التطوير'],
    process:['فهم التدفقات الرئيسية','Wireframes سريعة','بناء الـ Prototype','جلسات الاختبار','التحسين والتسليم'],
    duration:'1 – 3 أسابيع',
    startingPrice:'$300',
    deliverables:'Figma Prototype تفاعلي، تقرير الاختبار، ملاحظات التحسين',
  },
  {
    id:'s5', name:'نظام التصميم', icon:'🗂️', color:'green',
    desc:'بناء مكتبة مكوّنات موحدة تضمن الاتساق عبر كامل المنتج.',
    fullDesc:'نظام التصميم هو لغة مشتركة بين المصممين والمطورين. نبني مكتبات مكوّنات شاملة تسرّع التطوير، تضمن الاتساق، وتسهل توسيع المنتج مستقبلاً.',
    features:['Component Library كاملة','Design Tokens (ألوان، مسافات، أحجام)','توثيق شامل للمكوّنات','إرشادات الاستخدام','دعم Dark/Light Mode'],
    process:['تدقيق التصميم الحالي','تعريف المكوّنات الأساسية','بناء المكتبة','التوثيق','التسليم والتدريب'],
    duration:'4 – 8 أسابيع',
    startingPrice:'$1200',
    deliverables:'Figma Component Library، Design Tokens، وثائق Storybook',
  },
  {
    id:'s6', name:'الحركة والتفاعل', icon:'🎬', color:'pink',
    desc:'انيميشن وموشن ديزاين يمنح المنتج شخصية حيوية وتجربة لا تُنسى.',
    fullDesc:'الحركة تحوّل الواجهات من ساكنة إلى حيّة. نصمم micro-interactions وانيميشن هادفة تقود المستخدم، تعزز التفاعل، وتُضفي شخصية فريدة على منتجك.',
    features:['Micro-interactions تفاعلية','انتقالات Transitions سلسة','Loading Animations','Scroll Animations','تصدير للمطورين (Lottie, CSS)'],
    process:['تحديد لحظات الحركة الرئيسية','تصميم المبادئ الحركية','بناء النماذج الحركية','الاختبار والتحسين','التسليم للتطوير'],
    duration:'2 – 4 أسابيع',
    startingPrice:'$600',
    deliverables:'ملفات Lottie، After Effects، مواصفات للمطورين',
  },
];

const DEFAULT_PROJECTS = [
  { id:'p1', name:'تطبيق صحة رقمية', desc:'إعادة تصميم كاملة لتطبيق صحي، قلّصنا معدل الهجر 40%.', icon:'🏥', bg:'linear-gradient(135deg,#1a0030,#6b21a8)', tags:[{label:'UX Research',cls:'pt-purple'},{label:'UI Design',cls:'pt-cyan'}], year:'2024', link:'#' },
  { id:'p2', name:'متجر أزياء راقية', desc:'رفعنا معدل التحويل 28% عبر تجربة checkout سلسة وجميلة.', icon:'🛒', bg:'linear-gradient(135deg,#001a30,#0369a1)', tags:[{label:'E-commerce',cls:'pt-cyan'},{label:'Conversion',cls:'pt-green'}], year:'2024', link:'#' },
  { id:'p3', name:'منصة تعلّم تفاعلي', desc:'منصة تعليمية بعناصر ألعاب رفعت معدل الإنجاز 60%.', icon:'📚', bg:'linear-gradient(135deg,#1a1500,#854d0e)', tags:[{label:'EdTech',cls:'pt-yellow'},{label:'Gamification',cls:'pt-pink'}], year:'2023', link:'#' },
  { id:'p4', name:'محفظة مالية ذكية', desc:'نظام تصميم كامل لتطبيق مالي من الصفر.', icon:'💳', bg:'linear-gradient(135deg,#001a1a,#065f46)', tags:[{label:'Fintech',cls:'pt-green'},{label:'Design System',cls:'pt-cyan'}], year:'2023', link:'#' },
  { id:'p5', name:'تطبيق بث موسيقي', desc:'تجربة استماع غامرة مع انيميشن سلس وتصميم مظلم أنيق.', icon:'🎵', bg:'linear-gradient(135deg,#1a0018,#9d174d)', tags:[{label:'Entertainment',cls:'pt-pink'},{label:'Motion UI',cls:'pt-purple'}], year:'2022', link:'#' },
  { id:'p6', name:'لوحة تحكم AI', desc:'تصميم داشبورد معقد يحوّل البيانات إلى قصص بصرية.', icon:'🤖', bg:'linear-gradient(135deg,#0a0a1a,#1e1b4b)', tags:[{label:'AI Product',cls:'pt-purple'},{label:'Dashboard',cls:'pt-cyan'}], year:'2022', link:'#' },
];

/* ════════ STORE ════════ */
const STORE = {
  getProjects(){ return this._get('mw_projects', DEFAULT_PROJECTS); },
  getServices(){ return this._get('mw_services', DEFAULT_SERVICES); },
  getMessages(){ return this._get('mw_messages', []); },

  saveProjects(d){ this._set('mw_projects', d); },
  saveServices(d){ this._set('mw_services', d); },
  saveMessages(d){ this._set('mw_messages', d); },

  addProject(p)   { const l=this.getProjects(); l.push(p); this.saveProjects(l); },
  removeProject(id){ this.saveProjects(this.getProjects().filter(x=>x.id!==id)); },
  updateProject(id,data){ this._upd('mw_projects',id,data,DEFAULT_PROJECTS); },

  addService(s)   { const l=this.getServices(); l.push(s); this.saveServices(l); },
  removeService(id){ this.saveServices(this.getServices().filter(x=>x.id!==id)); },
  updateService(id,data){ this._upd('mw_services',id,data,DEFAULT_SERVICES); },

  addMessage(m)   { const l=this.getMessages(); l.unshift(m); this.saveMessages(l); },
  markRead(id)    { this._upd('mw_messages',id,{read:true},[]); },
  clearMessages() { this.saveMessages([]); },

  _upd(key,id,data,fb){
    const l=this._get(key,fb);
    const i=l.findIndex(x=>x.id===id);
    if(i>-1){ l[i]={...l[i],...data}; this._set(key,l); }
  },
  _get(k,fb){ try{ const r=localStorage.getItem(k); return r?JSON.parse(r):fb; }catch{return fb;} },
  _set(k,v) { try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};

/* ════════ COLOR ACCENT ════════ */
const COLOR_ACCENT = {
  pink:'var(--pink)', cyan:'var(--cyan)', purple:'var(--purple)', yellow:'var(--yellow)', green:'var(--green)'
};

/* ════════ TOAST ════════ */
let _tt;
function showToast(msg, dur=3000){
  const el=document.getElementById('toast');
  if(!el) return;
  el.textContent=msg; el.classList.remove('hidden');
  clearTimeout(_tt); _tt=setTimeout(()=>el.classList.add('hidden'),dur);
}

/* ════════ REVEAL ════════ */
const _revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('up'); _revObs.unobserve(e.target); } });
},{threshold:0.08});

function observeReveals(root=document){
  root.querySelectorAll('.reveal:not(.up)').forEach((el,i)=>{
    el.style.transitionDelay=`${i*0.06}s`;
    _revObs.observe(el);
  });
}

/* ════════ RENDER SERVICES CARDS (main page) ════════ */
function renderServices(){
  const grid=document.getElementById('servicesGrid');
  if(!grid) return;
  const services=STORE.getServices();
  if(!services.length){
    grid.innerHTML='<p class="empty-msg">لا توجد خدمات بعد.</p>';
    return;
  }
  grid.innerHTML=services.map(s=>`
    <a href="service.html?id=${s.id}" class="service-card reveal">
      <span class="service-icon">${s.icon}</span>
      <div class="service-name">${s.name}</div>
      <p class="service-desc">${s.desc}</p>
      <div class="service-accent" style="background:${COLOR_ACCENT[s.color]||'var(--pink)'}"></div>
      <div class="service-cta">اعرف أكثر →</div>
    </a>`).join('');
  observeReveals(grid);
}

/* ════════ RENDER PROJECTS CARDS ════════ */
function renderProjects(){
  const grid=document.getElementById('projectsGrid');
  if(!grid) return;
  const projects=STORE.getProjects();
  if(!projects.length){
    grid.innerHTML='<p class="empty-msg">لا توجد مشاريع بعد.</p>';
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

/* ════════ CURSOR ════════ */
function initCursor(){
  const cur=document.getElementById('cursor'), ring=document.getElementById('cursor-ring');
  if(!cur||!ring) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; cur.style.left=(mx-6)+'px'; cur.style.top=(my-6)+'px'; });
  (function loop(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=(rx-18)+'px'; ring.style.top=(ry-18)+'px'; requestAnimationFrame(loop); })();
  const SEL='a,button,.project-card,.service-card,.social-card';
  document.addEventListener('mouseover',e=>{ if(e.target.closest(SEL)){ cur.style.transform='scale(2.5)'; ring.style.transform='scale(1.4)'; ring.style.borderColor='var(--pink)'; }});
  document.addEventListener('mouseout', e=>{ if(e.target.closest(SEL)){ cur.style.transform='scale(1)';   ring.style.transform='scale(1)';   ring.style.borderColor='var(--cyan)'; }});
}

/* ════════ NAVBAR ════════ */
function initNavbar(){
  const toggle=document.getElementById('navToggle');
  const links=document.getElementById('navLinks');
  const navbar=document.getElementById('navbar');
  if(!navbar) return;
  toggle?.addEventListener('click',()=>{ toggle.classList.toggle('open'); links.classList.toggle('open'); });
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ toggle?.classList.remove('open'); links?.classList.remove('open'); }));
  const secs=document.querySelectorAll('section[id]');
  window.addEventListener('scroll',()=>{
    navbar.style.boxShadow=window.scrollY>10?'0 4px 30px rgba(0,0,0,.4)':'none';
    let cur=''; secs.forEach(s=>{ if(window.scrollY>=s.offsetTop-120) cur=s.id; });
    document.querySelectorAll('.nav-links a').forEach(a=>{ a.style.color=a.getAttribute('href')==='#'+cur?'var(--white)':''; });
  },{passive:true});
}

/* ════════ SMOOTH SCROLL ════════ */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); window.scrollTo({top:t.offsetTop-(document.getElementById('navbar')?.offsetHeight||68),behavior:'smooth'}); }
    });
  });
}

/* ════════ CONTACT FORM ════════ */
function initContactForm(){
  document.getElementById('sendBtn')?.addEventListener('click',()=>{
    const name=document.getElementById('cf-name')?.value.trim();
    const email=document.getElementById('cf-email')?.value.trim();
    const type=document.getElementById('cf-type')?.value;
    const msg=document.getElementById('cf-msg')?.value.trim();
    if(!name||!email||!msg){
      showToast('يرجى ملء الحقول الإلزامية ✗');
      ['cf-name','cf-email','cf-msg'].forEach(id=>{ const el=document.getElementById(id); if(el&&!el.value.trim()){ el.style.borderColor='var(--pink)'; setTimeout(()=>el.style.borderColor='',2000); }});
      return;
    }
    STORE.addMessage({ id:'m_'+Date.now(), name, email, type:type||'غير محدد', msg, date:new Date().toLocaleString('ar-EG'), read:false });
    showToast('🎉 تم إرسال رسالتك! سأتواصل معك قريباً.');
    ['cf-name','cf-email','cf-type','cf-msg'].forEach(id=>{ const el=document.getElementById(id); if(el)el.value=''; });
  });
}

/* ════════ BOOT (portfolio pages) ════════ */
document.addEventListener('DOMContentLoaded',()=>{
  renderServices();
  renderProjects();
  observeReveals();
  initCursor();
  initNavbar();
  initContactForm();
  initSmoothScroll();
});
