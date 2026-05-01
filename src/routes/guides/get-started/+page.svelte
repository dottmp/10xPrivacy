<script lang="ts">
	import { resolve } from '$app/paths';
	import Heading from '$lib/components/headings/heading.svelte';
</script>

<main class="mx-auto max-w-3xl px-4 py-16">
	<article>
		<header class="mb-4">
			<Heading size="display">Getting Started with Digital Privacy</Heading>
		</header>

		<div
			class="prose prose-base max-w-none not-prose-headings:text-base/6 not-prose-headings:text-base-content/50 not-prose-headings:sm:text-sm/6"
		>
			<h2>What is digital privacy?</h2>
			<p>
				Digital privacy is about control. Controling what personal data that goes out and what stays
				with you. Every time you search, open an app, or send a message, that data goes somewhere.
				Alot of the time it&apos;s being collected, stored, analyzed, and sold. Digital privacy is
				about opting out of that and taking back your control.
			</p>
			<p>
				It&apos;s not about having something to hide. It&apos;s about the simple fact that your data
				belongs to you, not to Google, not to Meta, not to your ISP.
			</p>

			<h2>Three concepts you need to know</h2>

			<p>
				Privacy, security, and anonymity often overlap but one doesn&apos;t mean the other applies.
				Chromium is one of the most secure browsers out there but in terms of privacy and anonymity
				it&apos;s horrible.
			</p>

			<ul>
				<li>
					<strong>Privacy</strong> — Your data is only seen by the parties you intend to see it.
				</li>
				<li><strong>Security</strong> — You can trust the applications you use.</li>
				<li>
					<strong>Anonymity</strong> — You can act without being identified. Tor gives you this.
				</li>
			</ul>

			<h2>Core principles</h2>

			<h3>Privacy is not binary</h3>
			<p>
				A VPN doesn&apos;t make you anonymous. But combining tools and making small changes adds up
				over time. Think of it like eating healthy and working out. You don't get jacked after one
				workout but overtime it adds up.
			</p>

			<h3>Don&apos;t put all your eggs in one basket</h3>
			<p>
				We tend to lean on one company for ease of use because they promise a seamless experience.
				Don&apos;t fall into that trap again. It&apos;s tempting to go all in on something like
				Proton because they have a whole suite — VPN, email, drive, passwords, 2FA. But if your
				account gets compromised or Proton turns bad, a bad actor suddenly has access to everything.
				Spread out your services.
			</p>

			<h3>You don&apos;t have to do it all</h3>
			<p>
				You can go as deep as you want. Some people switch their browser and call it a day. Others
				self-host their entire stack. Neither is wrong. Do what makes sense for you and your threat
				model.
			</p>

			<h3>Self-host vs trust a provider</h3>
			<p>
				There are two routes: host it yourself or let someone else do it. Self-hosting gives you
				full control but requires time, skills, and maintenance. Trusting a good provider is easier
				but means you&apos;re putting trust in someone else. Both are valid — pick what suits you,
				or combine both.
			</p>

			<h3>Privacy respecting vs privacy practicing</h3>
			<p>
				There&apos;s a difference between a product that says it respects your privacy and one that
				actually practices it. Look for open-source, audited products with a track record.
			</p>

			<h2>Common misconceptions</h2>

			<blockquote>&ldquo;I have nothing to hide&rdquo;</blockquote>
			<p>
				It's like saying "I don't need a seatbelt becuase I'm not going to crash". Privacy
				isn&apos;t about hiding — it&apos;s about controling.
			</p>

			<blockquote>&ldquo;It&apos;s already too late&rdquo;</blockquote>
			<p>
				That&apos;s like saying you haven&apos;t worked out in years so you might as well never
				start. Privacy is not binary, every step counts and it&apos;s never too late.
			</p>

			<blockquote>&ldquo;Why bother, I still use some Google services&rdquo;</blockquote>
			<p>
				Because reducing your exposure matters even if you can&apos;t eliminate it entirely. You
				don&apos;t have to go full golden monk mode. Just start somewhere.
			</p>

			<blockquote>&ldquo;E2E encryption is for criminals only&rdquo;</blockquote>

			<p>Yes, crimnals also uses pants so you shouldn&apos;t wear pants either.</p>

			<div class="not-prose card my-8 bg-primary text-primary-content">
				<div class="card-body items-center text-center">
					<h2 class="card-title">Ready to take action?</h2>
					<p>
						Check out our checklist with actionable steps ranked by impact and effort — start from
						the top and work your way down.
					</p>
					<div class="card-actions justify-center">
						<a href={resolve('/guides/checklist')} class="btn btn-secondary"> Let&apos;s go! </a>
					</div>
				</div>
			</div>
		</div>
	</article>
</main>
