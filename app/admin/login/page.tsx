"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {

      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful");

      router.push("/admin/dashboard");

    } catch (error) {

      alert("Invalid login");

    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-3 bg-black border border-gray-700 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 bg-black border border-gray-700 rounded"
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded"
          >
            Login
          </button>

        </form>

      </div>

    </section>
  );
}