import { Modal } from '../shared/modal/Modal';
import * as styles from './KeyboardShortcutsModal.css';

type ShortcutEntry = {
	keys: string[];
	description: string;
};

type ShortcutSection = {
	title: string;
	shortcuts: ShortcutEntry[];
};

const SHORTCUT_SECTIONS: ShortcutSection[] = [
	{
		title: 'Timer',
		shortcuts: [
			{
				keys: ['Space'],
				description: 'Start match (Ready), call Mate (Running), or resume (Paused)',
			},
		],
	},
	{
		title: 'Match end',
		shortcuts: [
			{
				keys: ['Enter'],
				description: 'Announce winner when the match has ended',
			},
		],
	},
	{
		title: 'This cheat sheet',
		shortcuts: [
			{
				keys: ['?'],
				description: 'Open keyboard shortcuts',
			},
			{
				keys: ['Esc'],
				description: 'Close keyboard shortcuts',
			},
		],
	},
];

type KeyboardShortcutsModalProps = {
	onClose: () => void;
};

export function KeyboardShortcutsModal({ onClose }: KeyboardShortcutsModalProps) {
	return (
		<Modal
			titleId="shortcuts-title"
			onClose={onClose}
			align="top"
			size="sm"
			zIndex={45}
		>
			<h2 id="shortcuts-title" className={styles.title}>
				Keyboard shortcuts
			</h2>
			<p className={styles.subtitle}>
				Quick reference for running a match from the keyboard.
			</p>

			<ul className={styles.sectionList}>
				{SHORTCUT_SECTIONS.map((section) => (
					<li key={section.title} className={styles.section}>
						<h3 className={styles.sectionTitle}>{section.title}</h3>
						<ul className={styles.shortcutList}>
							{section.shortcuts.map((shortcut) => (
								<li
									key={`${section.title}-${shortcut.keys.join('-')}`}
									className={styles.shortcutRow}
								>
									<div className={styles.keys}>
										{shortcut.keys.map((keyLabel) => (
											<kbd key={keyLabel} className={styles.key}>
												{keyLabel}
											</kbd>
										))}
									</div>
									<p className={styles.description}>{shortcut.description}</p>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>

			<p className={styles.dismissHint}>Click outside or press Esc to close</p>
			<button type="button" className={styles.closeButton} onClick={onClose}>
				Close
			</button>
		</Modal>
	);
}
