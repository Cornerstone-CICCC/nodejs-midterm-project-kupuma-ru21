import { v4 as uuidv4 } from "uuid";
import { Restaurant } from "../types/restaurant";

class RestaurantModel {
  private restaurants: Restaurant[] = [];

  createRestaurant(newRestaurant: Omit<Restaurant, "id">): Restaurant {
    const restaurant = {
      id: uuidv4(),
      ...newRestaurant,
    };
    this.restaurants.push(restaurant);
    console.log("Restaurant added:", restaurant);
    return restaurant;
  }

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }
}

export default new RestaurantModel();
