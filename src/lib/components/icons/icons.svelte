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

	import Android from '$lib/components/icons/icon-android.svelte';
	import Apple from '$lib/components/icons/icon-apple.svelte';
	import Github from '$lib/components/icons/icon-github.svelte';
	import Reddit from '$lib/components/icons/icon-reddit.svelte';

	export const Icons = {
		arrowLeft: ArrowLeft,
		chevronRight: ChevronRight,
		chevronDown: ChevronDown,
		external: ExternalLink,
		menu: Menu,
		theme: SwatchBook,
		circle: Circle,
		triangleAlert: TriangleAlert,
		globe: Globe,
		apple: Apple,
		android: Android,
		messageCircle: MessageCircle,
		github: Github,
		reddit: Reddit,

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
