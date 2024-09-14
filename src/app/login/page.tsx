"use client";
import React, { useState } from "react";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
import AuthFoot from "../comp/AuthFoot";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast
function Page() {
  // State to handle form inputs and loading
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/login", user);
      console.log("Login successful:", response.data);
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error("Invalid email or password. Please try again."); // Show toast on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-start justify-center h-screen bg-gray-100">
      <Toaster
        toastOptions={{
          // Define default options
          style: {
            width: "auto",
          },
          duration: 4000,
        }}
      />
      <div className="w-full max-w-md p-8 rounded-lg">
        {/* Logo */}
        <section className="flex justify-center mb-6">
          <TbSquareRoundedLetterYFilled size={40} />
        </section>

        {/* Form */}
        <section className="sm:mt-20">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Login to your account
          </h2>

          <form className="space-y-5" onSubmit={onLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full bg-[#10a37f] text-white py-3 rounded-lg font-medium hover:bg-[#10a37f] transition-colors focus:outline-none focus:ring focus:ring-[#10a37f] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Additional Links */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#10a37f] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </section>
      </div>
      <AuthFoot />
    </main>
  );
}

export default Page;
