import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn is a utility function that combines class names and merges Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
