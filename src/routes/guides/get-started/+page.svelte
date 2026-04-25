<script lang="ts">
	import { resolve } from '$app/paths';
	import Heading from '$lib/components/headings/heading.svelte';
	import { Icons } from '$lib/components/icons/icons.svelte';
</script>

<main class="mx-auto max-w-3xl px-4 py-16">
	<article>
		<header class="mb-4">
			<Heading size="display">What is Digital Privacy?</Heading>
		</header>

		<div class="mb-6 alert alert-soft alert-warning">
			<Icons.warning class="shrink-0" />
			<p>
				This page is still under construction <span>(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧</span>
			</p>
		</div>

		<div
			class="prose prose-base max-w-none not-prose-headings:text-base/6 not-prose-headings:text-base-content/50 not-prose-headings:sm:text-sm/6"
		>
			<p>
				Digital privacy is the protection of personal information and data in the online world.
				It&apos;s about you controlling what data is being shared about you — and what isn&apos;t.
				It&apos;s about opting out of mass surveillance and saying no to companies using your
				information for their benefit at your cost.
			</p>

			<ul>
				<li>
					<strong>Privacy</strong> — The assurance that your data is only seen by the parties you intend
					to view it.
				</li>
				<li><strong>Security</strong> — The ability to trust the applications you use.</li>
				<li>
					<strong>Anonymity</strong> — The ability to act without being identified. Tor gives you this.
				</li>
			</ul>

			<p>
				These often overlap, but one doesn&apos;t mean the other applies. Chromium is one of the
				most secure browsers, but in terms of privacy and anonymity it&apos;s horrible.
			</p>

			<h2>Key Principles</h2>

			<h3>Privacy is Not Binary</h3>
			<p>
				It's never too late to start, its never either all or nothing, and you don't have to do
				everything. Start with something simple, like switching your search engine, then move on to
				browser, and so on. Every step you take is a win, and it adds up over time.
			</p>

			<h3>Don&apos;t Put All Your Eggs in One Basket</h3>
			<p>
				We tend to lean on one company for ease of use. Don&apos;t fall into that trap. It&apos;s
				tempting to go all in on a compnay like Proton because of their whole suite of products.
				It&apos;s better to have a mix of different providers, so if one gets compromised, you
				don&apos;t lose everything.
			</p>

			<h2>Common Misconceptions</h2>

			<blockquote>&ldquo;It&apos;s already too late&rdquo;</blockquote>
			<p>
				Every step you take is a win, and it adds up over time. See digital privacy as eating
				healthy — you don&apos;t have to be perfect, and you can start at any time.
			</p>

			<blockquote>&ldquo;E2E encryption is for criminals only&rdquo;</blockquote>
			<p>Yes, crimnals also uses pants so you shouldn&apos;t wear pants either.</p>

			<div class="not-prose card my-8 bg-primary text-primary-content">
				<div class="card-body items-center text-center">
					<h2 class="card-title">Ready to take action?</h2>
					<p>
						Don't know where to start? Check out our simple checklist with actionable steps to start
						your privacy journey.
					</p>
					<div class="card-actions justify-center">
						<a href={resolve('/guides/checklist')} class="btn btn-secondary"> Lets go! </a>
					</div>
				</div>
			</div>
		</div>
	</article>
</main>
