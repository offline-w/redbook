// ══ 评论区淘金术 GAME ══
const COMMENTS=[
  {id:1,name:'打工人小北',avatar:'北',avatarBg:'linear-gradient(135deg,#f97316,#fb923c)',text:'能不能支持北京/上海版本？新加坡太远了哈哈',likes:'👍 28',answer:'场景扩展'},
  {id:2,name:'恋爱脑研究员',avatar:'情',avatarBg:'linear-gradient(135deg,#ec4899,#f9a8d4)',text:'可以加一个情侣双人路线吗？太适合周末约会了！',likes:'👍 21',answer:'场景扩展'},
  {id:3,name:'海报控',avatar:'海',avatarBg:'linear-gradient(135deg,#8b5cf6,#a78bfa)',text:'能不能生成可分享的路线海报？发朋友圈超好看！',likes:'👍 14',answer:'功能需求'},
  {id:4,name:'低电量恢复er',avatar:'低',avatarBg:'linear-gradient(135deg,#38bdf8,#0ea5e9)',text:'我现在就是这个状态！感觉被看见了 🥹',likes:'👍 39',answer:'情感共鸣'},
  {id:5,name:'雨天宅家派',avatar:'雨',avatarBg:'linear-gradient(135deg,#06b6d4,#22d3ee)',text:'想要雨天路线模式！下雨天也可以微冒险',likes:'👍 17',answer:'功能需求'},
  {id:6,name:'设计师阿Mo',avatar:'设',avatarBg:'linear-gradient(135deg,#34d399,#10b981)',text:'加载动画可以再流畅一点，感觉有点卡',likes:'👍 9',answer:'体验优化'},
];

const AI_ADVICE={
  high:'你的评论分析眼光很准！建议优先开发「多城市版本」（场景扩展高频需求）+ 「路线海报分享」（功能需求高热），这两条路能快速扩大用户覆盖面和传播率。情感共鸣类评论说明内容戳中了目标用户，继续保持这个语气。',
  mid:'分析结果显示：功能需求和场景扩展是用户呼声最高的两类。建议下一个版本先打通「多城市」需求，再迭代分享功能。情感类评论不要忽视，它们是留存的关键信号。',
  low:'没关系，评论分类需要一点感觉！小技巧：「想要 XX 功能」= 功能需求；「我也是这样」= 情感共鸣；「支持 XX 城市/场景」= 场景扩展；「体验/加载/动画」= 体验优化。再试一次？',
};

let gState={playing:false,idx:0,score:0,time:30,timer:null,results:[]};

function startGame(){
  gState={playing:true,idx:0,score:0,time:30,timer:null,results:[]};
  document.getElementById('gameIdle').style.display='none';
  document.getElementById('gameResult').style.display='none';
  document.getElementById('gamePlaying').style.display='block';
  renderComment();
  startTimer();
}

function renderComment(){
  const c=COMMENTS[gState.idx];
  if(!c)return;
  // update HUD
  document.getElementById('scoreEl').textContent=gState.score;
  document.getElementById('progressEl').textContent=`${gState.idx+1}/6`;
  // reset card
  const card=document.getElementById('commentCard');
  card.className='comment-card';
  document.getElementById('ccAvatar').style.background=c.avatarBg;
  document.getElementById('ccAvatar').textContent=c.avatar;
  document.getElementById('ccName').textContent=c.name;
  document.getElementById('ccText').textContent=c.text;
  document.getElementById('ccLikes').textContent=c.likes;
  // reset buttons
  document.querySelectorAll('.cat-btn').forEach(b=>{b.className='cat-btn';b.style.pointerEvents='';});
  document.getElementById('gameFeedback').textContent='';
  document.getElementById('gameFeedback').className='game-feedback';
}

function classify(btn){
  if(!gState.playing)return;
  const chosen=btn.dataset.cat;
  const c=COMMENTS[gState.idx];
  const correct=c.answer===chosen;
  // record
  gState.results.push({comment:c,chosen,correct});
  // visual feedback on card
  const card=document.getElementById('commentCard');
  card.classList.add(correct?'correct':'wrong');
  // mark buttons
  document.querySelectorAll('.cat-btn').forEach(b=>{
    b.style.pointerEvents='none';
    if(b.dataset.cat===c.answer)b.classList.add('correct-ans');
  });
  if(correct){
    btn.classList.add('hit');
    gState.score+=10;
    setFeedback('✅ 分类正确 +10','pos');
  } else {
    btn.classList.add('miss');
    setFeedback(`❌ 答案是「${c.answer}」`,'neg');
  }
  document.getElementById('scoreEl').textContent=gState.score;
  // next after delay
  setTimeout(()=>{
    gState.idx++;
    if(gState.idx>=COMMENTS.length){endGame();}
    else{renderComment();}
  },900);
}

function setFeedback(msg,cls){
  const fb=document.getElementById('gameFeedback');
  fb.textContent=msg;
  fb.className='game-feedback '+cls;
}

function startTimer(){
  gState.time=30;
  const ring=document.getElementById('timerRing');
  const numEl=document.getElementById('timerEl');
  const total=107; // circumference for r=17
  gState.timer=setInterval(()=>{
    gState.time--;
    numEl.textContent=gState.time;
    ring.style.strokeDashoffset=total*(1-gState.time/30);
    if(gState.time<=10){ring.style.stroke='#f87171';}
    if(gState.time<=0){endGame();}
  },1000);
}

function endGame(){
  clearInterval(gState.timer);
  gState.playing=false;
  document.getElementById('gamePlaying').style.display='none';
  document.getElementById('gameResult').style.display='block';
  renderResult();
}

function renderResult(){
  const total=COMMENTS.length;
  const correct=gState.results.filter(r=>r.correct).length;
  const answered=gState.results.length;
  const pct=answered?Math.round(correct/answered*100):0;
  // trophy
  let trophy='🥉',title='继续加油！';
  if(gState.score>=50){trophy='🥇';title='评论淘金大师！';}
  else if(gState.score>=30){trophy='🥈';title='眼光不错！';}
  document.getElementById('grTrophy').textContent=trophy;
  document.getElementById('grTitle').textContent=title;
  document.getElementById('grScore').textContent=gState.score;
  document.getElementById('grAccuracy').textContent=`正确 ${correct}/${answered} · 准确率 ${pct}%`;
  // breakdown
  const bd=document.getElementById('grBreakdown');
  bd.innerHTML=gState.results.map(r=>`
    <div class="gr-bd-item">
      <div class="gr-bd-icon">${r.correct?'✅':'❌'}</div>
      <div class="gr-bd-right">
        <div class="gr-bd-comment">${r.comment.text}</div>
        <div class="gr-bd-row">
          <span class="gr-bd-tag ${r.correct?'correct':'wrong'}">你选：${r.chosen}</span>
          ${!r.correct?`<span class="gr-bd-tag answer">正确：${r.comment.answer}</span>`:''}
        </div>
      </div>
    </div>`).join('');
  // AI advice
  const adviceKey=gState.score>=50?'high':gState.score>=30?'mid':'low';
  document.getElementById('grAiText').textContent=AI_ADVICE[adviceKey];
  // tags - top categories
  const cats={};
  gState.results.filter(r=>r.correct).forEach(r=>{cats[r.comment.answer]=(cats[r.comment.answer]||0)+1;});
  const tagHtml=Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<span class="gr-tag">${k} ×${v}</span>`).join('');
  document.getElementById('grTags').innerHTML=tagHtml||'<span class="gr-tag">继续练习 💪</span>';
  // scroll to result
  setTimeout(()=>document.getElementById('gameResult').scrollIntoView({behavior:'smooth',block:'start'}),100);
}

function resetGame(){
  document.getElementById('gameResult').style.display='none';
  document.getElementById('gamePlaying').style.display='none';
  document.getElementById('gameIdle').style.display='flex';
}
