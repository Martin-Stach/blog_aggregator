import { getCurrentUser } from "src/config";
import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "src/lib/db/queries/feed-follows";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { getUserByName } from "src/lib/db/queries/users";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }

  const [url] = args;

  const currentUser = await getUserByName(getCurrentUser());

  if (!currentUser) {
    throw new Error("Error fetching User");
  }

  const feed = await getFeedByURL(url);

  if (!feed) {
    throw new Error("Error fetching Feed");
  }

  const feedFollows = await createFeedFollow(currentUser.id, feed.id);

  console.log(
    feedFollows.feedFollowId
      ? `Successfully followed feed: ${feedFollows.feedName} by user: ${feedFollows.userName}`
      : `Failed to follow feed: ${feed.name} by user: ${currentUser.name}`,
  );
}

export async function handlerListFeedFollows(
  cmdName: string,
  ...args: string[]
) {
  if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }

  const currentUser = await getUserByName(getCurrentUser());

  if (!currentUser) {
    throw new Error("Error fetching User");
  }

  const feedFollows = await getFeedFollowsForUser(currentUser.id);

  if (feedFollows.length === 0) {
    console.log(`No feed follows found for user: ${currentUser.name}`);
    return;
  }

  console.log(`Feed follows for user: ${currentUser.name}`);
  for (const feedFollow of feedFollows) {
    console.log(
      `* FeedFollow ID: ${feedFollow.feedFollowId}, Feed Name: ${feedFollow.feedName}, Feed URL: ${feedFollow.feedUrl}`,
    );
  }
}
