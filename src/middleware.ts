import type { CommandHandler, UserCommandHandler } from "./commands/commands";
import { getCurrentUser } from "./config";
import { getUserByName } from "./lib/db/queries/users";

export function middlewareLoggedIn(
  handler: UserCommandHandler,
): CommandHandler {
  return async (cmdName: string, ...args: string[]) => {
    const userName = getCurrentUser();
    if (!userName) {
      throw new Error("User not logged in");
    }

    const currentUser = await getUserByName(userName);
    if (!currentUser) {
      throw new Error(`User ${userName} not found`);
    }

    return handler(cmdName, currentUser, ...args);
  };
}
