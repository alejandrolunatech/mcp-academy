import type { Character } from '../types/game';

export const CHARACTERS: Record<string, Character> = {
  headmasterContext: {
    id: 'headmasterContext',
    name: 'Headmaster Context',
    role: 'Academy Headmaster',
    portrait: '🧙',
  },
  tikaFox: {
    id: 'tikaFox',
    name: 'Tika',
    role: 'Artifact Fox · Toolcraft',
    portrait: '🦊',
    path: 'toolcraft',
  },
  loraOwl: {
    id: 'loraOwl',
    name: 'Lora',
    role: 'Library Owl · Lorekeeping',
    portrait: '🦉',
    path: 'lorekeeping',
  },
  pikoBird: {
    id: 'pikoBird',
    name: 'Piko',
    role: 'Spellbird · Spellguidance',
    portrait: '🐦',
    path: 'spellguidance',
  },
  fogOfConfusion: {
    id: 'fogOfConfusion',
    name: 'The Fog of Confusion',
    role: 'Final Boss',
    portrait: '🌫️',
  },
};
