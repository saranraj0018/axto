"use client";
import React, { useState, FormEvent } from 'react'
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

type Props = {
    onSuccess?: () => void;
};

const Userform = ({ onSuccess }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const { login } = useAuth();


    async function onRegisterSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);

        const fullname = formData.get("full_name")?.toString().trim();
        const phone = formData.get("phone")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();
        const confirm = formData.get("password_confirmation")?.toString().trim();


        let newErrors: any = {};

        if (!fullname) newErrors.fullname = "The full name field is required.";
        if (!phone) newErrors.phone = "The phone field is required.";
        if (!email) newErrors.email = "The email field is required.";
        if (!password) newErrors.password = "The password field is required.";
        if (!confirm) newErrors.confirm_password = "The confirm password field is required.";
        if (password && confirm && password !== confirm)
            newErrors.confirm_password = "Passwords do not match.";

        // If validation fails, show errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            console.log()
            if (!response.ok) {
                toast.error(data.message || 'Registration failed');
                return; // stop execution
            }

            toast.success(data.message || 'Registered successfully');
            login(data.data.token, {
                id: Number(data.data.id),
                email: data.data.email,
                phone: data.data.phone_number,
            });

            form.reset();
            onSuccess?.();

        } catch (e) {
            console.error(e);
            toast.error("Server error");
        } finally {
            setIsLoading(false);
        }
    }

    async function onLoginSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);

        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();

        let newErrors: any = {};

        if (!email) newErrors.email = "This field is required.";
        if (!password) newErrors.password = "The password field is required.";
        // If validation fails, show errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || 'Login failed');
                return; // stop execution
            }

            toast.success(data.message || 'Login successfully');
            login(data.data.token, {
                id: Number(data.data.id),
                email: data.data.email,
                phone: data.data.phone_number,
            });

            form.reset();
            onSuccess?.();

        } catch (e) {
            console.error(e);
            toast.error("Server error");
        } finally {
            setIsLoading(false);
        }
    }


    return (
    <div className="max-w-md mx-auto p-2 md:p-4">
        {isLoginOpen && (
        <div>
          <h2 className="text-2xl font-medium">Get Started!</h2>
          <form className="my-3" >
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
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-medium py-2 rounded-3xl mt-4 cursor-pointer text-[12px] md:text-[13px]"
            > {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>

          {/* Register link */}
          <p className="text-[12px] md:text-[13px] mt-3">
            Don t have an account?{" "}
            <span
              className="text-[#FF6A00] cursor-pointer font-semibold"
              onClick={() => {
                  setIsRegisterOpen(true);
                  setIsLoginOpen(false);
              }}
            >
              Register Now
            </span>
          </p>
        </div>
        )}
        {/* ================= REGISTER ================= */}
        {isRegisterOpen && (
        <div>
          <h2 className="text-2xl font-medium">Create your AXTO account</h2>
            <form className="my-3" onSubmit={onRegisterSubmit}>
                <label className="text-[12px] md:text-[13px] font-medium">Full Name</label>
                <br />
                <input
                    type="text"
                    name="full_name"
                    placeholder="FirstName"
                    className="my-2 text-sm w-full p-2 outline-1 outline-zinc-300 rounded-md"
                />
                {errors.fullname && <p className="text-red-600 text-sm">{errors.fullname}</p>}
                <label className="text-[12px] md:text-[13px] font-medium">
                    Mobile Number
                </label>
                <br />
                <input
                    type="number"
                    name="phone"
                    placeholder="9876543210"
                    className="my-2 text-sm w-full p-2 outline-1 outline-zinc-300 rounded-md"
                />
                {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                <label className="text-[12px] md:text-[13px] font-medium">
                    Email
                </label>
                <br />
                <input
                    type="text"
                    name="email"
                    placeholder="you@example.com"
                    className="my-2 text-sm w-full p-2 outline-1 outline-zinc-300 rounded-md"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                <label className="text-[12px] md:text-[13px] font-medium">Password</label>
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    className="my-2 text-sm w-full p-2 outline-1 outline-zinc-300 rounded-md"
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                <label className="text-[12px] md:text-[13px] font-medium">Confirm Password</label>
                <br />
                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="********"
                    className="my-2 text-sm w-full p-2 outline-1 outline-zinc-300 rounded-md"
                />
                {errors.confirm_password && <p className="text-red-600 text-sm">{errors.confirm_password}</p>}
                <input
                    type="submit"
                    value="Register"
                    className="w-full bg-primary text-white font-medium py-2 rounded-3xl mt-4 cursor-pointer"
                />
            </form>
            {/* Back to login link */}
          <p className="text-[12px] md:text-[13px] mt-3">
            Already have an account?{" "}
            <span
              className="text-[#FF6A00] cursor-pointer font-semibold"
              onClick={() => {setIsLoginOpen(true); setIsRegisterOpen(false) }}
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
