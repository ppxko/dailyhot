import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";
export const handleRoute = async (_, noCache) => {
    const { fromCache, data, updateTime } = await getList(noCache);
    const routeData = {
        name: "thepaper",
        title: "澎湃新闻",
        type: "热榜",
        link: "https://www.thepaper.cn/",
        total: data?.length || 0,
        updateTime,
        fromCache,
        data,
    };
    return routeData;
};
const getList = async (noCache) => {
    const url = `https://cache.thepaper.cn/contentapi/wwwIndex/rightSidebar`;
    const result = await get({ url, noCache });
    const list = result.data.data.hotNews;
    return {
        fromCache: result.fromCache,
        updateTime: result.updateTime,
        data: list.map((v) => ({
            id: v.contId,
            title: v.name,
            cover: v.pic,
            hot: Number(v.praiseTimes),
            timestamp: getTime(v.pubTimeLong),
            url: `https://www.thepaper.cn/newsDetail_forward_${v.contId}`,
            mobileUrl: `https://m.thepaper.cn/newsDetail_forward_${v.contId}`,
        })),
    };
};
