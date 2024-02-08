import { rooms } from "../../model/rooms"; 

//View room list
const viewRoom = async (req, res) => {

    const info = await rooms.find()
    
    res.send(info)
};

//View room list by ID
const viewRoomID = async (req, res) => {

    try {

        const roomID = req.params.id;
        const check = await rooms.findById(roomID)

        if(!check) {

            res.status(404).json({
                message: "Invalid information or not found"
            });
        } else {

            const info = await rooms.findById(roomID)

            res.send(info)
        }
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Create room
const createRoom = async (req, res) => {
    
    try {

        let imageName = []

        const {roomName, floor, type_room, description} = req.body
        const { image } = req.file

        for (const i of req.file) {imageName.push(i.originalName)}

        if(!roomName) {

            res.status(400).json({
                message: "Please fill required information"
            });
        } else {

            const info = await rooms.create({
                image,
                roomName,
                floor,
                type_room,
                description
            });
            res.status(200).json({ message: "Room registered"});
        }
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

//Update room information by ID
const updateRoomID = async (req, res) => {

    try {

        let imageName = []

        const {image, roomName, floor, type_room, description} = req.body
        const roomID = req.params.id;

        await roomID.findByIdAndUpdate({
            _id: bookingID
        },
        {
            image,
            roomName,
            floor,
            type_room,
            description
        });
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Delete room information by ID
const deleteRoomID = async (req, res) => {

    try {

        const roomID = req.params.id
        const deleteR = await rooms.findByIdAndDelete(roomID)

        if(!deleteR) {
            res.status(404).json({ message: `Room with ID ${roomID} is invalid or not found`});
        }

        res.status(200).json({ message: `Room with ID ${roomID} is invalid or not found`})
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const r = {

    viewRoom,
    viewRoomID,
    createRoom,
    updateRoomID,
    deleteRoomID
}