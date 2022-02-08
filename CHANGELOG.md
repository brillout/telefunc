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
