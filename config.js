import dotenv from "dotenv";
// 环境变量
dotenv.config();
// 验证并提取环境变量
const getEnvVariable = (key) => {
    const value = process.env[key];
    if (value === undefined) {
        return null;
    }
    return value;
};
// 将环境变量转换为数值
const getNumericEnvVariable = (key, defaultValue) => {
    const value = getEnvVariable(key) ?? String(defaultValue);
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        return defaultValue;
    }
    return parsedValue;
};
// 将环境变量转换为布尔值
const getBooleanEnvVariable = (key, defaultValue) => {
    const value = getEnvVariable(key) ?? String(defaultValue);
    return value.toLowerCase() === "true";
};
// 创建配置对象
export const config = {
    PORT: getNumericEnvVariable("PORT", 6688),
    DISALLOW_ROBOT: getBooleanEnvVariable("DISALLOW_ROBOT", true),
    CACHE_TTL: getNumericEnvVariable("CACHE_TTL", 3600),
    REQUEST_TIMEOUT: getNumericEnvVariable("CACHE_TTL", 6000),
    ALLOWED_DOMAIN: getEnvVariable("ALLOWED_DOMAIN") || "*",
    USE_LOG_FILE: getBooleanEnvVariable("USE_LOG_FILE", true),
    RSS_MODE: getBooleanEnvVariable("RSS_MODE", false),
};
