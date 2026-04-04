declare global {
	const __APP_VERSION__: string;

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageState {}
		// interface Platform {}
		interface PageData {
			meta?: {
				title?: string;
				description?: string;
			};
		}
	}
}

export {};
