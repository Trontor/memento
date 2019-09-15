# memento

memento is a capstone project that serves as a solution for the problem statement:

>All teams in COMP30022 in 2019 will build a Family artifacts register for their capstone project. The problem being addressed is that almost every family has items they may want to pass down the generations. Photographs, letters, previous items such as art or jewellery, items of cultural significance are examples. The project is to build a front end to browse the items in the register, and a back end that stores the items or links to the item. Each team must choose a family that will be the client for the project. The best choice is likely to be one of the families of the team members. Discussing whether your family might be interested can be done immediately, and in the first week the team will need to choose which family. More will be said in class next Thursday.

We have chosen to make a full-stack application in Javascript/Typescript. The frontend is written in React JS and the backend is running Node JS (using the Nest.JS framework). 

Installation is no trivial task, so pay close attention if you want to spin up a development environment.

## Installation Instructions
### Prerequisites
There are a number of libraries and frameworks to install in order to run a development instance. This tutorial covers this process from start to finish. A summarised list is as follows:

- Git (for cloning the repository), otherwise you can download the repo as a `.zip` file
- npm (Node Package Manager)
- MongoDB Community Server
- MongoDB Compass (*optional*) highly suggested GUI for navigating the MongoDB database.

#### npm
[npm](https://www.npmjs.com/) is the chosen package manager for this project. It is a ***required*** depdendency.

#### MongoDB Community Server
MongoDB is a NoSQL database. It is our chosen information storage format and is great for rapid prototyping. You can find installation guides for Linux, Mac OS, and Windows [here](https://docs.mongodb.com/manual/administration/install-community/).

#### MongoDB Compass
MongoDB Compass is a GUI that sits on top of MongoDB and allows you to see the collections and documents in your database. It is crucial for effective development. You can download it from [here](https://www.mongodb.com/download-center/compass).
### Packages
If all relevant prerequisites have been installed, we can now continue onto package installations. This repository contains two projects, one for the backend (in the `backend/` directory) and one for the frontend (in the `client/` directory). It is important to note that each project has its own associated `package.json` files that stores information related to its respective project. 

-  **Client Packages**
The client keeps all of its concerns in the `client/` folder. If you want to install a package to assist with frontend development, make sure you `cd` to the `client/` directory before installing it and so you do **not** install it in the root direcoty. 

-  **Backend Packages**
The backend keeps all of its concerns within the root directory *and* `backend/`. For the purposes of package installations, make sure you install backend packages to the root directory and **not** in the `client/` directory.

#### Package Installation
1. Install the backend packages by running the command `npm install` in the root directory.
2. When the backend packages have finished installing, change your directory to the `client/` subfolder and then issue the same `npm install` command. 

#### Environment Variables Setup
An environment variable is a variable whose value is set outside the program. An environment variable is made up of a name/value pair, and any number may be created and available for reference at a point in time. This helps us to separate production configuration from development configuration.

As it presently stands, there are two `.env` files of concern. Each sub-project (backend and frontend) gets its own `.env` file in their root directories.

The following `.env` configuration is to be placed in the **root** directory.
```
MONGO_URI=mongodb://localhost:27017/memento-test
JWT_SECRET= <your secret>
EMAIL_ENABLED=true
EMAIL_USERNAME= <email username>
EMAIL_PASSWORD= <email password>
EMAIL_HOSTNAME= <email hostname>
EMAIL_PORT= <email port>
EMAIL_FROM= <email from address>  
HOST_NAME= <host name>
```

The following `.env` configuration is *optional* and should be located at `client/.env`.
```
REACT_APP_DEFAULT_LOGIN_EMAIL= <your default login email>
REACT_APP_DEFAULT_LOGIN_PASSWORD= <your defauly login password>
ENGINE_API_KEY= <apollo engine api key>
```

Of course, most things in the angle brackets `<` and `>` need to be replaced for the application to function properly, and they are ommitted here as they are sensitive information (hence the need for environment variables). If you are a contributor, examples have been provided on Slack in the `#keys` channel.

#### Database GUI Setup
Most of the tedious work has been completed if you have completed the above steps. You should have **MongoDB Community Server** installed, and optionally MongoDB Compass. To check if your database is functional, you can use MongoDB Compass to connect to your local cluster. 

1. **Open MongoDB Compass**
You should be greeted with a "Connect to Host" screen. 
1. **Setup 'Connect to Host'**
   On this screen, there should be a lot of default values filled in. Of importance is hostname and port. This should match your `MONGO_URI` environment variable. In the example confguration above, `MONGO_URI` contains `localhost:27017`, so the host would be localhost, and the port would be 27017. 
2. **Click 'Connect'**
3. **Create a memento database**
   Click 'Create Database'. Set the database name the one in `MONGO_URI`, in this case: `memento-test`. Set the 'Collection Name' to  `users`. 

#### Running the Local Development Environemnt
By now, your development environment should be sufficiently set up. Open your terminal, navigate to the root directory and issue the command:

`npm run dev`

# Coding Guidelines
## Variable and Function
* Use `camelCase` for variable and function names

> Reason: Conventional JavaScript

**Bad**
```ts
var FooVar;
function BarFunc() { }
```
**Good**
```ts
var fooVar;
function barFunc() { }
```

## Class
* Use `PascalCase` for class names.

> Reason: This is actually fairly conventional in standard JavaScript.

**Bad**
```ts
class foo { }
```
**Good**
```ts
class Foo { }
```
* Use `camelCase` of class members and methods

> Reason: Naturally follows from variable and function naming convention.

**Bad**
```ts
class Foo {
    Bar: number;
    Baz() { }
}
```
**Good**
```ts
class Foo {
    bar: number;
    baz() { }
}
```
## Interface

* Use `PascalCase` for name.

> Reason: Similar to class

* Use `camelCase` for members.

> Reason: Similar to class

* **Don't** prefix with `I`

> Reason: Unconventional. `lib.d.ts` defines important interfaces without an `I` (e.g. Window, Document etc).

**Bad**
```ts
interface IFoo {
}
```
**Good**
```ts
interface Foo {
}
```

## Type

* Use `PascalCase` for name.

> Reason: Similar to class

* Use `camelCase` for members.

> Reason: Similar to class


## Namespace

* Use `PascalCase` for names

> Reason: Convention followed by the TypeScript team. Namespaces are effectively just a class with static members. Class names are `PascalCase` => Namespace names are `PascalCase`

**Bad**
```ts
namespace foo {
}
```
**Good**
```ts
namespace Foo {
}
```

## Enum

* Use `PascalCase` for enum names

> Reason: Similar to Class. Is a Type.

**Bad**
```ts
enum color {
}
```
**Good**
```ts
enum Color {
}
```

* Use `PascalCase` for enum member

> Reason: Convention followed by TypeScript team i.e. the language creators e.g `SyntaxKind.StringLiteral`. Also helps with translation (code generation) of other languages into TypeScript.

**Bad**
```ts
enum Color {
    red
}
```
**Good**
```ts
enum Color {
    Red
}
```

## Null vs. Undefined

* Prefer not to use either for explicit unavailability

> Reason: these values are commonly used to keep a consistent structure between values. In TypeScript you use *types* to denote the structure

**Bad**
```ts
let foo = {x:123,y:undefined};
```
**Good**
```ts
let foo:{x:number,y?:number} = {x:123};
```

* Use `undefined` in general (do consider returning an object like `{valid:boolean,value?:Foo}` instead)

***Bad***
```ts
return null;
```
***Good***
```ts
return undefined;
```

* Use `null` where its a part of the API or conventional

> Reason: It is conventional in Node.js e.g. `error` is `null` for NodeBack style callbacks.

**Bad**
```ts
cb(undefined)
```
**Good**
```ts
cb(null)
```

* Use *truthy* check for **objects** being `null` or `undefined`

**Bad**
```ts
if (error === null)
```
**Good**
```ts
if (error)
```

* Use `== undefined` / `!= undefined` (not `===` / `!==`) to check for `null` / `undefined` on primitives as it works for both `null`/`undefined` but not other falsy values (like `''`,`0`,`false`) e.g.

**Bad**
```ts
if (error !== null)
```
**Good**
```ts
if (error != undefined)
```

## Formatting
The TypeScript compiler ships with a very nice formatting language service. Whatever output it gives by default is good enough to reduce the cognitive overload on the team.

Use [`tsfmt`](https://github.com/vvakame/typescript-formatter) to automatically format your code on the command line. Also your IDE (atom/vscode/vs/sublime) already has formatting support built-in.

Examples:
```ts
// Space before type i.e. foo:<space>string
const foo: string = "hello";
```

## Quotes

* Prefer single quotes (`'`) unless escaping.

> Reason: More JavaScript teams do this (e.g. [airbnb](https://github.com/airbnb/javascript), [standard](https://github.com/feross/standard), [npm](https://github.com/npm/npm), [node](https://github.com/nodejs/node), [google/angular](https://github.com/angular/angular/), [facebook/react](https://github.com/facebook/react)). Its easier to type (no shift needed on most keyboards). [Prettier team recommends single quotes as well](https://github.com/prettier/prettier/issues/1105)

> Double quotes are not without merit: Allows easier copy paste of objects into JSON. Allows people to use other languages to work without changing their quote character. Allows you to use apostrophes e.g. `He's not going.`. But I'd rather not deviate from where the JS Community is fairly decided.

* When you can't use double quotes, try using back ticks (\`).

> Reason: These generally represent the intent of complex enough strings.

## Spaces

* Use `2` spaces. Not tabs.

> Reason: More JavaScript teams do this (e.g. [airbnb](https://github.com/airbnb/javascript), [idiomatic](https://github.com/rwaldron/idiomatic.js), [standard](https://github.com/feross/standard), [npm](https://github.com/npm/npm), [node](https://github.com/nodejs/node), [google/angular](https://github.com/angular/angular/), [facebook/react](https://github.com/facebook/react)). The TypeScript/VSCode teams use 4 spaces but are definitely the exception in the ecosystem.

## Semicolons

* Use semicolons.

> Reasons: Explicit semicolons helps language formatting tools give consistent results. Missing ASI (automatic semicolon insertion) can trip new devs e.g. `foo() \n (function(){})` will be a single statement (not two). TC39 [warning on this as well](https://github.com/tc39/ecma262/pull/1062). Example teams: [airbnb](https://github.com/airbnb/javascript), [idiomatic](https://github.com/rwaldron/idiomatic.js), [google/angular](https://github.com/angular/angular/), [facebook/react](https://github.com/facebook/react), [Microsoft/TypeScript](https://github.com/Microsoft/TypeScript/).

## Array

* Annotate arrays as `foos:Foo[]` instead of `foos:Array<Foo>`.

> Reasons: Its easier to read. Its used by the TypeScript team. Makes easier to know something is an array as the mind is trained to detect `[]`.

## Filename
Name files with `camelCase`. E.g. `accordian.tsx`, `myControl.tsx`, `utils.ts`, `map.ts` etc.

> Reason: Conventional across many JS teams.

## type vs. interface

* Use `type` when you *might* need a union or intersection:

```
type Foo = number | { someProperty: number }
```
* Use `interface` when you want `extends` or `implements` e.g

```
interface Foo {
  foo: string;
}
interface FooBar extends Foo {
  bar: string;
}
class X implements FooBar {
  foo: string;
  bar: string;
}
```