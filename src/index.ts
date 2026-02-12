import {
  type CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerReset } from "./commands/reset";
import { handlerLogin, handlerRegister } from "./commands/users";

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error("not enough arguments");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);

  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);

  try {
    await runCommand(registry, cmdName, ...cmdArgs);
  } catch (err) {
    console.log("Error catch: ", err);

    console.error(String(err));
    process.exit(1);
  }

  process.exit(0);
}

main();
