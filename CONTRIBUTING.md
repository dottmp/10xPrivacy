# Contributing

## Ways to contribute

Contributions are welcome. Feel free to open an issue or pull request for:

- New privacy website suggestions
- Bug fixes or improvements
- Additional RSS news sources

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org). Commit messages drive automatic version bumping and changelog generation.

### Format

```
<type>: <short description>
```

### Types

| Type       | When to use                                     | Version bump |
| ---------- | ----------------------------------------------- | ------------ |
| `feat`     | New feature or capability                       | `minor`      |
| `fix`      | Bug fix                                         | `patch`      |
| `chore`    | Maintenance, deps, config — nothing user-facing | none         |
| `docs`     | Documentation only                              | none         |
| `refactor` | Code restructure, no behaviour change           | none         |
| `test`     | Adding or updating tests                        | none         |
| `ci`       | CI/CD changes                                   | none         |

For a **breaking change**, add `!` after the type:

```
feat!: redesign navigation
```

This triggers a `major` version bump.

### Examples

```bash
feat: add RSS feed filter by category
fix: correct broken link in privacy tools list
chore: update dependencies
docs: improve getting started guide
refactor: extract fetch logic into utility function
ci: add lint step to CI workflow
feat!: remove legacy theme support
```

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
