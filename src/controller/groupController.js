import groupService from '../service/groupService';

const ReadAllGroup = async (req, res) => {
    try {
        let respone = await groupService.GetAllGroup();
        if (respone && +respone.EC === 0) {
            return res.status(200).json({
                EM: respone.EM,
                EC: respone.EC,
                DT: respone.DT
            })
        }
    } catch (error) {
        console.log(">>>> Check error from function ReadAllGroup of groupController.js:", error)
        return res.status(500).json({
            EM: "Error from function ReadAllGroup of groupController.js",
            EC: "-1",
            DT: ""
        })
    }
}

module.exports = { ReadAllGroup }