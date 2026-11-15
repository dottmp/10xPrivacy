import { load } from 'js-yaml';

import rawYaml from '../../data/awesome-privacy.yml?raw';
import rawStack from '../../data/stack.yml?raw';

import type {
	AwesomePrivacyData,
	Category,
	SearchEntry,
	Section,
	Service,
	ShortService,
	Stack,
	StackGroup
} from './types';

import { FEATURED_CATEGORIES } from '#lib/configs.ts';

export class AwesomePrivacy {
	readonly featuredCatgories = FEATURED_CATEGORIES;

	private _data: AwesomePrivacyData = this._loadData();
	private _stack: Stack = this._loadStack();
	private _searchIndex: SearchEntry[] | null = null;

	constructor(featuredCategories?: string[]) {
		if (featuredCategories) {
			this.featuredCatgories = featuredCategories;
		}
		this._mergeStack();
	}

	/*
	 * Reads the YAML data from the raw string and parses it into a JavaScript object.
	 */
	private _loadData(): AwesomePrivacyData {
		return load(rawYaml) as AwesomePrivacyData;
	}

	/*
	 * Reads the stack YAML and returns it in file order.
	 */
	private _loadStack(): Stack {
		return load(rawStack) as Stack;
	}

	/*
	 * Merges stack notes onto every service with a matching name.
	 * Matching ignores case, since upstream spells names inconsistently.
	 */
	private _mergeStack(): void {
		const notes = new Map<string, string | undefined>();

		for (const group of this._stack.groups) {
			for (const item of group.items) {
				notes.set(item.name.toLowerCase(), item.note);
			}
		}

		for (const category of this._data.categories) {
			for (const section of category.sections) {
				for (const service of section.services) {
					const key = service.name.toLowerCase();

					if (notes.has(key)) {
						service.stack = { note: notes.get(key), slug: this.slugify(service.name) };
					}
				}
			}
		}
	}

	/*
	 * Gets the entire Awesome Privacy data object.
	 */
	public getData(): AwesomePrivacyData {
		return this._data;
	}

	/**
	 * Gets the team stack groups in file order.
	 */
	public getStack(): StackGroup[] {
		return this._stack.groups;
	}

	/**
	 * Gets tools the team uses that awesome-privacy does not list.
	 */
	public getStackNotableMentions(): ShortService[] {
		return this._stack.notableMentions ?? [];
	}

	/**
	 * Finds a service by name and returns it with the slugs needed to link to it.
	 * Returns the first match in document order.
	 */
	public findService(name: string):
		| {
				service: Service;
				categorySlug: string;
				sectionSlug: string;
				serviceSlug: string;
		  }
		| undefined {
		for (const category of this._data.categories) {
			const categorySlug = this.slugify(category.name);

			for (const section of category.sections) {
				const sectionSlug = this.slugify(section.name);
				const service = section.services.find(
					(entry) => entry.name.toLowerCase() === name.toLowerCase()
				);

				if (service) {
					return {
						service,
						categorySlug,
						sectionSlug,
						serviceSlug: this.slugify(service.name)
					};
				}
			}
		}

		return undefined;
	}

	/**
	 * Slugifies a name by converting it to lowercase, replacing spaces with hyphens, and removing special characters.
	 *
	 * "Password Managers" → "password-managers"
	 * */
	public slugify(name: string): string {
		return name.toLowerCase().replace(/\s/g, '-').replace(/\+|&/g, 'and').replaceAll('?', '');
	}

	/**
	 * Converts a slug back to a human-readable
	 */
	public slugToName(slug: string): string {
		return slug
			.replace(/-/g, ' ')
			.replace(/and/g, '&')
			.replaceAll('?', '')
			.replace(/\b\w/g, (char) => char.toUpperCase());
	}

	/*
	 * Gets the list of categories from the data.
	 */
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

	/**
	 * Returns a flat array of all categories, sections, and services with their slugs and hrefs.
	 */
	public getSearchIndex(): SearchEntry[] {
		if (this._searchIndex) return this._searchIndex;

		const entries: SearchEntry[] = [];

		for (const category of this._data.categories) {
			const categorySlug = this.slugify(category.name);

			entries.push({
				type: 'category',
				name: category.name,
				categorySlug,
				href: `/awesome-privacy/${categorySlug}`
			});

			for (const section of category.sections) {
				const sectionSlug = this.slugify(section.name);

				entries.push({
					type: 'section',
					meta: {
						parent: category.name
					},
					name: section.name,
					description: section.intro,
					categorySlug,
					sectionSlug,
					href: `/awesome-privacy/${categorySlug}/${sectionSlug}`
				});

				for (const service of section.services) {
					const serviceSlug = this.slugify(service.name);

					entries.push({
						type: 'service',
						name: service.name,
						description: service.description,
						meta: {
							parent: `${category.name},${section.name}`,
							url: service.url,
							icon: service.icon
						},
						categorySlug,
						sectionSlug,
						serviceSlug,
						href: `/awesome-privacy/${categorySlug}/${sectionSlug}/${serviceSlug}`
					});
				}
			}
		}

		this._searchIndex = entries;
		return entries;
	}
}

export const awesomePrivacy = new AwesomePrivacy();
