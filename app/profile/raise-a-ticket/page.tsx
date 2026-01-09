"use client";

import React, { useEffect, useRef, useState } from "react";
import CommonBanners from "../../../components/others/CommonBanners";
import Sidebar from "../_partials/Sidebar";
import toast from "react-hot-toast";

type Ticket = {
  id: number;
  subject: string;
  description: string;
  image?: string;
  status: string;
  created_at: string;
};

const page = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);


  /* 🔹 Fetch Tickets */
  const loadTickets = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/support-tickets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
    );
    const data = await res.json();
    setTickets(data.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  /* 🔹 Submit Ticket */
  const submitTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    if (image) formData.append("image", image);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/support-request/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: formData,
        }
    );

      if (res.status === 413){
          toast.error('image size must be 2 Mb below')
          return;
      }

    if (res.ok) {
        toast.success("Ticket submitted!");
      setSubject("");
      setDescription("");
      setImage(null);
      setPreview(null);
      loadTickets();
    }
  };

  return (
      <>
        <CommonBanners />

        <div className="axto-container my-10">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <Sidebar />
            </div>

            {/* Content */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-8">

              {/* 🔹 Support Form */}
              <form onSubmit={submitTicket} className="space-y-3">
                <label className="text-sm font-medium block">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full lg:w-1/2 h-40 p-2 rounded-md outline outline-gray-300"
                    placeholder="Explain your problem"
                    required
                />

                {/* Image Upload */}
                <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-orange-400 rounded-lg p-6 w-full lg:w-1/2 text-center cursor-pointer"
                >
                  Attach Image (Optional)
                  <br />
                  Image size below 2 MB
                </div>

                {/* Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-3 w-32 h-32 object-cover rounded-md border"
                    />
                )}
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImage(file);

                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      } else {
                        setPreview(null);
                      }
                    }}
                />


                <button className="axto-orange-btn mt-2">
                  Submit
                </button>
              </form>

              {/* 🔹 Ticket List */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Supported Tickets</h3>

                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="border rounded-xl p-4 flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium">Ticket ID #{ticket.id}</p>
                        <p className="text-sm text-gray-600">
                          {ticket.description}
                        </p>

                        {ticket.image && (
                            <img
                                src={ticket.image}
                                className="w-24 mt-2 rounded"
                            />
                        )}
                      </div>

                      <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                              ticket.status === 'Ticket Pending'
                                  ? "bg-gray-200"
                                  : ticket.status === 'Ticket On - Hold'
                                      ? "bg-orange-200 text-orange-700"
                                      : ticket.status === ticket.status
                                          ? "bg-green-200 text-green-700"
                                          : "bg-red-200 text-red-700"
                          }`}
                      >
                    {ticket.status.replace("_", " ")}
                  </span>
                    </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </>
  );
};

export default page;
