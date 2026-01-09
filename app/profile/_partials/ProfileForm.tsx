"use client";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface ProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileForm: FC<ProfileFormProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { user, updateUser } = useAuth();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", String(user?.id)); // ✅ hidden user id
    formData.append("image", file);


    setLoading(true);

    try {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/update-image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              Accept: "application/json",
            },
            body: formData,
          }
      );

      const resData = await res.json();
      if (!res.ok) {
        toast.error(resData.message || "Image upload failed");
        return;
      }

      // ✅ UPDATE AUTH USER IMAGE ONLY
      if (user) {
        updateUser({
          ...user,
          image: resData.data.image,
        });
      }

      toast.success("Profile image updated");
      handleClose();

    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        {/* Overlay */}
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            style={{ opacity: isVisible ? 1 : 0 }}
            onClick={handleClose}
        />

        {/* Modal */}
        <div
            className="fixed top-1/2 left-1/2 w-11/12 md:w-2/5 bg-white rounded-3xl shadow-lg z-50 transition-all duration-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                  ? "translate(-50%, -50%)"
                  : "translate(-50%, -60%)",
            }}
        >
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">
              Upload Profile Photo
            </h3>
            <p className="text-sm mb-4 text-red-400">
              Make sure the image is at least under 2 MB.
            </p>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="border rounded-lg p-2 w-full mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                  onClick={handleClose}
                  className="border rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="bg-orange-500 text-white rounded-lg px-4 py-2"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </>
  );
};

export default ProfileForm;
