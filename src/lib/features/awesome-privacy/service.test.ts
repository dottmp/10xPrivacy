import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AwesomePrivacy } from './service.ts';

// Mock the raw YAML import before importing the service
vi.mock('../../data/awesome-privacy.yml?raw');

describe('AwesomePrivacy', () => {
	let service: AwesomePrivacy;

	beforeEach(() => {
		service = new AwesomePrivacy();
	});

	//--------------------------------------------------------------------
	// slugify
	//--------------------------------------------------------------------

	describe('slugify', () => {
		it('converts spaces to hyphens', () => {
			expect(service.slugify('Password Managers')).toBe('password-managers');
		});

		it('converts to lowercase', () => {
			expect(service.slugify('HELLO WORLD')).toBe('hello-world');
		});

		it('replaces + with "and"', () => {
			expect(service.slugify('Privacy + Security')).toBe('privacy-and-security');
		});

		it('replaces & with "and"', () => {
			expect(service.slugify('Privacy & Security')).toBe('privacy-and-security');
		});

		it('removes question marks', () => {
			expect(service.slugify('What is Privacy?')).toBe('what-is-privacy');
		});

		it('handles a single word', () => {
			expect(service.slugify('Networking')).toBe('networking');
		});

		it('handles an empty string', () => {
			expect(service.slugify('')).toBe('');
		});
	});

	//--------------------------------------------------------------------
	// slugToName
	//--------------------------------------------------------------------

	describe('slugToName', () => {
		it('converts hyphens back to spaces', () => {
			expect(service.slugToName('password-managers')).toBe('Password Managers');
		});

		it('capitalizes each word', () => {
			expect(service.slugToName('encrypted-messaging')).toBe('Encrypted Messaging');
		});

		it('replaces "and" with &', () => {
			expect(service.slugToName('privacy-and-security')).toBe('Privacy & Security');
		});

		it('handles a single word slug', () => {
			expect(service.slugToName('networking')).toBe('Networking');
		});
	});

	//--------------------------------------------------------------------
	// getCategories
	//--------------------------------------------------------------------

	describe('getCategories', () => {
		it('returns all categories', () => {
			const categories = service.getCategories();

			expect(categories).toBeInstanceOf(Array);

			expect(categories.length > 0).toBeTruthy();
		});

		it('returns categories with expected names', () => {
			const names = service.getCategories().map((category) => category.name);

			expect(names).toContain('Essentials');
			expect(names).toContain('Communication');
			expect(names).toContain('Networking');
		});

		it('each category has a sections array', () => {
			service.getCategories().forEach((category) => {
				expect(Array.isArray(category.sections)).toBe(true);
			});
		});
	});

	//--------------------------------------------------------------------
	// getCategory
	//--------------------------------------------------------------------

	describe('getCategory', () => {
		it('returns the correct category by slug', () => {
			const category = service.getCategory({ categorySlug: 'essentials' });

			expect(category?.name).toBe('Essentials');
		});

		it('returns the communication category', () => {
			const category = service.getCategory({ categorySlug: 'communication' });

			expect(category?.name).toBe('Communication');
		});

		it('returns undefined for an unknown slug', () => {
			const category = service.getCategory({ categorySlug: 'does-not-exist' });

			expect(category).toBeUndefined();
		});
	});

	//--------------------------------------------------------------------
	// getFeaturedCategories
	//--------------------------------------------------------------------

	describe('getFeaturedCategories', () => {
		it('returns only categories whose names are in featuredCategories', () => {
			const featured = service.getFeaturedCategories();

			featured.forEach((category) => {
				expect(service.featuredCatgories).toContain(category.name);
			});
		});

		it('returns Essentials and Communication from the mock data', () => {
			const featured = service.getFeaturedCategories();
			const names = featured.map((category) => category.name);

			expect(names).toContain('Essentials');
			expect(names).toContain('Communication');
		});

		it('does not return categories not in the featured list', () => {
			const custom = new AwesomePrivacy(['Essentials']);

			const featured = custom.getFeaturedCategories();
			const names = featured.map((category) => category.name);

			expect(names).not.toContain('Communication');
			expect(names).not.toContain('Networking');
		});

		it('respects a custom featured categories list passed to constructor', () => {
			const custom = new AwesomePrivacy(['Networking']);

			const featured = custom.getFeaturedCategories();
			expect(featured).toHaveLength(1);
			expect(featured[0].name).toBe('Networking');
		});

		it('returns empty array when no categories match the featured list', () => {
			const custom = new AwesomePrivacy(['Nonexistent Category']);

			expect(custom.getFeaturedCategories()).toHaveLength(0);
		});
	});

	//--------------------------------------------------------------------
	// getSection
	//--------------------------------------------------------------------

	describe('getSection', () => {
		it('returns the correct section by category and section slugs', () => {
			const section = service.getSection({
				categorySlug: 'essentials',
				sectionSlug: 'password-managers'
			});

			expect(section?.name).toBe('Password Managers');
		});

		it('returns a section from a different category', () => {
			const section = service.getSection({
				categorySlug: 'communication',
				sectionSlug: 'encrypted-messaging'
			});

			expect(section?.name).toBe('Encrypted Messaging');
		});

		it('returns undefined when the category does not exist', () => {
			const section = service.getSection({
				categorySlug: 'unknown-category',
				sectionSlug: 'password-managers'
			});

			expect(section).toBeUndefined();
		});

		it('returns undefined when the section does not exist in a valid category', () => {
			const section = service.getSection({
				categorySlug: 'essentials',
				sectionSlug: 'unknown-section'
			});

			expect(section).toBeUndefined();
		});
	});

	//--------------------------------------------------------------------
	// getService
	//--------------------------------------------------------------------

	describe('getService', () => {
		it('returns the correct service by all three slugs', () => {
			const svc = service.getService({
				categorySlug: 'essentials',
				sectionSlug: 'password-managers',
				serviceSlug: 'bitwarden'
			});

			expect(svc?.name).toBe('Bitwarden');
			expect(svc?.url).toBe('https://bitwarden.com');
		});

		it('returns a different service in the same section', () => {
			const svc = service.getService({
				categorySlug: 'essentials',
				sectionSlug: 'password-managers',
				serviceSlug: 'keepass'
			});

			expect(svc?.name).toBe('KeePass');
		});

		it('returns a service from a different category and section', () => {
			const svc = service.getService({
				categorySlug: 'communication',
				sectionSlug: 'encrypted-messaging',
				serviceSlug: 'signal'
			});

			expect(svc?.name).toBe('Signal');
		});

		it('returns undefined for an unknown service slug', () => {
			const svc = service.getService({
				categorySlug: 'essentials',
				sectionSlug: 'password-managers',
				serviceSlug: 'unknown-service'
			});

			expect(svc).toBeUndefined();
		});

		it('returns undefined when the section does not exist', () => {
			const svc = service.getService({
				categorySlug: 'essentials',
				sectionSlug: 'nonexistent',
				serviceSlug: 'bitwarden'
			});

			expect(svc).toBeUndefined();
		});

		it('returns undefined when the category does not exist', () => {
			const svc = service.getService({
				categorySlug: 'nonexistent',
				sectionSlug: 'password-managers',
				serviceSlug: 'bitwarden'
			});

			expect(svc).toBeUndefined();
		});
	});

	//--------------------------------------------------------------------
	// getData
	//--------------------------------------------------------------------

	describe('getData', () => {
		it('returns the full parsed data object', () => {
			const data = service.getData();

			expect(data).toHaveProperty('categories');
			expect(Array.isArray(data.categories)).toBe(true);
		});
	});

	//--------------------------------------------------------------------
	// getSearchIndex
	//--------------------------------------------------------------------

	describe('getSearchIndex', () => {
		it('returns an array', () => {
			expect(service.getSearchIndex()).toBeInstanceOf(Array);
		});

		it('includes category entries', () => {
			const index = service.getSearchIndex();
			const categories = index.filter((e) => e.type === 'category');

			expect(categories.length).toBeGreaterThan(0);
		});

		it('includes section entries', () => {
			const index = service.getSearchIndex();
			const sections = index.filter((e) => e.type === 'section');

			expect(sections.length).toBeGreaterThan(0);
		});

		it('includes service entries', () => {
			const index = service.getSearchIndex();
			const services = index.filter((e) => e.type === 'service');

			expect(services.length).toBeGreaterThan(0);
		});

		it('category entries have correct href', () => {
			const index = service.getSearchIndex();
			const essentials = index.find((e) => e.type === 'category' && e.name === 'Essentials');

			expect(essentials?.href).toBe('/awesome-privacy/essentials');
			expect(essentials?.categorySlug).toBe('essentials');
			expect(essentials?.sectionSlug).toBeUndefined();
			expect(essentials?.serviceSlug).toBeUndefined();
		});

		it('section entries have correct href and slugs', () => {
			const index = service.getSearchIndex();
			const section = index.find((e) => e.type === 'section' && e.name === 'Password Managers');

			expect(section?.href).toBe('/awesome-privacy/essentials/password-managers');
			expect(section?.categorySlug).toBe('essentials');
			expect(section?.sectionSlug).toBe('password-managers');
			expect(section?.serviceSlug).toBeUndefined();
		});

		it('service entries have correct href and slugs', () => {
			const index = service.getSearchIndex();
			const svc = index.find((e) => e.type === 'service' && e.name === 'Bitwarden');

			expect(svc?.href).toBe('/awesome-privacy/essentials/password-managers/bitwarden');
			expect(svc?.categorySlug).toBe('essentials');
			expect(svc?.sectionSlug).toBe('password-managers');
			expect(svc?.serviceSlug).toBe('bitwarden');
		});

		it('service entries include a description', () => {
			const index = service.getSearchIndex();
			const svc = index.find((e) => e.type === 'service' && e.name === 'Bitwarden');

			expect(typeof svc?.description).toBe('string');
			expect(svc!.description!.length).toBeGreaterThan(0);
		});
	});
});
