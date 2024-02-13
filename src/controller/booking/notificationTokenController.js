import { notification } from "../../model/notificationToken.js";

//Create notification token 
const createNotificationToken = async (req, res) => {
    
    const {customerID, token} = req.body

    try {

        if(!customerID || !token) {

            return res.status(400).json({ message: "Please fill required information"});
        } else {

            await notification.create({

                customerID,
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