"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({
  isOpen,
  onClose,
}: Props) {

  const [isLogin, setIsLogin] =
    useState(true);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  if (!isOpen) {
    return null;
  }

  const handleRegister = async () => {

    await fetch("/api/register", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    onClose();
  };

  const handleLogin = async () => {

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-md p-8 w-full max-w-md relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-[#0B0835] mb-2">
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        <p className="text-gray-500 mb-8">
          Continue your college journey
        </p>

        <div className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={
              isLogin
                ? handleLogin
                : handleRegister
            }
            className="w-full bg-transparent text-[#0B0835] py-3 rounded-xl font-bold"
          >
            {isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </div>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="mt-6 text-sm text-[#0B0835] font-medium"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}