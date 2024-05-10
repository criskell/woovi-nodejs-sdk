# CLONE

Before starting, make sure to give the git clone, you can follow the steps below to create a clone and switch branches:

```bash
git clone https://github.com/criskell/woovi-nodejs-sdk
cd woovi-nodejs-sdk
git checkout -b branch-name
```

# The dependecies

We use pnpm, but you can use npm if you wish

```bash
pnpm i
```

# The tests

To run the tests, use `pnpm run test` or `pnpm run test:watch` to keep tracking the changes, it uses jest to perform the tests determined in the **tests** folder.
In some cases, a more elaborate command will be necessary, for example, to give watch you can use the command with the --watch prefix.
To run specific tests, use -- followed by space and a regex with match for the file name.

# Lint and Format

We use biome to keep all files looking beautifull. So, run `lint` or `format` commands when you feel that is necessary.

# The commit

We use commitzen to keep a default commit message padronization, so, after make all the changes on the code, run `git add .` and finish with the `commit` command:

```bash
pnpm run commit
```

# Build

To generate the lib build, you can use the build command. It will generate the lib code on a dist folder for you with all the types.

```bash
pnpm run build
```

# This project is under MIT license.
