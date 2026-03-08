/* ═══════════════════════════════════════════════
   محمد وسام — dashboard.js
   ═══════════════════════════════════════════════ */
'use strict';

const DASH_USER = 'mwsas2001';
const DASH_PASS = '2242001';
const TAG_COLORS = ['pt-pink','pt-cyan','pt-purple','pt-yellow','pt-green'];

/* ════ SESSION ════ */
const isLoggedIn = () => sessionStorage.getItem('mw_auth') === '1';
const setLogin   = () => sessionStorage.setItem('mw_auth','1');
const clearLogin = () => sessionStorage.removeItem('mw_auth');

/* ════ PAGE VISIBILITY ════ */
function showDash(){
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('dashPage').classList.remove('hidden');
  renderAll();
}
function showLogin(){
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('dashPage').classList.add('hidden');
}

/* ════ LOGIN ════ */
function initLogin(){
  if(isLoggedIn()){ showDash(); return; }

  const userEl   = document.getElementById('loginUser');
  const passEl   = document.getElementById('loginPass');
  const btn      = document.getElementById('loginBtn');
  const errEl    = document.getElementById('loginError');
  const toggle   = document.getElementById('passToggle');

  toggle?.addEventListener('click',()=>{
    passEl.type = passEl.type==='password'?'text':'password';
    toggle.textContent = passEl.type==='password'?'👁':'🙈';
  });

  const tryLogin = () => {
    if(userEl.value.trim()===DASH_USER && passEl.value===DASH_PASS){
      errEl.classList.add('hidden');
      setLogin(); showDash();
    } else {
      errEl.classList.remove('hidden'); passEl.value=''; passEl.focus();
      [userEl,passEl].forEach(el=>{ el.style.borderColor='var(--pink)'; setTimeout(()=>el.style.borderColor='',1800); });
    }
  };
  btn?.addEventListener('click', tryLogin);
  [userEl,passEl].forEach(el=>el?.addEventListener('keydown',e=>{ if(e.key==='Enter') tryLogin(); }));
}

/* ════ NAV ════ */
function initDashNav(){
  const btns    = document.querySelectorAll('.dash-nav-btn');
  const sidebar = document.getElementById('dashSidebar');

  btns.forEach(btn=>btn.addEventListener('click',()=>{
    btns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.dash-section').forEach(s=>s.classList.add('hidden'));
    document.getElementById('sec-'+btn.dataset.section)?.classList.remove('hidden');
    const titles = { projects:'المشاريع', services:'الخدمات', messages:'الرسائل' };
    document.getElementById('dashPageTitle').textContent = titles[btn.dataset.section] || '';
  }));

  document.getElementById('sidebarToggle')?.addEventListener('click',()=> sidebar?.classList.toggle('open'));
  document.addEventListener('click',e=>{
    if(sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !document.getElementById('sidebarToggle')?.contains(e.target))
      sidebar.classList.remove('open');
  });
  document.getElementById('logoutBtn')?.addEventListener('click',()=>{ clearLogin(); window.location.href='index.html'; });
}

/* ════ RENDER ALL ════ */
function renderAll(){
  renderProjectsTable();
  renderServicesDash();
  renderMessagesDash();
  updateMsgBadge();
}

/* ════════════════ PROJECTS ════════════════ */
function renderProjectsTable(){
  const tbody = document.getElementById('projectsTableBody');
  const noEl  = document.getElementById('noProjects');
  const data  = STORE.getProjects();
  if(!data.length){ tbody.innerHTML=''; noEl?.classList.remove('hidden'); return; }
  noEl?.classList.add('hidden');
  tbody.innerHTML = data.map(p=>`
    <tr>
      <td>
        <div class="tbl-info">
          <span class="tbl-icon">${p.icon}</span>
          <div>
            <div class="tbl-name">${p.name}</div>
            <div class="tbl-desc">${p.desc.slice(0,55)}…</div>
          </div>
        </div>
      </td>
      <td>${p.year}</td>
      <td><div class="tbl-tags">${(p.tags||[]).map(t=>`<span class="tbl-tag">${t.label}</span>`).join('')}</div></td>
      <td>
        <div class="tbl-actions">
          <button class="btn-edit"  data-id="${p.id}">✏️ تعديل</button>
          <button class="btn-del"   data-id="${p.id}">🗑 حذف</button>
        </div>
      </td>
    </tr>`).join('');
  tbody.querySelectorAll('.btn-edit').forEach(b=>b.addEventListener('click',()=>openEditProject(b.dataset.id)));
  tbody.querySelectorAll('.btn-del' ).forEach(b=>b.addEventListener('click',()=>confirmDelete('project',b.dataset.id,'هل تريد حذف هذا المشروع نهائياً؟')));
}

/* Add Project */
function initAddProject(){
  const form    = document.getElementById('addProjectForm');
  const showBtn = document.getElementById('showAddProject');
  const cancel  = document.getElementById('cancelAddProject');

  showBtn?.addEventListener('click',()=>{
    form.classList.toggle('hidden');
    showBtn.textContent = form.classList.contains('hidden') ? '➕ إضافة مشروع' : '✕ إغلاق';
  });
  cancel?.addEventListener('click',()=>{ form.classList.add('hidden'); showBtn.textContent='➕ إضافة مشروع'; });

  document.getElementById('addProjectBtn')?.addEventListener('click',()=>{
    const name = document.getElementById('pName').value.trim();
    const desc = document.getElementById('pDesc').value.trim();
    if(!name||!desc){ showToast('الاسم والوصف مطلوبان ✗'); return; }
    const raw = document.getElementById('pTags').value.trim();
    const tags = raw ? raw.split(',').map((t,i)=>({label:t.trim(),cls:TAG_COLORS[i%TAG_COLORS.length]})) : [];
    STORE.addProject({
      id:'p_'+Date.now(), name, desc, tags,
      year: document.getElementById('pYear').value.trim() || new Date().getFullYear()+'',
      icon: document.getElementById('pIcon').value.trim() || '🎨',
      bg:   document.getElementById('pBg').value.trim()   || 'linear-gradient(135deg,#1a0030,#6b21a8)',
      link: document.getElementById('pLink').value.trim() || '#',
    });
    ['pName','pYear','pDesc','pIcon','pBg','pTags','pLink'].forEach(id=>{ const el=document.getElementById(id); if(el)el.value=''; });
    form.classList.add('hidden'); showBtn.textContent='➕ إضافة مشروع';
    renderProjectsTable(); showToast('✅ تمت إضافة المشروع');
  });
}

/* Edit Project Modal */
let _editPid = null;
function openEditProject(id){
  const p = STORE.getProjects().find(x=>x.id===id);
  if(!p) return;
  _editPid = id;
  document.getElementById('ep-name').value = p.name||'';
  document.getElementById('ep-year').value = p.year||'';
  document.getElementById('ep-desc').value = p.desc||'';
  document.getElementById('ep-icon').value = p.icon||'';
  document.getElementById('ep-bg').value   = p.bg||'';
  document.getElementById('ep-tags').value = (p.tags||[]).map(t=>t.label).join(', ');
  document.getElementById('ep-link').value = p.link||'';
  document.getElementById('editProjectModal').classList.remove('hidden');
}
function initEditProjectModal(){
  const modal = document.getElementById('editProjectModal');
  const close = ()=>{ modal.classList.add('hidden'); _editPid=null; };
  document.getElementById('closeEP')?.addEventListener('click',close);
  document.getElementById('closeEP2')?.addEventListener('click',close);
  modal?.addEventListener('click',e=>{ if(e.target===modal) close(); });
  document.getElementById('saveEP')?.addEventListener('click',()=>{
    if(!_editPid) return;
    const raw = document.getElementById('ep-tags').value.trim();
    const tags = raw ? raw.split(',').map((t,i)=>({label:t.trim(),cls:TAG_COLORS[i%TAG_COLORS.length]})) : [];
    STORE.updateProject(_editPid,{
      name: document.getElementById('ep-name').value.trim(),
      year: document.getElementById('ep-year').value.trim(),
      desc: document.getElementById('ep-desc').value.trim(),
      icon: document.getElementById('ep-icon').value.trim(),
      bg:   document.getElementById('ep-bg').value.trim(),
      tags,
      link: document.getElementById('ep-link').value.trim(),
    });
    renderProjectsTable(); close(); showToast('✅ تم تحديث المشروع');
  });
}

/* ════════════════ SERVICES ════════════════ */
function renderServicesDash(){
  const grid = document.getElementById('servicesManageGrid');
  const noEl = document.getElementById('noServices');
  const data = STORE.getServices();
  const accentMap = { pink:'var(--pink)', cyan:'var(--cyan)', purple:'var(--purple)', yellow:'var(--yellow)', green:'var(--green)' };

  if(!data.length){ grid.innerHTML=''; noEl?.classList.remove('hidden'); return; }
  noEl?.classList.add('hidden');

  grid.innerHTML = data.map(s=>`
    <div class="dash-svc-card">
      <div class="dash-svc-top">
        <span class="dash-svc-icon">${s.icon}</span>
        <div class="dash-svc-actions">
          <button class="btn-edit" data-id="${s.id}">✏️</button>
          <button class="btn-del"  data-id="${s.id}">🗑</button>
        </div>
      </div>
      <div class="dash-svc-name" style="color:${accentMap[s.color]||'var(--pink)'}">${s.name}</div>
      <p class="dash-svc-desc">${s.desc}</p>
      <a href="service.html?id=${s.id}" target="_blank" class="dash-svc-preview">🔗 معاينة الصفحة ←</a>
    </div>`).join('');

  grid.querySelectorAll('.btn-edit').forEach(b=>b.addEventListener('click',()=>openEditService(b.dataset.id)));
  grid.querySelectorAll('.btn-del' ).forEach(b=>b.addEventListener('click',()=>confirmDelete('service',b.dataset.id,'هل تريد حذف هذه الخدمة؟')));
}

/* Add Service */
function initAddService(){
  const form    = document.getElementById('addServiceForm');
  const showBtn = document.getElementById('showAddService');
  const cancel  = document.getElementById('cancelAddService');

  showBtn?.addEventListener('click',()=>{
    form.classList.toggle('hidden');
    showBtn.textContent = form.classList.contains('hidden') ? '➕ إضافة خدمة' : '✕ إغلاق';
  });
  cancel?.addEventListener('click',()=>{ form.classList.add('hidden'); showBtn.textContent='➕ إضافة خدمة'; });

  document.getElementById('addServiceBtn')?.addEventListener('click',()=>{
    const name = document.getElementById('sName').value.trim();
    const desc = document.getElementById('sDesc').value.trim();
    if(!name||!desc){ showToast('الاسم والوصف مطلوبان ✗'); return; }

    const rawFeatures = document.getElementById('sFeatures').value.trim();
    const rawProcess  = document.getElementById('sProcess').value.trim();

    STORE.addService({
      id:'s_'+Date.now(), name, desc,
      icon:        document.getElementById('sIcon').value.trim() || '🛠',
      color:       document.getElementById('sColor').value,
      fullDesc:    document.getElementById('sFullDesc').value.trim(),
      features:    rawFeatures ? rawFeatures.split('\n').map(s=>s.trim()).filter(Boolean) : [],
      process:     rawProcess  ? rawProcess.split('\n').map(s=>s.trim()).filter(Boolean)  : [],
      duration:    document.getElementById('sDuration').value.trim(),
      startingPrice: document.getElementById('sPrice').value.trim(),
      deliverables:  document.getElementById('sDeliverables').value.trim(),
    });

    ['sName','sIcon','sDesc','sFullDesc','sFeatures','sProcess','sDuration','sPrice','sDeliverables'].forEach(id=>{
      const el=document.getElementById(id); if(el)el.value='';
    });
    form.classList.add('hidden'); showBtn.textContent='➕ إضافة خدمة';
    renderServicesDash(); showToast('✅ تمت إضافة الخدمة');
  });
}

/* Edit Service Modal */
let _editSid = null;
function openEditService(id){
  const s = STORE.getServices().find(x=>x.id===id);
  if(!s) return;
  _editSid = id;
  document.getElementById('es-name').value        = s.name||'';
  document.getElementById('es-icon').value        = s.icon||'';
  document.getElementById('es-desc').value        = s.desc||'';
  document.getElementById('es-fullDesc').value    = s.fullDesc||'';
  document.getElementById('es-features').value   = (s.features||[]).join('\n');
  document.getElementById('es-process').value    = (s.process||[]).join('\n');
  document.getElementById('es-duration').value   = s.duration||'';
  document.getElementById('es-price').value      = s.startingPrice||'';
  document.getElementById('es-deliverables').value = s.deliverables||'';
  document.getElementById('es-color').value      = s.color||'pink';
  document.getElementById('editServiceModal').classList.remove('hidden');
}
function initEditServiceModal(){
  const modal = document.getElementById('editServiceModal');
  const close = ()=>{ modal.classList.add('hidden'); _editSid=null; };
  document.getElementById('closeES')?.addEventListener('click',close);
  document.getElementById('closeES2')?.addEventListener('click',close);
  modal?.addEventListener('click',e=>{ if(e.target===modal) close(); });
  document.getElementById('saveES')?.addEventListener('click',()=>{
    if(!_editSid) return;
    const rawF = document.getElementById('es-features').value.trim();
    const rawP = document.getElementById('es-process').value.trim();
    STORE.updateService(_editSid,{
      name:          document.getElementById('es-name').value.trim(),
      icon:          document.getElementById('es-icon').value.trim(),
      desc:          document.getElementById('es-desc').value.trim(),
      fullDesc:      document.getElementById('es-fullDesc').value.trim(),
      features:      rawF ? rawF.split('\n').map(s=>s.trim()).filter(Boolean) : [],
      process:       rawP ? rawP.split('\n').map(s=>s.trim()).filter(Boolean) : [],
      duration:      document.getElementById('es-duration').value.trim(),
      startingPrice: document.getElementById('es-price').value.trim(),
      deliverables:  document.getElementById('es-deliverables').value.trim(),
      color:         document.getElementById('es-color').value,
    });
    renderServicesDash(); close(); showToast('✅ تم تحديث الخدمة');
  });
}

/* ════════════════ MESSAGES ════════════════ */
function renderMessagesDash(){
  const list = document.getElementById('messagesList');
  const noEl = document.getElementById('noMessages');
  const msgs = STORE.getMessages();
  if(!msgs.length){ list.innerHTML=''; noEl?.classList.remove('hidden'); return; }
  noEl?.classList.add('hidden');
  list.innerHTML = msgs.map(m=>`
    <div class="msg-card ${m.read?'':'unread'}" id="msg-${m.id}">
      <div class="msg-card-header">
        <div>
          <div class="msg-sender">${m.name}</div>
          <div class="msg-email">${m.email}</div>
        </div>
        <div class="msg-meta">
          ${!m.read?'<span class="msg-unread-dot"></span>':''}
          <span class="msg-date">${m.date}</span>
        </div>
      </div>
      <div class="msg-type-badge">${m.type}</div>
      <div class="msg-body">${m.msg}</div>
      <div class="msg-actions">
        ${!m.read?`<button class="msg-mark-read" data-id="${m.id}">✓ تعليم كمقروء</button>`:`<span style="font-size:.75rem;color:var(--green)">✓ مقروءة</span>`}
        <button class="btn-del" data-id="${m.id}" style="font-size:.75rem;padding:.3rem .7rem">🗑</button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.msg-mark-read').forEach(b=>b.addEventListener('click',()=>{
    STORE.markRead(b.dataset.id); renderMessagesDash(); updateMsgBadge();
  }));
  list.querySelectorAll('.btn-del').forEach(b=>b.addEventListener('click',()=>{
    STORE.saveMessages(STORE.getMessages().filter(m=>m.id!==b.dataset.id));
    renderMessagesDash(); updateMsgBadge(); showToast('🗑 تم حذف الرسالة');
  }));
}

function updateMsgBadge(){
  const unread = STORE.getMessages().filter(m=>!m.read).length;
  const badge  = document.getElementById('msgBadge');
  if(badge){ badge.textContent = unread||''; badge.style.display = unread?'inline':'none'; }
}

function initClearMessages(){
  document.getElementById('clearMsgsBtn')?.addEventListener('click',()=>confirmDelete('messages',null,'هل تريد مسح جميع الرسائل؟'));
}

/* ════════════════ CONFIRM DELETE ════════════════ */
let _pending = { type:null, id:null };
function confirmDelete(type, id, msg){
  _pending = { type, id };
  document.getElementById('confirmMsg').textContent = msg;
  document.getElementById('confirmModal').classList.remove('hidden');
}
function initConfirmModal(){
  const modal = document.getElementById('confirmModal');
  const close = ()=>{ modal.classList.add('hidden'); _pending={type:null,id:null}; };
  document.getElementById('confirmNo')?.addEventListener('click', close);
  modal?.addEventListener('click',e=>{ if(e.target===modal) close(); });
  document.getElementById('confirmYes')?.addEventListener('click',()=>{
    const {type,id} = _pending;
    if(type==='project')  { STORE.removeProject(id); renderProjectsTable(); showToast('🗑 تم حذف المشروع'); }
    else if(type==='service') { STORE.removeService(id); renderServicesDash(); showToast('🗑 تم حذف الخدمة'); }
    else if(type==='messages'){ STORE.clearMessages(); renderMessagesDash(); updateMsgBadge(); showToast('🗑 تم مسح الرسائل'); }
    close();
  });
}

/* ════════════════ BOOT ════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  initLogin();
  initDashNav();
  initAddProject();
  initEditProjectModal();
  initAddService();
  initEditServiceModal();
  initConfirmModal();
  initClearMessages();
});
