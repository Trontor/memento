# Welcome to the Backend

## How to run

### Installing `firebase` globally or locally

You'll need firebase installed globally or within this project (and use `npx`):

```bash
# global
npm install -g firebase-tools@6.8.0

# within project
npm install firebase-tools@6.8.0
npx firebase $COMMAND
```

Login to `firebase`:

```bash
firebase login
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
