import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { Navigate, useLocation } from "react-router-dom";

type AuthContextType = {
  userToken: string | null;
  setUserToken: Dispatch<SetStateAction<string | null>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(() => {
    return localStorage.getItem("user_token");
  });

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("user_token", userToken);
    } else {
      localStorage.removeItem("user_token");
    }
  }, [userToken]);

  const logout = () => setUserToken(null);

  const value = {
    userToken,
    setUserToken,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export async function UpdateMoney(token: string, Money: number) {
  console.log("Updating money for token:", token, "with amount:", Money);
  try {
    const response = await fetch("https://hroudfi22.sps-prosek.cz/casino/user.php", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: "updateMoney",
        token: token,
        money: Money,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("UpdateMoney response:", data);
    return data;
  } catch (error) {
    console.error("Error updating money:", error);
    throw error;
  }
}

export async function GetMoney(token: string) {
  try {
    const response = await fetch("https://hroudfi22.sps-prosek.cz/casino/user.php", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: "getMoney",
        token: token,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("GetMoney response:", data);
    return data.points || data.money || 0;
  } catch (error) {
    console.error("Error getting money:", error);
    return 0; // default to 0 on error
  }
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { userToken } = useAuth();
  const location = useLocation();

  if (!userToken) {
    return <Navigate to="/casinoApp/profile/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}