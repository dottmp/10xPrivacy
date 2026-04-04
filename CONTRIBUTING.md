# Contributing

## Ways to contribute

Contributions are welcome. Feel free to open an issue or pull request for:

- New privacy website suggestions
- Bug fixes or improvements
- Additional RSS news sources

## Release Process (maintainers)

This project uses [release-it](https://github.com/release-it/release-it) for versioning, changelog generation, and GitHub Releases.

### Branches

| Branch | Purpose                                                                     |
| ------ | --------------------------------------------------------------------------- |
| `dev`  | Default branch. All PRs target this branch. Deployed to Cloudflare preview. |
| `main` | Production branch. Deployed to Cloudflare automatically on merge.           |

### Releasing (maintainers)

When the changes on `dev` are ready to ship, run from the `dev` branch:

```bash
bun run release
```

This will interactively:

1. Show a changelog preview from commits since the last release
2. Ask you to confirm the version bump (patch / minor / major)
3. Bump `package.json` version
4. Update `CHANGELOG.md`
5. Commit and push the version bump to `dev`
6. Create and push a git tag (e.g. `v0.1.0`)
7. Create a GitHub Release with changelog notes

Then open a PR from `dev → main` on GitHub and merge it. Cloudflare will automatically deploy to production.

> Requires `GITHUB_TOKEN` to be set in your environment for GitHub Release creation.
