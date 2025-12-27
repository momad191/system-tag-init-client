"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";

import type { RootState, AppDispatch } from "@/lib/store";
import { countAllUsers } from "@/lib/features/userSlice";
import { countAllChannels } from "@/lib/features/channelSlice";
import { countAllContacts } from "@/lib/features/contactSlice";
import { countAllTeams } from "@/lib/features/teamSlice";
import { getOverviewData } from "../../fetch";
 
export function OverviewCardsGroup() {
  const dispatch = useDispatch<AppDispatch>();

  const { userCount } = useSelector((state: RootState) => state.users);
  const channelCount = useSelector((state: RootState) => state.channels.channelCount);
  const contactCount = useSelector((state: RootState) => state.contacts.contactCount);
  const totalTeams = useSelector((state: RootState) => state.teams.totalTeamsCount);


  const [overview, setOverview] = useState<{
    views: any;
    profit: any;
    products: any;
  } | null>(null);

  /* ----------------------------------
     Fetch overview data (except users)
  ----------------------------------- */
  useEffect(() => {
    getOverviewData().then(({ views, profit, products }) => {
      setOverview({ views, profit, products });
    });
  }, []);


  /* ----------------------------------
     Fetch users count from Redux
  ----------------------------------- */
  useEffect(() => {
    dispatch(countAllUsers());
  }, [dispatch]);

  useEffect(() => {
  dispatch(countAllChannels());
}, [dispatch]);
  useEffect(() => {
    dispatch(countAllContacts());
  }, [dispatch]);

  useEffect(() => {
  dispatch(countAllTeams());
}, [dispatch]);


  if (!overview) return null;

  const { views, profit, products } = overview;

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Teams"
        data={{
          value: compactFormat(totalTeams),
          growthRate: 0, // No growth rate for teams
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Total contacts"
        data={{
          value: compactFormat(contactCount),
           growthRate: 0, // No growth rate for contacts
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Total channels"
        data={{
          value: compactFormat(channelCount),
          growthRate: 0, // No growth rate for channels
        }}
        Icon={icons.Product}
      />

      {/* Redux-powered users count */}
      <OverviewCard
        label="Total Users"
        data={{
          value: compactFormat(userCount),
          growthRate: 0, // No growth rate for users
        }}
        Icon={icons.Users}
      />
    </div>
  );
}
