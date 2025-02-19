"use client";

import NavMenu from "../components/navMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col w-screen">
      <NavMenu />
      <div className="flex h-screen flex-1 flex-col gap-4 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
