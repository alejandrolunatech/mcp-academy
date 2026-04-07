import { useGame } from '../../context/GameContext';
import { CHARACTERS } from '../../data/characters';
import { CharacterPortrait } from '../ui/CharacterPortrait';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useTranslation } from '../../i18n';
import type { BadgeId } from '../../types/game';
import styles from './VictoryScreen.module.css';

const ALL_BADGES: BadgeId[] = [
  'badge-tools',
  'badge-resources',
  'badge-prompts',
  'badge-comparison',
  'badge-rune',
  'badge-fog-defeated',
];

export function VictoryScreen() {
  const { state, navigateTo, resetGame } = useGame();
  const { xpStars, badges, playerName } = state.progress;
  const { tr, t } = useTranslation();

  return (
    <div className={styles.victory}>
      <div className={styles.stars} aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${0.5 + Math.random() * 1.5}rem`,
            }}
          >
            ✨
          </span>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.trophy} aria-hidden="true">🏆</div>
        <h1 className={styles.title}>{t(tr.victoryCongrats, { name: playerName })}</h1>
        <p className={styles.subtitle}>
          {tr.victorySubtitle}
        </p>

        <div className={styles.xpDisplay}>
          <span className={styles.xpValue}>⭐ {xpStars} XP Stars</span>
        </div>

        {/* Characters parade */}
        <div className={styles.characters}>
          {Object.values(CHARACTERS)
            .filter((c) => c.id !== 'fogOfConfusion')
            .map((char) => (
              <div key={char.id} className={styles.charItem}>
                <CharacterPortrait character={char} size="lg" />
                <span className={styles.charName}>{char.name}</span>
              </div>
            ))}
        </div>

        {/* Badge collection */}
        <div className={styles.badgesSection}>
          <h2 className={styles.badgesTitle}>{tr.yourBadges}</h2>
          <div className={styles.badges}>
            {ALL_BADGES.map((id) => (
              <Badge key={id} id={id} earned={badges.includes(id)} size="md" />
            ))}
          </div>
        </div>

        {/* Key lessons */}
        <div className={styles.lessons}>
          <div className={styles.lessonCard}>
            <span>⚒️</span>
            <strong>{tr.lessonTools}</strong>
          </div>
          <div className={styles.lessonCard}>
            <span>📚</span>
            <strong>{tr.lessonResources}</strong>
          </div>
          <div className={styles.lessonCard}>
            <span>✨</span>
            <strong>{tr.lessonPrompts}</strong>
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => navigateTo('world-map')}>
            {tr.returnToMap}
          </Button>
          <Button variant="ghost" onClick={resetGame}>
            {tr.playAgain}
          </Button>
        </div>
      </div>
    </div>
  );
}
