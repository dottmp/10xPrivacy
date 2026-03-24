import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import ServiceComponent from './service.svelte';

import type { Section, Service } from '$lib/features/awesome-privacy/types';

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

const section: Section = {
	name: 'Password Managers',
	services: []
};

const service = {
	name: 'Bitwarden',
	description: 'A secure open source password manager.',
	url: 'https://bitwarden.com',
	icon: 'https://bitwarden.com/favicon.ico',
	github: 'bitwarden/clients',
	subreddit: 'Bitwarden',
	discordInvite: 'abc123',
	androidApp: 'com.x8bit.bitwarden',
	iosApp: 'id1137397744',
	openSource: true,
	securityAudited: true,
	acceptsCrypto: true,
	followWith: 'RSS'
} as const satisfies Service;

const baseProps = {
	service,
	section,
	related: [],
	categorySlug: 'essentials',
	sectionSlug: 'password-managers'
};

describe('Service component', () => {
	it('renders the service name', () => {
		render(ServiceComponent, { props: baseProps });

		expect(screen.getByText(service.name)).toBeTruthy();
	});

	it('renders the service icon', () => {
		render(ServiceComponent, { props: baseProps });

		const img = screen.getByRole('img', { name: service.name });

		expect(img.getAttribute('src')).toBe(service.icon);
	});

	it('renders the service description', () => {
		render(ServiceComponent, { props: baseProps });

		expect(screen.getByText(service.description)).toBeTruthy();
	});

	it('renders the homepage URL link', () => {
		render(ServiceComponent, { props: baseProps });

		const links = screen.getByRole('link', { name: service.url });

		expect(links.getAttribute('href')).toBe(service.url);
	});

	it('renders the GitHub link', () => {
		render(ServiceComponent, { props: baseProps });

		const link = screen.getByRole('link', { name: `github.com/${service.github}` });

		expect(link.getAttribute('href')).toBe(`https://github.com/${service.github}`);
	});

	it('renders the subreddit link', () => {
		render(ServiceComponent, { props: baseProps });

		const link = screen.getByRole('link', { name: `r/${service.subreddit}` });

		expect(link.getAttribute('href')).toBe(`https://reddit.com/r/${service.subreddit}`);
	});

	it('renders the Discord link', () => {
		render(ServiceComponent, { props: baseProps });

		const link = screen.getByRole('link', { name: /Join server/i });

		expect(link.getAttribute('href')).toBe(`https://discord.gg/${service.discordInvite}`);
	});

	it('renders the Android app link', () => {
		render(ServiceComponent, { props: baseProps });

		const link = screen.getByRole('link', { name: service.androidApp });

		expect(link.getAttribute('href')).toBe(
			`https://play.google.com/store/apps/details?id=${service.androidApp}`
		);
	});

	it('renders the iOS app link', () => {
		render(ServiceComponent, { props: baseProps });

		const link = screen.getByRole('link', { name: /App Store/i });

		expect(link.getAttribute('href')).toBe(`https://apps.apple.com/app/${service.iosApp}`);
	});

	it('renders the Open Source badge', () => {
		render(ServiceComponent, { props: baseProps });

		expect(screen.getAllByText('Open Source').length).toBeGreaterThan(0);
	});

	it('renders the Security Audited badge', () => {
		render(ServiceComponent, { props: baseProps });

		expect(screen.getByText('Security Audited')).toBeTruthy();
	});

	it('renders the Accepts Crypto badge', () => {
		render(ServiceComponent, { props: baseProps });

		expect(screen.getByText('Accepts Crypto')).toBeTruthy();
	});

	it('renders the followWith badge', () => {
		render(ServiceComponent, { props: baseProps });

		expect(screen.getByText(service.followWith)).toBeTruthy();
	});

	it('renders the Android badge', () => {
		render(ServiceComponent, { props: baseProps });

		expect(screen.getByText('Android')).toBeTruthy();
	});

	it('renders the iOS badge', () => {
		render(ServiceComponent, { props: baseProps });

		expect(screen.getByText('iOS')).toBeTruthy();
	});

	it('renders related services', () => {
		const related: Service[] = [
			{ name: 'KeePass', description: 'Local password manager.', url: 'https://keepass.info' }
		];

		render(ServiceComponent, { props: { ...baseProps, related } });

		expect(screen.getByText(related[0].name)).toBeTruthy();
	});

	it('renders back link with correct href', () => {
		render(ServiceComponent, { props: baseProps });

		const backLink = screen.getByRole('link', { name: /Back to/i });

		expect(backLink.getAttribute('href')).toBe(
			`/awesome-privacy/${baseProps.categorySlug}/${baseProps.sectionSlug}`
		);
	});
});
