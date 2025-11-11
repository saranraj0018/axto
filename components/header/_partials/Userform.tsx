"use client";
import { useState } from "react";

const Userform = () => {
  
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="max-w-md mx-auto p-2 md:p-4">
      {!isRegister ? (
        <div>
          <h2 className="text-2xl font-medium">Get Started!</h2>
          <form className="my-3">
            <label className="text-[12px] md:text-[13px] font-medium">
              Enter Email or Mobile Number
            </label>
            <br />
            <input
              type="text"
              placeholder="you@example.com or 9876543210"
              className="my-2 text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-md"
            />
            <label className="text-[12px] md:text-[13px] font-medium">Password</label>
            <br />
            <input
              type="password"
              placeholder="********"
              className="my-2 text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-md"
            />
            <input
              type="submit"
              value="Login"
              className="w-full bg-primary text-white font-medium py-2 rounded-3xl mt-4 cursor-pointer text-[12px] md:text-[13px]"
            />
          </form>

          {/* Register link */}
          <p className="text-[12px] md:text-[13px] mt-3">
            Don't have an account?{" "}
            <span
              className="text-[#FF6A00] cursor-pointer font-semibold"
              onClick={() => setIsRegister(true)}
            >
              Register Now
            </span>
          </p>
        </div>
      ) : (
        // ---------- Register Form ----------
        <div>
          <h2 className="text-2xl font-medium">Create your AXTO account</h2>
          <form className="my-3">
            <label className="text-[12px] md:text-[13px] font-medium">Full Name</label>
            <br />
            <input
              type="text"
              placeholder="FirstName"
              className="my-2 text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-md"
            />
            <label className="text-[12px] md:text-[13px] font-medium">
              Email or Mobile Number
            </label>
            <br />
            <input
              type="text"
              placeholder="you@example.com or 9876543210"
              className="my-2 text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-md"
            />
            <label className="text-[12px] md:text-[13px] font-medium">Password</label>
            <br />
            <input
              type="password"
              placeholder="********"
              className="my-2 text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-md"
            />
            <label className="text-[12px] md:text-[13px] font-medium">Confirm Password</label>
            <br />
            <input
              type="password"
              placeholder="********"
              className="my-2 text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-md"
            />
            <input
              type="submit"
              value="Register"
              className="w-full bg-primary text-white font-medium py-2 rounded-3xl mt-4 cursor-pointer text-[12px] md:text-[13px]"
            />
          </form>

          {/* Back to login link */}
          <p className="text-[12px] md:text-[13px] mt-3">
            Already have an account?{" "}
            <span
              className="text-[#FF6A00] cursor-pointer font-semibold"
              onClick={() => setIsRegister(false)}
            >
              Login Here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Userform;
