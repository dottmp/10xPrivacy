export function formatDate(dateStr: string | null) {
	if (!dateStr) return '';

	const d = new Date(dateStr);
	const now = new Date();
	const diff = now.getTime() - d.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (days === 0) return 'Today';
	if (days === 1) return 'Yesterday';
	if (days < 7) return `${days}d ago`;

	return d.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: days > 365 ? 'numeric' : undefined
	});
}
