import { execSync } from "node:child_process";

function run(command: string) {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit" });
}

run("sudo apt-get update");
run("sudo apt-get install -y nginx");
run("nginx -v");