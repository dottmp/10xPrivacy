import yaml from 'js-yaml';

import { tryCatch } from './utils/try-catch';

export type ShortService = {
	name: string;
	description: string;
	url: string;
};

export type Service = {
	name: string;
	description: string;
	url: string;
	github?: string;
	icon?: string;
	links?: Array<{
		title: string;
		url: string;
	}>;
	followWith?: string;
	securityAudited?: boolean;
	openSource?: boolean;
	acceptsCrypto?: boolean;
	tosdrId?: string;
	iosApp?: string;
	androidApp?: string;
	discordInvite?: string;
	subreddit?: string;
};

export type Section = {
	name: string;
	services: Service[];
	intro?: string;
	notableMentions?: ShortService[] | string;
	furtherInfo?: string;
	wordOfWarning?: string;
	alternativeTo?: string[];
};

export type Category = {
	name: string;
	sections: Section[];
};

export type AwesomePrivacyData = {
	categories: Category[];
};

class AwesomePrivacy {
	readonly featuredCatgories = [
		'Essentials',
		'Communication',
		'Networking',
		'Security Tools',
		'Operating Systems',
		'Productivity'
	];

	constructor(featuredCategories?: string[]) {
		if (featuredCategories) {
			this.featuredCatgories = featuredCategories;
		}
	}

	private _baseUrl =
		'https://raw.githubusercontent.com/Lissy93/awesome-privacy/main/awesome-privacy.yml' as const;

	public async fetchData(fetch: typeof globalThis.fetch): Promise<AwesomePrivacyData> {
		const { data: res, error } = await tryCatch(fetch(this._baseUrl));

		if (error) {
			throw new Error(`Unexpected error while fetching awesome-privacy.yml: ${error.message}`);
		}

		if (!res.ok) {
			throw new Error(`Failed to fetch awesome-privacy.yml: HTTP ${res.status}`);
		}

		const text = await res.text();

		return yaml.load(text) as AwesomePrivacyData;
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
	 * Gets the category object from the data based on the provided category slug.
	 */
	public findCategory(data: AwesomePrivacyData, categorySlug: string) {
		return data.categories.find((category) => this.slugify(category.name) === categorySlug);
	}
	/**
	 * Gets the featured categories from the data based on the predefined list of featured category names.
	 */
	public findFeaturedCategories(data: AwesomePrivacyData) {
		return data.categories.filter((category) => this.featuredCatgories.includes(category.name));
	}
	/**
	 * Gets the section object from the data based on the provided category slug and section slug.
	 */
	public findSection(
		data: AwesomePrivacyData,
		categorySlug: string,
		sectionSlug: string
	): Section | undefined {
		return this.findCategory(data, categorySlug)?.sections.find(
			(section) => this.slugify(section.name) === sectionSlug
		);
	}
	/**
	 * Gets the service object from the data based on the provided category slug, section slug, and service slug.
	 */
	public findService(
		data: AwesomePrivacyData,
		categorySlug: string,
		sectionSlug: string,
		serviceSlug: string
	): Service | undefined {
		return this.findSection(data, categorySlug, sectionSlug)?.services.find(
			(service) => this.slugify(service.name) === serviceSlug
		);
	}
}

export const awesomePrivacy = new AwesomePrivacy();
