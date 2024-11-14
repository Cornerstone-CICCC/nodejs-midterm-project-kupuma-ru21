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

const getRestaurantById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const restaurant = restaurantModel.getRestaurantById(req.params.id);
  if (!restaurant) {
    res.status(404).json({ error: "Restaurant not found" });
    return;
  }
  res.json({ restaurant });
};

const editRestaurant = async (
  req: Request<{}, {}, Restaurant>,
  res: Response
) => {
  restaurantModel.editRestaurant(req.body);
  res.json({ message: "Restaurant edited" });
};

const deleteRestaurant = async (
  req: Request<{}, {}, Pick<Restaurant, "id">>,
  res: Response
) => {
  restaurantModel.deleteRestaurant(req.body.id);
  res.json({ message: "Restaurant deleted" });
};

export default {
  addRestaurant,
  getRestaurants,
  getRestaurantById,
  editRestaurant,
  deleteRestaurant,
};
