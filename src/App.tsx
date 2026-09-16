import React from 'react';
import { useGameStore } from './state/useGameStore';
import { TitleScreen } from './components/ui/TitleScreen';
import { VisualNovelView } from './components/novel/VisualNovelView';
import { PhoneModal } from './components/phone/PhoneModal';
import { VanityMirror } from './components/vanity/VanityMirror';
import { BoundaryClash } from './components/minigames/BoundaryClash';
import { EyelinerMinigame } from './components/minigames/EyelinerMinigame';
import { MirrorMonologue } from './components/minigames/MirrorMonologue';
import { IntimacyTouchMinigame } from './components/minigames/IntimacyTouchMinigame';
import { VoiceTunerMinigame } from './components/minigames/VoiceTunerMinigame';
import { FlowchartModal } from './components/flowchart/FlowchartModal';
import { SaveLoadModal } from './components/ui/SaveLoadModal';
import { SettingsModal } from './components/ui/SettingsModal';
import { GalleryModal } from './components/gallery/GalleryModal';
import { ApartmentHub } from './components/apartment/ApartmentHub';
import { CityMapModal } from './components/city/CityMapModal';
import { DiaryModal } from './components/diary/DiaryModal';
import { DailySummaryModal } from './components/summary/DailySummaryModal';
import { CharacterCreatorModal } from './components/character/CharacterCreatorModal';

export const App: React.FC = () => {
  const { state } = useGameStore();

  if (state.viewMode === 'title') {
    return <TitleScreen />;
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans">
      {/* Base Visual Novel Engine */}
      <VisualNovelView />

      {/* Layered Modals and Interactive Systems */}
      {state.viewMode === 'creator' && <CharacterCreatorModal />}
      {state.viewMode === 'phone' && <PhoneModal />}
      {state.viewMode === 'vanity' && <VanityMirror />}
      {state.viewMode === 'flowchart' && <FlowchartModal />}
      {state.viewMode === 'apartment' && <ApartmentHub />}
      {state.viewMode === 'city_hub' && <CityMapModal />}
      {state.viewMode === 'diary' && <DiaryModal />}
      {state.viewMode === 'daily_summary' && <DailySummaryModal />}
      {state.viewMode === 'minigame' && state.activeMinigame === 'boundary_clash' && <BoundaryClash />}
      {state.viewMode === 'minigame' && state.activeMinigame === 'eyeliner' && <EyelinerMinigame />}
      {state.viewMode === 'minigame' && state.activeMinigame === 'mirror_monologue' && <MirrorMonologue />}
      {state.viewMode === 'minigame' && state.activeMinigame === 'intimacy_touch' && <IntimacyTouchMinigame />}
      {state.viewMode === 'minigame' && state.activeMinigame === 'voice_tuner' && <VoiceTunerMinigame />}
      {state.viewMode === 'save_load' && <SaveLoadModal />}
      {state.viewMode === 'settings' && <SettingsModal />}
      {state.viewMode === 'gallery' && <GalleryModal />}
    </main>
  );
};

export default App;
