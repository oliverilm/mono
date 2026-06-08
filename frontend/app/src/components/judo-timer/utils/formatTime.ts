export function formatTime(totalSeconds: number): string {
	const safe = Math.max(0, Math.ceil(totalSeconds));
	const minutes = Math.floor(safe / 60);
	const seconds = safe % 60;
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatOsaekomi(totalSeconds: number): string {
	const safe = Math.max(0, Math.floor(totalSeconds));
	const seconds = safe % 60;
	return `${Math.floor(safe / 60)}:${seconds.toString().padStart(2, '0')}`;
}
