## [0.1.34](https://github.com/brillout/telefunc/compare/v0.1.33...v0.1.34) (2022-11-12)


### Bug Fixes

* avoid importBuild var collision ([7d67401](https://github.com/brillout/telefunc/commit/7d67401f883a30b84fec3cf589e57d1560d557d8))
* improve HTTP response upon telefunction not found ([4ffe81f](https://github.com/brillout/telefunc/commit/4ffe81f0aafb6e9b1b939b98773d2a4b83657df1))



## [0.1.33](https://github.com/brillout/telefunc/compare/v0.1.32...v0.1.33) (2022-11-07)


### Bug Fixes

* implement `onAbort()` and soft-deprecate `onTelefunctionRemoteCallError()` ([ff15341](https://github.com/brillout/telefunc/commit/ff153416f5eac4a8ce295219c50762f4d37ebc0b))
* rename `telefuncConfig` to `config` ([01695da](https://github.com/brillout/telefunc/commit/01695da3a71098483949e95ddad06112fd7ca1ff))
* simplify handling of isomorphic code ([5457a30](https://github.com/brillout/telefunc/commit/5457a303c0979cb63ec9ade5abdc62739367d8b1))



## [0.1.32](https://github.com/brillout/telefunc/compare/v0.1.31...v0.1.32) (2022-11-03)


### Bug Fixes

* let Vite discover nested dependency upon pre-optimizing ([164afd3](https://github.com/brillout/telefunc/commit/164afd38b591d500805b0f72fe66eec1905b59f3))
* update `@brillout/json-serializer` ([755a8ba](https://github.com/brillout/telefunc/commit/755a8ba65a2a4f625f57446a57b213e500f782b7))



## [0.1.31](https://github.com/brillout/telefunc/compare/v0.1.30...v0.1.31) (2022-11-03)


### Features

* allow server config to be defined with `vite.config.js` ([41440e2](https://github.com/brillout/telefunc/commit/41440e2bdce0693dc72e9f555e9889dbc0db70f8))



## [0.1.30](https://github.com/brillout/telefunc/compare/v0.1.29...v0.1.30) (2022-11-03)


### Bug Fixes

* workaround Vite bug that wrongfully pre-optimizes `telefunc` module ([7ead64b](https://github.com/brillout/telefunc/commit/7ead64bf1b09571eb753d587bcdc7b1cec7420dc))



## [0.1.29](https://github.com/brillout/telefunc/compare/v0.1.28...v0.1.29) (2022-11-02)


### Bug Fixes

* add naming convention warnings ([37ab2bf](https://github.com/brillout/telefunc/commit/37ab2bf8f3b12a5a58b95aeda5fc1da82da31e37))
* fix wrong error message ([e8d5b45](https://github.com/brillout/telefunc/commit/e8d5b45906e7e0402fd19dbfe3100a48d5a91090))
* improve dynamic loading of modules ([972f8c2](https://github.com/brillout/telefunc/commit/972f8c218ba13b3488c26627da726c0e40e851f6))
* improve wrong config error messages ([d6b5998](https://github.com/brillout/telefunc/commit/d6b5998ba637f71ad0a03d9d8498182dae2eef4a))
* improve wrong usage message ([2fa05d5](https://github.com/brillout/telefunc/commit/2fa05d542905d1233d1e275a3a4b3d6d604e1e52))


### Performance Improvements

* lazy-load telefunc files ([87ec5d2](https://github.com/brillout/telefunc/commit/87ec5d27a1b15affe4fa6d07569ef5c1f9663d0f))



## [0.1.28](https://github.com/brillout/telefunc/compare/v0.1.27...v0.1.28) (2022-10-26)


### Bug Fixes

* stop assuming UserConfig.build.outDir to be a posix path ([013c2fc](https://github.com/brillout/telefunc/commit/013c2fc56b62e2c5328f4b6dc54a580ef9075e21))



## [0.1.27](https://github.com/brillout/telefunc/compare/v0.1.26...v0.1.27) (2022-10-24)


### Bug Fixes

* add shield() codegen to webpack loaders (fix [#35](https://github.com/brillout/telefunc/issues/35)) ([79cb772](https://github.com/brillout/telefunc/commit/79cb772eff160a62834e462418c54c1463ed9504))
* improve DX upon server errors ([4321598](https://github.com/brillout/telefunc/commit/4321598321f4dd1144d738f7711164457748d653))
* improve shield() gen logs ([adf13ed](https://github.com/brillout/telefunc/commit/adf13ed0f59776b7ba82ce1f729fb5d03e84af2e))
* improve shield() generation ([de0996e](https://github.com/brillout/telefunc/commit/de0996eccdbb3da65c761c92cbdc1936f1260a7b))
* remove superfluous `isProduction` config and improve `isProduction()` check ([a166c58](https://github.com/brillout/telefunc/commit/a166c5845928cb6287949f285f7d6a49fd80bcc2))
* use strings instead of symbols as keys ([bdbd31e](https://github.com/brillout/telefunc/commit/bdbd31e11a734526d4fa033a896c525d82ee82a8))


### Performance Improvements

* [Vite] lazy load `.telefunc.js` files ([dcf1423](https://github.com/brillout/telefunc/commit/dcf1423fb10bd82b6df887d36b78041a7f84abe3))



## [0.1.26](https://github.com/brillout/telefunc/compare/v0.1.25...v0.1.26) (2022-10-10)


### Bug Fixes

* gracefully handle `.telefunc.js` non-function exports ([9eacb25](https://github.com/brillout/telefunc/commit/9eacb258d4ec11e1323da5029076050eefd25568))
* improve DX around erroneous context setup ([a33d89b](https://github.com/brillout/telefunc/commit/a33d89b6b15578454c196afbd802a8fc7c70db2f))
* improve error handling ([1dc21e2](https://github.com/brillout/telefunc/commit/1dc21e24ddebf48d2bac28e6c1e4b249dd279a5c))
* improve error message upon telefunction not found ([cb6f7a8](https://github.com/brillout/telefunc/commit/cb6f7a8895738fe6ce994ed9d7b350688ec7fd88))
* improve error message upon wrong `getContext()` usage ([0a0ac4e](https://github.com/brillout/telefunc/commit/0a0ac4e71f816b838cb759d7a78741a6fb0376d2))


### Features

* add SSR context support React hooks ([17e79d8](https://github.com/brillout/telefunc/commit/17e79d8826b40cf6110819b0afd284acdc8af75a))
* new React hook `useData()` enabling using Telefunc for SSR data fetching ([7d8a757](https://github.com/brillout/telefunc/commit/7d8a757ffa6afa0be051cdf4f60440b2fc733927))


### Performance Improvements

* stop auto-generating `shiled()` in dev ([32a3008](https://github.com/brillout/telefunc/commit/32a3008a77c2c61713135c0c9490db196a05d91a))



## [0.1.25](https://github.com/brillout/telefunc/compare/v0.1.24...v0.1.25) (2022-09-05)


### Bug Fixes

* improve config.build.outDir handling ([c639a34](https://github.com/brillout/telefunc/commit/c639a349fce8ae0757bf3d23680261bbb8a99830))
* support ReScript ([3d5b646](https://github.com/brillout/telefunc/commit/3d5b64605285b76ac30f5f38304bd22e8181ded9))
* support Vite 3 and latest vite-plugin-ssr version ([0a75971](https://github.com/brillout/telefunc/commit/0a75971f9e16ca35a8b526e4ce84b5eef3ca7080))


### Features

* support Vite CLI ([68c7cb6](https://github.com/brillout/telefunc/commit/68c7cb6c14328fcd5e6306b43ffc1b18dedfb501))



## [0.1.24](https://github.com/brillout/telefunc/compare/v0.1.23...v0.1.24) (2022-08-02)


### Bug Fixes

* [`shield()` auto generator] support latest TypeScript version ([a9fba17](https://github.com/brillout/telefunc/commit/a9fba1782419104914d1beeb272a8d101a38246c))



## [0.1.23](https://github.com/brillout/telefunc/compare/v0.1.22...v0.1.23) (2022-07-31)


### Bug Fixes

* `dist/server/package.json` generation (fix [#33](https://github.com/brillout/telefunc/issues/33)) ([ccfc607](https://github.com/brillout/telefunc/commit/ccfc607642d94523d7310b912fdbfbefdc5034d9))
* add worker exports ([#32](https://github.com/brillout/telefunc/issues/32)) ([d6c70e8](https://github.com/brillout/telefunc/commit/d6c70e894cf74505b641c16e6557f7fd0ee7f3e9))
* tolerate missing __dirname (fix [#32](https://github.com/brillout/telefunc/issues/32)) ([73f3862](https://github.com/brillout/telefunc/commit/73f3862d026301932f7555640f7068037306940f))
* treat `Object.ceate(null)` as plain JavaScript object ([4c3c163](https://github.com/brillout/telefunc/commit/4c3c1636c07f57f542916f596ea9ce6c5a4d0848))



## [0.1.22](https://github.com/brillout/telefunc/compare/v0.1.21...v0.1.22) (2022-05-10)


### Features

* `onBug()` ([2b1be00](https://github.com/brillout/telefunc/commit/2b1be008969e63d7a2e8988058085a42d9bb04d4))



## [0.1.21](https://github.com/brillout/telefunc/compare/v0.1.20...v0.1.21) (2022-04-30)


### Bug Fixes

* improve shield error message ([4188010](https://github.com/brillout/telefunc/commit/41880108d3a9744c83083933e57ebc59306602e8))



## [0.1.20](https://github.com/brillout/telefunc/compare/v0.1.19...v0.1.20) (2022-04-22)


### Features

* Use TypeScript to automatically generate `shield()` ([telefunc.com > TypeScript > `shield()`](https://telefunc.com/typescript#shield), [#23](https://github.com/brillout/telefunc/issues/23), [#25](https://github.com/brillout/telefunc/pull/25))




## [0.1.19](https://github.com/brillout/telefunc/compare/v0.1.18...v0.1.19) (2022-03-07)


### Bug Fixes

* fix TS resolve helpers ([09b2700](https://github.com/brillout/telefunc/commit/09b2700a1caec00b0e3c5e3c7cc4c5e19d11653e))



## [0.1.18](https://github.com/brillout/telefunc/compare/v0.1.17...v0.1.18) (2022-03-05)


### Bug Fixes

* isFileAlreadyTransformed check and move it to separate fn ([e26b015](https://github.com/brillout/telefunc/commit/e26b0151c6a04280d7c9fc3c70a873a289fe2a09))



## [0.1.17](https://github.com/brillout/telefunc/compare/v0.1.16...v0.1.17) (2022-03-03)


### Bug Fixes

* allow `.telefunc.js` ESM files to be loaded directly ([0f14491](https://github.com/brillout/telefunc/commit/0f144917c28dd253ab3fe8955af22005d11631c6))
* fix erroneous Vite stack assumption ([91ba118](https://github.com/brillout/telefunc/commit/91ba1184ebd5a48e9824d2698c38f6c804f19c4f))
* improve error message ([13011de](https://github.com/brillout/telefunc/commit/13011def3712a4e5a95b68ef79e186fb1accff93))
* support client resolving for legacy toolchains ([4f3d414](https://github.com/brillout/telefunc/commit/4f3d41400510b16ecd4ec1ce02145946d1965fcc))
* support Expo/Metro resolver ([6ede743](https://github.com/brillout/telefunc/commit/6ede7432b9b45037b11f1725a0d02e9115ef0866))


### Features

* allow user to manually provide the telefunc files with `telefuncConfig.telefuncFiles` ([b47f0d9](https://github.com/brillout/telefunc/commit/b47f0d91293fe3946f808885ebfb0aaa652f7822))
* telefunc babel plugin ([c8e46df](https://github.com/brillout/telefunc/commit/c8e46dfa14d7e5ef7fbeffd694b58cca8d72d4a5))



## [0.1.16](https://github.com/brillout/telefunc/compare/v0.1.15...v0.1.16) (2022-02-28)


### Bug Fixes

* remove tests from npm package ([c10c501](https://github.com/brillout/telefunc/commit/c10c50119cd81b1401dc937e235e73aa410ae749))


### Features

* `telefuncConfig.httpHeaders` ([28993e1](https://github.com/brillout/telefunc/commit/28993e1be034f783caec5236847c6bf0d40a9e50))



## [0.1.15](https://github.com/brillout/telefunc/compare/v0.1.14...v0.1.15) (2022-02-18)


### Bug Fixes

* fix @vercel/ncc bundling ([2d5532c](https://github.com/brillout/telefunc/commit/2d5532cdcd78cf568a411d8497805b171c24b30f))



## [0.1.14](https://github.com/brillout/telefunc/compare/v0.1.13...v0.1.14) (2022-02-17)


### Bug Fixes

* remove debug log ([40b486b](https://github.com/brillout/telefunc/commit/40b486be4fc5c5d8f1fe3d37c17c63e2e763574e))



## [0.1.13](https://github.com/brillout/telefunc/compare/v0.1.12...v0.1.13) (2022-02-17)


### Bug Fixes

* avoid duplicated code in importBuild.js ([eae771e](https://github.com/brillout/telefunc/commit/eae771ec0b553bd691b49cb3759279f1b19476c6))
* improve deploy DX ([ddba37e](https://github.com/brillout/telefunc/commit/ddba37e975e5b8ec7df8b981df512eeed2052878))
* improve error message ([adedcdf](https://github.com/brillout/telefunc/commit/adedcdf816d7a7ed4eb6bb0debe0cbacdc4ffd7e))
* improve no telefunc file found error ([51fff0a](https://github.com/brillout/telefunc/commit/51fff0adfb46938f82cd6e0443506dc1284f5f42))
* improve server-side test [cloudfalre workers] ([e847c10](https://github.com/brillout/telefunc/commit/e847c100c6388b1e186f729a114b8cb6ff912380))
* relative window path ([102b2a9](https://github.com/brillout/telefunc/commit/102b2a9b1c42610b1a0f424682c6e81b707d6c3a))
* remove etag generation [cloudflare workers] ([850acb7](https://github.com/brillout/telefunc/commit/850acb7272e1c85f4f3da884a0938f33a6f3a5f5))
* remove eval usage for cloudfalre workers ([ca2401c](https://github.com/brillout/telefunc/commit/ca2401ca915a90bd2d08dcb02d386365e285cc7d))
* warn user upon wrong telefunc() usage ([e0a5987](https://github.com/brillout/telefunc/commit/e0a5987fd6b29a24822f9f0e5148a41aae2d2878))


### Reverts

* remove unused generated dist/server/package.json ([b72e908](https://github.com/brillout/telefunc/commit/b72e9081280d7f1c72401e9074d2132756014dce))



## [0.1.12](https://github.com/brillout/telefunc/compare/v0.1.11...v0.1.12) (2022-02-13)


### Bug Fixes

* add @brillout/json-s to pre-bundling ([edb37a4](https://github.com/brillout/telefunc/commit/edb37a4dbd65fd3152ea8053e3dcf8a2a9b47932))
* remove unecessary `optimizeDeps.exclude` entries ([c324a18](https://github.com/brillout/telefunc/commit/c324a18510fa76abcf5542723a49c5dc2e7fd0d8))


### Features

* add debug flag ([c4ed79d](https://github.com/brillout/telefunc/commit/c4ed79da40afec708ea86a422bf39b56d85a0338))



## [0.1.11](https://github.com/brillout/telefunc/compare/v0.1.10...v0.1.11) (2022-02-13)


### Bug Fixes

* automatically retrieve `viteDevServer` ([d8af512](https://github.com/brillout/telefunc/commit/d8af5122bce12bc7a8f5417b4d3a7d5f578328a2))
* improve error message upon wrong configuration ([ff19628](https://github.com/brillout/telefunc/commit/ff196287342b4ea3addbc0e0a559eef680f73796))
* improve overall bundler handling logic ([c12ed9b](https://github.com/brillout/telefunc/commit/c12ed9b53404244cc10fc20af17176cc30224757))



## [0.1.10](https://github.com/brillout/telefunc/compare/v0.1.9...v0.1.10) (2022-02-10)


### Features

* allow users to directly use the webpack loader without framework ([aeeeed6](https://github.com/brillout/telefunc/commit/aeeeed6fe82f8adb6b7061b3d27c3c7b4772ccc0))



## [0.1.9](https://github.com/brillout/telefunc/compare/v0.1.8...v0.1.9) (2022-02-09)


### Bug Fixes

* do not use `require.resolve()` in dev ([614a1e8](https://github.com/brillout/telefunc/commit/614a1e8ec71d21a22874a3baabf9b422810d3322))



## [0.1.8](https://github.com/brillout/telefunc/compare/v0.1.7...v0.1.8) (2022-02-08)


### Bug Fixes

* circumvent `moduleExists()` Vite bug ([32da7fd](https://github.com/brillout/telefunc/commit/32da7fdcb02fc957d67c66a84b9bb850bd4eb861))



## [0.1.7](https://github.com/brillout/telefunc/compare/v0.1.6...v0.1.7) (2022-02-05)


### Bug Fixes

* improve DX around not found telefunction ([c40a378](https://github.com/brillout/telefunc/commit/c40a378513f048090f55e24e5d3a04c16e49f76f))



## [0.1.6](https://github.com/brillout/telefunc/compare/v0.1.5...v0.1.6) (2022-02-03)


### Bug Fixes

* improve DX around malformed Telefunc request in dev ([c4b2dd7](https://github.com/brillout/telefunc/commit/c4b2dd7899ff2cce26a823c6f119c9454bb0f7e8))
* improve DX upon wrong HTTP request body ([f8751f0](https://github.com/brillout/telefunc/commit/f8751f0500d1d9842942a2d10a140fc3e59a2bb1))
* improve telefunction's human readable name ([c8dd213](https://github.com/brillout/telefunc/commit/c8dd21334a963c5a77ae13199fb3f9da92708641))
* warn user when telefunction has no `shield()` ([dc08539](https://github.com/brillout/telefunc/commit/dc08539e5a468f24747f8467063bfe09117d2188))



## [0.1.5](https://github.com/brillout/telefunc/compare/v0.1.4...v0.1.5) (2022-02-01)


### Bug Fixes

* improve DX upon wrong `shield()` usage ([9f8527b](https://github.com/brillout/telefunc/commit/9f8527b0d090cb776cec7292c0e1c7e903eb9d2f))


### Features

* allow `shield()` arguments to be passed in reversed order: `shield([ t.type.string ], myTelefunction)` ([1f3368f](https://github.com/brillout/telefunc/commit/1f3368fe0042ba15cdb47ba654a0ce1430b2624b))



## [0.1.4](https://github.com/brillout/telefunc/compare/v0.1.3...v0.1.4) (2022-01-29)


### Bug Fixes

* include `node/vite/importTelefuncFiles.ts` in npm package (fix [#16](https://github.com/brillout/telefunc/issues/16)) ([3eeafa3](https://github.com/brillout/telefunc/commit/3eeafa3ce02b304702d92ae993e6b275645195ac))



## [0.1.3](https://github.com/brillout/telefunc/compare/v0.1.2...v0.1.3) (2022-01-28)


### Bug Fixes

* catch problematic `Abort()` typos ([d887886](https://github.com/brillout/telefunc/commit/d88788680dfe1200137a6457f2ae17b952e89e03))
* ensure telefunctions to not throw a primitve as error ([14698fc](https://github.com/brillout/telefunc/commit/14698fca546e9fc0a7c856ae6fd08f190f797b31))
* improve DX upon serialization failure ([5656511](https://github.com/brillout/telefunc/commit/5656511acff7b8d8b948888e8269b9e771e25c0a))
* reduce npm pcakage size ([e8643f8](https://github.com/brillout/telefunc/commit/e8643f83f987c5bcecb838f27713e96567ce83dc))
* register remote call error listeners on the global scope ([19e5b26](https://github.com/brillout/telefunc/commit/19e5b26b29ac568371f4c4b662b73f904d53d86f))



## [0.1.2](https://github.com/brillout/telefunc/compare/v0.1.1...v0.1.2) (2022-01-25)


### Bug Fixes

* improve TelefunctionError type ([41a572a](https://github.com/brillout/telefunc/commit/41a572af57a7ba48533aa97e0883204a63ccda16))
* make error handling consistent between remote call and SSR call ([10edb6a](https://github.com/brillout/telefunc/commit/10edb6ad0cff1db3ba5933307ed21ba261019317))



## [0.1.1](https://github.com/brillout/telefunc/compare/0.1.0...0.1.1) (2022-01-24)


### Bug Fixes

* enable isomorphic imports by refactoring source code file structure and adopting new TS/ESM/CJS strategy ([d0c182d](https://github.com/brillout/telefunc/commit/d0c182d769b68368c2fe59c0771ed0b1a6f3b60c))
* warn user upon incorrect usage of isomorphic imports ([72700ca](https://github.com/brillout/telefunc/commit/72700ca3899f77779e55cf400a1c81206fbea095))



# Telefunc (new 2021/2022 version) `0.1.0`

Initial release.

# Telefunc (old 2020 version) `0.0.26`

See [github.com/brillout/telefunc-old](https://github.com/brillout/telefunc-old).

# Wildcard API `v0.5.3`

See [github.com/brillout/wildcard-api](https://github.com/brillout/wildcard-api).
