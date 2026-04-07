import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowing?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', glowing = false, onClick }: CardProps) {
  return (
    <div
      className={[styles.card, glowing ? styles.glowing : '', onClick ? styles.clickable : '', className]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}
