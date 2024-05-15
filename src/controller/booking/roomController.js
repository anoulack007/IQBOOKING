import { rooms } from "../../model/rooms.js";


//View room list
const viewRoom = async (req, res) => {
    const info = await rooms.find()
    console.log(info);
    

    return res.status(200).send(info)
};

//View room list by ID
const viewRoomID = async (req, res) => {

    try {

        const roomID = req.params.id;
        const check = await rooms.findById(roomID)

        if (!check) {

            return res.status(404).json({
                message: "Invalid information or not found"
            });

        } else {
            return res.send(check)
        }
    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Create room
const createRoom = async (req, res) => {


        let imageName = []

        const { roomName, floor, type_room, description, is_active_status } = req.body

        if (req.files) {
            console.log(req.files)
            for (const i of req.files) { imageName.push(i.originalname) }
                console.log(imageName)
            await rooms.create({
                images: imageName,
                roomName,
                floor,
                type_room,
                description
            });

            return res.status(200).json({ message: "Room registered" });
        }

        const roomCheck = await rooms.findOne({ roomName: roomName });

        if (roomCheck) {
            return res.status(400).json({
                message: "Room is exist"
            });
        }

        if (!roomName) {

            return res.status(400).json({
                message: "Please fill required information"
            });
        } else {

            await rooms.create({

                roomName,
                floor,
                type_room,
                is_active_status,
                description
            });
            return res.status(200).json({ message: "Room registered" });
        }

    
}

//Update room information by ID
const updateRoomID = async (req, res) => {

    try {

        const roomID = req.params.id;
        const { roomName, floor, type_room, description,is_active_status } = req.body

        const roomCheck = await rooms.findOne({ roomName: roomName });

        if (roomCheck) {
            return res.status(400).json({
                message: "Room is exist"
            });
        }

        if (req.files) {

            let imageName = []

            for (const i of req.files) { imageName.push(i.originalname) }
            


            await rooms.findByIdAndUpdate({
                _id: roomID
            },
                {
                    images: imageName,
                    roomName,
                    floor,
                    type_room,
                    description,
                    is_active_status
                });
                
                return res.status(200).json({message: "Success!"})
        } else {

            await rooms.findByIdAndUpdate({
                _id: roomID
            },
                {
                    roomName,
                    floor,
                    type_room,
                    description,
                    is_active_status
                });
            return res.status(200).json({ message: "Success!" })

        }

    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Delete room information by ID
const deleteRoomID = async (req, res) => {

    try {

        const roomID = req.params.id
        const deleteR = await rooms.findByIdAndDelete(roomID)

        if (!deleteR) {
            return res.status(404).json({ message: `Room with ID ${roomID} is invalid or not found` });
        }

        return res.status(200).json({ message: `Room with ID ${roomID} is removed` })
    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const r = {

    viewRoom,
    viewRoomID,
    createRoom,
    updateRoomID,
    deleteRoomID
};