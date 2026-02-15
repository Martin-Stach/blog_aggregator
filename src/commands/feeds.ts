import { getCurrentUser } from "src/config";
import { createFeed, getFeeds } from "src/lib/db/queries/feeds";
import {
  getUserByID as getUserById,
  getUserByName,
} from "src/lib/db/queries/users";
import type { Feed, User } from "src/lib/db/schema";

export async function handleAddfeed(cmdName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <name> <url>`);
  }

  const [name, url] = args;

  const currentUser = await getUserByName(getCurrentUser());

  if (!currentUser) {
    throw new Error("Error fetching User");
  }

  const feed: Feed = await createFeed(name, url, currentUser.id);

  printFeed(feed, currentUser);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

export async function handleFeeds(_: string) {
  const feeds: Feed[] = await getFeeds();
  if (feeds.length === 0) {
    console.log(`No feeds found.`);
    return;
  }

  for (const feed of feeds) {
    const user = await getUserById(feed.userId);
    if (!user) {
      throw new Error(`Failed to find user for feed ${feed.id}`);
    }
    printFeed(feed as Feed, user);
    console.log(`=====================================`);
  }
}
