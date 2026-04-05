<script module lang="ts">
	import {
		ArrowLeft,
		ChevronDown,
		ChevronRight,
		Circle,
		Code,
		Coins,
		ExternalLink,
		Film,
		Globe,
		House,
		ListTodo,
		Lock,
		Menu,
		MessageCircle,
		Monitor,
		Paintbrush,
		ShieldHalf,
		SwatchBook,
		TriangleAlert,
		UsersRound,
		Wrench
	} from 'lucide-svelte';

	import Android from './icon-android.svelte';
	import Apple from './icon-apple.svelte';
	import Discord from './icon-discord.svelte';
	import Github from './icon-github.svelte';
	import Reddit from './icon-reddit.svelte';

	export const Icons = {
		arrowLeft: ArrowLeft,
		chevronRight: ChevronRight,
		chevronDown: ChevronDown,
		external: ExternalLink,
		menu: Menu,
		theme: SwatchBook,
		circle: Circle,
		warning: TriangleAlert,
		globe: Globe,
		apple: Apple,
		android: Android,
		messageCircle: MessageCircle,
		github: Github,
		reddit: Reddit,
		discord: Discord,

		// Category icons (keyed by slug)
		essentials: ShieldHalf,
		communication: MessageCircle,
		'security-tools': Lock,
		networking: Globe,
		productivity: ListTodo,
		utilities: Wrench,
		'operating-systems': Monitor,
		development: Code,
		'smart-home-and-iot': House,
		finance: Coins,
		social: UsersRound,
		media: Film,
		creativity: Paintbrush,
		categoryFallback: Circle
	} as const;
</script>
