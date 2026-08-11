import { unfollowFeed } from "src/lib/db/queries/feed-follows";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import type { User } from "src/lib/db/schema";

export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }

  const [url] = args;

  const feed = await getFeedByURL(url);

  if (!feed) {
    throw new Error("Error fetching Feed");
  }

  const feedFollows = await unfollowFeed(user.id, feed.id);

  console.log(
    feedFollows.id
      ? `Successfully unfollowed feed: ${feedFollows.feedId} by user: ${feedFollows.userId}`
      : `Failed to unfollow feed: ${feed.name} by user: ${user.name}`,
  );
}
