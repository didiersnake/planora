import { UserSession } from "@/lib/Types";
import React, { useEffect } from "react";
import { Country } from "./Types";

const AuthContext = React.createContext<{
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  country: Country | null;
  setCountry: (country: Country | null) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}>({
  user: null,
  setUser: () => {},
  showLoginModal: false,
  setShowLoginModal: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: false,
  setIsLoading: () => {},
  country: null,
  setCountry: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserSession | null>({
    name: "Didier Djakoua",
    email: "didier.djakoua@gmail.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    phone: "+1 (555) 123-4567",
  });
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [country, setCountry] = React.useState<Country | null>(null);

  // useEffect(() => {
  //   if (user) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{
        country,
        isLoading,
        setIsLoading,
        setCountry,
        user,
        setUser,
        showLoginModal,
        setShowLoginModal,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
