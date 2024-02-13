import express from 'express';
import { fav } from '../controller/booking/favoriteController.js';
const favRoute = express.Router()

//Favorite Route
favRoute.get("/api/favorite", fav.viewFav);
favRoute.get("/api/favorite/:id", fav.viewFavID);
favRoute.post("/api/create/favorite", fav.createFav);
favRoute.put("/api/update/favorite/:id", fav.updateFavID);
favRoute.delete("/api/delete/favorite/:id", fav.deleteFavID);

export default favRoute;