import db from '../models/index';

const GetAllGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['nameGR', 'ASC']]
        });
        return ({
            EM: "Get group success!",
            EC: 0,
            DT: data
        })
    } catch (error) {
        console.log(">>>> Check error from function GetAllGroup of groupService.js:", error)
        return ({
            EM: "Error from function GetAllGroup of groupService.js",
            EC: "-1",
            DT: ""
        })
    }
}
module.exports = { GetAllGroup }