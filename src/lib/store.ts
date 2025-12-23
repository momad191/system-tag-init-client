import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";
import channelReducer from "./features/channelSlice";
import teamReducer from "./features/teamSlice";
import contactReducere from "./features/contactSlice";
import planReducer from "./features/planSlice";
import categoryReducer from "./features/categorySlice";
import outcomeReducer from "./features/outcomeSlice";
import replyReducer from "./features/replySlice";

// import counterReducer from './features/counterSlice'
// import authReducer from './features/authSlice';
// import categoryReducer from './features/categorySlice'
// import subCategoriesReducer from './features/subCategorySlice'
// import subSubCategoriesReducer from './features/subSubCategorySlice'
// import productReducer from './features/productSlice'
// import brandReducer from './features/brandSlice'
// import cartReducer from './features/cartSlice';
// import orderReducer from './features/orderSlice'
// import stripeReducer from './features/stripeSlice';
// import paymentReducer from './features/paymentSlice';
// import invoiceReducer from './features/invoiceSlice';
// import taxReducer from './features/taxSlice';
// import returnReducer from './features/returnSlice';
// import whitelistReducer from "./features/whitelistSlice";
// import walletReducer from './features/walletSlice'
// import addressReducer from './features/addressSlice';
// import offerReducer from './features/offerSlice'
// import companiesReducer from "./features/companiesSlice";
// import settingReducer from "./features/settingSlice";
// import authCookieReducer from "./features/authCookieSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    users: userReducer,
    auth: authReducer,
    channels: channelReducer,
    teams: teamReducer,
    contacts: contactReducere,
    plans: planReducer,
    categories: categoryReducer,
    outcomes: outcomeReducer,
    replies: replyReducer,
    // categories: categoryReducer,
    // subCategories: subCategoriesReducer,
    // subSubCategories: subSubCategoriesReducer,
    // products: productReducer,
    // brands: brandReducer,
    // cart: cartReducer,
    // orders: orderReducer,
    // stripe: stripeReducer,
    // payments: paymentReducer,
    // invoices: invoiceReducer,
    // tax: taxReducer,
    // returns: returnReducer,
    // whitelist: whitelistReducer ,
    // wallet:walletReducer,
    // address: addressReducer,
    // offer: offerReducer,
    // offers: offerReducer,
    // companies: companiesReducer,
    // settings: settingReducer,
    // authCookie: authCookieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
