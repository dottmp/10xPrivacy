import yaml from 'js-yaml';

import rawYaml from '../../data/awesome-privacy.yml?raw';

import type { AwesomePrivacyData, Category, Section, Service } from './types';

export class AwesomePrivacy {
	readonly featuredCatgories = [
		'Essentials',
		'Communication',
		'Networking',
		'Security Tools',
		'Operating Systems',
		'Productivity'
	];

	private _data: AwesomePrivacyData = this._loadData();

	constructor(featuredCategories?: string[]) {
		if (featuredCategories) {
			this.featuredCatgories = featuredCategories;
		}
	}

	private _loadData(): AwesomePrivacyData {
		return yaml.load(rawYaml) as AwesomePrivacyData;
	}

	public getData(): AwesomePrivacyData {
		return this._data;
	}

	/**
	 * Slugifies a name by converting it to lowercase, replacing spaces with hyphens, and removing special characters.
	 *
	 * "Password Managers" → "password-managers"
	 * */
	public slugify(name: string): string {
		return name.toLowerCase().replace(/\s/g, '-').replace(/\+|&/g, 'and').replaceAll('?', '');
	}

	public slugToName(slug: string): string {
		return slug
			.replace(/-/g, ' ')
			.replace(/and/g, '&')
			.replaceAll('?', '')
			.replace(/\b\w/g, (char) => char.toUpperCase());
	}

	public getCategories(): Category[] {
		return this._data.categories;
	}

	/**
	 * Gets the category object from the data based on the provided category slug.
	 */
	public getCategory({ categorySlug }: { categorySlug: string }): Category | undefined {
		return this._data.categories.find((category) => this.slugify(category.name) === categorySlug);
	}
	/**
	 * Gets the featured categories from the data based on the predefined list of featured category names.
	 */
	public getFeaturedCategories() {
		return this._data.categories.filter((category) =>
			this.featuredCatgories.includes(category.name)
		);
	}
	/**
	 * Gets the section object from the data based on the provided category slug and section slug.
	 */
	public getSection({
		categorySlug,
		sectionSlug
	}: {
		categorySlug: string;
		sectionSlug: string;
	}): Section | undefined {
		return this.getCategory({ categorySlug })?.sections.find(
			(section) => this.slugify(section.name) === sectionSlug
		);
	}
	/**
	 * Gets the service object from the data based on the provided category slug, section slug, and service slug.
	 */
	public getService({
		serviceSlug,
		categorySlug,
		sectionSlug
	}: {
		serviceSlug: string;
		categorySlug: string;
		sectionSlug: string;
	}): Service | undefined {
		return this.getSection({ categorySlug, sectionSlug })?.services.find(
			(service) => this.slugify(service.name) === serviceSlug
		);
	}
}

export const awesomePrivacy = new AwesomePrivacy();
