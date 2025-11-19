"use client";
import React, { FC, useEffect, useState } from "react";

interface ProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileForm: FC<ProfileFormProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10); // slight delay for transition
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // wait for slide-out
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Modal container */}
      <div
        className="fixed top-1/2 left-1/2 w-11/12 md:w-2/5 bg-white rounded-3xl shadow-lg z-50 transform transition-all duration-300 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translate(-50%, -50%)"
            : "translate(-50%, -60%)",
        }}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Upload Profile Photo</h3>

          {/* Form content */}
          <p className="text-sm mb-4">
            Make sure the image is at least 400x400px and under 5 MB.
          </p>

          <input type="file" className="border border-gray-300 rounded-lg p-2 w-full mb-4" />

          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition"
              onClick={handleClose}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
