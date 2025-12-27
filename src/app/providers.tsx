"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import ReduxProvider from "@/lib/providers/ReduxProvider";
import NextTopLoader from "nextjs-toploader";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import Signin from "./auth/sign-in/main-sign-in";
import Cookies from "js-cookie";

export function Providers({ children }: { children: React.ReactNode }) {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");



  return (
    <ReduxProvider>

        {!token || !userId ? (<Signin />) : (
          <ThemeProvider defaultTheme="light" attribute="class">
          <SidebarProvider>
            <NextTopLoader color="#5750F1" showSpinner={false} />
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                <Header />
                <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
           </ThemeProvider>
        )}




     
    </ReduxProvider>
  );
}

