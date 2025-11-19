"use client";
import { useState } from "react";

const AddAddress = () => {
  // Controlled inputs for main profile form
  const [fullName, setFullName] = useState("VasanthKumar S");
  const [country, setCountry] = useState("India");
  const [street, setStreet] = useState("No. 24, Green Park Avenue");
  const [city, setCity] = useState("Chennai");
  const [state, setState] = useState("Tamil Nadu");
  const [zipCode, setZipCode] = useState("600040");
  const [mobile, setMobile] = useState("+91 81222 91222");
  const [email, setEmail] = useState("uiuxdesigner@gmail.com");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      fullName,
      country,
      street,
      city,
      state,
      zipCode,
      mobile,
      email,
    };
    console.log("Address submitted:", formData);
    // Add API call here to save the address
  };
  return (
    <>
      <h2 className="text-xl font-medium">Add Address</h2>
      <form onSubmit={handleSubmit}>
        <label className="text-sm font-medium">Full Name</label>
        <br />
        <input
          type="text"
          className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br />

        <label className="text-sm font-medium">Country</label>
        <br />
        <input
          type="text"
          className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />

        <label className="text-sm font-medium">Street Address</label>
        <br />
        <input
          type="text"
          className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <br />

        <label className="text-sm font-medium">City</label>
        <br />
        <input
          type="text"
          className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />

        <label className="text-sm font-medium">State</label>
        <br />
        <input
          type="text"
          className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <br />

        <label className="text-sm font-medium">Zip Code</label>
        <br />
        <input
          type="text"
          className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <br />

        <label className="text-sm font-medium">Mobile Number</label>
        <br />
        <input
          type="text"
          className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <br />

        <label className="text-sm font-medium">Email</label>
        <br />
        <input
          type="text"
          className="my-2 w-full md:w-1/2 outline-1 text-sm outline-gray-200 hover:outline-orange-300 p-2 rounded-3xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="submit"
          className="axto-orange-btn text-sm my-2"
          value="Add Address"
        />
      </form>
    </>
  );
};

export default AddAddress;
