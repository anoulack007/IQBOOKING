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

//NOTE Create room
const createRoom = async (req, res) => {

    let images = []

    const { roomName, floor, type_room, description, is_active_status } = req.body

    if (req.uploadedFiles) {
        for (const image of req.uploadedFiles) {
            images.push(image.url)
        }
        const dataRoom = await rooms.create({
            images: images,
            roomName,
            floor,
            type_room,
            description
        });

        return res.send(dataRoom).status(200);
    }

    const roomCheck = await rooms.findOne({ roomName: roomName });

    if (roomCheck) {
        return res.status(400).send("Room is exist")
    }

    if (!roomName) {

        return res.status(400).send("Please fill required information")
    } else {

        const dataRoom = await rooms.create({

            roomName,
            floor,
            type_room,
            is_active_status,
            description
        });
        return res.send(dataRoom).status(200);
    }

    }


//Update room information by ID
const updateRoomID = async (req, res) => {

    try {

        const roomID = req.params.id;
        const { roomName, floor, type_room, description, is_active_status } = req.body

        const roomCheck = await rooms.findOne({ roomName: roomName });

        if (roomCheck) {
            return res.status(400).json({
                message: "Room is exist"
            });
        }

        if (req.uploadedFiles) {

            let images = []

            for (const image of req.uploadedFiles) {
                images.push(image.url)
            }

            const data = await rooms.findByIdAndUpdate({
                _id: roomID
            },
                {
                    images: images,
                    roomName,
                    floor,
                    type_room,
                    description,
                    is_active_status
                },{
                    new:true
                });

            return res.send(data).status(200)
        } else {

            const data = await rooms.findByIdAndUpdate({
                _id: roomID
            },
                {
                    roomName,
                    floor,
                    type_room,
                    description,
                    is_active_status
                },{new:true});
            return res.send(data).status(200)
        }

    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Delete room information by ID
const deleteRoomID = async (req, res) => {

    // try {

        const roomID = req.params.id
        const deleteR = await rooms.findByIdAndDelete(roomID)

        if (!deleteR) {
            return res.status(404).json({ message: `Room with ID ${roomID} is invalid or not found` });
        }

        return res.send(deleteR).status(200)

    //     console.error(err);
    //     return res.status(500).json({ message: 'Internal Server Error' });
    // }
}

const UpdateStatusRoom = async (req, res) => {
    await rooms.findByIdAndUpdate({ _id: req.body.id }, { is_active_status: true })

    return res.status(200).json({ message: 'Update Status Room Success' })
}
export const r = {

    viewRoom,
    viewRoomID,
    createRoom,
    updateRoomID,
    deleteRoomID,
    UpdateStatusRoom
};