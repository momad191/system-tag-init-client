"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Image from "next/image";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CameraIcon } from "./_components/icons";
import { SocialAccounts } from "./_components/social-accounts";

import { AppDispatch } from "@/lib/store";
import { fetchUserById, User } from "@/lib/features/userSlice";

/* ----------------------------------
   Redux state
----------------------------------- */
interface RootState {
  users: {
    selectedUser: User | null;
    loading: boolean;
  };
}

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedUser, loading } = useSelector(
    (state: RootState) => state.users
  );

  /* ----------------------------------
     Local UI state (for previews)
  ----------------------------------- */
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string>(
    "/images/cover/cover-01.png"
  );

  /* ----------------------------------
     Fetch logged-in user
  ----------------------------------- */
  useEffect(() => {
    const userId = "692d47793805cc7f93138416";
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch]);

  /* ----------------------------------
     Sync Redux data → local preview
  ----------------------------------- */
  useEffect(() => {
    if (selectedUser?.image) {
      setProfilePhoto(selectedUser.image);
    }
  }, [selectedUser]);

  const handleChange = (e: any) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    if (e.target.name === "profilePhoto") {
      setProfilePhoto(URL.createObjectURL(file));
    }

    if (e.target.name === "coverPhoto") {
      setCoverPhoto(URL.createObjectURL(file));
    }
  };

  if (loading || !selectedUser) {
    return (
      <div className="rounded-[10px] bg-white p-6 text-center shadow-1">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        {/* ---------------- Cover ---------------- */}
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={coverPhoto}
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover"
            width={970}
            height={260}
          />

          <div className="absolute bottom-4 right-4">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-1 text-white">
              <input
                type="file"
                name="coverPhoto"
                className="sr-only"
                onChange={handleChange}
              />
              <CameraIcon />
              Edit
            </label>
          </div>
        </div>

        {/* ---------------- Profile ---------------- */}
        <div className="px-4 pb-6 text-center">
          <div className="relative mx-auto -mt-22 h-30 max-w-30 rounded-full bg-white p-1 sm:h-44 sm:max-w-[176px]">
            <img
              src={profilePhoto || "/images/user/user-03.png"}
              width={160}
              height={160}
              className="rounded-full"
              alt="profile"
            />

            <label className="absolute bottom-2 right-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white">
              <CameraIcon />
              <input
                type="file"
                name="profilePhoto"
                className="sr-only"
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="mt-4">
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
              {selectedUser.fullName}
            </h3>

            <p className="font-medium">{selectedUser.role}</p>

            {/* ---------------- Stats (same UI) ---------------- */}
            <div className="mx-auto my-5 grid max-w-[370px] grid-cols-3 rounded border py-2 shadow-1">
              <div className="border-r px-4">
                <span className="font-medium">{selectedUser.type}</span>
                <span className="block text-sm">Type</span>
              </div>
              <div className="border-r px-4">
                <span className="font-medium">{selectedUser.status}</span>
                <span className="block text-sm">Status</span>
              </div>
              <div className="px-4">
                <span className="font-medium">
                  {selectedUser.is_email_verified ? "Yes" : "No"}
                </span>
                <span className="block text-sm">Verified</span>
              </div>
            </div>
 
            {/* ---------------- About ---------------- */}
            <div className="mx-auto max-w-[720px]">
              <h4 className="font-medium text-dark dark:text-white">
                About Me
              </h4>
              <p className="mt-4 text-sm text-gray-500">
                {selectedUser.email}
              </p>
            </div>

            <SocialAccounts />
          </div>
        </div>
      </div>
    </div>
  );
}
