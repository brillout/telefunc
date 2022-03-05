## [0.1.18](https://github.com/vikejs/telefunc/compare/v0.1.17...v0.1.18) (2022-03-05)


### Bug Fixes

* isFileAlreadyTransformed check and move it to separate fn ([e26b015](https://github.com/vikejs/telefunc/commit/e26b0151c6a04280d7c9fc3c70a873a289fe2a09))



## [0.1.17](https://github.com/vikejs/telefunc/compare/v0.1.16...v0.1.17) (2022-03-03)


### Bug Fixes

* allow `.telefunc.js` ESM files to be loaded directly ([0f14491](https://github.com/vikejs/telefunc/commit/0f144917c28dd253ab3fe8955af22005d11631c6))
* fix erroneous Vite stack assumption ([91ba118](https://github.com/vikejs/telefunc/commit/91ba1184ebd5a48e9824d2698c38f6c804f19c4f))
* improve error message ([13011de](https://github.com/vikejs/telefunc/commit/13011def3712a4e5a95b68ef79e186fb1accff93))
* support client resolving for legacy toolchains ([4f3d414](https://github.com/vikejs/telefunc/commit/4f3d41400510b16ecd4ec1ce02145946d1965fcc))
* support Expo/Metro resolver ([6ede743](https://github.com/vikejs/telefunc/commit/6ede7432b9b45037b11f1725a0d02e9115ef0866))


### Features

* allow user to manually provide the telefunc files with `telefuncConfig.telefuncFiles` ([b47f0d9](https://github.com/vikejs/telefunc/commit/b47f0d91293fe3946f808885ebfb0aaa652f7822))
* telefunc babel plugin ([c8e46df](https://github.com/vikejs/telefunc/commit/c8e46dfa14d7e5ef7fbeffd694b58cca8d72d4a5))



## [0.1.16](https://github.com/vikejs/telefunc/compare/v0.1.15...v0.1.16) (2022-02-28)


### Bug Fixes

* remove tests from npm package ([c10c501](https://github.com/vikejs/telefunc/commit/c10c50119cd81b1401dc937e235e73aa410ae749))


### Features

* `telefuncConfig.httpHeaders` ([28993e1](https://github.com/vikejs/telefunc/commit/28993e1be034f783caec5236847c6bf0d40a9e50))



## [0.1.15](https://github.com/vikejs/telefunc/compare/v0.1.14...v0.1.15) (2022-02-18)


### Bug Fixes

* fix @vercel/ncc bundling ([2d5532c](https://github.com/vikejs/telefunc/commit/2d5532cdcd78cf568a411d8497805b171c24b30f))



## [0.1.14](https://github.com/vikejs/telefunc/compare/v0.1.13...v0.1.14) (2022-02-17)


### Bug Fixes

* remove debug log ([40b486b](https://github.com/vikejs/telefunc/commit/40b486be4fc5c5d8f1fe3d37c17c63e2e763574e))



## [0.1.13](https://github.com/vikejs/telefunc/compare/v0.1.12...v0.1.13) (2022-02-17)


### Bug Fixes

* avoid duplicated code in importBuild.js ([eae771e](https://github.com/vikejs/telefunc/commit/eae771ec0b553bd691b49cb3759279f1b19476c6))
* improve deploy DX ([ddba37e](https://github.com/vikejs/telefunc/commit/ddba37e975e5b8ec7df8b981df512eeed2052878))
* improve error message ([adedcdf](https://github.com/vikejs/telefunc/commit/adedcdf816d7a7ed4eb6bb0debe0cbacdc4ffd7e))
* improve no telefunc file found error ([51fff0a](https://github.com/vikejs/telefunc/commit/51fff0adfb46938f82cd6e0443506dc1284f5f42))
* improve server-side test [cloudfalre workers] ([e847c10](https://github.com/vikejs/telefunc/commit/e847c100c6388b1e186f729a114b8cb6ff912380))
* relative window path ([102b2a9](https://github.com/vikejs/telefunc/commit/102b2a9b1c42610b1a0f424682c6e81b707d6c3a))
* remove etag generation [cloudflare workers] ([850acb7](https://github.com/vikejs/telefunc/commit/850acb7272e1c85f4f3da884a0938f33a6f3a5f5))
* remove eval usage for cloudfalre workers ([ca2401c](https://github.com/vikejs/telefunc/commit/ca2401ca915a90bd2d08dcb02d386365e285cc7d))
* warn user upon wrong telefunc() usage ([e0a5987](https://github.com/vikejs/telefunc/commit/e0a5987fd6b29a24822f9f0e5148a41aae2d2878))


### Reverts

* remove unused generated dist/server/package.json ([b72e908](https://github.com/vikejs/telefunc/commit/b72e9081280d7f1c72401e9074d2132756014dce))



## [0.1.12](https://github.com/vikejs/telefunc/compare/v0.1.11...v0.1.12) (2022-02-13)


### Bug Fixes

* add @brillout/json-s to pre-bundling ([edb37a4](https://github.com/vikejs/telefunc/commit/edb37a4dbd65fd3152ea8053e3dcf8a2a9b47932))
* remove unecessary `optimizeDeps.exclude` entries ([c324a18](https://github.com/vikejs/telefunc/commit/c324a18510fa76abcf5542723a49c5dc2e7fd0d8))


### Features

* add debug flag ([c4ed79d](https://github.com/vikejs/telefunc/commit/c4ed79da40afec708ea86a422bf39b56d85a0338))



## [0.1.11](https://github.com/vikejs/telefunc/compare/v0.1.10...v0.1.11) (2022-02-13)


### Bug Fixes

* automatically retrieve `viteDevServer` ([d8af512](https://github.com/vikejs/telefunc/commit/d8af5122bce12bc7a8f5417b4d3a7d5f578328a2))
* improve error message upon wrong configuration ([ff19628](https://github.com/vikejs/telefunc/commit/ff196287342b4ea3addbc0e0a559eef680f73796))
* improve overall bundler handling logic ([c12ed9b](https://github.com/vikejs/telefunc/commit/c12ed9b53404244cc10fc20af17176cc30224757))



## [0.1.10](https://github.com/vikejs/telefunc/compare/v0.1.9...v0.1.10) (2022-02-10)


### Features

* allow users to directly use the webpack loader without framework ([aeeeed6](https://github.com/vikejs/telefunc/commit/aeeeed6fe82f8adb6b7061b3d27c3c7b4772ccc0))



## [0.1.9](https://github.com/vikejs/telefunc/compare/v0.1.8...v0.1.9) (2022-02-09)


### Bug Fixes

* do not use `require.resolve()` in dev ([614a1e8](https://github.com/vikejs/telefunc/commit/614a1e8ec71d21a22874a3baabf9b422810d3322))



## [0.1.8](https://github.com/vikejs/telefunc/compare/v0.1.7...v0.1.8) (2022-02-08)


### Bug Fixes

* circumvent `moduleExists()` Vite bug ([32da7fd](https://github.com/vikejs/telefunc/commit/32da7fdcb02fc957d67c66a84b9bb850bd4eb861))



## [0.1.7](https://github.com/vikejs/telefunc/compare/v0.1.6...v0.1.7) (2022-02-05)


### Bug Fixes

* improve DX around not found telefunction ([c40a378](https://github.com/vikejs/telefunc/commit/c40a378513f048090f55e24e5d3a04c16e49f76f))



## [0.1.6](https://github.com/vikejs/telefunc/compare/v0.1.5...v0.1.6) (2022-02-03)


### Bug Fixes

* improve DX around malformed Telefunc request in dev ([c4b2dd7](https://github.com/vikejs/telefunc/commit/c4b2dd7899ff2cce26a823c6f119c9454bb0f7e8))
* improve DX upon wrong HTTP request body ([f8751f0](https://github.com/vikejs/telefunc/commit/f8751f0500d1d9842942a2d10a140fc3e59a2bb1))
* improve telefunction's human readable name ([c8dd213](https://github.com/vikejs/telefunc/commit/c8dd21334a963c5a77ae13199fb3f9da92708641))
* warn user when telefunction has no `shield()` ([dc08539](https://github.com/vikejs/telefunc/commit/dc08539e5a468f24747f8467063bfe09117d2188))



## [0.1.5](https://github.com/vikejs/telefunc/compare/v0.1.4...v0.1.5) (2022-02-01)


### Bug Fixes

* improve DX upon wrong `shield()` usage ([9f8527b](https://github.com/vikejs/telefunc/commit/9f8527b0d090cb776cec7292c0e1c7e903eb9d2f))


### Features

* allow `shield()` arguments to be passed in reversed order: `shield([ t.type.string ], myTelefunction)` ([1f3368f](https://github.com/vikejs/telefunc/commit/1f3368fe0042ba15cdb47ba654a0ce1430b2624b))



## [0.1.4](https://github.com/vikejs/telefunc/compare/v0.1.3...v0.1.4) (2022-01-29)


### Bug Fixes

* include `node/vite/importTelefuncFiles.ts` in npm package (fix [#16](https://github.com/vikejs/telefunc/issues/16)) ([3eeafa3](https://github.com/vikejs/telefunc/commit/3eeafa3ce02b304702d92ae993e6b275645195ac))



## [0.1.3](https://github.com/vikejs/telefunc/compare/v0.1.2...v0.1.3) (2022-01-28)


### Bug Fixes

* catch problematic `Abort()` typos ([d887886](https://github.com/vikejs/telefunc/commit/d88788680dfe1200137a6457f2ae17b952e89e03))
* ensure telefunctions to not throw a primitve as error ([14698fc](https://github.com/vikejs/telefunc/commit/14698fca546e9fc0a7c856ae6fd08f190f797b31))
* improve DX upon serialization failure ([5656511](https://github.com/vikejs/telefunc/commit/5656511acff7b8d8b948888e8269b9e771e25c0a))
* reduce npm pcakage size ([e8643f8](https://github.com/vikejs/telefunc/commit/e8643f83f987c5bcecb838f27713e96567ce83dc))
* register remote call error listeners on the global scope ([19e5b26](https://github.com/vikejs/telefunc/commit/19e5b26b29ac568371f4c4b662b73f904d53d86f))



## [0.1.2](https://github.com/vikejs/telefunc/compare/v0.1.1...v0.1.2) (2022-01-25)


### Bug Fixes

* improve TelefunctionError type ([41a572a](https://github.com/vikejs/telefunc/commit/41a572af57a7ba48533aa97e0883204a63ccda16))
* make error handling consistent between remote call and SSR call ([10edb6a](https://github.com/vikejs/telefunc/commit/10edb6ad0cff1db3ba5933307ed21ba261019317))



## [0.1.1](https://github.com/vikejs/telefunc/compare/0.1.0...0.1.1) (2022-01-24)


### Bug Fixes

* enable isomorphic imports by refactoring source code file structure and adopting new TS/ESM/CJS strategy ([d0c182d](https://github.com/vikejs/telefunc/commit/d0c182d769b68368c2fe59c0771ed0b1a6f3b60c))
* warn user upon incorrect usage of isomorphic imports ([72700ca](https://github.com/vikejs/telefunc/commit/72700ca3899f77779e55cf400a1c81206fbea095))



# Telefunc (new 2021/2022 version) `0.1.0`

Initial release.

# Telefunc (old 2020 version) `0.0.26`

See [github.com/brillout/telefunc-old](https://github.com/brillout/telefunc-old).

# Wildcard API `v0.5.3`

See [github.com/brillout/wildcard-api](https://github.com/brillout/wildcard-api).
