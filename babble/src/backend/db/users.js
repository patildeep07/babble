import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

import avatarImage from "./avatars/Avatar-1.png";

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage,
  },
  {
    _id: uuid(),
    firstName: "Jatin",
    lastName: "Bhawar",
    username: "jatin",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage,
  },
  {
    _id: uuid(),
    firstName: "test",
    lastName: "test",
    username: "test",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage,
  },
];
