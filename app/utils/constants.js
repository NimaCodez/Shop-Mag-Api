EXPIRES_IN = Date.now() + 120000
USER_ROLE = "USER"
JWT_TOKEN_SECRET_KEY = "3AA6C929CB694262F089E13BFACD276F3A7CFBA1C68BC79A8B9D2354CA0106DC"
REFRESH_TOKEN_SECRET_KEY = "8E81E7B0D5AE0A178CAF953FAA4E0485EFA5CA1242215D074BE29B8B488D344F"
const MongoIDPattern = /^[a-fA-F0-9]{24}$/i

const ROLES = Object.freeze({
    USER: "USER",
    ADMIN: "ADMIN",
    AUTHOR: "AUTHOR",
    TEACHER: "TEACHER",
    STUDENT: "STUDENT",
    SUPPLIER: "SUPPLIER",
})

const PERMISSIONS = Object.freeze({
    USER: ["profile"],
    ADMIN: ["all"],
    AUTHOR: ["course", "blog", "category"],
    TEACHER: ["course", "blog"],
    SUPPLIER: ["product"],
}) 

// const PERMISSIONS = {
//     ALL: "all",
//     CATEGORY: "category",
//     COURSE: "course",
//     BLOG: "blog",
//     CHAPTER: "chapter",
//     PRODUCT: "product",
//     EPISODE: "episode",
//     USER: "user"
// }

module.exports = {
    EXPIRES_IN,
    USER_ROLE,
    JWT_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
    MongoIDPattern,
    ROLES,
    PERMISSIONS
}
