import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../App.jsx';

function PhonePreview({ data, energyWidth }) {
  const stops = data.stops || [];
  const keyword = data.keyword || '城市微冒险';
  const tasks = data.tasks || [];
  const positions = [0, 33, 66, 100];

  return (
    <div className="phone-wrap">
      <div className="phone-wrap-title">H5 预览</div>
      <div className="phone">
        <div className="ph-notch" />
        <div className="ph-grid" />
        <div className="ph-scanline" />
        <div className="ph-header">
          <div className="ph-header-sub">CITY ADVENTURE</div>
          <div className="ph-header-title">{keyword}</div>
        </div>
        <div className="ph-route">
          <div className="ph-rline" />
          <div className="ph-rflow" />
          {stops.slice(0, 4).map((stop, i) => (
            <div
              key={i}
              className="ph-rdot"
              style={{ left: `${positions[i] ?? i * 33}%` }}
            >
              <div className="ph-rdot-lbl">{stop.name?.slice(0, 4)}</div>
            </div>
          ))}
        </div>
        <div className="ph-status">
          <div className="ph-status-kw">{keyword}</div>
          <div className="ph-status-bar">
            <div className="ph-status-fill" style={{ width: `${energyWidth}%` }} />
          </div>
          <div className="ph-status-row">
            <span>能量值</span><span>{data.energy ?? 0}</span>
          </div>
        </div>
        <div className="ph-tasks">
          {tasks.slice(0, 2).map((task, i) => (
            <div key={i} className="ph-task">
              <div className="ph-task-dot" />
              {task.slice(0, 12)}
            </div>
          ))}
        </div>
        <div className="ph-btn">开始微冒险 →</div>
      </div>
    </div>
  );
}

export default function GeneratedResult({ data, completedTasks, setCompletedTasks }) {
  const { showToast } = useContext(ToastContext);
  const [energyWidth, setEnergyWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setEnergyWidth(data?.energy ?? 0), 80);
    return () => clearTimeout(t);
  }, [data?.energy]);

  if (!data) return null;

  const toggleTask = (i) => {
    setCompletedTasks((prev) =>
      prev.includes(i) ? prev.filter((t) => t !== i) : [...prev, i]
    );
  };

  const copyShareText = () => {
    navigator.clipboard.writeText(data.shareText || '').then(
      () => showToast('文案已复制到剪贴板 ✓'),
      () => showToast('复制失败，请手动选择文案')
    );
  };

  return (
    <div className="results">
      <div className="res-grid">
        <div className="decode-panel">
          <div className="dp-title">AI 解码</div>
          <div className="dp-row">
            <div className="dp-label">情绪关键词</div>
            <div className="dp-val hl">{data.keyword}</div>
          </div>
          <div className="dp-row">
            <div className="dp-label">能量值</div>
            <div className="dp-val">{data.energy}</div>
            <div className="ebar"><div className="efill" style={{ width: `${energyWidth}%` }} /></div>
          </div>
          <div className="dp-row">
            <div className="dp-label">情绪</div>
            <div className="dp-val">{data.decode?.emotion}</div>
          </div>
          <div className="dp-row">
            <div className="dp-label">深层需求</div>
            <div className="dp-val">{data.decode?.need}</div>
          </div>
          <div className="dp-row">
            <div className="dp-label">约束</div>
            <div className="dp-val">{data.decode?.constraint}</div>
          </div>
        </div>
        <PhonePreview data={data} energyWidth={energyWidth} />
      </div>

      <div className="route-panel">
        <div className="rp-title">推荐路线</div>
        <div className="rp-name">{data.keyword}</div>
        <div className="route-nodes">
          {data.stops?.map((stop, i) => (
            <div key={i} className="rn">
              <div className="rn-dot"><div className="rn-dot-in" /></div>
              <div className="rn-content">
                <div className="rn-time">{stop.duration} · {stop.type}</div>
                <div className="rn-text">{stop.name} — {stop.why}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tasks-panel">
        <div className="tp-title">今日任务</div>
        {data.tasks?.map((task, i) => {
          const done = completedTasks.includes(i);
          return (
            <div
              key={i}
              className={`task-row${done ? ' done-task' : ''}`}
              onClick={() => toggleTask(i)}
            >
              <span className={`tr-cb${done ? ' checked' : ''}`}>
                {done && '✓'}
              </span>
              <span className={`tr-txt${done ? ' struck' : ''}`}>{task}</span>
            </div>
          );
        })}
      </div>

      <div className="share-line-panel">
        <div className="slp-label">
          <span>分享文案</span>
          <button className="copy-slogan-btn" onClick={copyShareText}>复制文案</button>
        </div>
        <div className="slp-text">{data.shareText}</div>
      </div>
    </div>
  );
}
