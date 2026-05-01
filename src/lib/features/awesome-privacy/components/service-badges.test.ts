import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import ServiceBadges from './service-badges.svelte';

import type { Service } from '$lib/features/awesome-privacy/types';

const baseService: Service = {
	name: 'Test Service',
	description: 'A test service',
	url: 'https://example.com'
};

describe('ServiceBadges component', () => {
	it('renders nothing when no badges apply', () => {
		const { container } = render(ServiceBadges, { props: { service: baseService } });
		expect(container.querySelectorAll('.badge')).toHaveLength(0);
	});

	it('renders Open Source badge when openSource is true', () => {
		render(ServiceBadges, {
			props: { service: { ...baseService, openSource: true } }
		});
		expect(screen.getByText('Open Source')).toBeTruthy();
	});

	it('renders Open Source badge when github is set', () => {
		render(ServiceBadges, {
			props: { service: { ...baseService, github: 'user/repo' } }
		});
		expect(screen.getByText('Open Source')).toBeTruthy();
	});

	it('renders "Audited" label for size xs', () => {
		render(ServiceBadges, {
			props: { service: { ...baseService, securityAudited: true }, size: 'xs' }
		});
		expect(screen.getByText('Audited')).toBeTruthy();
	});

	it('renders "Security Audited" label for size sm', () => {
		render(ServiceBadges, {
			props: { service: { ...baseService, securityAudited: true }, size: 'sm' }
		});
		expect(screen.getByText('Security Audited')).toBeTruthy();
	});

	it('renders Accepts Crypto badge', () => {
		render(ServiceBadges, {
			props: { service: { ...baseService, acceptsCrypto: true } }
		});
		expect(screen.getByText('Accepts Crypto')).toBeTruthy();
	});

	it('renders followWith badge with its value', () => {
		render(ServiceBadges, {
			props: { service: { ...baseService, followWith: 'RSS' } }
		});
		expect(screen.getByText('RSS')).toBeTruthy();
	});

	it('renders all badges when all props are set', () => {
		const { container } = render(ServiceBadges, {
			props: {
				service: {
					...baseService,
					openSource: true,
					securityAudited: true,
					acceptsCrypto: true,
					followWith: 'RSS'
				}
			}
		});
		expect(container.querySelectorAll('.badge')).toHaveLength(4);
	});
});
