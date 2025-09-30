import React from "react";
import Header from "@/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"min-h-screen text-gray-400"}>
      <Header />
      <main className={"container py-10"}>{children}</main>
    </div>
  );
};

export default Layout;