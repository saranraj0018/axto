import { editIcon, redDelete } from "../../../../components/all_icons";

const ManageAddress = () => {
  const AddressData = [
    {
      Id: 1,
      Name: "Vasanthkumar S",
      Address:
        "No. 24, 2nd Floor, Green Park Avenue, Anna Nagar, Chennai - 600040, Tamil Nadu, India.",
      Mobile: "+91 9876543210",
    },
    {
      Id: 2,
      Name: "Vasanthkumar S",
      Address:
        "No. 24, 2nd Floor, Green Park Avenue, Anna Nagar, Chennai - 600040, Tamil Nadu, India.",
      Mobile: "+91 9876543210",
    },
  ];

  return (
    <>
      <div>
        <h2 className="text-xl font-medium mb-4">Manage Address</h2>
        <div className="border border-[#DBDBDB] rounded-2xl p-3">
          {AddressData.map((item, index) => (
            <div key={item.Id}>
              <div className="grid grid-cols-12 gap-3 p-3">
                <div className="col-span-12 md:col-span-9 space-y-1">
                  <h4 className="text-[15px] font-medium">{item.Name}</h4>
                  <p className="text-secondary text-sm">{item.Address}</p>
                  <p className="text-black font-medium text-sm">
                    <span className="text-secondary">Mobile:</span>{" "}
                    {item.Mobile}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-3 my-auto flex justify-end gap-8">
                  <div className="flex gap-1">
                    <div className="my-auto">{editIcon}</div>
                    <div className="text-[14px] font-medium text-[#02542D]">
                      Edit
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="my-auto">{redDelete}</div>
                    <div className="text-[14px] font-medium text-[#c00f0c]">
                      Delete
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider between items – NOT at start, NOT at end */}
              {index !== AddressData.length - 1 && (
                <div className="border-b border-[#DBDBDB]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageAddress;
