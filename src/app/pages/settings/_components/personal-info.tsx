"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";

import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

import { AppDispatch } from "@/lib/store";
import { updateUserById } from "@/lib/features/userSlice";

/* ----------------------------------
   Redux State
----------------------------------- */
interface RootState {
  users: {
    selectedUser: any;
    loading: boolean;
  };
}

export function PersonalInfoForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, loading } = useSelector(
    (state: RootState) => state.users,
  );

  /* ----------------------------------
     Local form state
  ----------------------------------- */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    username: "",
    bio: "",
  });

  /* ----------------------------------
     Sync Redux user → form
  ----------------------------------- */
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        fullName: selectedUser.fullName || "",
        email: selectedUser.email || "",
        mobile: selectedUser.mobile || "",
        username: selectedUser.username || "",
        bio: selectedUser.bio || "",
      });
    }
  }, [selectedUser]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) return;

    dispatch(
      updateUserById({
        id: selectedUser.id,
        userData: {
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
        },
      }),
    );
  };

  /* ----------------------------------
     Loading state
  ----------------------------------- */
  if (!selectedUser) {
    return (
      <ShowcaseSection title="Personal Information" className="!p-7">
        Loading user data...
      </ShowcaseSection>
    );
  }

  return (
    <ShowcaseSection title="Personal Information" className="!p-7">
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="fullName"
            label="Full Name"
            placeholder="Full Name"
            value={formData.fullName}
            handleChange={handleChange}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="mobile"
            label="Phone Number"
            placeholder="+966..."
            value={formData.mobile}
            handleChange={handleChange}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="email@example.com"
          value={formData.email}
          handleChange={handleChange}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
          disabled
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          value={formData.username}
          handleChange={handleChange}
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
          disabled
        />

        <TextAreaGroup
          className="mb-5.5"
          label="BIO"
          // name="bio"
          placeholder="Write your bio here"
          // value={formData.bio}
          // handleChange={handleChange}
          icon={<PencilSquareIcon />}
          disabled
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            onClick={() =>
              setFormData({
                fullName: selectedUser.fullName || "",
                email: selectedUser.email || "",
                mobile: selectedUser.mobile || "",
                username: selectedUser.username || "",
                bio: selectedUser.bio || "",
              })
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
