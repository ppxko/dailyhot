import { get } from "../utils/getData.js";
export const handleRoute = async (_, noCache) => {
    const { fromCache, data, updateTime } = await getList(noCache);
    const routeData = {
        name: "juejin",
        title: "稀土掘金",
        type: "文章榜",
        link: "https://juejin.cn/hot/articles",
        total: data?.length || 0,
        updateTime,
        fromCache,
        data,
    };
    return routeData;
};
const getList = async (noCache) => {
    const url = `https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot`;
    const result = await get({ url, noCache });
    const list = result.data.data;
    return {
        fromCache: result.fromCache,
        updateTime: result.updateTime,
        data: list.map((v) => ({
            id: v.content.content_id,
            title: v.content.title,
            author: v.author.name,
            hot: v.content_counter.hot_rank,
            timestamp: null,
            url: `https://juejin.cn/post/${v.content.content_id}`,
            mobileUrl: `https://juejin.cn/post/${v.content.content_id}`,
        })),
    };
};
