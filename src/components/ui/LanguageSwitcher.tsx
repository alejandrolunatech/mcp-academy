import { useGame } from '../../context/GameContext';
import type { Language } from '../../types/game';
import { useTranslation } from '../../i18n';
import styles from './LanguageSwitcher.module.css';

const LANG_OPTIONS: { code: Language; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'nl', flag: '🇳🇱', label: 'NL' },
];

interface Props {
  /** Compact mode — show only flags (for navbar) */
  compact?: boolean;
}

export function LanguageSwitcher({ compact = false }: Props) {
  const { state, setLanguage } = useGame();
  const { tr } = useTranslation();
  const current = state.progress.language ?? 'en';

  return (
    <div
      className={[styles.switcher, compact ? styles.compact : ''].filter(Boolean).join(' ')}
      role="group"
      aria-label={tr.langSwitcherLabel}
    >
      {!compact && (
        <span className={styles.switcherLabel} aria-hidden="true">
          🌍
        </span>
      )}
      {LANG_OPTIONS.map(({ code, flag, label }) => (
        <button
          key={code}
          className={[
            styles.langBtn,
            current === code ? styles.active : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => setLanguage(code)}
          aria-pressed={current === code}
          aria-label={`${tr.langSwitcherLabel}: ${label}`}
          title={label}
        >
          <span className={styles.flag} aria-hidden="true">
            {flag}
          </span>
          {!compact && <span className={styles.code}>{label}</span>}
        </button>
      ))}
    </div>
  );
}
