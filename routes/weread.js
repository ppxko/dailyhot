import { get } from "../utils/getData.js";
import getWereadID from "../utils/getToken/weread.js";
import { getTime } from "../utils/getTime.js";
export const handleRoute = async (_, noCache) => {
    const { fromCache, data, updateTime } = await getList(noCache);
    const routeData = {
        name: "weread",
        title: "微信读书",
        type: "飙升榜",
        link: "https://weread.qq.com/",
        total: data?.length || 0,
        updateTime,
        fromCache,
        data,
    };
    return routeData;
};
const getList = async (noCache) => {
    const url = `https://weread.qq.com/web/bookListInCategory/rising?rank=1`;
    const result = await get({
        url,
        noCache,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67",
        },
    });
    const list = result.data.books;
    return {
        fromCache: result.fromCache,
        updateTime: result.updateTime,
        data: list.map((v) => {
            const data = v.bookInfo;
            return {
                id: data.bookId,
                title: data.title,
                author: data.author,
                desc: data.intro,
                cover: data.cover.replace("s_", "t9_"),
                timestamp: getTime(data.publishTime),
                hot: v.readingCount,
                url: `https://weread.qq.com/web/bookDetail/${getWereadID(data.bookId)}`,
                mobileUrl: `https://weread.qq.com/web/bookDetail/${getWereadID(data.bookId)}`,
            };
        }),
    };
};
