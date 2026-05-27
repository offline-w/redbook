import { CREATION_STEPS } from '../../data/demoData.js';

export default function CreationProcessTab() {
  return (
    <>
      <p style={{ fontSize: '13px', color: 'var(--t2)', marginBottom: '16px', lineHeight: 1.7 }}>
        从想法到可交互 Demo，完整的产品创作过程记录 👇
      </p>
      <div className="tl">
        {CREATION_STEPS.map((s, i) => (
          <div key={s.step} className="tli">
            <div className={`tl-dot${i < CREATION_STEPS.length - 1 ? ' done' : ''}`} />
            <div className="tl-day">{s.time} · {s.title}</div>
            <div className="tl-txt">
              {s.items.map((item, j) => (
                <span key={j}>· {item}{j < s.items.length - 1 ? '  ' : ''}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
