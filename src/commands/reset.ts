import { resetDatabase } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }

  try {
    await resetDatabase();
    process.exit(0);
  } catch (_) {
    process.exit(1);
  }
}
