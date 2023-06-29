import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

import avatarImage1 from "./avatars/Avatar-1.png";
import avatarImage2 from "./avatars/Avatar-2.png";
import avatarImage3 from "./avatars/Avatar-3.png";
import avatarImage4 from "./avatars/Avatar-4.png";
import avatarImage5 from "./avatars/Avatar-5.png";

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage1,
    bio: "Hey, this is my bio",
  },
  {
    _id: uuid(),
    firstName: "Jatin",
    lastName: "Bhawar",
    username: "jatinbhawar",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage3,
  },
  {
    _id: uuid(),
    firstName: "Dhruv",
    lastName: "Patil",
    username: "dhruvpatil",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage1,
  },
  {
    _id: uuid(),
    firstName: "Ketki",
    lastName: "Ghadge",
    username: "ketkighadge",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage2,
  },
  {
    _id: uuid(),
    firstName: "Atharva",
    lastName: "Todankar",
    username: "atharvatodankar",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage4,
  },
  {
    _id: uuid(),
    firstName: "Nishita",
    lastName: "Thapa",
    username: "nishitathapa",
    password: "123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    avatar: avatarImage5,
  },
];
