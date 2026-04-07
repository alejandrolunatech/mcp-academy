import type { Hotspot } from '../../types/game';
import { Button } from './Button';
import { useTranslation } from '../../i18n';
import styles from './HotspotModal.module.css';

interface Props {
  hotspot: Hotspot;
  onClose: () => void;
}

export function HotspotModal({ hotspot, onClose }: Props) {
  const { tr } = useTranslation();
  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={hotspot.title}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.emojiWrapper} aria-hidden="true">
          {hotspot.emoji}
        </div>
        <h2 className={styles.title}>{hotspot.title}</h2>
        <p className={styles.description}>{hotspot.description}</p>
        <Button onClick={onClose} size="md">
          {tr.gotIt}
        </Button>
      </div>
    </div>
  );
}
