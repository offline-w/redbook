import CreationProcessTab from './tabs/CreationProcessTab.jsx';
import ReplicatePromptTab from './tabs/ReplicatePromptTab.jsx';
import CoCreationTab from './tabs/CoCreationTab.jsx';

const TABS = [
  { id: 'process', label: '创作过程' },
  { id: 'replicate', label: '复刻 Prompt' },
  { id: 'cocreation', label: '评论共创' },
];

export default function TabsSection({ activeTab, setActiveTab, adoptedNeeds, setAdoptedNeeds }) {
  return (
    <div className="tabs-wrap">
      <div className="tab-nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab-btn${activeTab === t.id ? ' on' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={`tab-pane${activeTab === 'process' ? ' on' : ''}`}>
        <CreationProcessTab />
      </div>
      <div className={`tab-pane${activeTab === 'replicate' ? ' on' : ''}`}>
        <ReplicatePromptTab />
      </div>
      <div className={`tab-pane${activeTab === 'cocreation' ? ' on' : ''}`}>
        <CoCreationTab adoptedNeeds={adoptedNeeds} setAdoptedNeeds={setAdoptedNeeds} />
      </div>
    </div>
  );
}
