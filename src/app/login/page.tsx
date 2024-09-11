import React from "react";
import { AiOutlineRobot } from "react-icons/ai"; // Example logo from react-icons
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
function Page() {
  return (
    <main className="flex items-start justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md  p-8 rounded-lg ">
        {/* Logo */}
        <section className="flex justify-center mb-6">
          <TbSquareRoundedLetterYFilled size={40} />
        </section>

        {/* Form */}
        <section className="sm:mt-20">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Login your account
          </h2>

          <form className="space-y-5">
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
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#10a37f] text-white py-3 rounded-lg font-medium hover:bg-[#10a37f] transition-colors focus:outline-none focus:ring focus:ring-[#10a37f]"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Additional Links */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a
              href="#"
              className="text-[#10a37f] font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Page;
