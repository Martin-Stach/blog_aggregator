import { fetchFeed } from "src/lib/rss";


export async function handleAgg(cmdName: string, ...args: string[]) {
    const url = "https://www.wagslane.dev/index.xml"; 

    if (args.length !== 0) {
    throw new Error(`usage: ${cmdName}`);
  }

    const feed = await fetchFeed(url);

    console.log("Function agg: ", JSON.stringify(feed, null, 2));

}