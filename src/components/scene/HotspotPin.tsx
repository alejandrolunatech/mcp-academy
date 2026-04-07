import type { Hotspot } from '../../types/game';
import styles from './HotspotPin.module.css';

interface Props {
  hotspot: Hotspot;
  onClick: (hotspot: Hotspot) => void;
  seen?: boolean;
}

export function HotspotPin({ hotspot, onClick, seen = false }: Props) {
  return (
    <button
      className={[styles.pin, seen ? styles.pinSeen : ''].filter(Boolean).join(' ')}
      style={{
        top: hotspot.position.top,
        left: hotspot.position.left,
      }}
      onClick={() => onClick(hotspot)}
      aria-label={`Inspect: ${hotspot.label}${seen ? ' (already seen)' : ''}`}
      title={hotspot.label}
    >
      <span className={styles.emoji} role="img" aria-hidden="true">
        {hotspot.emoji}
      </span>
      <span className={styles.label}>{hotspot.label}</span>
      {seen && <span className={styles.seenCheck} aria-hidden="true">✅</span>}
      {!seen && <span className={styles.ring} aria-hidden="true" />}
    </button>
  );
}
