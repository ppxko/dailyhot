import { load } from "cheerio";
import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";
export const handleRoute = async (_, noCache) => {
    const { fromCache, data, updateTime } = await getList(noCache);
    const routeData = {
        name: "ithome-xijiayi",
        title: "IT之家「喜加一」",
        type: "最新动态",
        description: "最新最全的「喜加一」游戏动态尽在这里！",
        link: "https://www.ithome.com/zt/xijiayi",
        total: data?.length || 0,
        updateTime,
        fromCache,
        data,
    };
    return routeData;
};
// 链接处理
const replaceLink = (url, getId = false) => {
    const match = url.match(/https:\/\/www\.ithome\.com\/0\/(\d+)\/(\d+)\.htm/);
    if (match && match[1] && match[2]) {
        return getId ? match[1] + match[2] : `https://m.ithome.com/html/${match[1]}${match[2]}.htm`;
    }
    return url;
};
const getList = async (noCache) => {
    const url = `https://www.ithome.com/zt/xijiayi`;
    const result = await get({ url, noCache });
    const $ = load(result.data);
    const listDom = $(".newslist li");
    const listData = listDom.toArray().map((item) => {
        const dom = $(item);
        const href = dom.find("a").attr("href");
        const time = dom.find("span.time").text().trim();
        const match = time.match(/'([^']+)'/);
        const dateTime = match ? match[1] : null;
        return {
            id: href ? Number(replaceLink(href, true)) : 100000,
            title: dom.find(".newsbody h2").text().trim(),
            desc: dom.find(".newsbody p").text().trim(),
            cover: dom.find("img").attr("data-original"),
            timestamp: getTime(dateTime),
            hot: Number(dom.find(".comment").text().replace(/\D/g, "")),
            url: href || undefined,
            mobileUrl: href ? replaceLink(href) : undefined,
        };
    });
    return {
        fromCache: result.fromCache,
        updateTime: result.updateTime,
        data: listData,
    };
};
