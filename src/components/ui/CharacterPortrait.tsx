import type { Character } from '../../types/game';
import styles from './CharacterPortrait.module.css';

interface Props {
  character: Character;
  size?: 'sm' | 'md' | 'lg';
  speaking?: boolean;
}

const PATH_COLORS: Record<string, string> = {
  toolcraft: '#c0392b',
  lorekeeping: '#2980b9',
  spellguidance: '#d4a017',
};

export function CharacterPortrait({ character, size = 'md', speaking = false }: Props) {
  const borderColor = character.path ? PATH_COLORS[character.path] : '#6b2fa0';

  return (
    <div
      className={[styles.portrait, styles[size], speaking ? styles.speaking : '']
        .filter(Boolean)
        .join(' ')}
      style={{ '--border-color-char': borderColor } as React.CSSProperties}
      title={`${character.name} — ${character.role}`}
      aria-label={character.name}
    >
      <span className={styles.emoji} role="img" aria-hidden="true">
        {character.portrait}
      </span>
      {speaking && <div className={styles.speakingDot} aria-hidden="true" />}
    </div>
  );
}
