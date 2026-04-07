// ─────────────────────────────────────────────
// Core game types for MCP Academy
// ─────────────────────────────────────────────

export type Language = 'en' | 'es' | 'nl';

export type SceneId =
  | 'world-map'
  | 'great-entrance-hall'
  | 'artifact-hall'
  | 'grand-library'
  | 'spell-tower'
  | 'hall-of-mirrors'
  | 'rune-console-chamber'
  | 'fog-chamber'
  | 'victory-screen';

export type MagicPath = 'toolcraft' | 'lorekeeping' | 'spellguidance';

export type BadgeId =
  | 'badge-tools'
  | 'badge-resources'
  | 'badge-prompts'
  | 'badge-comparison'
  | 'badge-rune'
  | 'badge-fog-defeated';

// ─── Characters ───────────────────────────────

export interface Character {
  id: string;
  name: string;
  role: string;
  /** Emoji or image path used as the portrait */
  portrait: string;
  path?: MagicPath;
}

// ─── Hotspots ─────────────────────────────────

export interface Hotspot {
  id: string;
  label: string;
  emoji: string;
  title: string;
  description: string;
  position: { top: string; left: string };
}

// ─── Dialogue ─────────────────────────────────

export interface DialogueLine {
  characterId: string;
  text: string;
  /** Optional branching choices at this line */
  choices?: DialogueChoice[];
}

export interface DialogueChoice {
  text: string;
  /** Index of the dialogue line to jump to, or null to end dialogue */
  nextIndex: number | null;
  isCorrect?: boolean;
}

// ─── Scene ────────────────────────────────────

export interface Scene {
  id: SceneId;
  title: string;
  subtitle: string;
  emoji: string;
  /** Background gradient or colour keyword */
  background: string;
  /** Characters present in this scene */
  characters: Character[];
  /** Clickable hotspots in the scene */
  hotspots: Hotspot[];
  /** Opening dialogue sequence */
  dialogue: DialogueLine[];
  /** Magic path this room teaches */
  path?: MagicPath;
  /** Which badge is awarded upon completion */
  badge?: BadgeId;
  /** Rooms unlocked after completing this scene */
  unlocksScenes?: SceneId[];
}

// ─── Player Progress ──────────────────────────

export interface PlayerProgress {
  xpStars: number;
  badges: BadgeId[];
  completedScenes: SceneId[];
  unlockedScenes: SceneId[];
  currentScene: SceneId;
  playerName: string;
  language: Language;
}

// ─── Game State ───────────────────────────────

export interface GameState {
  progress: PlayerProgress;
  isDialogueOpen: boolean;
  activeDialogueIndex: number;
  activeSceneId: SceneId;
  hotspotModalOpen: boolean;
  activeHotspot: Hotspot | null;
}
