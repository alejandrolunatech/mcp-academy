import type { Translations } from './types';

export const en: Translations = {
  // ── Navigation / common ─────────────────────
  backToMap: '← Back to Map',
  returnToMap: '🗺️ Return to Map',
  resetGame: '🔄',
  roomsCompleted: '{n} / {total} rooms completed',

  // ── WorldMap ─────────────────────────────────
  worldMapTitle: 'MCP Academy',
  worldMapWelcome: 'Welcome, {name}! Choose a room to enter.',
  xpLabel: '{n} XP',
  badgesLabel: '{n} badges',
  lockedLabel: 'Locked',
  legendDo: '⚒️ Toolcraft — DO',
  legendKnow: '📚 Lorekeeping — KNOW',
  legendGuide: '✨ Spellguidance — GUIDE',
  langSwitcherLabel: 'Language',

  // ── SceneRenderer ────────────────────────────
  completedBadge: '✅ Completed',
  talkBtn: '💬 Talk',
  talkAgainBtn: '💬 Talk again',
  inspectItems: 'Inspect glowing items',
  talkTo: 'Talk to {name}',
  inspectItemsProgress: 'Inspect glowing items ({seen}/{total})',
  completeRoom: '✅ Complete Room (+{xp} ⭐)',
  exploreFirst: '🔎 Explore the room first…',
  roomCompleteBanner: 'Room Complete! +{xp} ⭐',
  newRoomsUnlocked: 'New rooms unlocked on the map!',
  mapBtn: '🗺️ Map',

  // ── DialogueBox ──────────────────────────────
  dialogueBack: '◀ Back',
  dialogueNext: 'Next ▶',
  dialogueClose: 'Close ✓',

  // ── HotspotModal ─────────────────────────────
  gotIt: 'Got it! ✓',

  // ── VictoryScreen ────────────────────────────
  victoryCongrats: 'Congratulations, {name}!',
  victorySubtitle: 'You have mastered the Three Magic Paths and restored balance to MCP Academy!',
  yourBadges: 'Your Badges',
  playAgain: '🔄 Play Again',
  lessonTools: 'Tools DO things',
  lessonResources: 'Resources KNOW things',
  lessonPrompts: 'Prompts GUIDE things',

  // ── FogChamberScene ──────────────────────────
  fogNavTitle: '🌫️ Fog Chamber',
  fogBossName: 'The Fog of Confusion',
  fogPowerRemaining: '{hp}% power remaining',
  fogIntroTitle: 'The Fog of Confusion',
  fogIntroSpeech:
    '"So… you claim to know the Three Magic Paths? Ha! I have scrambled 9 magical items throughout this chamber. Sort each one into its correct path — if you dare. Mix them up and I grow stronger!"',
  fogFaceBtn: '⚔️ Face the Fog!',
  fogWrongHint: '❌ {n} wrong {attempts} — keep going!',
  fogWrongSingular: 'attempt',
  fogWrongPlural: 'attempts',
  fogInstructionSelected: '✋ "{title}" selected — click a path below to place it',
  fogInstructionDrag: '🌫️ Drag each item to its correct path — or click to select then click a zone',
  fogInstructionWaiting: '⏳ Waiting for the fog to respond…',
  fogDropHint: 'Drop here',
  fogAllPlaced: '⏳ All placed — calculating…',
  fogVictoryTitle: 'Fog Defeated!',
  fogVictorySpeech:
    'The Fog of Confusion dissolves into nothing! You sorted all three paths perfectly and restored balance to MCP Academy!',
  fogXpEarned: '⭐ +50 XP earned',
  fogBadge: '🏅 Fog Slayer badge!',
  fogPerfectRun: '🎯 Perfect run!',
  fogVictoryBtn: '🏆 Victory Screen!',
  fogBackToMap: '← Back to Map',
  fogDragHandle: '⠿ drag or click',
  fogZoneAria: '{label} zone — {desc}. {n} of 3 placed.',

  // ── Zone labels ──────────────────────────────
  zoneDo: 'DO',
  zoneKnow: 'KNOW',
  zoneGuide: 'GUIDE',
  zoneDoPath: 'Toolcraft',
  zoneKnowPath: 'Lorekeeping',
  zoneGuidePath: 'Spellguidance',
  zoneDoDesc: 'Takes action & produces results',
  zoneKnowDesc: 'Stores & provides information',
  zoneGuideDesc: 'Shapes behaviour & tone',
};
