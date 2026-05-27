import { useState, useContext } from 'react';
import { ToastContext } from '../App.jsx';

const CITIES = ['上海', '北京', '成都', '杭州'];

export default function MiniDemoGenerator() {
  const { showToast } = useContext(ToastContext);
  const [open, setOpen] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [city, setCity] = useState('上海');

  const handleGenerate = () => {
    setGenerated(true);
    showToast('Mini Demo 已生成！');
  };

  return (
    <div className="mini-gen-wrap">
      <button
        className={`mini-gen-btn${generated ? ' generated' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '▲ 收起 Mini Demo' : '▼ 生成 Mini Demo'}
      </button>

      {open && (
        <div className="mini-card">
          <div className="mc-header">
            <span className="mc-name">快速体验</span>
            <span className="mc-badge">Mini Demo</span>
          </div>
          <div className="mc-row">
            <span className="mc-label">选择城市</span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {CITIES.map((c) => (
                <button
                  key={c}
                  className={`fchip${city === c ? ' on' : ''}`}
                  onClick={() => setCity(c)}
                >
                  📍 {c}
                </button>
              ))}
            </div>
          </div>
          <button className="gen-btn" onClick={handleGenerate} style={{ marginTop: '10px' }}>
            {generated ? '重新生成' : '✨ 生成 Mini Demo'}
          </button>
          {generated && (
            <div className="mc-titles">
              <div className="mc-titles-label">生成结果</div>
              <div className="mc-title-item">关键词：漫无目的漫游中 🌆</div>
              <div className="mc-title-item">路线：外滩 → 豫园 → 新天地</div>
              <div className="mc-title-item">任务：找一家没去过的咖啡馆坐 30 分钟</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
