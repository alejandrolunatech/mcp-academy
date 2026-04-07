import { useGame } from '../../context/GameContext';
import { XPStars } from '../ui/XPStars';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { SCENES } from '../../data/scenes';
import styles from './NavigationBar.module.css';

export function NavigationBar() {
  const { state, navigateTo, resetGame } = useGame();
  const { xpStars, playerName, completedScenes } = state.progress;
  const scene = SCENES[state.activeSceneId];

  if (state.activeSceneId === 'world-map' || state.activeSceneId === 'victory-screen') {
    return null; // these pages have their own full-screen headers
  }

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Game navigation">
      {/* Left: back to map */}
      <div className={styles.left}>
        <Button variant="ghost" size="sm" onClick={() => navigateTo('world-map')} aria-label="Return to world map">
          🗺️ Map
        </Button>
      </div>

      {/* Centre: current scene */}
      <div className={styles.centre}>
        <span className={styles.sceneEmoji} aria-hidden="true">{scene?.emoji}</span>
        <span className={styles.sceneTitle}>{scene?.title ?? 'MCP Academy'}</span>
        <span className={styles.progressIndicator} aria-label={`${completedScenes.length} rooms completed`}>
          {completedScenes.length} ✅
        </span>
      </div>

      {/* Right: XP + player + language */}
      <div className={styles.right}>
        <span className={styles.playerName} aria-hidden="true">🧑‍🎓 {playerName}</span>
        <XPStars count={xpStars} />
        <LanguageSwitcher compact />
        <Button variant="ghost" size="sm" onClick={resetGame} aria-label="Reset game progress">
          🔄
        </Button>
      </div>
    </nav>
  );
}
