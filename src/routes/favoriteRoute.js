import express from 'express';
import { fav } from '../controller/booking/favoriteController.js';
import { Validation } from "../validation/jwtValidate.js"
const favRoute = express.Router()

//Favorite Route
favRoute.get("/api/favorite",Validation.jwtValidate, fav.viewFav);
favRoute.get("/api/favorite/:id",Validation.jwtValidate, fav.viewFavID);
favRoute.post("/api/create/favorite",Validation.jwtValidate, fav.createFav);
favRoute.put("/api/update/favorite/:id",Validation.jwtValidate, fav.updateFavID);
favRoute.delete("/api/delete/favorite/:id",Validation.jwtValidate, fav.deleteFavID);

export default favRoute;