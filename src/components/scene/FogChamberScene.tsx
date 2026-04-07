import { useState, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { useTranslation } from '../../i18n';
import { Button } from '../ui/Button';
import styles from './FogChamberScene.module.css';

// ─── Types ────────────────────────────────────────────────

type Zone = 'do' | 'know' | 'guide';

interface FogCard {
  id: string;
  emoji: string;
  title: string;
  hint: string;
  correctZone: Zone;
}

// ─── Challenge Data ───────────────────────────────────────

const FOG_CARDS: FogCard[] = [
  // Tools — DO things
  { id: 'web-search',    emoji: '🔍', title: 'web_search',           hint: 'Scours the internet on command',          correctZone: 'do'    },
  { id: 'send-email',    emoji: '📧', title: 'send_email',            hint: 'Fires a message across the wire',         correctZone: 'do'    },
  { id: 'run-code',      emoji: '⚡', title: 'run_code',              hint: 'Executes instructions immediately',       correctZone: 'do'    },
  // Resources — KNOW things
  { id: 'faq-doc',       emoji: '📄', title: 'FAQ Document',          hint: 'Holds answers to common questions',       correctZone: 'know'  },
  { id: 'product-db',    emoji: '🗄️', title: 'Product Database',      hint: 'Stores all product details silently',     correctZone: 'know'  },
  { id: 'meeting-notes', emoji: '📝', title: 'Meeting Notes',         hint: 'A quiet record of what was said',         correctZone: 'know'  },
  // Prompts — GUIDE things
  { id: 'be-friendly',   emoji: '😊', title: '"Be friendly & brief"', hint: 'Sets the tone for every reply',          correctZone: 'guide' },
  { id: 'pirate-persona',emoji: '🏴‍☠️', title: '"You are a pirate"',   hint: 'Shapes the entire persona to embody',    correctZone: 'guide' },
  { id: 'bullet-rule',   emoji: '📋', title: '"Always use bullets"',  hint: 'A formatting rule to always obey',        correctZone: 'guide' },
];

const ZONE_META: Record<Zone, {
  label: string; emoji: string; color: string;
  bgRgba: string; glowRgba: string;
  pathLabel: string; description: string;
}> = {
  do: {
    label: 'DO', emoji: '⚒️', color: '#e05252',
    bgRgba: 'rgba(192,57,43,0.13)', glowRgba: 'rgba(192,57,43,0.35)',
    pathLabel: 'Toolcraft', description: 'Takes action & produces results',
  },
  know: {
    label: 'KNOW', emoji: '📚', color: '#4da6e0',
    bgRgba: 'rgba(41,128,185,0.13)', glowRgba: 'rgba(41,128,185,0.35)',
    pathLabel: 'Lorekeeping', description: 'Stores & provides information',
  },
  guide: {
    label: 'GUIDE', emoji: '✨', color: '#f0c040',
    bgRgba: 'rgba(212,160,23,0.13)', glowRgba: 'rgba(212,160,23,0.35)',
    pathLabel: 'Spellguidance', description: 'Shapes behaviour & tone',
  },
};

const HP_BAR_COLORS = [
  'linear-gradient(90deg, #6b2fa0, #9b59b6)',  // 100%–67%
  'linear-gradient(90deg, #8b2fc0, #c0392b)',  // 66%–34%
  'linear-gradient(90deg, #c0392b, #e74c3c)',  // 33%–1%
];

function hpBarColor(hp: number): string {
  if (hp > 66) return HP_BAR_COLORS[0];
  if (hp > 33) return HP_BAR_COLORS[1];
  return HP_BAR_COLORS[2];
}

// ─── Component ────────────────────────────────────────────

export function FogChamberScene() {
  const { completeScene, navigateTo, isSceneCompleted } = useGame();
  const { tr, t } = useTranslation();
  const alreadyCompleted = isSceneCompleted('fog-chamber');

  const [phase, setPhase] = useState<'intro' | 'challenge' | 'victory'>(
    alreadyCompleted ? 'victory' : 'intro'
  );

  // Drag state
  const [draggingId, setDraggingId]   = useState<string | null>(null);
  const [dragOverZone, setDragOverZone] = useState<Zone | null>(null);

  // Click-to-select state (keyboard / touch fallback)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Placement state
  const [correctCards, setCorrectCards] = useState<Set<string>>(
    alreadyCompleted ? new Set(FOG_CARDS.map(c => c.id)) : new Set()
  );
  const [wrongCardId, setWrongCardId] = useState<string | null>(null);
  const [wrongCount, setWrongCount]   = useState(0);
  const [fogSurge, setFogSurge]       = useState(false);
  const [lastCorrect, setLastCorrect] = useState<string | null>(null);

  const totalCards   = FOG_CARDS.length;
  const totalCorrect = correctCards.size;
  const fogHP        = Math.round((1 - totalCorrect / totalCards) * 100);

  const unplacedCards                     = FOG_CARDS.filter(c => !correctCards.has(c.id));
  const placedInZone = (z: Zone) => FOG_CARDS.filter(c => correctCards.has(c.id) && c.correctZone === z);

  // ─── Unified placement handler ──────────────────────────

  const handlePlacement = useCallback((cardId: string, zone: Zone) => {
    const card = FOG_CARDS.find(c => c.id === cardId);
    if (!card || correctCards.has(cardId)) return;

    if (card.correctZone === zone) {
      const newCorrect = new Set([...correctCards, cardId]);
      setCorrectCards(newCorrect);
      setLastCorrect(cardId);
      setTimeout(() => setLastCorrect(null), 600);

      if (newCorrect.size === totalCards) {
        setTimeout(() => {
          setPhase('victory');
          completeScene('fog-chamber', 50, 'badge-fog-defeated', ['victory-screen']);
        }, 900);
      }
    } else {
      setWrongCardId(cardId);
      setWrongCount(prev => prev + 1);
      setFogSurge(true);
      setTimeout(() => setWrongCardId(null), 700);
      setTimeout(() => setFogSurge(false),  700);
    }

    setSelectedId(null);
  }, [correctCards, totalCards, completeScene]);

  // ─── Drag handlers ─────────────────────────────────────

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    setSelectedId(null);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const onDragEnd = () => {
    setDraggingId(null);
    setDragOverZone(null);
  };

  const onDragOver = (e: React.DragEvent, zone: Zone) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverZone(zone);
  };

  const onDrop = (e: React.DragEvent, zone: Zone) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggingId;
    if (id) handlePlacement(id, zone);
    setDraggingId(null);
    setDragOverZone(null);
  };

  // ─── Click-to-select handler ────────────────────────────

  const onCardClick = (id: string) => {
    if (selectedId === id) { setSelectedId(null); return; }
    setSelectedId(id);
  };

  const onZoneClick = (zone: Zone) => {
    if (selectedId) handlePlacement(selectedId, zone);
  };

  // ─── Render ────────────────────────────────────────────

  return (
    <div
      className={[
        styles.chamber,
        fogSurge   ? styles.surge   : '',
        phase === 'victory' ? styles.cleared : '',
      ].filter(Boolean).join(' ')}
      style={{ '--fog-opacity': `${(fogHP / 100) * 0.65 + 0.08}` } as React.CSSProperties}
    >
      {/* ── Animated fog layers ── */}
      <div className={styles.fogLayers} aria-hidden="true">
        <div className={styles.fogLayer1} />
        <div className={styles.fogLayer2} />
        <div className={styles.fogLayer3} />
        <div className={styles.fogLayer4} />
      </div>

      {/* ── Navigation bar ── */}
      <div className={styles.nav}>
        <Button variant="ghost" size="sm" onClick={() => navigateTo('world-map')}>
          ← Map
        </Button>
        <span className={styles.roomTitle}>{tr.fogNavTitle}</span>
        <span className={styles.navSpacer} />
      </div>

      {/* ── Boss HP bar (challenge phase only) ── */}
      {phase === 'challenge' && (
        <div className={styles.bossBar}>
          <span
            className={styles.bossEmoji}
            style={{ opacity: Math.max(0.1, fogHP / 100) }}
            aria-hidden="true"
          >
            🌫️
          </span>
          <div className={styles.hpBarWrap}>
            <div className={styles.hpLabel}>{tr.fogBossName}</div>
            <div
              className={styles.hpTrack}
              role="progressbar"
              aria-valuenow={fogHP}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t(tr.fogPowerRemaining, { hp: fogHP })}
            >
              <div
                className={styles.hpFill}
                style={{ width: `${fogHP}%`, background: hpBarColor(fogHP) }}
              />
            </div>
            <div className={styles.hpText}>{t(tr.fogPowerRemaining, { hp: fogHP })}</div>
          </div>
          <div className={styles.score} aria-live="polite">
            {totalCorrect}/{totalCards} ✅
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          INTRO PHASE
      ════════════════════════════════════════════ */}
      {phase === 'intro' && (
        <div className={styles.introCard}>
          <div className={styles.bossGlow} aria-hidden="true" />
          <div className={styles.introFogEmoji} aria-hidden="true">🌫️</div>
          <h1 className={styles.introTitle}>{tr.fogIntroTitle}</h1>
          <p className={styles.introSpeech}>
            {tr.fogIntroSpeech}
          </p>

          <div className={styles.introRules} role="list">
            {(Object.entries(ZONE_META) as [Zone, typeof ZONE_META.do][]).map(([zone, meta]) => {
              const zoneLabel = zone === 'do' ? tr.zoneDo : zone === 'know' ? tr.zoneKnow : tr.zoneGuide;
              const zoneDesc  = zone === 'do' ? tr.zoneDoDesc : zone === 'know' ? tr.zoneKnowDesc : tr.zoneGuideDesc;
              return (
                <div
                  key={meta.label}
                  className={styles.ruleItem}
                  style={{ borderColor: meta.color }}
                  role="listitem"
                >
                  <span aria-hidden="true">{meta.emoji}</span>
                  <div>
                    <strong style={{ color: meta.color }}>{zoneLabel}</strong>
                    {' — '}{zoneDesc}
                  </div>
                </div>
              );
            })}
          </div>

          <Button variant="primary" size="lg" onClick={() => setPhase('challenge')}>
            {tr.fogFaceBtn}
          </Button>
        </div>
      )}

      {/* ════════════════════════════════════════════
          CHALLENGE PHASE
      ════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <div className={styles.challengeArea}>

          {/* Wrong-attempt counter */}
          {wrongCount > 0 && (
            <div className={styles.wrongHint} aria-live="polite">
              {t(tr.fogWrongHint, {
                n: wrongCount,
                attempts: wrongCount === 1 ? tr.fogWrongSingular : tr.fogWrongPlural,
              })}
            </div>
          )}

          {/* Instruction */}
          <p className={styles.instruction}>
            {selectedId
              ? t(tr.fogInstructionSelected, { title: FOG_CARDS.find(c => c.id === selectedId)?.title ?? '' })
              : unplacedCards.length > 0
              ? tr.fogInstructionDrag
              : tr.fogInstructionWaiting}
          </p>

          {/* Unplaced card pool */}
          <div className={styles.cardPool}>
            <div className={styles.cardGrid} role="list">
              {unplacedCards.map(card => (
                <div
                  key={card.id}
                  className={[
                    styles.fogCard,
                    draggingId  === card.id ? styles.dragging  : '',
                    selectedId  === card.id ? styles.selected  : '',
                    wrongCardId === card.id ? styles.wrong     : '',
                    lastCorrect === card.id ? styles.correct   : '',
                  ].filter(Boolean).join(' ')}
                  draggable
                  onDragStart={e => onDragStart(e, card.id)}
                  onDragEnd={onDragEnd}
                  onClick={() => onCardClick(card.id)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onCardClick(card.id)}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${card.title}: ${card.hint}. ${selectedId === card.id ? 'Selected.' : 'Click or drag to a path.'}`}
                  aria-pressed={selectedId === card.id}
                >
                  <span className={styles.cardEmoji} aria-hidden="true">{card.emoji}</span>
                  <span className={styles.cardTitle}>{card.title}</span>
                  <span className={styles.cardHint}>{card.hint}</span>
                  <span className={styles.dragHandle} aria-hidden="true">{tr.fogDragHandle}</span>
                </div>
              ))}

              {unplacedCards.length === 0 && (
                <p className={styles.allPlaced}>{tr.fogAllPlaced}</p>
              )}
            </div>
          </div>

          {/* Drop zones */}
          <div className={styles.dropZones}>
            {(Object.entries(ZONE_META) as [Zone, typeof ZONE_META.do][]).map(([zone, meta]) => {
              const isActive = dragOverZone === zone;
              const isFull   = placedInZone(zone).length === 3;
              const isClickTarget = !!selectedId;
              const zoneLabel = zone === 'do' ? tr.zoneDo : zone === 'know' ? tr.zoneKnow : tr.zoneGuide;
              const zonePath  = zone === 'do' ? tr.zoneDoPath : zone === 'know' ? tr.zoneKnowPath : tr.zoneGuidePath;
              const zoneDesc  = zone === 'do' ? tr.zoneDoDesc : zone === 'know' ? tr.zoneKnowDesc : tr.zoneGuideDesc;

              return (
                <div
                  key={zone}
                  className={[
                    styles.dropZone,
                    isActive     ? styles.dropZoneActive     : '',
                    isFull       ? styles.dropZoneFull       : '',
                    isClickTarget ? styles.dropZoneClickable : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    '--zone-color':  meta.color,
                    '--zone-bg':     isActive ? meta.bgRgba   : 'rgba(0,0,0,0.3)',
                    '--zone-shadow': isActive ? meta.glowRgba : 'transparent',
                  } as React.CSSProperties}
                  onDragOver={e => onDragOver(e, zone)}
                  onDragLeave={() => setDragOverZone(null)}
                  onDrop={e => onDrop(e, zone)}
                  onClick={() => onZoneClick(zone)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onZoneClick(zone)}
                  role="region"
                  tabIndex={isClickTarget ? 0 : undefined}
                  aria-label={t(tr.fogZoneAria, { label: zoneLabel, desc: zoneDesc, n: placedInZone(zone).length })}
                  aria-dropeffect="move"
                >
                  {/* Zone header */}
                  <div className={styles.zoneHeader}>
                    <span className={styles.zoneEmoji} aria-hidden="true">{meta.emoji}</span>
                    <div>
                      <div className={styles.zoneLabel}>{zoneLabel}</div>
                      <div className={styles.zonePath}>{zonePath}</div>
                    </div>
                    <div className={styles.zoneCount}>
                      {placedInZone(zone).length}/3
                    </div>
                  </div>

                  <p className={styles.zoneDesc}>{zoneDesc}</p>

                  {/* Placed cards within zone */}
                  <div className={styles.zoneCards}>
                    {placedInZone(zone).map(card => (
                      <div key={card.id} className={styles.placedCard}>
                        <span aria-hidden="true">{card.emoji}</span>
                        <span className={styles.placedCardTitle}>{card.title}</span>
                        <span aria-hidden="true">✅</span>
                      </div>
                    ))}
                    {placedInZone(zone).length === 0 && (
                      <div className={styles.dropHint} aria-hidden="true">
                        {tr.fogDropHint}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          VICTORY PHASE
      ════════════════════════════════════════════ */}
      {phase === 'victory' && (
        <div className={styles.victoryCard}>
          <div className={styles.victoryParticles} aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className={styles.particle}
                style={{
                  left:  `${5 + Math.floor(i * 4.7) % 90}%`,
                  animationDelay: `${(i * 0.18) % 2.5}s`,
                  fontSize: `${0.8 + (i % 3) * 0.6}rem`,
                }}
              >
                {['✨', '⭐', '🌟', '💫'][i % 4]}
              </span>
            ))}
          </div>

          <div className={styles.victoryEmoji} aria-hidden="true">☀️</div>
          <h1 className={styles.victoryTitle}>{tr.fogVictoryTitle}</h1>
          <p className={styles.victorySpeech}>
            {tr.fogVictorySpeech}
          </p>

          <div className={styles.victoryBreakdown}>
            {(Object.entries(ZONE_META) as [Zone, typeof ZONE_META.do][]).map(([zone, meta]) => {
              const zoneLabel = zone === 'do' ? tr.zoneDo : zone === 'know' ? tr.zoneKnow : tr.zoneGuide;
              return (
                <div
                  key={zone}
                  className={styles.breakdownCard}
                  style={{ borderColor: meta.color }}
                >
                  <span aria-hidden="true">{meta.emoji}</span>
                  <div>
                    <strong style={{ color: meta.color }}>{zoneLabel}</strong>
                    <div className={styles.breakdownItems}>
                      {FOG_CARDS.filter(c => c.correctZone === zone).map(c => (
                        <span key={c.id}>{c.emoji} {c.title}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.victoryStats}>
            <span>{tr.fogXpEarned}</span>
            <span>{tr.fogBadge}</span>
            {wrongCount > 0 && (
              <span>❌ {wrongCount} {wrongCount === 1 ? tr.fogWrongSingular : tr.fogWrongPlural}</span>
            )}
            {wrongCount === 0 && <span>{tr.fogPerfectRun}</span>}
          </div>

          <div className={styles.victoryActions}>
            <Button variant="primary" size="lg" onClick={() => navigateTo('victory-screen')}>
              {tr.fogVictoryBtn}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigateTo('world-map')}>
              {tr.fogBackToMap}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
