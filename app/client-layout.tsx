"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import LocationModal from "@/components/loginModal";
import { AuthProvider } from "@/lib/authContext";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Footer />
      <LocationModal />
    </AuthProvider>
  );
};

export default ClientLayout;
