# CLIENT MODULES

_Shared node modules for codecademy.com & co_

---

[![CircleCI](https://circleci.com/gh/Codecademy/client-modules.svg?style=svg&circle-token=3d9adfca5a8b44e7297ceb18e032e89a11d223a2)](https://circleci.com/gh/Codecademy/client-modules)

This repository is a monorepo that we manage using [Lerna](https://lernajs.io/). That means that we publish several packages to npm from the same codebase, including:

## Local development

1.  Run `yarn` in the root directory
1.  Run `yarn build`

### Publishing Modules

1.  Make your changes in a feature branch, and get another engineer to review your code
1.  At this time, determine what kind of version bump your changes will require and add the appropriate label to your PR
    - If your changes are backwards compatible, you can use a `release/patch` or `release/minor` version label
    - If your changes are not backwards compatible, you will need to use a `release/major` version label
1.  After your code has been reviewed and tested, you can merge your branch into main.
1.  Make sure to update the release notes section in your PR description, this will end up in the changelog
1.  You can now merge your changes
1.  Once your branch is merged into main, it will be published automatically by Github Actions
1.  You can find the new version number on npmjs.com/package/<package-name>, or find it in that package's `package.json` on the `main` branch

### Publishing an alpha version of a module

Every PR that changes files in a package publishes alpha releases that you can use to test your changes across applications.

1.  Create a PR or Draft PR.
    - This will kickoff a Circle-CI workflow which will publish an alpha build. (This will appear in Github as the "Deploy")
1.  After the alpha build is published, the description of your PR should update with the latest versions of the packages that were published.
1.  Install this version of the package in your application you wish to test your changes on.

### Working with pre-published changes

For quicker development cycles, it's possible to run a pre-published version of a client-modules package in another project.
We do that using symlinks (the following instructions assume you have set up and built client-modules):

1. `cd /path/to/client-modules/packages/eslint-config`
1. `yarn link`
1. `cd path/to/other/repo`
1. `yarn link @codecademy/eslint-config`
1. `yarn install`

### Adding a New Package

1. Create a new directory at `packages/<package-name>/package.json`.
1. Use `yarn lerna create` to create the new package, copying values from existing `package.json`s when unsure.
   - Also copy the `publishConfig` field to let your published package be public by default
1. Create a minimal amount of source code in the new package
   - Example: a simple `tsconfig.json` with a `index.ts` exporting a single object
1. Run `yarn lerna bootstrap` from the repository root
1. Send a `feat` PR adding that package
1. One merged, message out in our #frontend Slack channel to other client-modules developers to re-run `yarn lerna bootstrap` after they merge from `main`

**Turborepo**

This monorepo uses [Turborepo](https://turborepo.org/) to cache previous builds locally and in CI.

The config for Turborepo is located at [/turbo.json](/turbo.json).

To use Turborepo without extra configuration, if your package needs to be compiled, it should have a task called `build` that compiles it's files and puts them into a directory called `dist` inside the package directory. If you need a more complicated setup, you can read the docs and customize the configuration in `turbo.json`.

**Type**

The `type` determines what kind of version bump is needed. A `fix` will create a `patch` release, while a `feat` will create a `minor` release. Major version updates require a special syntax that is described below.

`type` must be one of the following options:

Type labels:

- **feat**: A new feature
- **fix**: A bug fix
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **docs**: Documentation only changes
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **ci**: Changes to our CI configuration files and scripts
- **build**: Changes that affect the build system or external dependencies

**Scope**

A scope is optional and consists of a noun describing a section of the codebase surrounded by parenthesis, e.g., feat(Button):

**Breaking Changes**

Adding an exclamation point after your type, before the colon, will indicate that your PR contains a breaking change, and increment the major version number of the modules you changed.

Examples:

`feat!: made a breaking change in the Button component`

`feat(Button)!: made a breaking change in the Button component`

You should do this if your changes introduce any incompatibilities with previous versions of the module.
This will indicate to package consumers that they need to refactor their usage of the module to upgrade.

#### Breaking Changes Release Process

Because client-modules is a separate repository from its consumers, it can be tricky to coordinate technically breaking changes.
If your changes will require changes in any downstream repositories:

1. Create a PR in client-modules to create alpha package versions
2. Create PRs in the repositories using those alpha package versions
3. Update each downstream PR description to link to the client-modules PR, and vice versa
4. Once all PRs have been approved, merge your client-modules PR first
5. Update your repository PRs to use the new (non-alpha) package versions once published
6. Merge your repository PRs

This process minimizes the likelihood of accidental breaking changes in client-modules negatively affecting development on our other repositories.

**Body**

Optional extra description for your changes.

This goes in the description for your PR, between the `<!--- CHANGELOG-DESCRIPTION -->` comment tags in the PR template.

If you include the text `BREAKING CHANGE:` in your description it will trigger a major version bump. We prefer to use the `feat!:` syntax for breaking changes described above.
