import { useEffect, useRef } from 'react';

export type KeyboardShortcut = {
	key?: string;
	code?: string;
	onPress: (event: KeyboardEvent) => void;
	enabled?: boolean;
	preventDefault?: boolean;
	ignoreTypingTargets?: boolean;
};

export function isTypingTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	return (
		tag === 'INPUT' ||
		tag === 'TEXTAREA' ||
		tag === 'SELECT' ||
		target.isContentEditable
	);
}

function normalizeShortcuts(
	shortcuts: KeyboardShortcut | KeyboardShortcut[],
): KeyboardShortcut[] {
	return Array.isArray(shortcuts) ? shortcuts : [shortcuts];
}

function matchesShortcut(
	event: KeyboardEvent,
	shortcut: KeyboardShortcut,
): boolean {
	if (shortcut.code && event.code === shortcut.code) return true;
	if (shortcut.key && event.key === shortcut.key) return true;
	return false;
}

export function useKeyboardShortcut(
	shortcuts: KeyboardShortcut | KeyboardShortcut[],
) {
	const shortcutsRef = useRef<KeyboardShortcut[]>([]);
	shortcutsRef.current = normalizeShortcuts(shortcuts);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			for (const shortcut of shortcutsRef.current) {
				if (shortcut.enabled === false) continue;
				if (!matchesShortcut(event, shortcut)) continue;

				if (
					shortcut.ignoreTypingTargets !== false &&
					isTypingTarget(event.target)
				) {
					return;
				}

				if (shortcut.preventDefault !== false) {
					event.preventDefault();
				}

				shortcut.onPress(event);
				return;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);
}
