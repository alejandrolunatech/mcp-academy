import type { BadgeId } from '../../types/game';
import styles from './Badge.module.css';

const BADGE_META: Record<BadgeId, { emoji: string; label: string; color: string }> = {
  'badge-tools': { emoji: '⚒️', label: 'Toolcrafter', color: '#c0392b' },
  'badge-resources': { emoji: '📚', label: 'Lorekeeper', color: '#2980b9' },
  'badge-prompts': { emoji: '✨', label: 'Spellguide', color: '#d4a017' },
  'badge-comparison': { emoji: '🪞', label: 'Mirror Master', color: '#8e44ad' },
  'badge-rune': { emoji: '💻', label: 'Rune Coder', color: '#27ae60' },
  'badge-fog-defeated': { emoji: '🏆', label: 'Fog Slayer', color: '#f39c12' },
};

interface Props {
  id: BadgeId;
  earned?: boolean;
  size?: 'sm' | 'md';
}

export function Badge({ id, earned = true, size = 'md' }: Props) {
  const meta = BADGE_META[id];
  return (
    <div
      className={[styles.badge, styles[size], !earned ? styles.locked : '']
        .filter(Boolean)
        .join(' ')}
      style={{ '--badge-color': meta.color } as React.CSSProperties}
      title={earned ? meta.label : `${meta.label} (locked)`}
      aria-label={earned ? meta.label : `${meta.label} — not yet earned`}
    >
      <span className={styles.emoji} role="img" aria-hidden="true">
        {earned ? meta.emoji : '🔒'}
      </span>
      {size === 'md' && (
        <span className={styles.label}>{earned ? meta.label : '???'}</span>
      )}
    </div>
  );
}
