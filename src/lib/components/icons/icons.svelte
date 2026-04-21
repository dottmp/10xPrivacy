<script module lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';
	import Box from '@lucide/svelte/icons/box';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Circle from '@lucide/svelte/icons/circle';
	import Code from '@lucide/svelte/icons/code';
	import Coins from '@lucide/svelte/icons/coins';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import Film from '@lucide/svelte/icons/film';
	import Globe from '@lucide/svelte/icons/globe';
	import House from '@lucide/svelte/icons/house';
	import ListTodo from '@lucide/svelte/icons/list-todo';
	import Lock from '@lucide/svelte/icons/lock';
	import Menu from '@lucide/svelte/icons/menu';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Paintbrush from '@lucide/svelte/icons/paintbrush';
	import Search from '@lucide/svelte/icons/search';
	import ShieldHalf from '@lucide/svelte/icons/shield-half';
	import SwatchBook from '@lucide/svelte/icons/swatch-book';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import UsersRound from '@lucide/svelte/icons/users-round';
	import Wrench from '@lucide/svelte/icons/wrench';
	import X from '@lucide/svelte/icons/x';

	import Android from './icon-android.svelte';
	import Apple from './icon-apple.svelte';
	import Discord from './icon-discord.svelte';
	import Github from './icon-github.svelte';
	import Logo from './icon-logo.svelte';
	import Reddit from './icon-reddit.svelte';
	import Loader from './icons-loader.svelte';

	export const Icons = {
		arrowLeft: ArrowLeft,
		arrowUp: ArrowUp,
		chevronRight: ChevronRight,
		chevronDown: ChevronDown,
		external: ExternalLink,
		menu: Menu,
		search: Search,
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
		close: X,
		section: Box,
		loading: Loader,
		logo: Logo,

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
		fallback: Box
	} as const;
</script>
