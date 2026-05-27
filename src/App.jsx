import { createContext, useState, useCallback, useRef } from 'react';
import Toast from './components/Toast.jsx';
import Carousel from './components/Carousel.jsx';
import NoteHeader from './components/NoteHeader.jsx';
import NoteContent from './components/NoteContent.jsx';
import DynamicDemoCard from './components/DynamicDemoCard.jsx';
import TabsSection from './components/TabsSection.jsx';
import InteractionBar from './components/InteractionBar.jsx';

export const ToastContext = createContext(null);

export default function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(696);
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(1048);

  const [inputText, setInputText] = useState('');
  const [selectedChips, setSelectedChips] = useState(['sg', '2h', 'photo', 'quiet']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(-1);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('process');
  const [adoptedNeeds, setAdoptedNeeds] = useState([]);

  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 2200);
  }, []);

  const handleLike = () => {
    setLiked((v) => { setLikeCount((c) => c + (v ? -1 : 1)); return !v; });
  };
  const handleSave = () => {
    setSaved((v) => { setSaveCount((c) => c + (v ? -1 : 1)); return !v; });
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      <NoteHeader isFollowing={isFollowing} onFollow={() => setIsFollowing((v) => !v)} />
      <Carousel />
      <div className="content">
        <NoteContent />
        <DynamicDemoCard
          inputText={inputText}
          setInputText={setInputText}
          selectedChips={selectedChips}
          setSelectedChips={setSelectedChips}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          generationStep={generationStep}
          setGenerationStep={setGenerationStep}
          hasGenerated={hasGenerated}
          setHasGenerated={setHasGenerated}
          generatedData={generatedData}
          setGeneratedData={setGeneratedData}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
      <TabsSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        adoptedNeeds={adoptedNeeds}
        setAdoptedNeeds={setAdoptedNeeds}
      />
      <div className="bspacer" />
      <InteractionBar
        liked={liked}
        likeCount={likeCount}
        saved={saved}
        saveCount={saveCount}
        onLike={handleLike}
        onSave={handleSave}
      />
      <Toast />
    </ToastContext.Provider>
  );
}
