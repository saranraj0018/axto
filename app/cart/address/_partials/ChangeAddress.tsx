"use client";

import React, { useEffect, useState } from "react";
import { closeIcon } from "@/components/all_icons";
import toast from "react-hot-toast";

/* 🔹 Export this type so page.tsx can reuse it */
export type EditAddress = {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone_number: string;
  pincode: string;
};

interface ChangeAddressProps {
  isOpen: boolean;
  addressData: EditAddress | null;
  onClose: () => void;
  onSaved?: (address: EditAddress) => void;
}

const ChangeAddress: React.FC<ChangeAddressProps> = ({
                                                       isOpen,
                                                       addressData,
                                                       onClose,
                                                       onSaved,
                                                     }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone_number, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  /* ---------------- Open / Close Animation ---------------- */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  /* ---------------- Load Edit Data ---------------- */
  useEffect(() => {
    if (addressData) {
      setName(addressData.name);
      setMobile(addressData.phone_number);
      setPincode(addressData.pincode);
      setAddress(addressData.address);
      setCity(addressData.city);
      setState(addressData.state);
      setCountry(addressData.country);
    } else {
      setName("");
      setMobile("");
      setPincode("");
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
    }
  }, [addressData]);

  if (!isOpen && !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  /* ---------------- Save Address ---------------- */
  const handleSave = async () => {
    setErrors({});
    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/address-store`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: addressData?.id, // undefined = add, number = edit
              name,
              phone_number,
              pincode,
              address,
              city,
              state,
              country
            }),
          }
      );

      const data = await res.json();

      if (res.status === 422) {
        const fieldErrors: Record<string, string> = {};
        Object.keys(data.errors).forEach((key) => {
          fieldErrors[key] = data.errors[key][0];
        });
        setErrors(fieldErrors);
        return;
      }

      if (!res.ok) {
        toast.error(data.message || "Address save failed");
        return;
      }

      toast.success(data.message || "Address saved successfully");

      onSaved?.({
        id: data.address?.id,
        name,
        address,
        city,
        state,
        country,
        phone_number,
        pincode,
      });

      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        {/* Overlay */}
        <div
            className="fixed inset-0 bg-[#00000080] z-50"
            style={{ opacity: isVisible ? 1 : 0 }}
            onClick={handleClose}
        />

        {/* Modal */}
        <div
            className="fixed top-1/2 left-1/2 w-[90%] md:w-[60%] bg-white rounded-3xl z-50 transition-all duration-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                  ? "translate(-50%, -50%)"
                  : "translate(-50%, -60%)",
            }}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {addressData ? "Edit Address" : "Add Address"}
              </h2>
              <div className="cursor-pointer" onClick={handleClose}>
                {closeIcon}
              </div>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Name</label>
                <input
                    className="w-full border rounded-lg p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              <div>
                <label>Mobile</label>
                <input
                    type="number"
                    className="w-full border rounded-lg p-2"
                    value={phone_number}
                    onChange={(e) => setMobile(e.target.value)}
                />
                {errors.phone_number && (
                    <p className="text-red-500 text-xs">{errors.phone_number}</p>
                )}
                {errors.mobile && (
                    <p className="text-red-500 text-xs">{errors.mobile}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label>Address</label>
                <textarea
                    rows={3}
                    className="w-full border rounded-lg p-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && (
                    <p className="text-red-500 text-xs">{errors.address}</p>
                )}
              </div>

              <div>
                <label>City</label>
                <input
                    className="w-full border rounded-lg p-2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && (
                    <p className="text-red-500 text-xs">{errors.city}</p>
                )}
              </div>
              <div>
                <label>State</label>
                <input
                    className="w-full border rounded-lg p-2"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                {errors.state && (
                    <p className="text-red-500 text-xs">{errors.state}</p>
                )}
              </div>
              <div>
                <label>Country</label>
                <input
                    className="w-full border rounded-lg p-2"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                {errors.country && (
                    <p className="text-red-500 text-xs">{errors.country}</p>
                )}
              </div>

              <div>
                <label>Pincode</label>
                <input
                    type="number"
                    className="w-full border rounded-lg p-2"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
                {errors.pin_code && (
                    <p className="text-red-500 text-xs">{errors.pin_code}</p>
                )}
                {errors.zip_code && (
                    <p className="text-red-500 text-xs">{errors.zip_code}</p>
                )}
              </div>


            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={handleClose} className="border px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </>
  );
};

export default ChangeAddress;
