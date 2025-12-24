"use client"; // Ensure it runs on the client side
import Cookies from "js-cookie";

const GetDefaultLanguage = () => {
  return Cookies.get("lng") || "ar"; // Default to 'en' if not set
};

export default GetDefaultLanguage;
