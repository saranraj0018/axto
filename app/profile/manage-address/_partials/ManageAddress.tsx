"use client";

import { useEffect, useState } from "react";
import { editIcon, redDelete } from "@/components/all_icons";
import AddAddress from "./AddAddress";
import toast from "react-hot-toast";

type Address = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone_number: string;
  set_default: number;
};


const ManageAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editForm, setEditForm] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };


  /* ---------------- Load Addresses ---------------- */
  const loadAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/address/list`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
      );
      const data = await res.json();
      setAddresses(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);
  /* ---------------- Delete ---------------- */
  const confirmDelete = async () => {

    if (!deleteId) return;

    await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/address/delete/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
    );
    setShowDeleteModal(false);
    setDeleteId(null);
    toast.success('Address deleted Successfully')
    loadAddresses();
  };

  /* ---------------- Set Default ---------------- */
  const setDefault = async (id: number) => {
    await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/address/${id}/set-default`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
    );
    toast.success('Set Default Address Added')
    loadAddresses();
  };

  /* ---------------- Edit ---------------- */
  const saveEdit = async (id: number) => {
    await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/address/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify({
            name: editForm.name,
            mobile: editForm.phone_number,
            street: editForm.address,
            city: editForm.city,
            state: editForm.state,
            zip_code: editForm.pincode,
            country: editForm.country,
            is_default: editForm.set_default,
          }),
        }
    );
    toast.success('Address Added successfully')
    setEditingId(null);
    setEditForm(null);
    loadAddresses();
  };


  return (
      <div>
        <h2 className="text-xl font-medium mb-4">Manage Address</h2>

        <div className="border border-[#DBDBDB] rounded-2xl divide-y">

          {loading && (
              <p className="p-4 text-sm text-gray-500">Loading addresses...</p>
          )}

          {!loading && addresses.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No addresses found</p>
          )}

          {addresses.map((item) => (
              <div key={item.id} className="p-4 grid grid-cols-12 gap-4">

                {/* Address Info */}
                <div className="col-span-12 md:col-span-9 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-medium">{item.name}</h4>
                    {item.set_default === 1 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                    )}
                  </div>

                  {editingId === item.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                            className="border p-2 rounded"
                            placeholder="Full Name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />

                        <input
                            className="border p-2 rounded"
                            placeholder="Mobile"
                            value={editForm.phone_number}
                            onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                        />

                        <input
                            className="border p-2 rounded md:col-span-2"
                            placeholder="Street Address"
                            value={editForm.address}
                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        />

                        <input
                            className="border p-2 rounded"
                            placeholder="City"
                            value={editForm.city}
                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        />

                        <input
                            className="border p-2 rounded"
                            placeholder="State"
                            value={editForm.state}
                            onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                        />

                        <input
                            className="border p-2 rounded"
                            placeholder="Zip Code"
                            value={editForm.pincode}
                            onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                        />

                        <input
                            className="border p-2 rounded"
                            placeholder="Country"
                            value={editForm.country}
                            onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                        />

                        <div className="flex gap-3 md:col-span-2">
                          <button
                              onClick={() => saveEdit(item.id)}
                              className="text-sm text-green-700 font-medium"
                          >
                            Save
                          </button>
                          <button
                              onClick={() => setEditingId(null)}
                              className="text-sm text-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                  ) : (
                      <>
                        <p className="text-secondary text-sm">
                          {item.address}, {item.city}, {item.state} - {item.pincode}, {item.country}
                        </p>
                        <p className="text-sm font-medium">
                          <span className="text-secondary">Mobile:</span> {item.phone_number}
                        </p>
                      </>
                  )}

                  {item.set_default === 0 && (
                      <button
                          onClick={() => setDefault(item.id)}
                          className="text-xs text-orange-600 font-medium"
                      >
                        Set as default
                      </button>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-12 md:col-span-3 flex justify-end items-start gap-6">

                  {/* Edit */}
                  <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditForm({ ...item });
                      }}
                      className="flex gap-1 items-center text-[#02542D]"
                  >
                    {editIcon}
                    <span className="text-sm font-medium">Edit</span>
                  </button>

                  {/* Delete */}
                  {item.set_default !== 1 && (
                      <button
                          onClick={() => openDeleteModal(item.id)}
                          className="flex gap-1 items-center text-[#c00f0c]"
                      >
                        {redDelete}
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                  )}
                </div>
              </div>
          ))}

          {showDeleteModal && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl w-[90%] max-w-sm p-5 space-y-4">

                  <h3 className="text-lg font-medium">Delete Address</h3>
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete this address?
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setShowDeleteModal(false)}
                        className="px-4 py-1.5 rounded-lg border text-sm"
                    >
                      Cancel
                    </button>

                    <button
                        onClick={confirmDelete}
                        className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
          )}

        </div>
        <AddAddress loadAddresses={loadAddresses} />
      </div>


  );
};

export default ManageAddress;
