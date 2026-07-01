import { handleAgg } from "./commands/aggregate";
import {
  type CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerFollow, handlerListFeedFollows } from "./commands/feed-follows";
import { handleAddfeed, handleFeeds } from "./commands/feeds";
import { handlerReset } from "./commands/reset";
import {
  handleGetUsers,
  handlerLogin,
  handlerRegister,
} from "./commands/users";

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
  registerCommand(registry, "users", handleGetUsers);
  registerCommand(registry, "agg", handleAgg);
  registerCommand(registry, "addfeed", handleAddfeed);
  registerCommand(registry, "feeds", handleFeeds);
  registerCommand(registry, "follow", handlerFollow);
  registerCommand(registry, "following", handlerListFeedFollows);

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
