import { customerSchema } from "../../model/customer.js";
import { notification } from "../../model/notificationToken.js";

//Create notification token 
const createNotificationToken = async (req, res) => {

    const { _id } = req.user

    const customerID = await customerSchema.findById({
        _id: _id
    })

    const {token} = req.body

    try {

        if(!customerID || !token) {

            return res.status(400).json({ message: "Please fill required information"});
        } else {

            await notification.create({

                customerID:customerID,
                token
            });
        }
        
    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const n = {
    createNotificationToken
};