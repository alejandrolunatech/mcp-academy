import { GameProvider, useGame } from './context/GameContext';
import { NavigationBar } from './components/navigation/NavigationBar';
import { WorldMap } from './components/scene/WorldMap';
import { VictoryScreen } from './components/scene/VictoryScreen';
import { SceneRenderer } from './components/scene/SceneRenderer';
import { FogChamberScene } from './components/scene/FogChamberScene';
import { getLocalizedScene } from './data/scenes.localized';
import './App.css';

function GameRouter() {
  const { state } = useGame();
  const sceneId = state.activeSceneId;
  const lang = state.progress.language ?? 'en';

  if (sceneId === 'world-map') return <WorldMap />;
  if (sceneId === 'victory-screen') return <VictoryScreen />;
  if (sceneId === 'fog-chamber') return <FogChamberScene />;

  const scene = getLocalizedScene(sceneId, lang);
  if (!scene) return <WorldMap />;

  return (
    <>
      <NavigationBar />
      <SceneRenderer scene={scene} />
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;