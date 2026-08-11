import { handleAgg } from "./commands/aggregate";
import {
  type CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerFollow, handlerListFeedFollows } from "./commands/feed-follows";
import { handlerUnfollow } from "./commands/feed-unfollows";
import { handleAddfeed, handleFeeds } from "./commands/feeds";
import { handlerReset } from "./commands/reset";
import {
  handleGetUsers,
  handlerLogin,
  handlerRegister,
} from "./commands/users";
import { middlewareLoggedIn } from "./middleware";

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
  registerCommand(registry, "addfeed", middlewareLoggedIn(handleAddfeed));
  registerCommand(registry, "feeds", handleFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
  registerCommand(
    registry,
    "following",
    middlewareLoggedIn(handlerListFeedFollows),
  );

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
