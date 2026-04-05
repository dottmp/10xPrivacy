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

export type SearchEntryType = 'category' | 'section' | 'service';

export type SearchEntry = {
	type: SearchEntryType;
	name: string;
	meta?: {
		url?: string;
		icon?: string;
	};
	description?: string;
	categorySlug: string;
	sectionSlug?: string;
	serviceSlug?: string;

	href: string;
};
