import { customerSchema } from "../../model/customer.js";
import { favorite } from "../../model/favorite.js";

//View Favorite list
const viewFav = async (req, res) => {
    try {
      const info = await favorite.find().populate('roomID').populate('customerID');
  
      return res.status(200).send(info);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return res.status(500).send({ message: 'An error occurred while fetching favorites.' });
    }
  };
  

//View Favorite list by ID
const viewFavID = async (req, res) => {

    try {
        const {_id} = req.user
        const customerID = await customerSchema.findById({_id:_id})
        // const favID = req.params.id;
        const check = await favorite.findById(customerID)
            .populate('roomID')

        if (!check) {

            return res.status(404).json({
                Message: "Invalid information or not found"
            });
        } else {
            return res.send(check)
        }
    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Create favorite 
const createFav = async (req, res) => {

    const {_id} = req.user

    const { roomID } = req.body

    // const customerID = await customerSchema.findById({_id:_id})
    
    // try {

        if(!roomID || !_id){

            return res.status(400).json({ message: "Please fill required information!"})
        }

        const info = await favorite.findOne({roomID: roomID})

        if(info) {

            return res.status(400).json({ message: "Favorite is exist"})
        } else {
            
           const favoriteData = await favorite.create({
                roomID,
                customerID:_id
            });

            return res.send(favoriteData).status(200)
        }
        
        
    // } catch (err) {

    //     console.error(err);
    //     return res.status(500).json({ message: 'Internal Server Error' });
    // }
};

//Update favorite information by ID
const updateFavID = async (req, res) => {

    const id = req.params.id
    const { roomID, customerID } = req.body

    try {

        const info = await favorite.find({customerID: customerID})

        if(info) {
            return res.status(400).json({ message: "customerID are exist"})
        }

            await favorite.findByIdAndUpdate(
            {
                _id: id
            },
            {
                roomID,
                customerID

            })
            return res.status(200).json({ message: "Success!"})
    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteFavID = async (req, res) => {

    try {

        const favID = req.params.id
        const deleteF = await favorite.findByIdAndDelete(favID)

        if (!deleteF) {
            return res.status(404).json({ message: `Favorite with ID ${favID} is invalid or not found` });
        }

        return res.status(200).json({ message: `Favorite with ID ${favID} is removed` })
    } catch (err) {

        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fav = {

    viewFav,
    viewFavID,
    createFav,
    updateFavID,
    deleteFavID
}