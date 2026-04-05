/** Debounce a function, ensuring it is only called after a certain delay has passed since the last call. */
export function debounce<T extends (...args: never[]) => void>(fn: T, delay: number): T {
	let timer: ReturnType<typeof setTimeout>;

	return ((...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	}) as T;
}
