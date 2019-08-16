# Welcome to the Backend

## How to run

### Installing `firebase` globally or locally

You **must** install `firebase@6.8.0` globally. Do not install in the project itself, as an inexplicable bug happens when combined with other firebase modules...

```bash
# global using npm
npm install -g firebase-tools@6.8.0
```

Login to `firebase`:

```bash
firebase login
```

### Installing project modules

Install all the other `npm` modules with

```bash
npm install
```

### GraphQL types code generation

GraphQL types need to be automatically generated with

```bash
npm run gql
```

The types are found in `./src/generated/graphql.ts`

### Remember!!!

Make sure you run `tsc --watch` inside this directory otherwise `firebase serve` will serve old or non-existent static JS!
