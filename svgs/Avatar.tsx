import React from "react";
import users from "../public/Users.svg";
import user from "../public/User.svg";
import Image from "next/image";

export const Avatars = () => {
   return <Image src={users} alt="users" />;
};
export const Avatar = () => {
   return <Image src={user} alt="users" />;
};
