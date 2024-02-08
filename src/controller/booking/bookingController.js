import { bookings } from "../../model/bookings.js";
import { mongoose } from "mongoose";
import { room } from "../../model/rooms.js";


//View booking list
const viewBooking = async (req, res) => {

    const info = await bookings.find()
        .populate('customerID')
        .populate('roomID')
    res.send(info)
};

//View booking list by ID
const viewBookingID = async (req, res) => {

    try {

        const bookingID = req.params.id;
        const check = await bookings.findById(bookingID)

        if(!check) {

            res.status(404).json({ message: "Invalid information or not found"})
        } else {

            const info = await bookings.findById(bookingID)
                .populate('customerID')
                .populate('roomID')
            res.send(info)
        }     
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Create booking
const createBooking = async (req, res) => {

    try {

        const { /*customerID,*/ roomID, roomName, meetingDate, meetingTime, startTime, endTime, equipment, status_booking_done} = req.body

        if(/*!customerID ||*/ !roomID || !roomName || !meetingDate) {

            res.status(400).json({message: "Please fill required information"});
        } else {

            const info = await bookings.create({
    
                // customerID,
                roomID,
                roomName,
                meetingDate,
                meetingTime,
                startTime,
                endTime,
                equipment,
                status_booking_done
            });
            res.status(200).json({ message: "Booking registered" });
        }
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Update booking information by ID
const updateBookingID = async (req, res) => {

    try{
        
        const {roomID, roomName, meetingDate, meetingTime, startTime, endTime, equipment, status_booking_done } = req.body
        const bookingID = req.params.id;
        
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
            equipment,
            status_booking_done
        })
        res.status(200).json({ message: `Booking with ${bookingID} is updated`})
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Delete booking information by ID
const deleteBookingID = async (req, res) => {
    
    try {

        const bookingID = req.params.id
        const deleteB = await bookings.findByIdAndDelete(bookingID)

        if(!deleteB) {
            res.status(404).json({ message: `Booking with ID ${bookingID} is invalid or not found`});
        }

        res.status(200).json({ message: `Booking with ID ${bookingID} deleted successfully`})
    } catch (err)  {

        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const bk = {

    createBooking,
    viewBooking,
    viewBookingID,
    updateBookingID,
    deleteBookingID
};
