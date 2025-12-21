"use client";
import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import { fetchUserById, User } from "@/lib/features/userSlice";
import { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "@/lib/features/authSlice";
import { clearSelectedUser } from "@/lib/features/userSlice";
import { useRouter } from "next/navigation";

/* ----------------------------------
   Redux state
----------------------------------- */
interface RootState {
  users: {
    selectedUser: User | null;
    loading: boolean;
  };
}

export function UserInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, loading } = useSelector(
    (state: RootState) => state.users,
  );

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const USER = {
    name: "John Smith",
    email: "johnson@nextadmin.com",
    img: "/images/user/user-03.png",
  };

  /* ----------------------------------
     Fetch logged-in user
  ----------------------------------- */
  useEffect(() => {
    // const userId = "692d47793805cc7f93138416";
    const userId = Cookies.get("userId");
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout()); // clear auth + cookies
    dispatch(clearSelectedUser()); // clear user profile
    setIsOpen(false);
    router.push("/auth/sign-in"); // redirect
  };

  // if (loading || !selectedUser) {
  //   return (
  //     <div className="rounded-[10px] bg-white p-6 text-center shadow-1">
  //       Loading profile...
  //     </div>
  //   );
  // }

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          <Image
            src={selectedUser?.image || USER.img}
            className="size-12 rounded-full"
            alt={`Avatar of ${selectedUser?.fullName}`}
            role="presentation"
            width={200}
            height={200}
          />
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>{selectedUser?.fullName}</span>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          <Image
            src={selectedUser?.image || USER.img}
            className="size-12 rounded-full"
            alt={`Avatar for ${selectedUser?.fullName}`}
            role="presentation"
            width={200}
            height={200}
          />

          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {selectedUser?.fullName}
            </div>

            <div className="leading-none text-gray-6">
              {selectedUser?.email}
            </div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <UserIcon />

            <span className="mr-auto text-base font-medium">View profile</span>
          </Link>

          <Link
            href={"/pages/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />

            <span className="mr-auto text-base font-medium">
              Account Settings
            </span>
          </Link>
        </div>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={handleLogout}
          >
            <LogOutIcon />

            <span className="text-base font-medium">Log out</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
