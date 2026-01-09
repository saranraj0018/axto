"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const AddAddress = ({loadAddresses,}: { loadAddresses: () => void;
}) => {
  // Address fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("India");

  // Extra states
  const [isDefault, setIsDefault] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  /* ---------------- Validation ---------------- */
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Full name is required";
    if (!mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!street.trim()) newErrors.street = "Street address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!zipCode.trim()) newErrors.zipCode = "Zip code is required";
    if (!country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/address-store`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify({
              name,
              country,
              street,
              city,
              state,
              zip_code: zipCode,
              mobile,
              is_default: isDefault ? 1 : 0,
            }),
          }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const formattedErrors: Record<string, string> = {};
          Object.keys(data.errors).forEach((key) => {
            formattedErrors[key] = data.errors[key][0];
          });
          setErrors(formattedErrors);
        }
        return;
      }

      toast.success("Address added successfully");
      loadAddresses();
      // Reset form
      setName("");
      setMobile("");
      setStreet("");
      setCity("");
      setState("");
      setZipCode("");
      setCountry("India");
      setIsDefault(false);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
      <>
        <h2 className="text-xl font-medium mb-3 mt-4">Add Address</h2>

        <form onSubmit={handleSubmit} className="max-w-3xl">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full p-3 rounded-full border border-gray-300 focus:border-orange-400 outline-none"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium">Mobile Number</label>
              <input
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="mt-1 w-full p-3 rounded-full border border-gray-300 focus:border-orange-400 outline-none"
              />
              {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
            </div>

            {/* Street */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Street Address</label>
              <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="mt-1 w-full p-3 rounded-full border border-gray-300 focus:border-orange-400 outline-none"
              />
              {errors.street && <p className="text-xs text-red-500">{errors.street}</p>}
            </div>

            {/* Country */}
            <div>
              <label className="text-sm font-medium">Country</label>
              <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 w-full p-3 rounded-full border border-gray-300 focus:border-orange-400 outline-none"
              />
              {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
            </div>

            {/* State */}
            <div>
              <label className="text-sm font-medium">State</label>
              <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1 w-full p-3 rounded-full border border-gray-300 focus:border-orange-400 outline-none"
              />
              {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
            </div>

            {/* City */}
            <div>
              <label className="text-sm font-medium">City</label>
              <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 w-full p-3 rounded-full border border-gray-300 focus:border-orange-400 outline-none"
              />
              {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
            </div>

            {/* Zip */}
            <div>
              <label className="text-sm font-medium">Zip Code</label>
              <input
                  type="number"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="mt-1 w-full p-3 rounded-full border border-gray-300 focus:border-orange-400 outline-none"
              />
              {errors.zipCode && <p className="text-xs text-red-500">{errors.zipCode}</p>}
            </div>
          </div>

          {/* Default Address */}
          <div className="flex items-center gap-2 mt-4">
            <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="accent-orange-500"
            />
            <span className="text-sm">Make this my default address</span>
          </div>

          {/* Submit */}
          <button
              type="submit"
              disabled={loading}
              className="axto-orange-btn mt-5 px-6 py-2"
          >
            {loading ? "Saving..." : "Add Address"}
          </button>
        </form>

      </>
  );
};

export default AddAddress;
