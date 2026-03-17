<script lang="ts">
	import '$lib/styles/app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-200 font-mono">
	<div class="absolute top-0 right-0 ml-auto flex-none pt-4 pr-6 pl-4">
		<label class="swap swap-rotate">
			<input type="checkbox" value="vscode" class="theme-controller" />
			<!-- sun icon -->
			<i class="nf nf-fa-sun swap-off"></i>
			<!-- moon icon -->
			<i class="nf nf-fa-moon swap-on"></i>
		</label>
	</div>

	{@render children()}
</div>
