# SCRIPT RUNNER

run custom terminal commands from your workflow form any location at any time

## set-up

```bash
git clone https://github.com/Vishnu-301/script-runner.git
```

```bash
cd script-runner
```
```bash
npm install # install dependencies
```

## configure terminal command you want to run

```typescript
import { execSync } from "node:child_process";

function run(command: string) {

    console.log( `> ${command}` );
    execSync(command, { stdio: "inherit" });

}
```

``` typescript
run("<your terminal command>")
```

## run script

```bash
npx tsx runner.ts
```

OR

```bash
npm run start
```
