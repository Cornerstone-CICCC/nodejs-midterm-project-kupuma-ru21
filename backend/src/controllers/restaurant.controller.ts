import { Request, Response } from "express";
import restaurantModel from "../models/restaurant.model";
import { Restaurant } from "../types/restaurant";

const addRestaurant = async (
  req: Request<{}, {}, Omit<Restaurant, "id">>,
  res: Response
) => {
  const restaurant = restaurantModel.createRestaurant(req.body);
  res.json(restaurant);
};

const getRestaurants = async (_: Request, res: Response) => {
  res.json({ restaurants: restaurantModel.getRestaurants() });
};

const editRestaurant = async (
  req: Request<{}, {}, Restaurant>,
  res: Response
) => {
  restaurantModel.editRestaurant(req.body);
  res.json({ message: "Restaurant edited" });
};

export default { addRestaurant, getRestaurants, editRestaurant };
