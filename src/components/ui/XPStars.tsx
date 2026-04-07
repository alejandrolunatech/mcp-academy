import styles from './XPStars.module.css';

interface Props {
  count: number;
}

export function XPStars({ count }: Props) {
  return (
    <div className={styles.container} aria-label={`${count} XP stars`}>
      <span className={styles.icon} aria-hidden="true">⭐</span>
      <span className={styles.count}>{count}</span>
    </div>
  );
}
