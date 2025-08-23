import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

const commands = [
    'from blazingly_fast.queries limit 1ms',
    'create developer_first.experience { simple: true }',
    'from open_source.community join contributors',
    'from events stream real_time.updates',
    'embed database.anywhere { size: "small" }',
    'from rust.performance select speed::maximum',
    'insert get_things.done returning instantly'
];

export default function AnimatedText() {
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
    const [displayCommand, setDisplayCommand] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        // Terminal-style typewriter effect
        const typeInterval = setInterval(() => {
            const currentCommand = commands[currentCommandIndex];
            
            if (!isDeleting) {
                // Typing
                if (charIndex < currentCommand.length) {
                    setDisplayCommand(currentCommand.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (charIndex > 0) {
                    setDisplayCommand(currentCommand.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    // Move to next command
                    setIsDeleting(false);
                    setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
                }
            }
        }, isDeleting ? 30 : 80); // Typing speed
        
        return () => clearInterval(typeInterval);
    }, [currentCommandIndex, charIndex, isDeleting]);

    // Blinking cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className={styles.terminalContainer}>
            <div className={styles.terminalWindow}>
                <div className={styles.terminalHeader}>
                    <span className={styles.terminalDot} style={{background: '#ff5f56'}}></span>
                    <span className={styles.terminalDot} style={{background: '#ffbd2e'}}></span>
                    <span className={styles.terminalDot} style={{background: '#27c93f'}}></span>
                    <span className={styles.terminalTitle}>reifydb@terminal</span>
                </div>
                <div className={styles.terminalBody}>
                    <div className={styles.terminalLine}>
                        <span className={styles.terminalPrompt}>you@reifydb</span>
                        <span className={styles.terminalPath}>: </span>
                        <span className={styles.terminalCommand}> {displayCommand}</span>
                        <span className={`${styles.terminalCursor} ${showCursor ? styles.cursorVisible : ''}`}>█</span>
                    </div>
                </div>
            </div>
        </div>
    );
}