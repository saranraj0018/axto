"use client";
import CommonBanners from "../../components/others/CommonBanners";
import Sidebar from "./_partials/Sidebar";
import ProfileForm from "./_partials/ProfileForm"; // popup component
import { ProfileDeleteIcon } from "../../components/all_icons";
import { useState } from "react";

const Page = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Controlled inputs for main profile form
  const [userName, setUserName] = useState("VasanthKumar S");
  const [mobile, setMobile] = useState("+91 81222 91222");
  const [email, setEmail] = useState("uiuxdesigner@gmail.com");
  const [password, setPassword] = useState("password");

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
              <img src="/img/profile/Male-Avatar.png" alt="" />
              <div className="my-auto space-y-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="axto-orange-btn"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Upload Photo
                  </button>

                  <button type="button">{ProfileDeleteIcon}</button>
                </div>

                <p className="text-sm">
                  Make sure the image is at least 400x400px <br />
                  and under 5 MB.
                </p>
              </div>
            </div>

            {/* Controlled Form */}
            <form>
              <label className="text-sm font-medium">User Name</label>
              <br />
              <input
                type="text"
                className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />

              <label className="text-sm font-medium">Mobile Number</label>
              <br />
              <input
                type="tel"
                className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <br />

              <label className="text-sm font-medium">Email</label>
              <br />
              <input
                type="email"
                className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <label className="text-sm font-medium">Update Password</label>
              <br />
              <input
                type="password"
                className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
