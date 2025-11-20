"use client";
import React, { useEffect, useState } from "react";
import {closeIcon} from "../../../../components/all_icons";
interface ChangeAddressProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeAddress: React.FC<ChangeAddressProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("VasanthKumar S");
  const [address, setAddress] = useState(
    "No. 24, 2nd Floor, Green Park Avenue, Anna Nagar, Chennai - 600040, Tamil Nadu, India."
  );
  const [mobile, setMobile] = useState("+91 9876543210");

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
    setTimeout(() => onClose(), 300);
  };

  const handleSave = () => {
    // For now, just close the popup
    handleClose();
    // You can extend to pass updated values back to parent
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-[#0a0a0a80] backdrop-blur-[2px] z-50 cursor-pointer transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Modal container */}
      <div
        className={`fixed top-1/2 left-1/2 w-8/9 md:w-5/9 bg-white rounded-3xl shadow-lg z-50 transform transition-all duration-300 ease-out`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translate(-50%, -50%)"
            : "translate(-50%, -60%)",
        }}
      >
        <div className="p-6">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Change Address</h2>
            <div className="flex justify-end hover:cursor-pointer" onClick={handleClose}>
                          {closeIcon}
                        </div>  
          </div>
          
          <form className="space-y-4">
            {/* Name */}
            <div className="flex flex-col text-left">
              <label className="text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="flex flex-col text-left">
              <label className="text-sm font-medium mb-1">Address</label>
              <textarea
                className="border border-gray-300 rounded-lg p-2 resize-none"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col text-left">
              <label className="text-sm font-medium mb-1">Mobile</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={handleClose}
                className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeAddress;
