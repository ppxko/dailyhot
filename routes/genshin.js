import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";
export const handleRoute = async (c, noCache) => {
    const type = c.req.query("type") || "1";
    const { fromCache, data, updateTime } = await getList({ type }, noCache);
    const routeData = {
        name: "genshin",
        title: "原神",
        type: "最新动态",
        params: {
            type: {
                name: "榜单分类",
                type: {
                    1: "公告",
                    2: "活动",
                    3: "资讯",
                },
            },
        },
        link: "https://www.miyoushe.com/ys/home/28",
        total: data?.length || 0,
        updateTime,
        fromCache,
        data,
    };
    return routeData;
};
const getList = async (options, noCache) => {
    const { type } = options;
    const url = `https://bbs-api.miyoushe.com/post/wapi/getNewsList?gids=2&page_size=20&type=${type}`;
    const result = await get({ url, noCache });
    const list = result.data.data.list;
    return {
        fromCache: result.fromCache,
        updateTime: result.updateTime,
        data: list.map((v) => {
            const data = v.post;
            return {
                id: data.post_id,
                title: data.subject,
                desc: data.content,
                cover: data.cover,
                author: v.user?.nickname || null,
                timestamp: getTime(data.created_at),
                hot: data.view_status,
                url: `https://www.miyoushe.com/ys/article/${data.post_id}`,
                mobileUrl: `https://m.miyoushe.com/ys/#/article/${data.post_id}`,
            };
        }),
    };
};
