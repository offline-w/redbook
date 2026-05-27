const STEP_LABELS = ['解析情绪状态', '匹配城市数据', '规划路线节点', '生成分享文案'];

export default function LoadingSteps({ generationStep }) {
  return (
    <div className="lbox">
      <div className="l-header">
        AI 正在生成你的专属路线
        <div className="l-dots">
          <div className="l-dot" /><div className="l-dot" /><div className="l-dot" />
        </div>
      </div>
      <div className="l-steps">
        {STEP_LABELS.map((label, i) => {
          const done = generationStep > i;
          const active = generationStep === i;
          return (
            <div key={i} className={`l-step${done ? ' done' : active ? ' active' : ''}`}>
              <div className="l-icon">
                {done ? '✓' : active ? '…' : i + 1}
              </div>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
