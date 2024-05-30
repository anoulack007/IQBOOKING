import { configDotenv } from "dotenv";
import { bookings } from "../../model/bookings.js";
import { customerSchema } from "../../model/customer.js";
import { rooms } from "../../model/rooms.js";

//View booking list
const viewBooking = async (req, res) => {

    const { _id } = req.user

    const info = await bookings.find({ customerID: _id })
        .populate('customerID')
        .populate('roomID')
    return res.send(info)
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
//View booking list by ID
const viewBookingID = async (req, res) => {

    try {

        const bookingID = req.params.id;
        const check = await bookings.findById(bookingID)

        if (!check) {

            return res.status(404).json({ message: "Invalid information or not found" });
        } else {

            const info = await bookings.findById(bookingID)
                .populate('customerID')
                .populate('roomID')
            return res.send(info)
        }
    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Create booking
const createBooking = async (req, res) => {

    // try {

    const { _id } = req.user


    const { roomID, roomName, meetingDate, meetingTime, startTime, endTime } = req.body

    const Validate_status = await ValidationRoom(roomID, res);

    if (Validate_status == true) {
        if (!roomID || !roomName || !meetingDate || !startTime || !endTime) {
            return res.status(400).send("Please fill required information");
        } else if ({ ...req.body }) {

            const info = await bookings.create({

                customerID: _id,
                roomID,
                roomName,
                meetingDate,
                meetingTime,
                startTime,
                endTime,

            });
            return res.send(info).status(200)
        }
        // } catch (err) {

        //     console.error(err);
        //     return res.status(500).json({ message: 'Internal Server Error' });
        // }
    } else {
        return res.send(Validate_status).status(400)
    }
};

//Update booking information by ID
const updateBookingID = async (req, res) => {

    try {

        const { roomID, roomName, meetingDate, meetingTime, startTime, endTime, } = req.body
        const bookingID = req.params.id;

        //Duck data from ID is exist or not
        await bookings.findByIdAndUpdate({
            _id: bookingID
        },
            {
                roomID,
                roomName,
                meetingDate,
                meetingTime,
                startTime,
                endTime,

            })
        return res.status(200).json({ message: `Booking with ${bookingID} is updated` })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//NOTE Delete booking information by ID
const deleteBookingID = async (req, res) => {

    // try {

    const bookingID = req.params.id

    const deleteB = await bookings.findByIdAndDelete(bookingID)
    if (!deleteB) {
        return res.status(404).json({ message: `Booking with ID ${bookingID} is invalid or not found` });
    }

    await rooms.findByIdAndUpdate({ _id: deleteB.roomID }, { is_active_status: true }, { new: true })


    return res.status(200).json({ message: `Booking with ID ${bookingID} deleted successfully` })
    // } catch (err) {

    //     console.error(err);
    //     return res.status(500).json({ message: 'Internal Server Error' });
    // }
}

const ValidationRoom = async (roomID) => {

    const FindRoom = await rooms.findById({ _id: roomID })
    if (FindRoom.is_active_status === false) {
        console.log(FindRoom.is_active_status)
        return 'Already reserved';
    }
    await rooms.findByIdAndUpdate({ _id: roomID }, { is_active_status: false }, { new: true })
    return true
}



export const bk = {

    createBooking,
    viewBooking,
    viewBookingID,
    updateBookingID,
    deleteBookingID
};
