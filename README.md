<div align="center">

# 10xPrivacy

**A digital privacy hub — news, tools, and resources against surveillance capitalism.**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Built with SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Powered by Bun](https://img.shields.io/badge/Bun-runtime-fbf0df?logo=bun&logoColor=black)](https://bun.sh)

</div>

## Getting Started

### Prerequisites

- [Bun](https://bun.sh)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/dottmp/10xPrivacy.git
cd 10xprivacy

# Install dependencies
bun install

# Start the development server
bun run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

```bash
bun run dev                   # Start dev server
bun run build                 # Production build
bun run preview               # Preview production build

bun run check                 # Type check with svelte-check
bun run test                  # Run unit tests

bun run lint                  # Check formatting & lint
bun run fix                   # Auto-fix formatting & lint issues

bun run sync:awesome-privacy  # Pull latest Awesome Privacy dataset
```

## Data Sources

| Source                                                        | Type              |
| ------------------------------------------------------------- | ----------------- |
| [Tuta Blog](https://tuta.com/blog)                            | RSS feed          |
| [Privacy Guides](https://www.privacyguides.org)               | RSS feed          |
| [Techlore](https://techlore.tech)                             | RSS feed          |
| [Awesome Privacy](https://github.com/Lissy93/awesome-privacy) | YAML dataset      |
| Privacy Websites                                              | Hand-curated JSON |

## Contributing

Contributions are welcome. Feel free to open an issue or pull request for:

- New privacy website suggestions
- Bug fixes or improvements
- Additional RSS news sources

## Acknowledgements

- [Lissy93/awesome-privacy](https://github.com/Lissy93/awesome-privacy) — the Awesome Privacy dataset used in this project is MIT licensed, created and maintained by Alicia Sykes.
- [dachinat/daisyui-themes](https://github.com/dachinat/daisyui-themes) — DaisyUI themes, CC-BY-4.0 licensed.

## License

© 2026 dottmp — Released under the [MIT License](./LICENSE).
