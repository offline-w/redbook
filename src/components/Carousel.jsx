import { useState, useRef } from 'react';

const TOTAL = 5;

function Slide1() {
  return (
    <div className="slide-c sc1">
      <div className="grid-bg" />
      <div className="scanline" />
      <span className="sc-tag">FEATURE 01</span>
      <div className="sc-title">AI <span>城市路线</span><br />生成器</div>
      <div className="sc-sub">输入你的心情和约束<br />10 秒生成专属都市微冒险</div>
      <div className="input-mock">
        <div className="input-mock-label">当下状态</div>
        <div className="input-mock-text">今天有点累，想逃离工位。只有 2 小时，想安静有风的地方<span className="cursor-blink" /></div>
      </div>
      <div className="tag-chips">
        {['📍 新加坡', '⏱ 2h', '📸 拍照', '🌿 安静'].map((t) => (
          <span key={t} className="tc">{t}</span>
        ))}
      </div>
    </div>
  );
}

function Slide2() {
  return (
    <div className="slide-c sc2">
      <div className="grid-bg" />
      <div className="scanline" />
      <span className="sc-tag">FEATURE 02</span>
      <div className="sc-title">H5 动态<br /><span>笔记形态</span></div>
      <div className="sc-sub">每篇笔记都是可交互的 Demo<br />点击、分享、复刻</div>
      <div className="phone-sm">
        <div className="psm-notch" />
        <div className="psm-title">低电量逃离中</div>
        <div className="psm-route">
          <div className="psm-line" />
          {[0, 33, 66, 100].map((l, i) => (
            <div key={i} className="psm-dot" style={{ left: `${l}%` }}>
              <div className="psm-dot-l">{['出发', '云雾林', '海湾', '艺术中心'][i]}</div>
            </div>
          ))}
        </div>
        <div className="psm-kw">能量值</div>
        <div className="psm-energy">
          <div className="psm-ebar"><div className="psm-efill" /></div>
          <div className="psm-epct">62%</div>
        </div>
        <div className="psm-tags2">
          <span className="psm-tag2">安静</span>
          <span className="psm-tag2">有风</span>
          <span className="psm-tag2">拍照</span>
        </div>
        <div className="psm-btn">开始微冒险</div>
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div className="slide-c sc3">
      <div className="grid-bg" />
      <div className="scanline" />
      <span className="sc-tag">FEATURE 03</span>
      <div className="sc-title">上下文感知<br /><span>路线规划</span></div>
      <div className="sc-sub">结合时间、预算、情绪<br />生成真实可执行的城市路线</div>
      <div className="map-nodes">
        <div className="map-line" />
        <div className="flow-dot" />
        {['出发', '站1', '站2', '终点'].map((l, i) => (
          <div key={i} className="map-node" style={{ left: i === 3 ? undefined : `${i * 33}%`, right: i === 3 ? 0 : undefined }}>
            <div className="map-node-label">{l}</div>
          </div>
        ))}
      </div>
      <div className="sc-pills">
        {['时间约束', '预算匹配', '情绪适配', '实时可达'].map((p) => (
          <span key={p} className="sc-pill">{p}</span>
        ))}
      </div>
    </div>
  );
}

function Slide4() {
  return (
    <div className="slide-c sc4">
      <div className="grid-bg" />
      <div className="scanline" />
      <span className="sc-tag">FEATURE 04</span>
      <div className="sc-title">创作者<br /><span>任务卡</span></div>
      <div className="sc-sub">把路线变成有仪式感的任务<br />打卡记录每一站</div>
      <div className="task-cards">
        {['找一片叶子，拍微距照片', '在海边站 5 分钟不刷手机', '买冷饮，慢慢走完剩余路程'].map((t, i) => (
          <div key={i} className="task-card">
            <div className="tc-num">{i + 1}</div>
            <div className="tc-txt">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div className="slide-c sc5">
      <div className="grid-bg" />
      <div className="scanline" />
      <span className="sc-tag">FEATURE 05</span>
      <div className="sc-title">一键生成<br /><span>分享文案</span></div>
      <div className="sc-sub">小红书调性的分享文案<br />含 emoji 和话题标签</div>
      <div className="share-preview">
        <div className="sp-title">📝 分享文案</div>
        <div className="sp-text">低电量的下午，给自己安排了一场说走就走的两小时充电。🌿 云雾林的水汽、海湾的风……</div>
        <div className="sp-tags">
          <span className="sp-tag">#城市微冒险</span>
          <span className="sp-tag">#新加坡</span>
          <span className="sp-tag">#低电量生活</span>
        </div>
      </div>
    </div>
  );
}

const SLIDES_CONTENT = [Slide1, Slide2, Slide3, Slide4, Slide5];

export default function Carousel() {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef(null);

  const go = (n) => setIdx(Math.max(0, Math.min(TOTAL - 1, n)));

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(idx + (diff > 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div className="car" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="slides-c" style={{ transform: `translateX(-${idx * 20}%)` }}>
        {SLIDES_CONTENT.map((SlideComp, i) => <SlideComp key={i} />)}
      </div>
      <button
        className={`c-arr l${idx === 0 ? ' dis' : ''}`}
        onClick={() => go(idx - 1)}
        aria-label="上一张"
      >‹</button>
      <button
        className={`c-arr r${idx === TOTAL - 1 ? ' dis' : ''}`}
        onClick={() => go(idx + 1)}
        aria-label="下一张"
      >›</button>
      <div className="c-dots">
        {Array.from({ length: TOTAL }, (_, i) => (
          <button
            key={i}
            className={`c-dot${i === idx ? ' on' : ''}`}
            onClick={() => go(i)}
            aria-label={`第${i + 1}张`}
          />
        ))}
      </div>
      <div className="c-idx">{idx + 1} / {TOTAL}</div>
    </div>
  );
}
