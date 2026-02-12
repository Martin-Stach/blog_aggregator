import { createUser, getUserByName } from "src/lib/db/queries/users";
import { setUser } from "../config";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <username>`);
  }

  const username = args[0];
  if (!(await getUserByName(username))) {
    throw new Error(`User ${username} does not exist`);
  }

  setUser(username);
  console.log(`User <${username}> has been set.`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  console.log("Start handlerRegister", cmdName, args);

  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <username>`);
  }

  const username = args[0];
  await createUser(username);
  setUser(username);
  console.log(`User ${username} was created and logged in.`);
}
