import { useContext } from 'react';
import { ToastContext } from '../App.jsx';
import { CHIPS, DEFAULT_INPUT } from '../data/demoData.js';
import { mockGenerate } from '../utils/mockGenerate.js';

export default function DemoInput({
  inputText,
  setInputText,
  selectedChips,
  setSelectedChips,
  isGenerating,
  setIsGenerating,
  setGenerationStep,
  hasGenerated,
  setHasGenerated,
  setGeneratedData,
}) {
  const { showToast } = useContext(ToastContext);

  const toggleChip = (id) => {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    const text = (inputText || DEFAULT_INPUT).trim();
    if (!text) { showToast('请先输入你的状态'); return; }
    if (isGenerating) return;
    setIsGenerating(true);
    setGenerationStep(0);
    setHasGenerated(false);
    setGeneratedData(null);
    try {
      const result = await mockGenerate(text, selectedChips, (step) => setGenerationStep(step));
      setGeneratedData(result);
      setHasGenerated(true);
    } finally {
      setIsGenerating(false);
      setGenerationStep(-1);
    }
  };

  return (
    <>
      <textarea
        className="mood-ta"
        value={inputText}
        placeholder={DEFAULT_INPUT}
        onChange={(e) => setInputText(e.target.value)}
        rows={3}
      />
      <div className="form-chips">
        {CHIPS.map((chip) => (
          <button
            key={chip.id}
            className={`fchip${selectedChips.includes(chip.id) ? ' on' : ''}`}
            onClick={() => toggleChip(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <button
        className="gen-btn"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? '生成中…' : hasGenerated ? '重新生成' : '✨ 生成我的城市微冒险'}
      </button>
    </>
  );
}
