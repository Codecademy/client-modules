# (Wed Dec 06 2023)

#### 🔩 Dependency Updates

- chore(deps-dev): bump the development-dependencies group with 5 updates [#88](https://github.com/Codecademy/client-modules/pull/88) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump json5 from 1.0.1 to 1.0.2 [#85](https://github.com/Codecademy/client-modules/pull/85) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump semver from 5.7.1 to 5.7.2 [#72](https://github.com/Codecademy/client-modules/pull/72) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- chore(deps): bump word-wrap from 1.2.3 to 1.2.4 [#73](https://github.com/Codecademy/client-modules/pull/73) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- `@codecademy/styleguide@0.6.6`, `@codecademy/webpack-config@6.4.1`
  - chore(deps-dev): bump the development-dependencies group with 35 updates [#83](https://github.com/Codecademy/client-modules/pull/83) ([@dependabot[bot]](https://github.com/dependabot[bot]) [@jakemhiller](https://github.com/jakemhiller))

#### ⚠️ Pushed to `main`

- ci: update dependabot again ([@jakemhiller](https://github.com/jakemhiller))
- chore: update dependabot.yml ([@jakemhiller](https://github.com/jakemhiller))
- chore: try out dependabot grouping ([@jakemhiller](https://github.com/jakemhiller))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Jake Hiller ([@jakemhiller](https://github.com/jakemhiller))

---

# (Thu May 11 2023)

### Release Notes

#### bump babel-plugin-react-anonymous-display-name ([#71](https://github.com/Codecademy/client-modules/pull/71))

updates `babel-plugin-react-anonymous-display-name` dependency

### PR Checklist

- [ ] Related to JIRA ticket: ABC-123
- [ ] I have run this code to verify it works
- [ ] This PR includes unit tests for the code change

<!--
Merging your changes

The "Release Notes" section of the PR description is what will be used in the changelog. Please make sure it describes the changes in a way that is useful to the end users.

Add the correct `releases/*` label to the PR. If you are unsure which label to use, please refer to the README or ask a Web Platform engineer.

-->

#### Delete dependabot.yml ([#69](https://github.com/Codecademy/client-modules/pull/69))

Remove dependabot config, only allow security PRs.

### PR Checklist

- [ ] Related to JIRA ticket: ABC-123
- [ ] I have run this code to verify it works
- [ ] This PR includes unit tests for the code change

<!--
Merging your changes

The "Release Notes" section of the PR description is what will be used in the changelog. Please make sure it describes the changes in a way that is useful to the end users.

Add the correct `releases/*` label to the PR. If you are unsure which label to use, please refer to the README or ask a Web Platform engineer.

-->

#### use auto for simpler lerna publishing ([#61](https://github.com/Codecademy/client-modules/pull/61))

Utilizes [Auto](https://intuit.github.io/auto/index) to handle versioning/publishing (which uses lerna under the hood). This simplifies a ton of stuff.

1. We don't need to deal with any conventional commits stuff, the version is selected using labels (the labels are already there if you want to check them)
2. Auto handles canary releases (alphas), and adds the versions to the PR description automatically.
3. We can let people merge their own PRs, since `auto` handles generating the changelogs from the PR descriptions.
4. We can add required checks that actually work, now that we don't need to automate merging.
5. We can easily replicate this process across all of our repos that do publishing

---

#### 🐛 Bug Fix

- `babel-preset-codecademy@7.0.1`
  - bump babel-plugin-react-anonymous-display-name [#71](https://github.com/Codecademy/client-modules/pull/71) ([@jakemhiller](https://github.com/jakemhiller))

#### ⚠️ Pushed to `main`

- Update dependabot.yml ([@jakemhiller](https://github.com/jakemhiller))
- add statuses permission ([@jakemhiller](https://github.com/jakemhiller))
- add checks permissions ([@jakemhiller](https://github.com/jakemhiller))
- fix workflow issue ([@jakemhiller](https://github.com/jakemhiller))
- update dependabot token ([@jakemhiller](https://github.com/jakemhiller))

#### 🏠 Internal

- Revert "Delete dependabot.yml" [#70](https://github.com/Codecademy/client-modules/pull/70) ([@jakemhiller](https://github.com/jakemhiller))
- Delete dependabot.yml [#69](https://github.com/Codecademy/client-modules/pull/69) ([@jakemhiller](https://github.com/jakemhiller))
- use auto for simpler lerna publishing [#61](https://github.com/Codecademy/client-modules/pull/61) ([@jakemhiller](https://github.com/jakemhiller))

#### Authors: 1

- Jake Hiller ([@jakemhiller](https://github.com/jakemhiller))
