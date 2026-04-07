// ─────────────────────────────────────────────
// i18n index — hook + helpers
// ─────────────────────────────────────────────

import { useGame } from '../context/GameContext';
import type { Language } from '../types/game';
import type { Translations } from './types';
import { en } from './en';
import { es } from './es';
import { nl } from './nl';

export type { Language };
export type { Translations };

export const TRANSLATIONS: Record<Language, Translations> = { en, es, nl };

/** Retrieve the translation object for a given language. */
export function getTranslations(lang: Language): Translations {
  return TRANSLATIONS[lang] ?? en;
}

/**
 * React hook — returns the translation object for the active game language.
 * Also exposes a small `t()` interpolation helper.
 *
 * Usage:
 *   const { tr, t } = useTranslation();
 *   t(tr.worldMapWelcome, { name: 'Alice' })  →  "Welcome, Alice! Choose a room to enter."
 */
export function useTranslation() {
  const { state } = useGame();
  const lang: Language = state.progress.language ?? 'en';
  const tr = getTranslations(lang);

  /**
   * Interpolate `{key}` placeholders inside a translation string.
   * e.g. t(tr.roomsCompleted, { n: 3, total: 8 }) → "3 / 8 rooms completed"
   */
  function t(template: string, vars?: Record<string, string | number>): string {
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, (_, key) =>
      vars[key] !== undefined ? String(vars[key]) : `{${key}}`
    );
  }

  return { tr, t, lang };
}
