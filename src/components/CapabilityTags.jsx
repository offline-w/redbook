import { useContext } from 'react';
import { ToastContext } from '../App.jsx';
import { CAPABILITY_TAGS } from '../data/demoData.js';

export default function CapabilityTags() {
  const { showToast } = useContext(ToastContext);
  return (
    <div className="cap-section">
      <div className="cap-row">
        {CAPABILITY_TAGS.map((tag) => (
          <button
            key={tag}
            className="cap-tag"
            onClick={() => showToast(`支持插入 ${tag}`)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="cap-desc">
        以上能力均可模块化集成到小红书动态笔记中，点击标签了解详情
      </div>
    </div>
  );
}
