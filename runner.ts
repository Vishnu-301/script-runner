import { execSync } from "node:child_process";

function run(command: string) {
    console.log(`> ${command}`);
    execSync(command, { stdio: "inherit" });
}

run("sudo apt update");
run("sudo apt install net-tools -y");
run("sudo apt install netdiscover -y");
run("sudo netdiscover")