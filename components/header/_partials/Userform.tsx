"use client";
import React, { useState, FormEvent } from 'react'
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react"; // or react-icons/fi


type Props = {
    onSuccess?: () => void;
};

const Userform = ({ onSuccess }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isForgotOpen, setIsForgotOpen] = useState(false);
    const [isResetOpen, setIsResetOpen] = useState(false);
    const [resetContact, setResetContact] = useState("");

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
        const guestToken = localStorage.getItem("guest_token");
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
                {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        ...(guestToken && { "guest_token": guestToken }),
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message || 'Registration failed');
                return; // stop execution
            }

            toast.success(data.message || 'Registered successfully');
            login(data.data.token, {
                id: Number(data.data.id),
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone_number,
                image: data.data.image,
            });
            if (data.data.id) {
                window.location.reload();
                localStorage.removeItem("guest_token");
            }

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

        const contact = formData.get("contact")?.toString().trim();
        const login_password = formData.get("login_password")?.toString().trim();

        let loginErrors: any = {};

        if (!contact) loginErrors.contact = "This field is required.";
        if (!login_password) loginErrors.login_password = "The password field is required.";
        // If validation fails, show errors

        if (Object.keys(loginErrors).length > 0) {
            setErrors(loginErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);
        const guestToken = localStorage.getItem("guest_token");
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
                {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        ...(guestToken && { "guest_token": guestToken }),
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            if (!response.ok) {
                setErrors({
                    login_password: data.message || 'Login failed'
                });
                toast.error(data.message || 'Login failed');
                return; // stop execution
            }

            toast.success(data.message || 'Login successfully');
            login(data.data.token, {
                id: Number(data.data.id),
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone_number,
                image: data.data.image,
            });

            if (data.data.id) {
                window.location.reload();
                localStorage.removeItem("guest_token");
            }
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
          <form className="my-3"  onSubmit={onLoginSubmit}>
            <label className="text-[12px] md:text-[13px] font-medium">
              Enter Email or Mobile Number
            </label>
            <br />
            <input
              type="text"
              name="contact"
              placeholder="you@example.com or 9876543210"
              className="my-2 text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-md"
            />
              {errors.contact && <p className="text-red-600 text-sm">{errors.contact}</p>}
            <label className="text-[12px] md:text-[13px] font-medium">Password</label>
            <br />
              <div className="relative my-2">
            <input type={showLoginPassword ? "text" : "password"}
              name="login_password"
              placeholder="********"
              className="my-2 text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-md"
            />
                  <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                      {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
              </div>
              {errors.login_password && <p className="text-red-600 text-sm">{errors.login_password}</p>}
              <p
                  className="text-[12px] text-right text-primary cursor-pointer"
                  onClick={() => {
                      setIsLoginOpen(false);
                      setIsForgotOpen(true);
                  }}
              >
                  Forgot Password?
              </p>
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
              Register & Login
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
                <div className="relative my-2">
                <input
                    type={showRegisterPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className="my-2 text-sm w-full p-2 outline-1 outline-zinc-300 rounded-md"
                />
                <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
        </div>
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                <label className="text-[12px] md:text-[13px] font-medium">Confirm Password</label>
                <br />
                <div className="relative my-2">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    placeholder="********"
                    className="my-2 text-sm w-full p-2 outline-1 outline-zinc-300 rounded-md"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
        </div>
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

        {isForgotOpen && (
            <div>
                <h2 className="text-2xl font-medium">Forgot Password</h2>

                <form
                    className="my-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const contact = formData.get("contact")?.toString().trim();

                        if (!contact) {
                            setErrors({ contact: "Email or mobile is required" });
                            return;
                        }

                        setIsLoading(true);
                        try {
                            const res = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/user/check`,
                                {
                                    method: "POST",
                                    headers: { Accept: "application/json" },
                                    body: formData,
                                }
                            );

                            const data = await res.json();

                            if (!res.ok) {
                                toast.error(data.message || "User not found");
                                return;
                            }

                            setResetContact(contact);
                            setIsForgotOpen(false);
                            setIsResetOpen(true);
                        } catch {
                            toast.error("Server error");
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                >
                    <label className="text-[12px] font-medium">
                        Enter Email or Mobile Number
                    </label>

                    <input
                        type="text"
                        name="contact"
                        className="my-2 w-full p-2 rounded-md"
                        placeholder="you@example.com or 9876543210"
                    />

                    {errors.contact && (
                        <p className="text-red-600 text-sm">{errors.contact}</p>
                    )}

                    <button className="w-full bg-primary text-white py-2 rounded-3xl mt-4">
                        Verify
                    </button>
                </form>

                <p
                    className="text-[12px] cursor-pointer text-primary"
                    onClick={() => {
                        setIsForgotOpen(false);
                        setIsLoginOpen(true);
                    }}
                >
                    Back to Login
                </p>
            </div>
        )}

        {isResetOpen && (
            <div>
                <h2 className="text-2xl font-medium">Reset Password</h2>

                <form
                    className="my-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        formData.append("contact", resetContact);

                        const password = formData.get("password")?.toString();
                        const confirm = formData.get("password_confirmation")?.toString();

                        if (!password || !confirm) {
                            setErrors({ password: "All fields required" });
                            return;
                        }

                        if (password !== confirm) {
                            setErrors({ confirm_password: "Passwords do not match" });
                            return;
                        }

                        setIsLoading(true);
                        try {
                            const res = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/user/reset-password`,
                                {
                                    method: "POST",
                                    headers: { Accept: "application/json" },
                                    body: formData,
                                }
                            );

                            const data = await res.json();
                            if (!res.ok) {
                                toast.error(data.message);
                                return;
                            }

                            toast.success("Password updated successfully");
                            setIsResetOpen(false);
                            setIsLoginOpen(true);
                        } catch {
                            toast.error("Server error");
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                >
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="my-2 w-full p-2 rounded-md"
                    />

                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        className="my-2 w-full p-2 rounded-md"
                    />

                    {errors.confirm_password && (
                        <p className="text-red-600 text-sm">{errors.confirm_password}</p>
                    )}

                    <button className="w-full bg-primary text-white py-2 rounded-3xl mt-4">
                        Save Password
                    </button>
                </form>
            </div>
        )}
    </div>
  );
};

export default Userform;
