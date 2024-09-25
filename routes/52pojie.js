import { web } from "../utils/getData.js";
import { extractRss, parseRSS } from "../utils/parseRSS.js";
import { getTime } from "../utils/getTime.js";
export const handleRoute = async (c, noCache) => {
    const type = c.req.query("type") || "hot";
    const { fromCache, data, updateTime } = await getList({ type }, noCache);
    const routeData = {
        name: "52pojie",
        title: "吾爱破解",
        type: "榜单",
        params: {
            type: {
                name: "榜单分类",
                type: {
                    tech: "新鲜出炉",
                    newthread: "技术分享",
                    hot: "人气热门",
                    digest: "精华采撷",
                },
            },
        },
        link: "https://www.52pojie.cn/",
        total: data?.length || 0,
        updateTime,
        fromCache,
        data,
    };
    return routeData;
};
const getList = async (options, noCache) => {
    const { type } = options;
    const url = `https://www.52pojie.cn/forum.php?mod=guide&view=${type}&rss=1`;
    const result = await web({
        url,
        noCache,
        userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
    });
    const parseData = async () => {
        if (typeof result?.data === "string") {
            const rssContent = extractRss(result.data);
            return await parseRSS(rssContent);
        }
        else {
            return [];
        }
    };
    const list = await parseData();
    return {
        fromCache: result.fromCache,
        updateTime: result.updateTime,
        data: list.map((v) => ({
            id: v.guid,
            title: v.title,
            desc: v.content,
            author: v.author,
            timestamp: getTime(v.pubDate),
            hot: null,
            url: v.link,
            mobileUrl: v.link,
        })),
    };
};
