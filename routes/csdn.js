import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";
export const handleRoute = async (_, noCache) => {
    const { fromCache, data, updateTime } = await getList(noCache);
    const routeData = {
        name: "csdn",
        title: "CSDN",
        type: "排行榜",
        description: "专业开发者社区",
        link: "https://www.csdn.net/",
        total: data?.length || 0,
        updateTime,
        fromCache,
        data,
    };
    return routeData;
};
const getList = async (noCache) => {
    const url = "https://blog.csdn.net/phoenix/web/blog/hot-rank?page=0&pageSize=30";
    const result = await get({ url, noCache });
    const list = result.data.data;
    return {
        fromCache: result.fromCache,
        updateTime: result.updateTime,
        data: list.map((v) => ({
            id: v.productId,
            title: v.articleTitle,
            cover: v.picList?.[0] || null,
            desc: null,
            author: v.nickName,
            timestamp: getTime(v.period),
            hot: Number(v.hotRankScore),
            url: v.articleDetailUrl,
            mobileUrl: v.articleDetailUrl,
        })),
    };
};
