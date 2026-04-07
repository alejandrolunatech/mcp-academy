import type { Translations } from './types';

export const es: Translations = {
  // ── Navigation / common ─────────────────────
  backToMap: '← Volver al Mapa',
  returnToMap: '🗺️ Volver al Mapa',
  resetGame: '🔄',
  roomsCompleted: '{n} / {total} salas completadas',

  // ── WorldMap ─────────────────────────────────
  worldMapTitle: 'Academia MCP',
  worldMapWelcome: '¡Bienvenido, {name}! Elige una sala para entrar.',
  xpLabel: '{n} XP',
  badgesLabel: '{n} medallas',
  lockedLabel: 'Bloqueado',
  legendDo: '⚒️ Artesanía — HACE',
  legendKnow: '📚 Custodio del Saber — SABE',
  legendGuide: '✨ Magia de Guía — GUÍA',
  langSwitcherLabel: 'Idioma',

  // ── SceneRenderer ────────────────────────────
  completedBadge: '✅ Completado',
  talkBtn: '💬 Hablar',
  talkAgainBtn: '💬 Hablar de nuevo',
  inspectItems: 'Inspeccionar objetos brillantes',
  talkTo: 'Hablar con {name}',
  inspectItemsProgress: 'Inspeccionar objetos brillantes ({seen}/{total})',
  completeRoom: '✅ Completar Sala (+{xp} ⭐)',
  exploreFirst: '🔎 ¡Explora la sala primero…',
  roomCompleteBanner: '¡Sala Completada! +{xp} ⭐',
  newRoomsUnlocked: '¡Nuevas salas desbloqueadas en el mapa!',
  mapBtn: '🗺️ Mapa',

  // ── DialogueBox ──────────────────────────────
  dialogueBack: '◀ Atrás',
  dialogueNext: 'Siguiente ▶',
  dialogueClose: 'Cerrar ✓',

  // ── HotspotModal ─────────────────────────────
  gotIt: '¡Entendido! ✓',

  // ── VictoryScreen ────────────────────────────
  victoryCongrats: '¡Felicidades, {name}!',
  victorySubtitle: '¡Has dominado los Tres Caminos Mágicos y restaurado el equilibrio en la Academia MCP!',
  yourBadges: 'Tus Medallas',
  playAgain: '🔄 Jugar de nuevo',
  lessonTools: 'Las Herramientas HACEN cosas',
  lessonResources: 'Los Recursos SABEN cosas',
  lessonPrompts: 'Los Prompts GUÍAN cosas',

  // ── FogChamberScene ──────────────────────────
  fogNavTitle: '🌫️ Cámara de la Niebla',
  fogBossName: 'La Niebla de la Confusión',
  fogPowerRemaining: '{hp}% de poder restante',
  fogIntroTitle: 'La Niebla de la Confusión',
  fogIntroSpeech:
    '"¿Así que dices conocer los Tres Caminos Mágicos? ¡Ja! He mezclado 9 objetos mágicos por esta cámara. Coloca cada uno en su camino correcto… si te atreves. ¡Si los confundes, me hago más fuerte!"',
  fogFaceBtn: '⚔️ ¡Enfrentar a la Niebla!',
  fogWrongHint: '❌ {n} {attempts} equivocado(s) — ¡sigue adelante!',
  fogWrongSingular: 'intento',
  fogWrongPlural: 'intentos',
  fogInstructionSelected: '✋ "{title}" seleccionado — haz clic en un camino para colocarlo',
  fogInstructionDrag: '🌫️ Arrastra cada objeto a su camino correcto — o haz clic para seleccionar y luego clic en una zona',
  fogInstructionWaiting: '⏳ Esperando que la niebla responda…',
  fogDropHint: 'Soltar aquí',
  fogAllPlaced: '⏳ Todos colocados — calculando…',
  fogVictoryTitle: '¡Niebla Derrotada!',
  fogVictorySpeech:
    '¡La Niebla de la Confusión se disuelve en la nada! ¡Ordenaste los tres caminos perfectamente y restauraste el equilibrio en la Academia MCP!',
  fogXpEarned: '⭐ +50 XP ganados',
  fogBadge: '🏅 ¡Medalla Cazador de Niebla!',
  fogPerfectRun: '🎯 ¡Sin errores!',
  fogVictoryBtn: '🏆 ¡Pantalla de Victoria!',
  fogBackToMap: '← Volver al Mapa',
  fogDragHandle: '⠿ arrastra o haz clic',
  fogZoneAria: 'Zona {label} — {desc}. {n} de 3 colocados.',

  // ── Zone labels ──────────────────────────────
  zoneDo: 'HACE',
  zoneKnow: 'SABE',
  zoneGuide: 'GUÍA',
  zoneDoPath: 'Artesanía',
  zoneKnowPath: 'Custodio del Saber',
  zoneGuidePath: 'Magia de Guía',
  zoneDoDesc: 'Realiza acciones y produce resultados',
  zoneKnowDesc: 'Almacena y provee información',
  zoneGuideDesc: 'Da forma al comportamiento y el tono',
};
