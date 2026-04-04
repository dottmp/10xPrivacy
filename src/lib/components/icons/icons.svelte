<script module lang="ts">
	import {
		ArrowLeft,
		ChevronDown,
		ChevronRight,
		Circle,
		Code,
		DollarSign,
		ExternalLink,
		Film,
		Globe,
		House,
		Lock,
		Menu,
		MessageCircle,
		MessageSquare,
		Monitor,
		Paintbrush,
		Shield,
		SquareCheckBig,
		SwatchBook,
		TriangleAlert,
		Users,
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
		essentials: Shield,
		communication: MessageSquare,
		'security-tools': Lock,
		networking: Globe,
		productivity: SquareCheckBig,
		utilities: Wrench,
		'operating-systems': Monitor,
		development: Code,
		'smart-home-and-iot': House,
		finance: DollarSign,
		social: Users,
		media: Film,
		creativity: Paintbrush,
		categoryFallback: Circle
	} as const;
</script>
