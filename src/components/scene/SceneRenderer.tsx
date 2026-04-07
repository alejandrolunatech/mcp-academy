import { useState } from 'react';
import type { Scene, SceneId } from '../../types/game';
import { useGame } from '../../context/GameContext';
import { useTranslation } from '../../i18n';
import { HotspotPin } from './HotspotPin';
import { HotspotModal } from '../ui/HotspotModal';
import { DialogueBox } from '../dialogue/DialogueBox';
import { CharacterPortrait } from '../ui/CharacterPortrait';
import { Button } from '../ui/Button';
import styles from './SceneRenderer.module.css';

const XP_REWARDS: Partial<Record<SceneId, number>> = {
  'great-entrance-hall': 10,
  'artifact-hall': 20,
  'grand-library': 20,
  'spell-tower': 20,
  'hall-of-mirrors': 30,
  'rune-console-chamber': 30,
  'fog-chamber': 50,
};

interface Props {
  scene: Scene;
}

export function SceneRenderer({ scene }: Props) {
  const {
    state,
    openDialogue,
    closeDialogue,
    nextDialogue,
    prevDialogue,
    setDialogueIndex,
    openHotspot,
    closeHotspot,
    navigateTo,
    completeScene,
    isSceneCompleted,
  } = useGame();
  const { tr, t } = useTranslation();

  const completed = isSceneCompleted(scene.id);
  const [hasOpenedDialogue, setHasOpenedDialogue] = useState(false);
  const [hotspotsSeen, setHotspotsSeen] = useState<Set<string>>(new Set());
  const [showUnlockBanner, setShowUnlockBanner] = useState(false);

  const hasDialogue = scene.dialogue.length > 0;
  const hasHotspots = scene.hotspots.length > 0;

  // Room is ready to complete when the player has talked (if there's dialogue)
  // and seen at least one hotspot (if there are hotspots), OR is already completed.
  const readyToComplete =
    (!hasDialogue || hasOpenedDialogue) &&
    (!hasHotspots || hotspotsSeen.size > 0);

  const handleOpenDialogue = () => {
    setHasOpenedDialogue(true);
    openDialogue();
  };

  const handleOpenHotspot = (hs: typeof scene.hotspots[0]) => {
    setHotspotsSeen((prev) => new Set([...prev, hs.id]));
    openHotspot(hs);
  };

  const handleCompleteRoom = () => {
    const xp = XP_REWARDS[scene.id] ?? 10;
    completeScene(scene.id, xp, scene.badge, scene.unlocksScenes);
    setShowUnlockBanner(true);
    setTimeout(() => {
      setShowUnlockBanner(false);
      navigateTo('world-map');
    }, 2200);
  };

  const handleChoice = (nextIndex: number | null) => {
    if (nextIndex === null) {
      closeDialogue();
    } else {
      setDialogueIndex(nextIndex);
    }
  };

  return (
    <div
      className={styles.scene}
      style={{ background: scene.background }}
    >
      {/* Scene ambience overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Unlock banner */}
      {showUnlockBanner && (
        <div className={styles.unlockBanner} role="alert">
          <span className={styles.unlockEmoji}>🎉</span>
          <div>
            <strong>{t(tr.roomCompleteBanner, { xp: XP_REWARDS[scene.id] ?? 10 })}</strong>
            {scene.unlocksScenes && scene.unlocksScenes.length > 0 && (
              <p>{tr.newRoomsUnlocked}</p>
            )}
          </div>
        </div>
      )}

      {/* Scene header */}
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <span className={styles.sceneEmoji} aria-hidden="true">
            {scene.emoji}
          </span>
          <div>
            <h1 className={styles.sceneTitle}>{scene.title}</h1>
            <p className={styles.sceneSubtitle}>{scene.subtitle}</p>
          </div>
          {completed && (
            <span className={styles.completedBadge} aria-label="Scene completed">
              {tr.completedBadge}
            </span>
          )}
        </div>

        <Button variant="ghost" size="sm" onClick={() => navigateTo('world-map')}>
          {tr.mapBtn}
        </Button>
      </div>

      {/* Character portraits */}
      {scene.characters.length > 0 && (
        <div className={styles.characters}>
          {scene.characters.map((char) => (
            <div key={char.id} className={styles.characterCard}>
              <CharacterPortrait character={char} size="md" />
              <span className={styles.charName}>{char.name}</span>
            </div>
          ))}
          {scene.dialogue.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleOpenDialogue}
              aria-label={t(tr.talkTo, { name: scene.characters[0]?.name ?? '' })}
            >
              {hasOpenedDialogue ? tr.talkAgainBtn : tr.talkBtn}
            </Button>
          )}
        </div>
      )}

      {/* Hotspot pins — positioned absolutely within the scene area */}
      <div className={styles.hotspotArea} role="region" aria-label="Interactive items">
        {scene.hotspots.map((hs) => (
          <HotspotPin
            key={hs.id}
            hotspot={hs}
            onClick={handleOpenHotspot}
            seen={hotspotsSeen.has(hs.id)}
          />
        ))}

        {scene.hotspots.length === 0 && (
          <p className={styles.noHotspots}>
            {scene.id === 'fog-chamber'
              ? '⚡ Face the Fog — complete the room below when ready!'
              : ''}
          </p>
        )}
      </div>

      {/* ── Completion footer ──────────────────────────────── */}
      <div className={styles.footer}>
        {/* Checklist hint */}
        {!completed && (
          <div className={styles.checklist}>
            {hasDialogue && (
              <span className={hasOpenedDialogue ? styles.checkDone : styles.checkPending}>
                {hasOpenedDialogue ? '✅' : '○'} {t(tr.talkTo, { name: scene.characters[0]?.name ?? '' })}
              </span>
            )}
            {hasHotspots && (
              <span className={hotspotsSeen.size > 0 ? styles.checkDone : styles.checkPending}>
                {hotspotsSeen.size > 0 ? '✅' : '○'}{' '}
                {hotspotsSeen.size > 0
                  ? t(tr.inspectItemsProgress, { seen: hotspotsSeen.size, total: scene.hotspots.length })
                  : tr.inspectItems}
              </span>
            )}
          </div>
        )}

        <div className={styles.footerActions}>
          <Button variant="ghost" size="sm" onClick={() => navigateTo('world-map')}>
            {tr.backToMap}
          </Button>

          {!completed ? (
            <Button
              variant="primary"
              size="lg"
              onClick={handleCompleteRoom}
              disabled={!readyToComplete}
              aria-label={readyToComplete ? 'Complete this room' : 'Explore the room first'}
            >
              {readyToComplete
                ? t(tr.completeRoom, { xp: XP_REWARDS[scene.id] ?? 10 })
                : tr.exploreFirst}
            </Button>
          ) : (
            <Button variant="secondary" size="lg" onClick={() => navigateTo('world-map')}>
              {tr.returnToMap}
            </Button>
          )}
        </div>
      </div>

      {/* Hotspot modal */}
      {state.hotspotModalOpen && state.activeHotspot && (
        <HotspotModal hotspot={state.activeHotspot} onClose={closeHotspot} />
      )}

      {/* Dialogue box */}
      {state.isDialogueOpen && scene.dialogue.length > 0 && (
        <DialogueBox
          lines={scene.dialogue}
          currentIndex={state.activeDialogueIndex}
          onNext={nextDialogue}
          onPrev={prevDialogue}
          onChoice={handleChoice}
          onClose={closeDialogue}
        />
      )}
    </div>
  );
}
