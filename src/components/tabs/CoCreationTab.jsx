import { useContext } from 'react';
import { ToastContext } from '../../App.jsx';
import { COMMENTS, NEEDS } from '../../data/demoData.js';

export default function CoCreationTab({ adoptedNeeds, setAdoptedNeeds }) {
  const { showToast } = useContext(ToastContext);

  const adopt = (id) => {
    if (adoptedNeeds.includes(id)) return;
    setAdoptedNeeds((prev) => [...prev, id]);
    showToast('已加入下一版迭代计划 ✓');
  };

  return (
    <>
      <div className="ctitle">读者评论</div>
      {COMMENTS.map((c) => (
        <div key={c.id} className="citem">
          <div className="cav" style={{ background: c.bg }}>{c.avatar}</div>
          <div>
            <div className="cname">{c.name}</div>
            <div className="ctxt">{c.text}</div>
            <div className="clike">♡ {c.likes}</div>
          </div>
        </div>
      ))}

      <div className="ctitle" style={{ marginTop: '20px' }}>需求池</div>
      {NEEDS.map((n) => {
        const adopted = adoptedNeeds.includes(n.id);
        return (
          <div key={n.id} className="pool-row">
            <div className="pool-info">
              <div className="pool-name">
                {n.name}{n.hot ? ' 🔥' : ''}
              </div>
              <div className="pool-cnt">+{n.count} 人支持</div>
            </div>
            <button
              className={`adopt-btn${adopted ? ' ad' : ''}`}
              onClick={() => adopt(n.id)}
            >
              {adopted ? '已采纳' : '采纳'}
            </button>
          </div>
        );
      })}
    </>
  );
}
