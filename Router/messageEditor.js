const Users = require("../Model/User")

const activeUser = async (email) => {
    await Users.updateOne({ email: email }, {
        $set: {
            active: true
        }
    })
}


const diactiveUser = async (email) => {

    await Users.updateOne({ email: email }, {
        $set: {
            active: false
        }
    })
}

module.exports = { activeUser, diactiveUser }