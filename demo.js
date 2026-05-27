// ── CAROUSEL
let cur=0,tot=5;
function upd(){
  document.getElementById('slides').style.transform=`translateX(-${cur*20}%)`;
  document.getElementById('cidx').textContent=`${cur+1} / ${tot}`;
  document.querySelectorAll('.c-dot').forEach((d,i)=>d.classList.toggle('on',i===cur));
  document.getElementById('aL').classList.toggle('dis',cur===0);
  document.getElementById('aR').classList.toggle('dis',cur===tot-1);
}
function go(d){cur=Math.max(0,Math.min(tot-1,cur+d));upd()}
function goTo(i){cur=i;upd()}
let tx=0;
document.querySelector('.car').addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
document.querySelector('.car').addEventListener('touchend',e=>{const dx=tx-e.changedTouches[0].clientX;if(Math.abs(dx)>40)go(dx>0?1:-1)});

// ── CHIP TOGGLE
function toggleChip(el){el.classList.toggle('on')}

// ── GENERATE with real AI
async function generate(){
  const btn=document.getElementById('genBtn');
  const lbox=document.getElementById('lbox');
  const res=document.getElementById('results');
  const mood=document.getElementById('moodInput').value.trim();
  const chips=[...document.querySelectorAll('.fchip.on')].map(c=>c.textContent.trim()).join('、');

  btn.disabled=true; btn.textContent='生成中...';
  res.classList.remove('show');
  lbox.style.display='block';

  // animate loading steps
  const steps=['ls1','ls2','ls3','ls4'];
  steps.forEach(id=>{
    const el=document.getElementById(id);
    el.classList.remove('active','done');
    el.querySelector('.l-icon').textContent='○';
  });
  let si=0;
  const stepTimer=setInterval(()=>{
    if(si>0){
      const prev=document.getElementById(steps[si-1]);
      prev.classList.remove('active'); prev.classList.add('done');
      prev.querySelector('.l-icon').textContent='✓';
    }
    if(si<steps.length){
      document.getElementById(steps[si]).classList.add('active'); si++;
    } else { clearInterval(stepTimer); }
  },600);

  const prompt=`你是一个城市微冒险路线 AI 生成器。用户输入了他们的状态，请根据内容生成个性化的城市探索方案。

用户状态：${mood}
已选标签：${chips||'无'}

请严格按以下 JSON 格式返回，不要输出其他任何内容：
{
  "keyword": "2-4字情绪关键词（如：低电量逃离中）",
  "energy": 数字（0-100的情绪能量值）,
  "needs": ["需求1","需求2","需求3"],
  "vibes": ["氛围1","氛围2","氛围3"],
  "routeName": "路线名称（如：2小时低电量恢复路线）",
  "stops": ["出发地简称","地点2简称","地点3简称","终点简称"],
  "timeline": [
    {"time":"HH:MM","text":"路线节点描述"},
    {"time":"HH:MM","text":"路线节点描述"},
    {"time":"HH:MM","text":"路线节点描述"},
    {"time":"HH:MM","text":"路线节点描述"},
    {"time":"HH:MM","text":"路线节点描述"}
  ],
  "tasks": ["任务1","任务2","任务3"],
  "slogan": "一句适合分享的文案（带引号，如「今天不赶路，只是把自己慢慢捡回来。」）",
  "tags": ["#标签1","#标签2","#标签3"]
}`;

  let data;
  try {
    const resp=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        messages:[{role:'user',content:prompt}]
      })
    });
    const json=await resp.json();
    const raw=json.content?.[0]?.text||'';
    // strip possible markdown fences
    const cleaned=raw.replace(/```json|```/g,'').trim();
    data=JSON.parse(cleaned);
  } catch(e) {
    clearInterval(stepTimer);
    lbox.style.display='none';
    btn.disabled=false; btn.textContent='🗺 生成我的城市微冒险';
    showToast('⚠️ 生成失败，请稍后再试');
    return;
  }

  // finish loading animation
  clearInterval(stepTimer);
  steps.forEach(id=>{
    const el=document.getElementById(id);
    el.classList.remove('active'); el.classList.add('done');
    el.querySelector('.l-icon').textContent='✓';
  });

  // render dynamic results
  renderResults(data);

  setTimeout(()=>{
    lbox.style.display='none';
    res.classList.add('show');
    btn.disabled=false; btn.textContent='🔄 重新生成';
    setTimeout(()=>document.querySelectorAll('.efill').forEach(b=>{b.style.width=b.dataset.w}),80);
    res.scrollIntoView({behavior:'smooth',block:'start'});
  },400);
}

function renderResults(d){
  // --- decode panel (stable IDs) ---
  document.getElementById('dpKeyword').textContent = d.keyword || '探索中';
  document.getElementById('dpEnergy').textContent = (d.energy || 60) + '%';
  document.getElementById('dpEfill').dataset.w = (d.energy || 60) + '%';
  document.getElementById('dpNeeds').innerHTML =
    (d.needs || []).map(t => '<span class="dp-tag">'+t+'</span>').join('');
  document.getElementById('dpVibes').innerHTML =
    (d.vibes || []).map(t => '<span class="dp-tag">'+t+'</span>').join('');

  // --- phone preview ---
  document.querySelector('.ph-header-title').textContent = d.routeName || '今日路线';
  document.querySelector('.ph-status-kw').textContent = (d.keyword || '探索中') + ' ✦';
  document.querySelector('.ph-status-row span:first-child').textContent = '能量 ' + (d.energy || 60) + '%';
  const stops = d.stops || ['出发','地点2','地点3','终点'];
  document.querySelectorAll('.ph-rdot').forEach(function(dot,i){
    const lbl = dot.querySelector('.ph-rdot-lbl');
    if(lbl && stops[i]) lbl.textContent = stops[i];
  });
  document.querySelector('.ph-tasks').innerHTML =
    (d.tasks || []).slice(0,3).map(t =>
      '<div class="ph-task"><div class="ph-task-dot"></div>'+t+'</div>'
    ).join('');

  // --- route panel (stable IDs) ---
  document.getElementById('rpName').textContent = '「'+(d.routeName || '2小时探索路线')+'」';
  document.getElementById('routeNodes').innerHTML =
    (d.timeline || []).map(function(n){
      return '<div class="rn"><div class="rn-dot"><div class="rn-dot-in"></div></div>'
        +'<div class="rn-content"><div class="rn-time">'+n.time+'</div>'
        +'<div class="rn-text">'+n.text+'</div></div></div>';
    }).join('');

  // --- tasks (stable IDs) ---
  const tasks = d.tasks || [];
  ['task1','task2','task3'].forEach(function(id,i){
    if(tasks[i]) document.getElementById(id).textContent = tasks[i];
  });

  // --- slogan (stable ID) ---
  document.getElementById('slpText').textContent = d.slogan || '今天属于你。';
}

// ── MINI CARD
let miniOpen=false;
function toggleMiniCard(){
  miniOpen=!miniOpen;
  const mc=document.getElementById('miniCard');
  mc.style.display=miniOpen?'block':'none';
}

// ── TABS
function switchTab(i,el){
  document.querySelectorAll('.tab-pane').forEach((p,j)=>p.classList.toggle('on',j===i));
  document.querySelectorAll('.tab-btn').forEach((b,j)=>b.classList.toggle('on',j===i));
}

// ── FOLLOW
let following=false;
function toggleFollow(){
  following=!following;
  const btn=document.getElementById('tnFollow');
  btn.textContent=following?'已关注':'关注';
  btn.classList.toggle('ing',following);
  showToast(following?'已关注 AI产品实验室 ✨':'已取消关注');
}

// ── LIKE / SAVE
let liked=false,saved=false;
function toggleLike(){
  liked=!liked;
  document.getElementById('licoEl').textContent=liked?'❤️':'🤍';
  const n=document.getElementById('lnum');
  n.textContent=liked?697:696;n.style.color=liked?'#ff2442':'';
}
function toggleSave(){
  saved=!saved;
  document.getElementById('sicoEl').textContent=saved?'🌟':'⭐';
  const n=document.getElementById('snum');
  n.textContent=saved?1049:1048;n.style.color=saved?'#f59e0b':'';
  if(saved)showToast('⭐ 已收藏！');
}

// ── ADOPT
function adopt(btn){
  if(btn.classList.contains('ad'))return;
  btn.classList.add('ad');btn.textContent='✓ 已采纳';
  showToast('✅ 已标记采纳！');
}

// ── TOAST
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2400);
}
