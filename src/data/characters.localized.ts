// ─────────────────────────────────────────────
// Localized character names & roles
// ─────────────────────────────────────────────

import type { Language, Character } from '../types/game';
import { CHARACTERS } from './characters';

type LocaleText = Record<Language, string>;

interface LocalizedCharacterContent {
  name: LocaleText;
  role: LocaleText;
}

const LOCALIZED_CHARACTERS: Record<string, LocalizedCharacterContent> = {
  headmasterContext: {
    name: {
      en: 'Headmaster Context',
      es: 'Director Context',
      nl: 'Rector Context',
    },
    role: {
      en: 'Academy Headmaster',
      es: 'Director de la Academia',
      nl: 'Rector van de Academie',
    },
  },
  tikaFox: {
    name: { en: 'Tika', es: 'Tika', nl: 'Tika' },
    role: {
      en: 'Artifact Fox · Toolcraft',
      es: 'Zorra Artesana · Artesanía',
      nl: 'Artefactenvos · Gereedschapskunde',
    },
  },
  loraOwl: {
    name: { en: 'Lora', es: 'Lora', nl: 'Lora' },
    role: {
      en: 'Library Owl · Lorekeeping',
      es: 'Lechuza de la Biblioteca · Custodio del Saber',
      nl: 'Bibliotheekuil · Kennisbewaarder',
    },
  },
  pikoBird: {
    name: { en: 'Piko', es: 'Piko', nl: 'Piko' },
    role: {
      en: 'Spellbird · Spellguidance',
      es: 'Pájaro Hechicero · Magia de Guía',
      nl: 'Tovertoverling · Toverleiding',
    },
  },
  fogOfConfusion: {
    name: {
      en: 'The Fog of Confusion',
      es: 'La Niebla de la Confusión',
      nl: 'De Mist van Verwarring',
    },
    role: {
      en: 'Final Boss',
      es: 'Jefe Final',
      nl: 'Eindbaas',
    },
  },
};

/** Return a Character with name/role translated to the given language. */
export function getLocalizedCharacter(id: string, lang: Language): Character {
  const base = CHARACTERS[id];
  const loc = LOCALIZED_CHARACTERS[id];
  if (!loc) return base;
  return {
    ...base,
    name: loc.name[lang] ?? loc.name['en'],
    role: loc.role[lang] ?? loc.role['en'],
  };
}

/** Localized version of the full CHARACTERS map. */
export function CHARACTERS_LOCALIZED(lang: Language): Record<string, Character> {
  return Object.fromEntries(
    Object.keys(CHARACTERS).map((id) => [id, getLocalizedCharacter(id, lang)])
  );
}
