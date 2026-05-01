import { onMount } from 'svelte';

/**
 * Registers a global Cmd+K / Ctrl+K shortcut that calls the provided callback.
 * Returns a label for the modifier key ('⌘' on Mac, 'Ctrl' elsewhere).
 */
export function registerKeyboardShortcut(onTrigger: () => void) {
	const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
	const ctrlKey = /\bMacintosh\b/i.test(ua) ? '⌘' : 'Ctrl';

	onMount(() => {
		function handler(e: KeyboardEvent) {
			const isK = e.key.toLowerCase() === 'k';
			const mod = e.metaKey || e.ctrlKey;

			if (!mod || !isK) return;

			e.preventDefault();
			onTrigger();
		}

		window.addEventListener('keydown', handler);
		return () => {
			window.removeEventListener('keydown', handler);
		};
	});

	return { ctrlKey };
}
