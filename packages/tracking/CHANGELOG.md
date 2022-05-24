# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.23.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.22.0...@codecademy/tracking@0.23.0) (2022-05-24)


### Features

* **tracking:** :sparkles: Including field to track business seat data  ([#46](https://github.com/Codecademy/client-modules/issues/46)) ([331893d](https://github.com/Codecademy/client-modules/commit/331893dd50b5bdbe861330b16744ae9f58d719be))



## [0.22.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.21.1...@codecademy/tracking@0.22.0) (2022-05-16)


### Features

* **tracking:** Adding misc field for click and visit events ([57ae584](https://github.com/Codecademy/client-modules/commit/57ae584d3519db2d40b9a4c021fbee309df59d75))



### [0.21.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.21.0...@codecademy/tracking@0.21.1) (2022-05-13)


### Bug Fixes

* **tracking:** pick content_ids ([bd8b0a6](https://github.com/Codecademy/client-modules/commit/bd8b0a63eb6d8cfda2c0471fddcb7954898fbc75))



## [0.21.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.20.0...@codecademy/tracking@0.21.0) (2022-05-13)


### Features

* **tracking:** add UserSharedData to user impressions ([6378ec2](https://github.com/Codecademy/client-modules/commit/6378ec2cb4f076210fa842dcfb07b43717afd1f9))



## [0.20.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.19.0...@codecademy/tracking@0.20.0) (2022-04-11)


### Features

* **tracking:** add experiment category to tracking types ([4fa1528](https://github.com/Codecademy/client-modules/commit/4fa1528e719df904b88953edb8a625aa06610206))



## [0.19.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.18.1...@codecademy/tracking@0.19.0) (2022-03-10)


### Features

* **Tracking:** add is_ugc attribute to tracking types ([2fe9c08](https://github.com/Codecademy/client-modules/commit/2fe9c083d0205e6af8dd928e9c291ebbeeeb6cbb))



### [0.18.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.18.0...@codecademy/tracking@0.18.1) (2022-02-02)

**Note:** Version bump only for package @codecademy/tracking





## [0.18.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.17.1...@codecademy/tracking@0.18.0) (2021-12-20)


### Features

* **Tracking:** add search id param to userclick data ([7150c44](https://github.com/Codecademy/client-modules/commit/7150c44d665624502cfd95ac0020130b5ab8c26a))



### [0.17.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.17.0...@codecademy/tracking@0.17.1) (2021-12-17)


### Bug Fixes

* **tracking:** remove navigator.sendBeacon .bind and add try/catch ([b924d7e](https://github.com/Codecademy/client-modules/commit/b924d7e1ffd22d75adcaf15c9726d10f19b2924e))



## [0.17.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.16.1...@codecademy/tracking@0.17.0) (2021-11-30)


### ⚠ BREAKING CHANGES

* **eslint-config:** bump ESLint to 8 and typescript-eslint to 5 (#4)

### Features

* **eslint-config:** bump ESLint to 8 and typescript-eslint to 5 ([#4](https://github.com/Codecademy/client-modules/issues/4)) ([64423d6](https://github.com/Codecademy/client-modules/commit/64423d69ad0f90f2e717373db6b1988b715681cc))



### [0.16.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.16.0...@codecademy/tracking@0.16.1) (2021-11-12)


### Bug Fixes

* **tracking:** super-bind the sendBeacon to navigator ([b32a8ec](https://github.com/Codecademy/client-modules/commit/b32a8ece14b2c2d62abf98f762f1be17690406f8))



## 0.16.0 (2021-11-10)


### ⚠ BREAKING CHANGES

* prepended OneTrust to tracking integrations loads
* clean up tracker and remove auth token

### Features

* **tracking:** Add source tracking for PWA ([32321cc](https://github.com/Codecademy/client-modules/commit/32321cc489dfd2ada1d967ad6630e849ddebd6e6))
* **tracking:** ignore known client failures in fetching destinations ([#2](https://github.com/Codecademy/client-modules/issues/2)) ([432549d](https://github.com/Codecademy/client-modules/commit/432549df9b556672eb9b3a321a90d37dd1009b09))
* add user impression to tracking ([3ec4f61](https://github.com/Codecademy/client-modules/commit/3ec4f6113350859b9d792467ca29b01e0855b4a4))
* bump ESLint configs to latest ([3a403c0](https://github.com/Codecademy/client-modules/commit/3a403c01358f8b4a0d10d99f8d57e1979ebce189))
* **event type:** adding business reporting types ([d4a0243](https://github.com/Codecademy/client-modules/commit/d4a0243b6380666850ef0f4bcfcd3c80a065d011)), closes [/github.com/codecademy-engineering/business-reporting/blob/develop/src/util/eventTracking/index.tsx#L104-L110](https://github.com/Codecademy//github.com/codecademy-engineering/business-reporting/blob/develop/src/util/eventTracking/index.tsx/issues/L104-L110)
* **tracking:** Add a fullstory boolean to TrackingOptions type ([4433669](https://github.com/Codecademy/client-modules/commit/443366955e8beb6aca3337841bf70c583df89f5f))
* **tracking:** Add a new page_career_path_visited event ([#1283](https://github.com/Codecademy/client-modules/issues/1283)) ([1228399](https://github.com/Codecademy/client-modules/commit/12283990e0bfa0d8d03fb78c83c84cab318e68b1))
* **tracking:** Added repo-tracking to user events ([d8a72f1](https://github.com/Codecademy/client-modules/commit/d8a72f19afbb02ba6d0aeef7a6b4b2b55820f111))
* **tracking:** Record the page referrer for every event. ([da11524](https://github.com/Codecademy/client-modules/commit/da11524588571f2ce44bd9af4486b9b64b66408c))
* **tracking:** Update business event name ([8babbf9](https://github.com/Codecademy/client-modules/commit/8babbf98dad5deb25782aa5b72229c2fea1a6c88))
* add container_slugs to UserClickData tracking type ([0a70fec](https://github.com/Codecademy/client-modules/commit/0a70fec80c88833bfad73728ae4a52cd54dc659e))
* added useTrackingIntegrations to tracking package ([b93ca89](https://github.com/Codecademy/client-modules/commit/b93ca897634c62a8d6defb6f6b426395d2daf9f0))
* clean up tracker and remove auth token ([7d98f82](https://github.com/Codecademy/client-modules/commit/7d98f82f64e48984e0913de83aea0635e93b21d9))
* Creating the @codecademy/tracking pachage. ([eb2cdca](https://github.com/Codecademy/client-modules/commit/eb2cdca0f1ecf2f77035ffac39e4c7cbe956bed2))
* onboarded eslint-plugin-simple-import-sort into ESLint plugin ([5eac76b](https://github.com/Codecademy/client-modules/commit/5eac76b95f547f0457360c8f7428af17152d1d67))
* prepended OneTrust to tracking integrations loads ([9c2e18e](https://github.com/Codecademy/client-modules/commit/9c2e18e35f3f3f538dc3727f4efdde3521708b6c))


### Bug Fixes

* Add a runtime dependency ([436c3fb](https://github.com/Codecademy/client-modules/commit/436c3fba8812d6f74181de57dca9e8750e371760))
* Add query params to tracking calls ([#1189](https://github.com/Codecademy/client-modules/issues/1189)) ([6611839](https://github.com/Codecademy/client-modules/commit/661183985d81ca4f75cdfb39a4514f4d7f287d8d))
* allow no user for tracking integrations ([#1726](https://github.com/Codecademy/client-modules/issues/1726)) ([fa31842](https://github.com/Codecademy/client-modules/commit/fa318421ea2396497bf80fe69ba56063330dd0ed))
* bump tracking package babel-preset-codecademy to latest ([5c66f67](https://github.com/Codecademy/client-modules/commit/5c66f67c2833993a0dbd6b2e9441b3e590225437))
* business reporting event types ([2d9fb8e](https://github.com/Codecademy/client-modules/commit/2d9fb8e62d078aed0721df4afae775de2832733f))
* support navigator.sendBeacon not existing ([79b94cc](https://github.com/Codecademy/client-modules/commit/79b94cc0c140da083a770527a7cf4622c6578a97))
* switch tracking 'verbose' type back to boolean ([913c870](https://github.com/Codecademy/client-modules/commit/913c8703fb6a06363b324940d7ee406f839e4b53))
* use old style existence check for navigator.sendBeacon ([f0bf309](https://github.com/Codecademy/client-modules/commit/f0bf30947aa6edb767cab500480a0a71ca147d39))


### Reverts

* Revert "feat(tracking): Add a fullstory boolean to TrackingOptions type" (#1381) ([376df52](https://github.com/Codecademy/client-modules/commit/376df52daec85208bbaf28760c5fd6bfa5e52810)), closes [#1381](https://github.com/Codecademy/client-modules/issues/1381)



## [0.15.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.14.2...@codecademy/tracking@0.15.0) (2021-10-20)


### Features

* **tracking:** Add source tracking for PWA ([84a555f](https://github.com/Codecademy/client-modules/commit/84a555fcc8ce5f2b15c20fd7421757e18749514f))



### [0.14.2](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.14.1...@codecademy/tracking@0.14.2) (2021-09-13)

**Note:** Version bump only for package @codecademy/tracking





### [0.14.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.14.0...@codecademy/tracking@0.14.1) (2021-09-10)

**Note:** Version bump only for package @codecademy/tracking





## [0.14.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.13.1...@codecademy/tracking@0.14.0) (2021-09-10)


### Features

* bump ESLint configs to latest ([e0a201a](https://github.com/Codecademy/client-modules/commit/e0a201abcc5f49718538d3d91af21cb37db4470e))



### [0.13.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.13.0...@codecademy/tracking@0.13.1) (2021-08-13)

**Note:** Version bump only for package @codecademy/tracking





## [0.13.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.12.1...@codecademy/tracking@0.13.0) (2021-07-20)


### Features

* **tracking:** Update business event name ([5bfde22](https://github.com/Codecademy/client-modules/commit/5bfde22e22fa76ab000369cf6598b9e0cfec5d63))



### [0.12.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.12.0...@codecademy/tracking@0.12.1) (2021-07-13)


### Bug Fixes

* business reporting event types ([b480487](https://github.com/Codecademy/client-modules/commit/b480487125ec85aa8466b0225730a2772c88452a))



## [0.12.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.11.1...@codecademy/tracking@0.12.0) (2021-07-13)


### Features

* **event type:** adding business reporting types ([5c8b6c5](https://github.com/Codecademy/client-modules/commit/5c8b6c5fe60b2d415436c56d485d092e6e94f68f)), closes [/github.com/codecademy-engineering/business-reporting/blob/develop/src/util/eventTracking/index.tsx#L104-L110](https://github.com/Codecademy//github.com/codecademy-engineering/business-reporting/blob/develop/src/util/eventTracking/index.tsx/issues/L104-L110)



### [0.11.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.11.0...@codecademy/tracking@0.11.1) (2021-06-30)


### Bug Fixes

* support navigator.sendBeacon not existing ([ab442ef](https://github.com/Codecademy/client-modules/commit/ab442efb8e097015b5cca2ca34c869e83bb53d44))



## [0.11.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.10.0...@codecademy/tracking@0.11.0) (2021-06-30)


### Features

* add user impression to tracking ([a5960aa](https://github.com/Codecademy/client-modules/commit/a5960aa034a1725bbcb119a2cf193557bfacd386))



## [0.10.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.9.0...@codecademy/tracking@0.10.0) (2021-06-21)


### Features

* **tracking:** Added repo-tracking to user events ([22d0d7f](https://github.com/Codecademy/client-modules/commit/22d0d7feb37beb6642ab8fdf09f83480e5919bdf))



## [0.9.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.8.0...@codecademy/tracking@0.9.0) (2021-06-10)


### Features

* **tracking:** Record the page referrer for every event. ([5ae6357](https://github.com/Codecademy/client-modules/commit/5ae63574671e79e956afdebe8bcf62d81364feae))



## [0.8.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.7.3...@codecademy/tracking@0.8.0) (2021-05-24)


### ⚠ BREAKING CHANGES

* prepended OneTrust to tracking integrations loads

### Features

* prepended OneTrust to tracking integrations loads ([3d8ce05](https://github.com/Codecademy/client-modules/commit/3d8ce05f1669728261f496b604fa8cc5906434e5))



### [0.7.3](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.7.2...@codecademy/tracking@0.7.3) (2021-05-10)


### Bug Fixes

* allow no user for tracking integrations ([#1726](https://github.com/Codecademy/client-modules/issues/1726)) ([66fdf89](https://github.com/Codecademy/client-modules/commit/66fdf89834d2eae53172cd6254d936c182281f0c))



### [0.7.2](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.7.1...@codecademy/tracking@0.7.2) (2021-05-03)

**Note:** Version bump only for package @codecademy/tracking





### [0.7.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.7.0...@codecademy/tracking@0.7.1) (2021-05-03)


### Bug Fixes

* switch tracking 'verbose' type back to boolean ([8aae870](https://github.com/Codecademy/client-modules/commit/8aae8709b5e755f386f7c9f350ee7a4b86c19bcb))



## [0.7.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.6.0...@codecademy/tracking@0.7.0) (2021-05-03)


### ⚠ BREAKING CHANGES

* clean up tracker and remove auth token

### Features

* clean up tracker and remove auth token ([d2088e9](https://github.com/Codecademy/client-modules/commit/d2088e9741ffaa3e568bf182fb7bb6156ed5bf18))



## [0.6.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.5.4...@codecademy/tracking@0.6.0) (2021-05-03)


### Features

* added useTrackingIntegrations to tracking package ([2d508e2](https://github.com/Codecademy/client-modules/commit/2d508e2efbcb47968a543d7b54363707301ef351))



### [0.5.4](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.5.3...@codecademy/tracking@0.5.4) (2021-05-03)


### Bug Fixes

* bump tracking package babel-preset-codecademy to latest ([e809566](https://github.com/Codecademy/client-modules/commit/e80956648e76c3e0b439d4d3a63b3baafd818064))



### [0.5.3](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.5.2...@codecademy/tracking@0.5.3) (2021-04-21)

**Note:** Version bump only for package @codecademy/tracking





### [0.5.2](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.5.1...@codecademy/tracking@0.5.2) (2021-03-19)

**Note:** Version bump only for package @codecademy/tracking





### [0.5.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.5.0...@codecademy/tracking@0.5.1) (2021-03-04)

**Note:** Version bump only for package @codecademy/tracking





## [0.5.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.4.3...@codecademy/tracking@0.5.0) (2021-02-18)


### Features

* add container_slugs to UserClickData tracking type ([ebb2d18](https://github.com/Codecademy/client-modules/commit/ebb2d1873505d7c09e14a0f714e5661914e8dd4a))



### [0.4.3](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.4.2...@codecademy/tracking@0.4.3) (2021-02-10)


### Reverts

* Revert "feat(tracking): Add a fullstory boolean to TrackingOptions type" (#1381) ([f04d8b5](https://github.com/Codecademy/client-modules/commit/f04d8b57cac13dfffc8951641e52c2593827aba9)), closes [#1381](https://github.com/Codecademy/client-modules/issues/1381)



### [0.4.2](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.4.1...@codecademy/tracking@0.4.2) (2021-02-04)

**Note:** Version bump only for package @codecademy/tracking





### [0.4.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.4.0...@codecademy/tracking@0.4.1) (2021-02-02)

**Note:** Version bump only for package @codecademy/tracking





## [0.4.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.3.0...@codecademy/tracking@0.4.0) (2021-01-14)


### Features

* **tracking:** Add a new page_career_path_visited event ([#1283](https://github.com/Codecademy/client-modules/issues/1283)) ([398e863](https://github.com/Codecademy/client-modules/commit/398e8636ed1ae5dc602f8ed103583b73aa0d6abc))



## [0.3.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.2.1...@codecademy/tracking@0.3.0) (2021-01-12)


### Features

* **tracking:** Add a fullstory boolean to TrackingOptions type ([8e58696](https://github.com/Codecademy/client-modules/commit/8e58696cda506c8b9fed5a6b58eadcf0d9ebcfab))



### [0.2.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.2.0...@codecademy/tracking@0.2.1) (2020-12-14)

**Note:** Version bump only for package @codecademy/tracking





## [0.2.0](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.1.3...@codecademy/tracking@0.2.0) (2020-12-11)


### Features

* onboarded eslint-plugin-simple-import-sort into ESLint plugin ([59d6fe5](https://github.com/Codecademy/client-modules/commit/59d6fe54d9af4b3ba2a88f7c234f65fc63506c0c))



### [0.1.3](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.1.2...@codecademy/tracking@0.1.3) (2020-12-07)

**Note:** Version bump only for package @codecademy/tracking





### [0.1.2](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.1.1...@codecademy/tracking@0.1.2) (2020-11-25)


### 🐛 Bug Fixes

* Add query params to tracking calls ([#1189](https://github.com/Codecademy/client-modules/issues/1189)) ([02438ae](https://github.com/Codecademy/client-modules/commit/02438ae4fbad0130b8ef3e8de3a22f07922c9eed))

### [0.1.1](https://github.com/Codecademy/client-modules/compare/@codecademy/tracking@0.1.0...@codecademy/tracking@0.1.1) (2020-10-23)


### 🐛 Bug Fixes

* Add a runtime dependency ([524d37b](https://github.com/Codecademy/client-modules/commit/524d37b08586903bc6a9d2b7a060752521bfc748))

## [0.1.0](https://github.com/Codecademy/client-modules/compare/1a91e7e41e9a30e3cabb3b736c1b686c43e9570e...@codecademy/tracking@0.1.0) (2020-10-23)


### ✨ Features

* Creating the @codecademy/tracking pachage. ([1a91e7e](https://github.com/Codecademy/client-modules/commit/1a91e7e41e9a30e3cabb3b736c1b686c43e9570e))
