import {
	type MouseEvent,
	type ReactNode,
	type SyntheticEvent,
	useEffect,
	useRef,
} from 'react';
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShortcut';
import * as styles from './Modal.css';

type ModalAlign = 'center' | 'top';
type ModalSize = 'sm' | 'md' | 'lg';
type ModalZIndex = 40 | 45 | 50;

const PANEL_CLASS: Record<ModalSize, string> = {
	sm: styles.panelSm,
	md: styles.panelMd,
	lg: styles.panelLg,
};

const PANEL_CONTENT_CLASS: Record<ModalSize, string> = {
	sm: styles.panelContentSm,
	md: styles.panelContentMd,
	lg: styles.panelContentLg,
};

const Z_INDEX_CLASS: Record<ModalZIndex, string> = {
	40: styles.overlayZ40,
	45: styles.overlayZ45,
	50: styles.overlayZ50,
};

type ModalProps = {
	children: ReactNode;
	titleId?: string;
	describedBy?: string;
	onClose?: () => void;
	closeOnOverlayClick?: boolean;
	align?: ModalAlign;
	size?: ModalSize;
	zIndex?: ModalZIndex;
	panelClassName?: string;
	overlayClassName?: string;
};

export function Modal({
	children,
	titleId,
	describedBy,
	onClose,
	closeOnOverlayClick = true,
	align = 'center',
	size = 'md',
	zIndex = 45,
	panelClassName,
	overlayClassName,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog || dialog.open) return;
		dialog.showModal();
	}, []);

	const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
		if (!onClose || !closeOnOverlayClick) return;
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
		event.preventDefault();
		onClose?.();
	};
	useKeyboardShortcut([{
		key: 'Escape',
		enabled: true,
		onPress: (event) => handleCancel(event as unknown	 as SyntheticEvent<HTMLDialogElement>)
	}]);

	const dismissible = Boolean(onClose && closeOnOverlayClick);
	const overlayClass = [
		align === 'top' ? styles.overlayTop : styles.overlayCenter,
		Z_INDEX_CLASS[zIndex],
		dismissible ? styles.overlayDismissible : '',
		overlayClassName,
	]
		.filter(Boolean)
		.join(' ');

	const usesCustomPanel = Boolean(panelClassName);
	const panelClass = [
		panelClassName ?? PANEL_CLASS[size],
		!usesCustomPanel ? styles.panelScrollbar : '',
	]
		.filter(Boolean)
		.join(' ');

	const contentClass = usesCustomPanel
		? ''
		: [styles.panelContent, PANEL_CONTENT_CLASS[size], styles.panelScrollbar]
				.filter(Boolean)
				.join(' ');

	return (
		<dialog
			ref={dialogRef}
			className={overlayClass}
			aria-labelledby={titleId}
			aria-describedby={describedBy}
			onClick={handleDialogClick}
			onKeyDown={(event) => event.key === 'Escape' && onClose?.()}
		>
			<div
				className={panelClass}
				onClick={(event) => event.stopPropagation()}
				onKeyDown={(event) => event.key === 'Escape' && onClose?.()}
			>
				{contentClass ? (
					<div className={contentClass}>{children}</div>
				) : (
					children
				)}
			</div>
		</dialog>
	);
}
