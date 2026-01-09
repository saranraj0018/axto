"use client";
import CommonBanners from "../../components/others/CommonBanners";
import Sidebar from "./_partials/Sidebar";
import ProfileForm from "./_partials/ProfileForm"; // popup component
import { ProfileDeleteIcon } from "@/components/all_icons";
import React, {FormEvent, useEffect, useState} from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast"; // adjust path

const Page = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user, updateUser } = useAuth();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Single source of truth
  const [form, setForm] = useState({
    id:0,
    name: "",
    phone: "",
    email: "",
  });

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      id: user.id ?? 0,
      name: user.name ?? "",
      phone: user.phone ? String(user.phone) : "",
      email: user.email ?? "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  async function profileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    let newErrors: any = {};

    if (!name) newErrors.name = "The name field is required.";
    if (!phone) newErrors.phone = "The phone field is required.";
    if (!email) newErrors.email = "The email field is required.";


    // If validation fails, show errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
            body: formData,
          }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Profile update failed');
        return; // stop execution
      }

      toast.success(data.message || 'Profile update successfully');
      updateUser({
        ...user!,
        name,
        email,
        phone: Number(phone),
        image: data.user?.image ?? user?.image,
      });
    } catch (e) {
      console.error(e);
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CommonBanners />

      <div className="axto-container my-10">
        <div className="grid grid-cols-12 gap-3 lg:gap-8">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <Sidebar />
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-8">
            <h2 className="text-xl font-medium mb-4">My Profile</h2>

            <div className="flex gap-2">
              <img
                  src={user?.image || "/img/profile/Male-Avatar.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
              />
              <div className="my-auto space-y-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="axto-orange-btn"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Upload Photo
                  </button>
                </div>

                <p className="text-sm">
                  Make sure the image is at least 400x400px <br />
                  and under 2 MB.
                </p>
              </div>
            </div>

            {/* Controlled Form */}
            <form className="my-3"  onSubmit={profileSubmit}>
              <input
                  type="hidden"
                  name="user_id"
                  value={form.id}
              />
              <label className="text-sm font-medium">User Name</label>
              <br />
              <input
                type="text"
                name="name"
                className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
              <br />

              <label className="text-sm font-medium">Mobile Number</label>
              <br />
              <input
                type="tel"
                name="phone"
                className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
              <br />

              <label className="text-sm font-medium">Email</label>
              <br />
              <input
                type="email"
                name="email"
                className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              <br />

              <label className="text-sm font-medium">Update Password</label>
              <br />
              <input
                type="password"
                name="password"
                className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <br />

              <input
                type="submit"
                className="axto-orange-btn text-sm my-2"
                value="Save Changes"
              />
            </form>
          </div>
        </div>
      </div>

      {/* ProfileForm Popup */}
      <ProfileForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};

export default Page;
