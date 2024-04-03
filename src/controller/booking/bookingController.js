import { bookings } from "../../model/bookings.js";

//View booking list
const viewBooking = async (req, res) => {

    const info = await bookings.find()
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

        if(!check) {

            return res.status(404).json({ message: "Invalid information or not found"});
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

    try {

        const { customerID, roomID, roomName, meetingDate, meetingTime, startTime, endTime } = req.body

        if(!customerID || !roomID || !roomName || !meetingDate) {

            return res.status(400).json({message: "Please fill required information"});
        }else if({...req.body}){

            const info = await bookings.create({
    
                customerID,
                roomID,
                roomName,
                meetingDate,
                meetingTime,
                startTime,
                endTime,
                
            });
            return res.status(200).json({ message: "Booking registered" });
        }
    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Update booking information by ID
const updateBookingID = async (req, res) => {

    try{
        
        const {roomID, roomName, meetingDate, meetingTime, startTime, endTime,  } = req.body
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
        return res.status(200).json({ message: `Booking with ${bookingID} is updated`})
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

//NOTE Delete booking information by ID
const deleteBookingID = async (req, res) => {
    
    try {

        const bookingID = req.params.id
        const deleteB = await bookings.findByIdAndDelete(bookingID)

        if(!deleteB) {
            return res.status(404).json({ message: `Booking with ID ${bookingID} is invalid or not found`});
        }

        return res.status(200).json({ message: `Booking with ID ${bookingID} deleted successfully`})
    } catch (err)  {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const bk = {

    createBooking,
    viewBooking,
    viewBookingID,
    updateBookingID,
    deleteBookingID
};
