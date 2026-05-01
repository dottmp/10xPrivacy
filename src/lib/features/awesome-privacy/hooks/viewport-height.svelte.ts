import { onMount } from 'svelte';

/**
 * Tracks the virtual keyboard height on mobile by comparing the initial
 * viewport height against the current one. Sets a `--kb-height` CSS custom
 * property on the document root so layouts can shift accordingly.
 */
export function trackViewportHeight() {
	let keyboardHeight = $state(0);

	onMount(() => {
		const initial = window.visualViewport ? window.visualViewport.height : window.innerHeight;

		const handler = () => {
			const hv = window.visualViewport ? window.visualViewport.height : window.innerHeight;

			keyboardHeight = Math.max(0, initial - hv);
			document.documentElement.style.setProperty('--kb-height', `${keyboardHeight}px`);
		};

		if (window.visualViewport) {
			window.visualViewport.addEventListener('resize', handler);
			window.visualViewport.addEventListener('scroll', handler);
		} else {
			window.addEventListener('resize', handler);
		}

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener('resize', handler);
				window.visualViewport.removeEventListener('scroll', handler);
			} else {
				window.removeEventListener('resize', handler);
			}
		};
	});

	return {
		get keyboardHeight() {
			return keyboardHeight;
		}
	};
}
