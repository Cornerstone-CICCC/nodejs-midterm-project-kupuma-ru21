import { v4 as uuidv4 } from "uuid";
import { Restaurant } from "../types/restaurant";
import path from "path";

class RestaurantModel {
  private restaurants: Restaurant[] = [
    {
      id: uuidv4(),
      name: "Sooda Korean BBQ",
      detail:
        "Sooda Korean BBQ has a vast menu of culinary delights, utilizing the freshest ingredients to bring homemade dishes straight to your table.",
      address: "60 W Cordova St, Vancouver, BC V6B 1C9",
      price: 30,
      image: "http://localhost:1000/1.png",
    },
    {
      id: uuidv4(),
      name: "Ramen Danbo Robson",
      detail:
        "Warm your soul with authentic Japanese ramen. Now open in the heart of Kitsilano, Danbo brings traditional Fukuoka-style Kyushu Hakata Tonkotsu ramen.",
      address: "61333 Robson St, Vancouver, BC V6E 1C6",
      price: 15,
      image: "http://localhost:1000/2.png",
    },
  ];

  createRestaurant(newRestaurant: Omit<Restaurant, "id">): Restaurant {
    const restaurant = {
      id: uuidv4(),
      ...newRestaurant,
    };
    this.restaurants.push(restaurant);
    return restaurant;
  }

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  getRestaurantById(id: string): Restaurant | null {
    const restaurant = this.restaurants.find((r) => {
      return r.id === id;
    });
    if (!restaurant) return null;
    return restaurant;
  }

  editRestaurant(restaurantEdited: Restaurant): void {
    const restaurants = this.restaurants.map((restaurant) => {
      if (restaurant.id === restaurantEdited.id) return { ...restaurantEdited };
      return restaurant;
    });
    this.restaurants = restaurants;
  }

  deleteRestaurant(id: string): void {
    this.restaurants = this.restaurants.filter((restaurant) => {
      return restaurant.id !== id;
    });
  }
}

export default new RestaurantModel();
