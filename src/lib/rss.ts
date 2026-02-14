import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const requestHeader = new Headers({"User-Agent": "gator"});
  const request = new Request(feedURL, {headers: requestHeader})

  const response = await fetch(request);
  const xml = await response.text();
  const parsed = parseXML(xml);

  const channel = parsed.rss?.channel;
  if (!channel) {
    throw new Error("falied to parse channel")
  }
  if(!channel.title || !channel.link || !channel.description) {
    throw new Error("Channel check. Title, link, or description not present.");
  }
  const title = channel.title;
  const link = channel.link;
  const description = channel.description;
  
  let items: RSSItem[];
  if(Array.isArray(channel.item)) {
    items = channel.item;
  } else {
    items = [];
  }

  const resultItems: RSSItem[] = [];
  for (const item of items) {

    if (item.title && item.link && item.description && item.pubDate) {
      
      resultItems.push({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate
      });
    }
  };

  // Assembly
  const result: RSSFeed = {
    channel: {
    title,
    link,
    description,
    item: resultItems
    }
  }

  return result;
}

function parseXML(input: string) {
    const parser = new XMLParser();
    return parser.parse(input);
}
