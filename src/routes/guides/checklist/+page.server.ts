import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { Service } from '$lib/features/awesome-privacy/types';

function mapSection(
	categoryName: string,
	sectionName: string,
	serviceNames?: string[]
): Array<Service & { href: string }> {
	const section = awesomePrivacy.getSection({
		categorySlug: awesomePrivacy.slugify(categoryName),
		sectionSlug: awesomePrivacy.slugify(sectionName)
	});

	if (!section) return [];

	const categorySlug = awesomePrivacy.slugify(categoryName);
	const sectionSlug = awesomePrivacy.slugify(sectionName);

	return section.services
		.filter((service) => (serviceNames ? serviceNames.includes(service.name) : true))
		.map((service) => {
			const serviceSlug = awesomePrivacy.slugify(service.name);
			return {
				...service,
				href: `/awesome-privacy/${categorySlug}/${sectionSlug}/${serviceSlug}`
			} as Service & { href: string };
		});
}

type ChecklistItem = {
	id: string;
	title: string;
	services: Array<Service & { href: string }>;
};

const checklistItems: ChecklistItem[] = [
	{
		id: 'browser',
		title: 'Switch to a privacy-respecting browser',
		services: mapSection('Essentials', 'Browsers', ['LibreWolf', 'Brave Browser'])
	},
	{
		id: 'search',
		title: 'Switch search engine',
		services: mapSection('Essentials', 'Search Engines', ['DuckDuckGo', 'Brave Search'])
	},
	{
		id: 'adblock',
		title: 'Install an ad blocker',
		services: mapSection('Networking', 'Ad Blockers', ['uBlock Origin'])
	},
	{
		id: 'password',
		title: 'Get a password manager',
		services: mapSection('Essentials', 'Password Managers', ['ProtonPass', 'Bitwarden', 'KeePass'])
	},
	{
		id: 'storage',
		title: 'Switch storage solution',
		services: [
			...mapSection('Productivity', 'Encrypted Cloud Storage', ['FileN']),
			...mapSection('Productivity', 'Backup and Sync', ['Syncthing', 'NextCloud'])
		]
	},

	{
		id: 'notes',
		title: 'Switch to encrypted notes',
		services: mapSection('Productivity', 'Digital Notes', ['Obsidian', 'Standard Notes', 'Joplin'])
	},
	{
		id: 'email',
		title: 'Switch to a privacy-respecting email provider',
		services: mapSection('Communication', 'Encrypted Email', ['Tuta', 'ProtonMail'])
	},
	{
		id: 'vpn',
		title: 'Get a trustworthy VPN',
		services: mapSection('Networking', 'Virtual Private Networks', ['Mullvad', 'IVPN', 'ProtonVPN'])
	},

	{
		id: 'messaging',
		title: 'Switch to a secure messaging app',
		services: mapSection('Communication', 'Encrypted Messaging', ['Signal']) ?? []
	},
	{
		id: 'os',
		title: 'Consider switching your operating system',
		services: mapSection('Operating Systems', 'Mobile Operating Systems', ['GrapheneOS']) ?? []
	}
];

export const load: PageServerLoad = async () => {
	return {
		meta: {
			title: 'Privacy Checklist | 10xPrivacy',
			description:
				"Starting your digital privacy journey can be overwhelming, thats why we've created this simple checklist to help you take it one step at a time. Each item is a small action you can take to improve your online privacy."
		},
		checklistItems
	};
};
