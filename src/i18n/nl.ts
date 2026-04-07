import type { Translations } from './types';

export const nl: Translations = {
  // ── Navigation / common ─────────────────────
  backToMap: '← Terug naar Kaart',
  returnToMap: '🗺️ Terug naar Kaart',
  resetGame: '🔄',
  roomsCompleted: '{n} / {total} kamers voltooid',

  // ── WorldMap ─────────────────────────────────
  worldMapTitle: 'MCP Academie',
  worldMapWelcome: 'Welkom, {name}! Kies een kamer om in te gaan.',
  xpLabel: '{n} XP',
  badgesLabel: '{n} badges',
  lockedLabel: 'Vergrendeld',
  legendDo: '⚒️ Gereedschapskunde — DOET',
  legendKnow: '📚 Kennisbewaarder — WEET',
  legendGuide: '✨ Toverleiding — LEIDT',
  langSwitcherLabel: 'Taal',

  // ── SceneRenderer ────────────────────────────
  completedBadge: '✅ Voltooid',
  talkBtn: '💬 Praten',
  talkAgainBtn: '💬 Opnieuw praten',
  inspectItems: 'Gloeiende voorwerpen inspecteren',
  talkTo: 'Praat met {name}',
  inspectItemsProgress: 'Gloeiende voorwerpen inspecteren ({seen}/{total})',
  completeRoom: '✅ Kamer Voltooien (+{xp} ⭐)',
  exploreFirst: '🔎 Verken de kamer eerst…',
  roomCompleteBanner: 'Kamer Voltooid! +{xp} ⭐',
  newRoomsUnlocked: 'Nieuwe kamers ontgrendeld op de kaart!',
  mapBtn: '🗺️ Kaart',

  // ── DialogueBox ──────────────────────────────
  dialogueBack: '◀ Terug',
  dialogueNext: 'Volgende ▶',
  dialogueClose: 'Sluiten ✓',

  // ── HotspotModal ─────────────────────────────
  gotIt: 'Begrepen! ✓',

  // ── VictoryScreen ────────────────────────────
  victoryCongrats: 'Gefeliciteerd, {name}!',
  victorySubtitle: 'Je hebt de Drie Magische Paden beheerst en het evenwicht in de MCP Academie hersteld!',
  yourBadges: 'Jouw Badges',
  playAgain: '🔄 Opnieuw Spelen',
  lessonTools: 'Gereedschappen DOEN dingen',
  lessonResources: 'Bronnen WETEN dingen',
  lessonPrompts: 'Prompts LEIDEN dingen',

  // ── FogChamberScene ──────────────────────────
  fogNavTitle: '🌫️ Mistkaamer',
  fogBossName: 'De Mist van Verwarring',
  fogPowerRemaining: '{hp}% kracht over',
  fogIntroTitle: 'De Mist van Verwarring',
  fogIntroSpeech:
    '"Dus… jij beweert de Drie Magische Paden te kennen? Ha! Ik heb 9 magische voorwerpen door deze kamer verspreid. Sorteer ze op het juiste pad — als je durft. Maak fouten en ik word sterker!"',
  fogFaceBtn: '⚔️ Bevecht de Mist!',
  fogWrongHint: '❌ {n} {attempts} fout — ga door!',
  fogWrongSingular: 'poging',
  fogWrongPlural: 'pogingen',
  fogInstructionSelected: '✋ "{title}" geselecteerd — klik op een pad om het te plaatsen',
  fogInstructionDrag: '🌫️ Sleep elk voorwerp naar het juiste pad — of klik om te selecteren en klik dan op een zone',
  fogInstructionWaiting: '⏳ Wachten tot de mist reageert…',
  fogDropHint: 'Hier neerzetten',
  fogAllPlaced: '⏳ Alles geplaatst — berekenen…',
  fogVictoryTitle: 'Mist Verslagen!',
  fogVictorySpeech:
    'De Mist van Verwarring lost op in het niets! Je hebt alle drie de paden perfect gesorteerd en het evenwicht in de MCP Academie hersteld!',
  fogXpEarned: '⭐ +50 XP verdiend',
  fogBadge: '🏅 Mistoverslagener badge!',
  fogPerfectRun: '🎯 Perfecte ronde!',
  fogVictoryBtn: '🏆 Overwinningsscherm!',
  fogBackToMap: '← Terug naar Kaart',
  fogDragHandle: '⠿ slepen of klikken',
  fogZoneAria: '{label} zone — {desc}. {n} van 3 geplaatst.',

  // ── Zone labels ──────────────────────────────
  zoneDo: 'DOET',
  zoneKnow: 'WEET',
  zoneGuide: 'LEIDT',
  zoneDoPath: 'Gereedschapskunde',
  zoneKnowPath: 'Kennisbewaarder',
  zoneGuidePath: 'Toverleiding',
  zoneDoDesc: 'Voert acties uit en produceert resultaten',
  zoneKnowDesc: 'Slaat informatie op en verstrekt deze',
  zoneGuideDesc: 'Bepaalt gedrag en toon',
};
