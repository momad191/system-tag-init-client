import * as logos from "@/assets/logos";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "Google",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.google,
    },
    {
      name: "X.com",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.x,
    },
    {
      name: "Github",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.github,
    },
    {
      name: "Vimeo",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.vimeo,
    },
    {
      name: "Facebook",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.facebook,
    },
  ];
}



export async function getUsersTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Mohammed Elsayed",
      email: "example@example.com",
      mobile: "0551203580",
      date: "2023-01-13T18:00:00.000Z",
      status: "active",
      role: "User",
      type: "company",
    },
    {
      name: "Ahmed Ali",
      email: "example@example.com",
      mobile: "0551203580",
      date: "2023-01-13T18:00:00.000Z",
      status: "active",
      role: "Admin",
      type: "individual",
    },
    {
      name: "Hatim Hassan",
      email: "example@example.com",
      mobile: "0551203580",
      date: "2023-01-13T18:00:00.000Z",
      status: "inactive",
      role: "Admin",
      type: "individual",
    },
    {
      name: "Sali Awad",
      email: "example@example.com",
      mobile: "0551203580",
      date: "2023-01-13T18:00:00.000Z",
      status: "inactive",
      role: "Admin",
      type: "individual",
    },
  ];
}



export async function getTeamsTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Team Zeta",
      channels: 5,
      members: 20,
      createdAt: "2023-01-13T18:00:00.000Z",
    },
        {
      name: "Team beta",
      channels: 15,
      members: 200,
      createdAt: "2023-01-13T18:00:00.000Z",
    },
        {
      name: "Team reta",
      channels: 25,
      members: 60,
      createdAt: "2023-01-13T18:00:00.000Z",
    },
        
  
    
  ];
}



export async function getChannelsTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Whatsapp hcannel 1",
      provider: "Twilio",
      isActive: true,
      createdAt: "2023-01-13T18:00:00.000Z",
    },
  ];
}



export async function getTicketsTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      channelId: "Whatsapp hcannel 1",
      title: "Customer cannot login",
      description: "The customer reports wrong password error",
      priority: "High",
      status: "open",
      assignee: "John Doe",
      team: "Support",
      createdAt: "2023-01-13T18:00:00.000Z",
    },
  ];
}



export async function getContactsTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Mohammed Emad Omer Mohammed Ali",
      mobile: "0551203580",
      email: "moemad191@gmail.com",
      createdAt: "2023-01-13T18:00:00.000Z",
    },
        {
      name: "Mohammed Emad Omer Mohammed Ali",
      mobile: "0551203580",
      email: "moemad191@gmail.com",
      createdAt: "2023-01-13T18:00:00.000Z",
    },
        {
      name: "Mohammed Emad Omer Mohammed Ali",
      mobile: "0551203580",
      email: "moemad191@gmail.com",
      createdAt: "2023-01-13T18:00:00.000Z",
    },
        {
      name: "Mohammed Emad Omer Mohammed Ali",
      mobile: "0551203580",
      email: "moemad191@gmail.com",
      createdAt: "2023-01-13T18:00:00.000Z",
    },
        {
      name: "Mohammed Emad Omer Mohammed Ali",
      mobile: "0551203580",
      email: "moemad191@gmail.com",
      createdAt: "2023-01-13T18:00:00.000Z",
    },
  ];
}



export async function getPlansTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Plan 1",
      price: 50,
      period: "monthly",
      maxUsers: 10,
      maxTeams: 5,
      maxWhatsApp: 2,
      maxEmails: 2,
      maxDirectMessages: 1000,
      start_date:"2025-01-01T00:00:00.000Z",
      end_date: "2025-12-31T23:59:59.000Z"
    },
        {
      name: "Plan 2",
      price: 250,
      period: "monthly",
      maxUsers: 100,
      maxTeams: 25,
      maxWhatsApp: 10,
      maxEmails: 10,
      maxDirectMessages: 10000,
      start_date:"2025-01-01T00:00:00.000Z",
      end_date: "2025-12-31T23:59:59.000Z"
    },
        {
      name: "Plan 3",
      price: 500,
      period: "monthly",
      maxUsers: 1000,
      maxTeams: 50,
      maxWhatsApp: 20,
      maxEmails: 20,
      maxDirectMessages: 1000000,
      start_date:"2025-01-01T00:00:00.000Z",
      end_date: "2025-12-31T23:59:59.000Z"
    },
  ];
}


export async function getCategoriesTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Request for quotation",
      description: "Request for quotation",
      color_code: "#FF5733",
      created_at: "2023-01-13T18:00:00.000Z",
    },

  {
      name: "Request for quotation",
      description: "Request for quotation",
      color_code: "#FF5733",
       created_at: "2023-01-13T18:00:00.000Z",
    },
        {
      name: "Request for quotation",
      description: "Request for quotation",
      color_code: "#FF5733",
       created_at: "2023-01-13T18:00:00.000Z",
    },
  
  ];
}


export async function getRepliesTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      title: "Request for quotation",
      message: "Request for quotation"
    }
  ];
}



export async function getOutcomesTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Sales - Order processed",
      description: "Sales - Order processed"
    }
  ];
}