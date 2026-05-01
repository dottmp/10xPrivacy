<script lang="ts">
	import { tryCatch } from '$lib/utils/try-catch';

	type Props = { tosdrId: string };

	let { tosdrId }: Props = $props();

	type TosdrResponse = {
		parameters: {
			rating: string;
			slug: string;
			name: string;
		};
	};

	async function fetchGrade(id: string) {
		const { data, error } = await tryCatch<TosdrResponse>(
			fetch(`https://api.tosdr.org/service/v2/?id=${id}`).then((response) => response.json())
		);

		if (error || !data?.parameters?.rating) return null;
		return data.parameters;
	}

	const gradeColors: Record<string, string> = {
		A: 'badge-success',
		B: 'badge-success',
		C: 'badge-warning',
		D: 'badge-error',
		E: 'badge-error'
	};

	const gradePromise = $derived(fetchGrade(tosdrId));
</script>

{#await gradePromise then tosdr}
	{#if tosdr}
		<a
			href="https://tosdr.org/en/service/{tosdrId}"
			target="_blank"
			rel="noopener noreferrer"
			title="ToS;DR rating for {tosdr.name}"
			class="badge badge-soft {gradeColors[tosdr.rating] ?? 'badge-neutral'} badge-sm font-semibold"
		>
			ToS;DR: {tosdr.rating}
		</a>
	{/if}
{/await}
