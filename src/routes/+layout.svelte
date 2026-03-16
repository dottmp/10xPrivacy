<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-200 font-mono">
	{@render children()}
</div>
