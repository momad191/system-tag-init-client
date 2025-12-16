import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Users",
        url: "/users",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Teams",
        url: "/teams",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Channels",
        url: "/channels",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Tickets",
        url: "/tickets",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Conversations",
        url: "/conversations",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Messages",
        url: "/messages",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Contacts",
        url: "/contacts",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Plans",
        url: "/plans",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Settings",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "categories",
            url: "/settings/categories",
          },
          {
            title: "replies",
            url: "/settings/replies",
          },
          {
            title: "outcomes",
            url: "/settings/outcomes",
          },
        ],
      },


      // {
      //   title: "Dashboard",
      //   icon: Icons.HomeIcon,
      //   items: [
      //     {
      //       title: "eCommerce",
      //       url: "/",
      //     },
      //   ],
      // },

      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },

      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
      },
      {  
        title: "Tables",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/tables",
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settings",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
