# Welcome to the Backend

## How to run

### Installing `firebase` globally or locally

You'll need `firebase@6.8.0` installed globally or within this project:

```bash
# global using npm
npm install -g firebase-tools@6.8.0

# or within project using npx
npm install firebase-tools@6.8.0
```

Login to `firebase`:

```bash
# global
firebase login

# within project
npx firebase login
```

### Installing project modules

Install all the other `npm` modules with `npm install`.

### GraphQL types code generation

GraphQL types need to be automatically generated with

```bash
npm run gql
```

The types are found in `./src/generated/graphql.ts`

### Remember!!!

Make sure you run `tsc --watch` inside this directory otherwise `firebase serve` will serve old or non-existent static JS!
