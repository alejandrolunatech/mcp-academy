import { useGame } from '../../context/GameContext';
import { SCENES } from '../../data/scenes';
import type { SceneId } from '../../types/game';
import { useTranslation } from '../../i18n';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import styles from './WorldMap.module.css';

const MAP_ROOMS: { id: SceneId; label: string; emoji: string; path?: string }[] = [
  { id: 'great-entrance-hall', label: 'Entrance Hall', emoji: '🏛️' },
  { id: 'artifact-hall', label: 'Artifact Hall', emoji: '⚒️', path: 'toolcraft' },
  { id: 'grand-library', label: 'Grand Library', emoji: '📚', path: 'lorekeeping' },
  { id: 'spell-tower', label: 'Spell Tower', emoji: '✨', path: 'spellguidance' },
  { id: 'hall-of-mirrors', label: 'Hall of Mirrors', emoji: '🪞' },
  {
    id: 'rune-console-chamber',
    label: 'Rune Console',
    emoji: '💻',
    path: 'toolcraft',
  },
  { id: 'fog-chamber', label: 'Fog Chamber', emoji: '🌫️' },
  { id: 'victory-screen', label: 'Victory!', emoji: '🏆' },
];

const PATH_COLORS: Record<string, string> = {
  toolcraft: '#c0392b',
  lorekeeping: '#2980b9',
  spellguidance: '#d4a017',
};

export function WorldMap() {
  const { state, navigateTo, isSceneUnlocked, isSceneCompleted } = useGame();
  const { xpStars, badges, playerName } = state.progress;
  const { tr, t } = useTranslation();

  return (
    <div className={styles.mapPage}>
      {/* Header */}
      <div className={styles.mapHeader}>
        <div className={styles.academy}>
          <span className={styles.academyEmoji} aria-hidden="true">🏰</span>
          <div>
            <h1 className={styles.academyTitle}>{tr.worldMapTitle}</h1>
            <p className={styles.academySubtitle}>
              {t(tr.worldMapWelcome, { name: playerName })}
            </p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <LanguageSwitcher />
          <div className={styles.stats}>
            <span className={styles.statPill} aria-label={`${xpStars} XP stars`}>
              ⭐ {t(tr.xpLabel, { n: xpStars })}
            </span>
            <span className={styles.statPill} aria-label={`${badges.length} badges`}>
              🏅 {t(tr.badgesLabel, { n: badges.length })}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar} role="progressbar" aria-valuenow={state.progress.completedScenes.length} aria-valuemax={MAP_ROOMS.length} aria-label="Rooms completed">
        <div
          className={styles.progressFill}
          style={{
            width: `${(state.progress.completedScenes.length / MAP_ROOMS.length) * 100}%`,
          }}
        />
        <span className={styles.progressLabel}>
          {t(tr.roomsCompleted, { n: state.progress.completedScenes.length, total: MAP_ROOMS.length })}
        </span>
      </div>

      {/* Path legend */}
      <div className={styles.legend} aria-label="Magic path legend">
        {Object.entries(PATH_COLORS).map(([path, color]) => (
          <div key={path} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: color }}
              aria-hidden="true"
            />
            <span className={styles.legendLabel}>
              {path === 'toolcraft'
                ? tr.legendDo
                : path === 'lorekeeping'
                ? tr.legendKnow
                : tr.legendGuide}
            </span>
          </div>
        ))}
      </div>

      {/* Room grid */}
      <div className={styles.roomGrid} role="list">
        {MAP_ROOMS.map((room) => {
          const unlocked = isSceneUnlocked(room.id);
          const completed = isSceneCompleted(room.id);
          const scene = SCENES[room.id];
          const color = room.path ? PATH_COLORS[room.path] : '#6b2fa0';

          return (
            <button
              key={room.id}
              className={[
                styles.roomCard,
                !unlocked ? styles.locked : '',
                completed ? styles.completed : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--room-color': color } as React.CSSProperties}
              onClick={() => unlocked && navigateTo(room.id)}
              disabled={!unlocked}
              aria-label={
                unlocked
                  ? `${room.label}${completed ? ' — completed' : ''}`
                  : `${room.label} — ${tr.lockedLabel}`
              }
              role="listitem"
            >
              <span className={styles.roomEmoji} aria-hidden="true">
                {unlocked ? room.emoji : '🔒'}
              </span>
              <span className={styles.roomLabel}>{room.label}</span>
              {scene?.path && (
                <span className={styles.pathTag} style={{ color }}>
                  {scene.path}
                </span>
              )}
              {completed && (
                <span className={styles.checkmark} aria-hidden="true">
                  ✅
                </span>
              )}
              {!unlocked && (
                <span className={styles.lockedLabel}>{tr.lockedLabel}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
