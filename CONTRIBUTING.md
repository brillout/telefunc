# Contribute to Telefunc

- [System requirements](#system-requirements)
- [Basics](#basics)
- [Ceate new example](#create-new-example)
- [Modify existing example](#modify-existing-example)

<br/>


## System requirements

- Unix (e.g. macOS or Linux). (Windows may work but there are no guarantees.)
- Node.js `>= v15.0.0`.
- [pnpm](https://pnpm.io/). (Install it with `$ npm install -g pnpm`.)

> These requirements are for developing; Telefunc can be used with any package manager, Windows, and Node.js `>= v12.19.0`.

<br/>


## Basics

#### Install

Install the entire monorepo:

```shell
git clone git@github.com:brillout/telefunc
cd telefunc/
pnpm install
```

#### Build & Dev

Build Telefunc's source code:

```shell
# At / (monorepo root)
pnpm run build
```

Develop Telefunc:

```shell
# At / (monorepo root)
pnpm run dev
```

#### Run tests

Run all tests:

```shell
# At / (monorepo root)

# Run the end-to-end tests (`/**/*.test.js`)
pnpm exec test-e2e
# Run the unit tests (`/**/*.spec.js`)
pnpm exec vitest
# Typecheck all `.ts` files
pnpm exec test-types
```

Run only the tests of one example/boilerplate:

```shell
cd examples/some-example/ && pnpm exec test-e2e
# Altenertively: provide a substring of the path
pnpm exec test-e2e ome-exampl
```

> On Debian, [these additional steps](https://github.com/brillout/vite-plugin-ssr/issues/283#issuecomment-1072974554) are required.

<br/>


## Create new example

New examples should be minimal and implement only what you want to showcase.

<br/>


## Modify existing example

Follow the setup instructions at [Basics](#basics).

To run the example:

```shell
cd examples/some-example/
# See package.json#scripts, e.g. package.json#scripts['dev']:
pnpm run dev
```

> The `README` instructions of examples use `npm`. We use `pnpm` instead if we want to install the entire monorepo and build & link Telefunc's source code.

Check whether the tests defined in `examples/some-example/*.spec.ts` are still valid and make changes accordingly. See [Basics](#basics) to run the example's tests.
