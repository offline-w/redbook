import DemoInput from './DemoInput.jsx';
import LoadingSteps from './LoadingSteps.jsx';
import GeneratedResult from './GeneratedResult.jsx';
import CapabilityTags from './CapabilityTags.jsx';
import MiniDemoGenerator from './MiniDemoGenerator.jsx';

export default function DynamicDemoCard({
  inputText, setInputText,
  selectedChips, setSelectedChips,
  isGenerating, setIsGenerating,
  generationStep, setGenerationStep,
  hasGenerated, setHasGenerated,
  generatedData, setGeneratedData,
  completedTasks, setCompletedTasks,
}) {
  return (
    <div className="dcard">
      <div className="dcard-toprow">
        <span className="dcard-label">Interactive Demo</span>
        <span className="dcard-live">LIVE</span>
      </div>
      <div className="dcard-title">动态笔记 · 城市微冒险生成器</div>
      <div className="dcard-sub">输入你的当下状态，AI 帮你生成专属城市路线</div>
      <div className="dcard-hint">试试输入"今天好累，想逃离工位"然后点击生成</div>

      <DemoInput
        inputText={inputText}
        setInputText={setInputText}
        selectedChips={selectedChips}
        setSelectedChips={setSelectedChips}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
        setGenerationStep={setGenerationStep}
        hasGenerated={hasGenerated}
        setHasGenerated={setHasGenerated}
        setGeneratedData={setGeneratedData}
      />

      {isGenerating && <LoadingSteps generationStep={generationStep} />}

      {hasGenerated && !isGenerating && (
        <GeneratedResult
          data={generatedData}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      )}

      <CapabilityTags />
      <MiniDemoGenerator />
    </div>
  );
}
