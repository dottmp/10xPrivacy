import { awesomePrivacy } from './service';
import type { Service } from './types';

export type StackDisplayEntry = {
	name: string;
	note?: string;
	href: string;
	service: Service;
};

export type StackDisplayGroup = {
	name: string;
	items: StackDisplayEntry[];
};

export function buildStackGroups(): StackDisplayGroup[] {
	return awesomePrivacy.getStack().map((group) => ({
		name: group.name,
		items: group.items.flatMap((item) => {
			const found = awesomePrivacy.findService(item.name);

			if (!found) return [];

			return [
				{
					name: found.service.name,
					note: item.note,
					href: `/awesome-privacy/${found.categorySlug}/${found.sectionSlug}/${found.serviceSlug}`,
					service: found.service
				}
			];
		})
	}));
}
