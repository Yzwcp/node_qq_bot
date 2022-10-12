const formatRes = (data, code = 1, msg = '') => {
    return {
        data,
        code,
        msg
    }
}
module.exports = {
    formatRes
}