import { useEffect, useState } from 'react';
import type { DialogueLine } from '../../types/game';
import { CHARACTERS } from '../../data/characters';
import { CharacterPortrait } from '../ui/CharacterPortrait';
import { Button } from '../ui/Button';
import { useTranslation } from '../../i18n';
import styles from './DialogueBox.module.css';

interface Props {
  lines: DialogueLine[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onChoice: (nextIndex: number | null) => void;
  onClose: () => void;
}

const TYPEWRITER_SPEED = 30; // ms per character

export function DialogueBox({
  lines,
  currentIndex,
  onNext,
  onPrev,
  onChoice,
  onClose,
}: Props) {
  const line = lines[currentIndex];
  const character = line ? CHARACTERS[line.characterId] : null;
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { tr } = useTranslation();

  // Typewriter effect
  useEffect(() => {
    if (!line) return;
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(line.text.slice(0, i));
      if (i >= line.text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, TYPEWRITER_SPEED);
    return () => clearInterval(interval);
  }, [line?.text, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Skip typewriter on click
  const handleSkipOrNext = () => {
    if (isTyping) {
      setDisplayedText(line.text);
      setIsTyping(false);
      return;
    }
    if (!line.choices) {
      if (currentIndex < lines.length - 1) {
        onNext();
      } else {
        onClose();
      }
    }
  };

  if (!line || !character) return null;

  const isLast = currentIndex >= lines.length - 1;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-live="polite">
      <div className={styles.box}>
        {/* Portrait + Name */}
        <div className={styles.header}>
          <CharacterPortrait character={character} size="lg" speaking />
          <div className={styles.nameTag}>
            <span className={styles.name}>{character.name}</span>
            <span className={styles.role}>{character.role}</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialogue"
          >
            ✕
          </button>
        </div>

        {/* Text */}
        <div
          className={styles.textArea}
          onClick={handleSkipOrNext}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleSkipOrNext()}
          aria-label="Dialogue text — click to continue"
        >
          <p className={styles.text}>
            {displayedText}
            {isTyping && <span className={styles.cursor} aria-hidden="true">▌</span>}
          </p>
        </div>

        {/* Choices */}
        {!isTyping && line.choices && (
          <div className={styles.choices}>
            {line.choices.map((choice, idx) => (
              <Button
                key={idx}
                variant={choice.isCorrect ? 'primary' : 'secondary'}
                size="md"
                fullWidth
                onClick={() => onChoice(choice.nextIndex)}
              >
                {choice.text}
              </Button>
            ))}
          </div>
        )}

        {/* Nav buttons (no choices) */}
        {!isTyping && !line.choices && (
          <div className={styles.nav}>
            {currentIndex > 0 && (
              <Button variant="ghost" size="sm" onClick={onPrev}>
                {tr.dialogueBack}
              </Button>
            )}
            <span className={styles.progress}>
              {currentIndex + 1} / {lines.length}
            </span>
            <Button variant="primary" size="sm" onClick={handleSkipOrNext}>
              {isLast ? tr.dialogueClose : tr.dialogueNext}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
