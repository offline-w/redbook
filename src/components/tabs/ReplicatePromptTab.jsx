import { useContext } from 'react';
import { ToastContext } from '../../App.jsx';
import { REPLICATE_PROMPT } from '../../data/demoData.js';

export default function ReplicatePromptTab() {
  const { showToast } = useContext(ToastContext);

  const copyPrompt = () => {
    navigator.clipboard.writeText(REPLICATE_PROMPT).then(
      () => showToast('Prompt 已复制 ✓'),
      () => showToast('复制失败，请手动选取')
    );
  };

  return (
    <>
      <p style={{ fontSize: '13px', color: 'var(--t2)', marginBottom: '13px', lineHeight: 1.7 }}>
        复制下方 Prompt，在支持 AI 的笔记工具中即可复刻本产品的内容生成逻辑
      </p>
      <div className="prompt-box">{REPLICATE_PROMPT}</div>
      <button className="copy-btn" onClick={copyPrompt}>复制 Prompt</button>
      <button className="save-btn">收藏复刻步骤</button>
    </>
  );
}
