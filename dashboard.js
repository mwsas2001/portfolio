/* ═══════════════════════════════════════════════
   محمد وسام — dashboard.js
   ═══════════════════════════════════════════════ */
'use strict';

const DASH_USER = 'mwsas2001';
const DASH_PASS = '2242001';
const TAG_COLORS = ['pt-pink','pt-cyan','pt-purple','pt-yellow','pt-green'];

/* ════════════════ SESSION ════════════════ */
function isLoggedIn(){ return sessionStorage.getItem('mw_dash_auth')==='1'; }
function setLogin()  { sessionStorage.setItem('mw_dash_auth','1'); }
function clearLogin(){ sessionStorage.removeItem('mw_dash_auth'); }

/* ════════════════ PAGE CONTROL ════════════════ */
function showDashboard(){
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('dashPage').classList.remove('hidden');
  renderAll();
}
function showLogin(){
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('dashPage').classList.add('hidden');
}

/* ════════════════ LOGIN ════════════════ */
function initLogin(){
  if(isLoggedIn()){ showDashboard(); return; }

  const userEl  = document.getElementById('loginUser');
  const passEl  = document.getElementById('loginPass');
  const loginBtn= document.getElementById('loginBtn');
  const errEl   = document.getElementById('loginError');
  const toggle  = document.getElementById('passToggle');

  toggle?.addEventListener('click',()=>{
    passEl.type = passEl.type==='password'?'text':'password';
    toggle.textContent = passEl.type==='password'?'👁':'🙈';
  });

  const tryLogin=()=>{
    const u=userEl.value.trim();
    const p=passEl.value;
    if(u===DASH_USER && p===DASH_PASS){
      errEl.classList.add('hidden');
      setLogin();
      showDashboard();
    } else {
      errEl.classList.remove('hidden');
      passEl.value='';
      passEl.focus();
      [userEl,passEl].forEach(el=>{
        el.style.borderColor='var(--pink)';
        setTimeout(()=>{ el.style.borderColor=''; },1800);
      });
    }
  };

  loginBtn?.addEventListener('click', tryLogin);
  [userEl,passEl].forEach(el=>el?.addEventListener('keydown',e=>{ if(e.key==='Enter') tryLogin(); }));
}

/* ════════════════ NAVIGATION ════════════════ */
function initDashNav(){
  const btns=document.querySelectorAll('.dash-nav-btn');
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.dash-section').forEach(s=>s.classList.add('hidden'));
      document.getElementById('sec-'+btn.dataset.section)?.classList.remove('hidden');
      document.getElementById('dashPageTitle').textContent=btn.textContent.trim().replace(/\d+/,'').trim();
    });
  });

  // Sidebar toggle (mobile)
  const sidebar=document.getElementById('dashSidebar');
  document.getElementById('sidebarToggle')?.addEventListener('click',()=>{
    sidebar?.classList.toggle('open');
  });
  document.addEventListener('click',e=>{
    if(sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !document.getElementById('sidebarToggle')?.contains(e.target)){
      sidebar.classList.remove('open');
    }
  });

  document.getElementById('logoutBtn')?.addEventListener('click',()=>{
    clearLogin();
    window.location.href='index.html';
  });
}

/* ════════════════ RENDER ALL ════════════════ */
function renderAll(){
  renderProjectsTable();
  renderServicesDash();
  renderMessagesDash();
  updateMsgBadge();
}

/* ════════════════ PROJECTS TABLE ════════════════ */
function renderProjectsTable(){
  const tbody=document.getElementById('projectsTableBody');
  const noEl =document.getElementById('noProjects');
  const projects=STORE.getProjects();

  if(!projects.length){
    tbody.innerHTML='';
    noEl?.classList.remove('hidden');
    return;
  }
  noEl?.classList.add('hidden');

  tbody.innerHTML=projects.map(p=>{
    const tags=(p.tags||[]).map(t=>`<span class="tbl-tag">${t.label}</span>`).join('');
    return `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:.8rem;flex-direction:row-reverse">
          <span class="tbl-icon">${p.icon}</span>
          <div>
            <div class="tbl-name">${p.name}</div>
            <div class="tbl-desc">${p.desc.slice(0,60)}...</div>
          </div>
        </div>
      </td>
      <td>${p.year}</td>
      <td><div class="tbl-tags">${tags}</div></td>
      <td>
        <div class="tbl-actions">
          <button class="btn-edit" data-id="${p.id}">✏️ تعديل</button>
          <button class="btn-del"  data-id="${p.id}">🗑 حذف</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  tbody.querySelectorAll('.btn-edit').forEach(btn=>btn.addEventListener('click',()=>openEditProject(btn.dataset.id)));
  tbody.querySelectorAll('.btn-del').forEach(btn=>btn.addEventListener('click',()=>confirmDelete('project',btn.dataset.id,`هل تريد حذف المشروع؟`)));
}

/* Add Project */
function initAddProject(){
  const showBtn=document.getElementById('showAddProject');
  const form=document.getElementById('addProjectForm');
  const cancelBtn=document.getElementById('cancelAddProject');
  const addBtn=document.getElementById('addProjectBtn');

  showBtn?.addEventListener('click',()=>{
    form?.classList.toggle('hidden');
    showBtn.textContent=form?.classList.contains('hidden')?'➕ إضافة مشروع':'✕ إغلاق';
  });
  cancelBtn?.addEventListener('click',()=>{ form?.classList.add('hidden'); showBtn.textContent='➕ إضافة مشروع'; });

  addBtn?.addEventListener('click',()=>{
    const name=document.getElementById('pName').value.trim();
    const desc=document.getElementById('pDesc').value.trim();
    if(!name||!desc){ showToast('الاسم والوصف مطلوبان ✗'); return; }

    const rawTags=document.getElementById('pTags').value.trim();
    const tags=rawTags ? rawTags.split(',').map((t,i)=>({label:t.trim(),cls:TAG_COLORS[i%TAG_COLORS.length]})) : [];

    STORE.addProject({
      id:'p_'+Date.now(),
      name,
      year: document.getElementById('pYear').value.trim() || new Date().getFullYear().toString(),
      desc,
      icon: document.getElementById('pIcon').value.trim() || '🎨',
      bg:   document.getElementById('pBg').value.trim()   || 'linear-gradient(135deg,#1a0030,#6b21a8)',
      tags,
      link: document.getElementById('pLink').value.trim() || '#',
    });

    renderProjectsTable();
    ['pName','pYear','pDesc','pIcon','pBg','pTags','pLink'].forEach(id=>{ const el=document.getElementById(id); if(el)el.value=''; });
    form?.classList.add('hidden');
    showBtn.textContent='➕ إضافة مشروع';
    showToast('✅ تمت إضافة المشروع');

    // Also update portfolio grid if open
    renderProjects?.();
  });
}

/* Edit Project Modal */
let editingProjectId=null;
function openEditProject(id){
  const p=STORE.getProjects().find(x=>x.id===id);
  if(!p) return;
  editingProjectId=id;
  document.getElementById('ep-name').value=p.name||'';
  document.getElementById('ep-year').value=p.year||'';
  document.getElementById('ep-desc').value=p.desc||'';
  document.getElementById('ep-icon').value=p.icon||'';
  document.getElementById('ep-bg').value=p.bg||'';
  document.getElementById('ep-tags').value=(p.tags||[]).map(t=>t.label).join(', ');
  document.getElementById('ep-link').value=p.link||'';
  document.getElementById('editProjectModal').classList.remove('hidden');
}
function initEditProjectModal(){
  const close=()=>{ document.getElementById('editProjectModal').classList.add('hidden'); editingProjectId=null; };
  document.getElementById('closeEditProject')?.addEventListener('click',close);
  document.getElementById('closeEditProject2')?.addEventListener('click',close);
  document.getElementById('editProjectModal')?.addEventListener('click',e=>{ if(e.target===document.getElementById('editProjectModal'))close(); });

  document.getElementById('saveEditProject')?.addEventListener('click',()=>{
    if(!editingProjectId) return;
    const rawTags=document.getElementById('ep-tags').value.trim();
    const tags=rawTags?rawTags.split(',').map((t,i)=>({label:t.trim(),cls:TAG_COLORS[i%TAG_COLORS.length]})):[];
    STORE.updateProject(editingProjectId,{
      name: document.getElementById('ep-name').value.trim(),
      year: document.getElementById('ep-year').value.trim(),
      desc: document.getElementById('ep-desc').value.trim(),
      icon: document.getElementById('ep-icon').value.trim(),
      bg:   document.getElementById('ep-bg').value.trim(),
      tags,
      link: document.getElementById('ep-link').value.trim(),
    });
    renderProjectsTable();
    renderProjects?.();
    close();
    showToast('✅ تم تحديث المشروع');
  });
}

/* ════════════════ SERVICES DASHBOARD ════════════════ */
function renderServicesDash(){
  const grid=document.getElementById('servicesManageGrid');
  const noEl=document.getElementById('noServices');
  const services=STORE.getServices();

  if(!services.length){
    grid.innerHTML='';
    noEl?.classList.remove('hidden');
    return;
  }
  noEl?.classList.add('hidden');

  const accentMap={ pink:'var(--pink)',cyan:'var(--cyan)',purple:'var(--purple)',yellow:'var(--yellow)',green:'var(--green)' };

  grid.innerHTML=services.map(s=>`
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
    </div>`).join('');

  grid.querySelectorAll('.btn-edit').forEach(btn=>btn.addEventListener('click',()=>openEditService(btn.dataset.id)));
  grid.querySelectorAll('.btn-del').forEach(btn=>btn.addEventListener('click',()=>confirmDelete('service',btn.dataset.id,'هل تريد حذف هذه الخدمة؟')));
}

function initAddService(){
  const showBtn=document.getElementById('showAddService');
  const form=document.getElementById('addServiceForm');
  const cancelBtn=document.getElementById('cancelAddService');
  const addBtn=document.getElementById('addServiceBtn');

  showBtn?.addEventListener('click',()=>{
    form?.classList.toggle('hidden');
    showBtn.textContent=form?.classList.contains('hidden')?'➕ إضافة خدمة':'✕ إغلاق';
  });
  cancelBtn?.addEventListener('click',()=>{ form?.classList.add('hidden'); showBtn.textContent='➕ إضافة خدمة'; });

  addBtn?.addEventListener('click',()=>{
    const name=document.getElementById('sName').value.trim();
    const desc=document.getElementById('sDesc').value.trim();
    if(!name||!desc){ showToast('الاسم والوصف مطلوبان ✗'); return; }

    STORE.addService({
      id:'s_'+Date.now(),
      name,
      icon:  document.getElementById('sIcon').value.trim()  || '🛠',
      desc,
      color: document.getElementById('sColor').value,
    });

    renderServicesDash();
    renderServices?.();
    ['sName','sIcon','sDesc'].forEach(id=>{ const el=document.getElementById(id); if(el)el.value=''; });
    form?.classList.add('hidden');
    showBtn.textContent='➕ إضافة خدمة';
    showToast('✅ تمت إضافة الخدمة');
  });
}

let editingServiceId=null;
function openEditService(id){
  const s=STORE.getServices().find(x=>x.id===id);
  if(!s) return;
  editingServiceId=id;
  document.getElementById('es-name').value=s.name||'';
  document.getElementById('es-icon').value=s.icon||'';
  document.getElementById('es-desc').value=s.desc||'';
  document.getElementById('es-color').value=s.color||'pink';
  document.getElementById('editServiceModal').classList.remove('hidden');
}
function initEditServiceModal(){
  const close=()=>{ document.getElementById('editServiceModal').classList.add('hidden'); editingServiceId=null; };
  document.getElementById('closeEditService')?.addEventListener('click',close);
  document.getElementById('closeEditService2')?.addEventListener('click',close);
  document.getElementById('editServiceModal')?.addEventListener('click',e=>{ if(e.target===document.getElementById('editServiceModal'))close(); });

  document.getElementById('saveEditService')?.addEventListener('click',()=>{
    if(!editingServiceId) return;
    STORE.updateService(editingServiceId,{
      name:  document.getElementById('es-name').value.trim(),
      icon:  document.getElementById('es-icon').value.trim(),
      desc:  document.getElementById('es-desc').value.trim(),
      color: document.getElementById('es-color').value,
    });
    renderServicesDash();
    renderServices?.();
    close();
    showToast('✅ تم تحديث الخدمة');
  });
}

/* ════════════════ MESSAGES ════════════════ */
function renderMessagesDash(){
  const list=document.getElementById('messagesList');
  const noEl=document.getElementById('noMessages');
  const messages=STORE.getMessages();

  if(!messages.length){
    list.innerHTML='';
    noEl?.classList.remove('hidden');
    return;
  }
  noEl?.classList.add('hidden');

  list.innerHTML=messages.map(m=>`
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
        ${!m.read?`<button class="msg-mark-read" data-id="${m.id}">✓ تعليم كمقروء</button>`:'<span style="font-size:.75rem;color:var(--green)">✓ مقروءة</span>'}
        <button class="btn-del" data-id="${m.id}" style="font-size:.75rem;padding:.3rem .7rem">🗑</button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.msg-mark-read').forEach(btn=>btn.addEventListener('click',()=>{
    STORE.markRead(btn.dataset.id);
    renderMessagesDash();
    updateMsgBadge();
  }));
  list.querySelectorAll('.btn-del').forEach(btn=>btn.addEventListener('click',()=>{
    const msgs=STORE.getMessages().filter(m=>m.id!==btn.dataset.id);
    STORE.saveMessages(msgs);
    renderMessagesDash();
    updateMsgBadge();
    showToast('🗑 تم حذف الرسالة');
  }));
}

function updateMsgBadge(){
  const unread=STORE.getMessages().filter(m=>!m.read).length;
  const badge=document.getElementById('msgBadge');
  if(badge){ badge.textContent=unread||''; badge.style.display=unread?'inline':'none'; }
}

function initClearMessages(){
  document.getElementById('clearMsgsBtn')?.addEventListener('click',()=>{
    confirmDelete('messages',null,'هل تريد مسح جميع الرسائل؟');
  });
}

/* ════════════════ CONFIRM DELETE MODAL ════════════════ */
let _pendingDelete={type:null,id:null};
function confirmDelete(type,id,msg){
  _pendingDelete={type,id};
  document.getElementById('confirmMsg').textContent=msg;
  document.getElementById('confirmModal').classList.remove('hidden');
}
function initConfirmModal(){
  const close=()=>{ document.getElementById('confirmModal').classList.add('hidden'); _pendingDelete={type:null,id:null}; };
  document.getElementById('confirmNo')?.addEventListener('click',close);
  document.getElementById('confirmModal')?.addEventListener('click',e=>{ if(e.target===document.getElementById('confirmModal'))close(); });

  document.getElementById('confirmYes')?.addEventListener('click',()=>{
    const {type,id}=_pendingDelete;
    if(type==='project'){
      STORE.removeProject(id);
      renderProjectsTable();
      renderProjects?.();
      showToast('🗑 تم حذف المشروع');
    } else if(type==='service'){
      STORE.removeService(id);
      renderServicesDash();
      renderServices?.();
      showToast('🗑 تم حذف الخدمة');
    } else if(type==='messages'){
      STORE.clearMessages();
      renderMessagesDash();
      updateMsgBadge();
      showToast('🗑 تم مسح جميع الرسائل');
    }
    close();
  });
}

/* ════════════════ BOOT ════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  initLogin();
  if(isLoggedIn()) showDashboard();
  initDashNav();
  initAddProject();
  initEditProjectModal();
  initAddService();
  initEditServiceModal();
  initConfirmModal();
  initClearMessages();
});
