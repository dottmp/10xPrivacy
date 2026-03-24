import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import SectionComponent from './section.svelte';

import type { Section } from '$lib/features/awesome-privacy/types';

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

const baseProps = {
	categorySlug: 'essentials',
	sectionSlug: 'password-managers'
};

const section: Section = {
	name: 'Password Managers',
	intro: 'A brief intro about password managers.',
	wordOfWarning: 'Be careful with cloud-based managers.',
	alternativeTo: ['LastPass', 'Dashlane'],
	services: [
		{
			name: 'Bitwarden',
			description: 'A secure open source password manager.',
			url: 'https://bitwarden.com',
			icon: 'https://bitwarden.com/favicon.ico',
			openSource: true,
			securityAudited: true,
			acceptsCrypto: true,
			followWith: 'RSS'
		},
		{
			name: 'KeePass',
			description: 'A local password manager.',
			url: 'https://keepass.info'
		}
	]
};

describe('Section component', () => {
	it('renders the section name', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		expect(screen.getByText(section.name)).toBeTruthy();
	});

	it('renders the intro text', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		expect(screen.getByText(/brief intro about password managers/i)).toBeTruthy();
	});

	it('renders the word of warning', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		const alert = document.querySelector('[role="alert"]');

		expect(alert?.textContent).toMatch(/Be careful with cloud-based managers/i);
	});

	it('renders alternativeTo entries', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		section.alternativeTo!.forEach((alt) => {
			expect(screen.getByText(alt)).toBeTruthy();
		});
	});

	it('renders all service names', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		section.services.forEach((service) => {
			expect(screen.getByText(service.name)).toBeTruthy();
		});
	});

	it('renders service descriptions', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		section.services.forEach((service) => {
			expect(screen.getByText(service.description)).toBeTruthy();
		});
	});

	it('renders service icons', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		const img = screen.getByRole('img', { name: 'Bitwarden' });

		expect(img.getAttribute('src')).toBe(section.services[0].icon);
	});

	it('renders correct link for each service', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		const links = screen.getAllByRole('link');
		const hrefs = links.map((l) => l.getAttribute('href'));

		expect(hrefs).toContain(
			`/awesome-privacy/${baseProps.categorySlug}/${baseProps.sectionSlug}/bitwarden`
		);
		expect(hrefs).toContain(
			`/awesome-privacy/${baseProps.categorySlug}/${baseProps.sectionSlug}/keepass`
		);
	});

	it('renders Open Source badge for eligible services', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		expect(screen.getByText('Open Source')).toBeTruthy();
	});

	it('renders Audited badge for security audited services', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		expect(screen.getByText('Audited')).toBeTruthy();
	});

	it('renders Accepts Crypto badge', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		expect(screen.getByText('Accepts Crypto')).toBeTruthy();
	});

	it('renders followWith badge', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		expect(screen.getByText(section.services[0].followWith!)).toBeTruthy();
	});

	it('renders back link with correct href', () => {
		render(SectionComponent, { props: { ...baseProps, section } });

		const backLink = screen.getByRole('link', { name: /Back to/i });

		expect(backLink.getAttribute('href')).toBe(`/awesome-privacy/${baseProps.categorySlug}`);
	});
});
