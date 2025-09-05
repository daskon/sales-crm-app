"use client";
import { useEffect, useState } from "react";
import LoginForm from "./login/components/LoginForm";
import { me } from "./login/services/authService";

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    async function checkAuth() {
      try{
        const user = await me();
        if(user) setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  if(isLoggedIn === null) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to CRM</h1>
        <a
          href="/orders"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          VIEW ORDERS
        </a>
      </div>
    </div>
  );
}