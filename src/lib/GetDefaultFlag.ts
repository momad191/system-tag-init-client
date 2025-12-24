"use client"; // Ensure it runs on the client side
import Cookies from "js-cookie";

const GetDefaultFlag = () => {
  return Cookies.get("flag") || "https://flagcdn.com/w40/sa.png"; // Default to 'en' if not set
};

export default GetDefaultFlag;
