const GetTopByTestCount = require("./model").GetTopByTestCount;



const GetTopActive = async () => {
    const users = await GetTopByTestCount(5);

    if (users.length === 0) {
        return null;
    }

    return users;
}


module.exports = {
    GetTopActive

}