import { spawnSync } from "node:child_process";
import readline from "node:readline/promises";

// Returns the exit code instead of killing the process, so the prompt loop can continue.
function run(command: string): number {
    console.log(`> ${command}`);
    const result = spawnSync(command, { shell: true, stdio: "inherit" });
    return result.status ?? 1;
}

async function inputLoop() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    console.log('\nEnter a command to run. Use "&&" to run several. Type "exit" to quit.');

    while (true) {
        const answer = (await rl.question("$ ")).trim();
        if (!answer) continue;
        if (answer === "exit") break;

        if (answer) {
            for (const cmd of answer.split(/\n|&&/).map((c) => c.trim()).filter(Boolean)) {
                const code = run(cmd);
                if (code !== 0) process.exit(code);
            }
        }
    }
    rl.close();
}

async function main() {
    // Non-interactive (GitHub Actions): take the command from the COMMAND env var.
    if (!process.stdin.isTTY) {
        const command = process.env.COMMAND?.trim();
        if (command) {
            for (const cmd of command.split("\n").map((c) => c.trim()).filter(Boolean)) {
                const code = run(cmd);
                if (code !== 0) process.exit(code);
            }
        } else {
            console.log("No COMMAND provided, nothing more to run.");
        }
        return;
    }

    // Interactive (local terminal): ask for input.
    await inputLoop();
}

main();