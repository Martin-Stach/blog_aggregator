import { and, eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, users } from "../schema";

export async function createFeedFollow(userID: string, feedID: string) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values({ userId: userID, feedId: feedID })
    .returning();

  const [result] = await db
    .select({
      feedFollowId: feedFollows.id,
      userId: users.id,
      userName: users.name,
      feedId: feeds.id,
      feedName: feeds.name,
      feedUrl: feeds.url,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.id, newFeedFollow.id));

  return result;
}

export async function getFeedFollowsForUser(userID: string) {
  const result = await db
    .select({
      feedFollowId: feedFollows.id,
      feedId: feeds.id,
      feedName: feeds.name,
      feedUrl: feeds.url,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, userID));

  return result;
}

export async function unfollowFeed(userID: string, feedID: string) {
  const [result] = await db
    .delete(feedFollows)
    .where(and(eq(feedFollows.userId, userID), eq(feedFollows.feedId, feedID)))
    .returning();

  return result;
}
