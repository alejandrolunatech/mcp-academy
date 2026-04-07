import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  GameState,
  Language,
  PlayerProgress,
  SceneId,
  BadgeId,
  Hotspot,
} from '../types/game';

// ─── Initial State ────────────────────────────

const INITIAL_PROGRESS: PlayerProgress = {
  xpStars: 0,
  badges: [],
  completedScenes: [],
  unlockedScenes: ['world-map', 'great-entrance-hall'],
  currentScene: 'world-map',
  playerName: 'Apprentice',
  language: 'en',
};

const INITIAL_STATE: GameState = {
  progress: INITIAL_PROGRESS,
  isDialogueOpen: false,
  activeDialogueIndex: 0,
  activeSceneId: 'world-map',
  hotspotModalOpen: false,
  activeHotspot: null,
};

const STORAGE_KEY = 'mcp-academy-save';

// ─── Actions ──────────────────────────────────

type Action =
  | { type: 'NAVIGATE_TO'; sceneId: SceneId }
  | { type: 'OPEN_DIALOGUE' }
  | { type: 'CLOSE_DIALOGUE' }
  | { type: 'NEXT_DIALOGUE' }
  | { type: 'PREV_DIALOGUE' }
  | { type: 'SET_DIALOGUE_INDEX'; index: number }
  | { type: 'OPEN_HOTSPOT'; hotspot: Hotspot }
  | { type: 'CLOSE_HOTSPOT' }
  | { type: 'COMPLETE_SCENE'; sceneId: SceneId; xpReward: number; badge?: BadgeId; unlocks?: SceneId[] }
  | { type: 'AWARD_XP'; amount: number }
  | { type: 'SET_PLAYER_NAME'; name: string }
  | { type: 'SET_LANGUAGE'; language: Language }
  | { type: 'LOAD_SAVE'; progress: PlayerProgress }
  | { type: 'RESET_GAME' };

// ─── Reducer ──────────────────────────────────

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'NAVIGATE_TO':
      return {
        ...state,
        activeSceneId: action.sceneId,
        progress: { ...state.progress, currentScene: action.sceneId },
        isDialogueOpen: false,
        activeDialogueIndex: 0,
        hotspotModalOpen: false,
        activeHotspot: null,
      };

    case 'OPEN_DIALOGUE':
      return { ...state, isDialogueOpen: true, activeDialogueIndex: 0 };

    case 'CLOSE_DIALOGUE':
      return { ...state, isDialogueOpen: false, activeDialogueIndex: 0 };

    case 'NEXT_DIALOGUE':
      return { ...state, activeDialogueIndex: state.activeDialogueIndex + 1 };

    case 'PREV_DIALOGUE':
      return {
        ...state,
        activeDialogueIndex: Math.max(0, state.activeDialogueIndex - 1),
      };

    case 'SET_DIALOGUE_INDEX':
      return { ...state, activeDialogueIndex: action.index };

    case 'OPEN_HOTSPOT':
      return {
        ...state,
        hotspotModalOpen: true,
        activeHotspot: action.hotspot,
      };

    case 'CLOSE_HOTSPOT':
      return { ...state, hotspotModalOpen: false, activeHotspot: null };

    case 'COMPLETE_SCENE': {
      const alreadyCompleted = state.progress.completedScenes.includes(action.sceneId);
      const newCompleted = alreadyCompleted
        ? state.progress.completedScenes
        : [...state.progress.completedScenes, action.sceneId];

      const newBadges =
        action.badge && !state.progress.badges.includes(action.badge)
          ? [...state.progress.badges, action.badge]
          : state.progress.badges;

      const newUnlocked = action.unlocks
        ? Array.from(new Set([...state.progress.unlockedScenes, ...action.unlocks]))
        : state.progress.unlockedScenes;

      const newXp = alreadyCompleted
        ? state.progress.xpStars
        : state.progress.xpStars + action.xpReward;

      return {
        ...state,
        progress: {
          ...state.progress,
          completedScenes: newCompleted,
          badges: newBadges,
          unlockedScenes: newUnlocked,
          xpStars: newXp,
        },
      };
    }

    case 'AWARD_XP':
      return {
        ...state,
        progress: {
          ...state.progress,
          xpStars: state.progress.xpStars + action.amount,
        },
      };

    case 'SET_PLAYER_NAME':
      return {
        ...state,
        progress: { ...state.progress, playerName: action.name },
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        progress: { ...state.progress, language: action.language },
      };

    case 'LOAD_SAVE':
      return {
        ...INITIAL_STATE,
        progress: {
          ...INITIAL_PROGRESS,
          ...action.progress,
          // Ensure legacy saves without language field default to 'en'
          language: action.progress.language ?? 'en',
        },
        activeSceneId: action.progress.currentScene,
      };

    case 'RESET_GAME':
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────

interface GameContextValue {
  state: GameState;
  navigateTo: (sceneId: SceneId) => void;
  openDialogue: () => void;
  closeDialogue: () => void;
  nextDialogue: () => void;
  prevDialogue: () => void;
  setDialogueIndex: (index: number) => void;
  openHotspot: (hotspot: Hotspot) => void;
  closeHotspot: () => void;
  completeScene: (
    sceneId: SceneId,
    xpReward: number,
    badge?: BadgeId,
    unlocks?: SceneId[]
  ) => void;
  awardXP: (amount: number) => void;
  setPlayerName: (name: string) => void;
  setLanguage: (language: Language) => void;
  resetGame: () => void;
  isSceneUnlocked: (sceneId: SceneId) => boolean;
  isSceneCompleted: (sceneId: SceneId) => boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

// ─── Provider ─────────────────────────────────

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: PlayerProgress = JSON.parse(saved);
        return {
          ...init,
          progress: parsed,
          activeSceneId: parsed.currentScene,
        };
      }
    } catch {
      // ignore corrupt save
    }
    return init;
  });

  // Persist progress whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
    } catch {
      // ignore storage errors
    }
  }, [state.progress]);

  const navigateTo = useCallback((sceneId: SceneId) => {
    dispatch({ type: 'NAVIGATE_TO', sceneId });
  }, []);

  const openDialogue = useCallback(() => dispatch({ type: 'OPEN_DIALOGUE' }), []);
  const closeDialogue = useCallback(() => dispatch({ type: 'CLOSE_DIALOGUE' }), []);
  const nextDialogue = useCallback(() => dispatch({ type: 'NEXT_DIALOGUE' }), []);
  const prevDialogue = useCallback(() => dispatch({ type: 'PREV_DIALOGUE' }), []);
  const setDialogueIndex = useCallback(
    (index: number) => dispatch({ type: 'SET_DIALOGUE_INDEX', index }),
    []
  );

  const openHotspot = useCallback(
    (hotspot: Hotspot) => dispatch({ type: 'OPEN_HOTSPOT', hotspot }),
    []
  );
  const closeHotspot = useCallback(() => dispatch({ type: 'CLOSE_HOTSPOT' }), []);

  const completeScene = useCallback(
    (sceneId: SceneId, xpReward: number, badge?: BadgeId, unlocks?: SceneId[]) => {
      dispatch({ type: 'COMPLETE_SCENE', sceneId, xpReward, badge, unlocks });
    },
    []
  );

  const awardXP = useCallback(
    (amount: number) => dispatch({ type: 'AWARD_XP', amount }),
    []
  );

  const setPlayerName = useCallback(
    (name: string) => dispatch({ type: 'SET_PLAYER_NAME', name }),
    []
  );

  const setLanguage = useCallback(
    (language: Language) => dispatch({ type: 'SET_LANGUAGE', language }),
    []
  );

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const isSceneUnlocked = useCallback(
    (sceneId: SceneId) => state.progress.unlockedScenes.includes(sceneId),
    [state.progress.unlockedScenes]
  );

  const isSceneCompleted = useCallback(
    (sceneId: SceneId) => state.progress.completedScenes.includes(sceneId),
    [state.progress.completedScenes]
  );

  return (
    <GameContext.Provider
      value={{
        state,
        navigateTo,
        openDialogue,
        closeDialogue,
        nextDialogue,
        prevDialogue,
        setDialogueIndex,
        openHotspot,
        closeHotspot,
        completeScene,
        awardXP,
        setPlayerName,
        setLanguage,
        resetGame,
        isSceneUnlocked,
        isSceneCompleted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
