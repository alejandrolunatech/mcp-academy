// ─────────────────────────────────────────────
// Translations interface — all UI string keys
// ─────────────────────────────────────────────

export interface Translations {
  // ── Navigation / common ─────────────────────
  backToMap: string;
  returnToMap: string;
  resetGame: string;
  roomsCompleted: string; // "{n} / {total} rooms completed"

  // ── WorldMap ─────────────────────────────────
  worldMapTitle: string;
  worldMapWelcome: string; // "Welcome, {name}! Choose a room to enter."
  xpLabel: string;
  badgesLabel: string;
  lockedLabel: string;
  legendDo: string;
  legendKnow: string;
  legendGuide: string;
  langSwitcherLabel: string;

  // ── SceneRenderer ────────────────────────────
  completedBadge: string;
  talkBtn: string;
  talkAgainBtn: string;
  inspectItems: string;
  talkTo: string; // "Talk to {name}"
  inspectItemsProgress: string; // "Inspect glowing items ({seen}/{total})"
  completeRoom: string; // "Complete Room (+{xp} ⭐)"
  exploreFirst: string;
  roomCompleteBanner: string; // "Room Complete! +{xp} ⭐"
  newRoomsUnlocked: string;
  mapBtn: string;

  // ── DialogueBox ──────────────────────────────
  dialogueBack: string;
  dialogueNext: string;
  dialogueClose: string;

  // ── HotspotModal ─────────────────────────────
  gotIt: string;

  // ── VictoryScreen ────────────────────────────
  victoryCongrats: string; // "Congratulations, {name}!"
  victorySubtitle: string;
  yourBadges: string;
  playAgain: string;
  lessonTools: string;
  lessonResources: string;
  lessonPrompts: string;

  // ── FogChamberScene ──────────────────────────
  fogNavTitle: string;
  fogBossName: string;
  fogPowerRemaining: string; // "{hp}% power remaining"
  fogIntroTitle: string;
  fogIntroSpeech: string;
  fogFaceBtn: string;
  fogWrongHint: string; // "❌ {n} wrong attempt(s) — keep going!"
  fogWrongSingular: string;
  fogWrongPlural: string;
  fogInstructionSelected: string; // '"{title}" selected — click a path below to place it'
  fogInstructionDrag: string;
  fogInstructionWaiting: string;
  fogDropHint: string;
  fogAllPlaced: string;
  fogVictoryTitle: string;
  fogVictorySpeech: string;
  fogXpEarned: string;
  fogBadge: string;
  fogPerfectRun: string;
  fogVictoryBtn: string;
  fogBackToMap: string;
  fogDragHandle: string;
  fogZoneAria: string; // "{label} zone — {desc}. {n} of 3 placed."

  // ── Zone labels (FogChamber & SceneRenderer) ─
  zoneDo: string;
  zoneKnow: string;
  zoneGuide: string;
  zoneDoPath: string;
  zoneKnowPath: string;
  zoneGuidePath: string;
  zoneDoDesc: string;
  zoneKnowDesc: string;
  zoneGuideDesc: string;
}
