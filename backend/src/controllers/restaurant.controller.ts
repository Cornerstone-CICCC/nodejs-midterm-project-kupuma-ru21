import { Request, Response } from "express";
import restaurantModel from "../models/restaurant.model";
import { Restaurant } from "../types/restaurant";

const addRestaurant = async (
  req: Request<{}, {}, Pick<Restaurant, "name">>,
  res: Response
) => {
  const { name } = req.body;
  const restaurant = restaurantModel.createRestaurant({ name });
  res.json(restaurant);
};

const getRestaurants = async (_: Request, res: Response) => {
  res.json(restaurantModel.getRestaurants());
};

export default { addRestaurant, getRestaurants };
