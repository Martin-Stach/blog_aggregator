import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds } from "../schema";

export async function createFeed(name: string, url: string, user_id: string) {
  console.log("In CreateFeed query");

  const [result] = await db
    .insert(feeds)
    .values({
      name: name,
      url: url,
      userId: user_id,
    })
    .returning();
  return result;
}

export async function getFeeds() {
  console.log("In getFeeds");

  return await db.select().from(feeds);
}

export async function getFeedByURL(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
  return result;
}
