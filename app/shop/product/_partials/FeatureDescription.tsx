const FDItems = [
  {
    id: 1,
    feature: "Model-Compatible",
    description: "Fits Ola S1, S1 Pro, S1 Air, and S1X Plus",
  },
  {
    id: 2,
    feature: "Soft Cushion Padding",
    description: "High-density foam for extra comfort",
  },
  {
    id: 3,
    feature: "Ergonomic Design",
    description: "Supports the lower back for a relaxed ride",
  },
  {
    id: 4,
    feature: "Sturdy Metal Frame",
    description: "Powder-coated for durability and weather resistance",
  },
  {
    id: 5,
    feature: "Premium PU Leather Cover",
    description: "Easy to clean and weather-resistant",
  },
  {
    id: 6,
    feature: "Easy Bolt-On Fitment",
    description: "No drilling or permanent modifications required",
  },
];

const FeatureDescription = () => {
  return (
    <div className="my-5 overflow-hidden rounded-2xl">
      <table className="w-full border-collapse">
        <thead className="bg-primary text-white">
          <tr>
            <th className="text-[12px] lg:text-[18px] font-medium text-start p-4">
              Feature
            </th>
            <th className="text-[12px] lg:text-[18px] font-medium text-start p-4">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {FDItems.map((item, idx) => (
            <tr
              key={item.id}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"}`}
            >
              <td className="p-4 text-[11px] lg:text-[16px] text-black">
                {item.feature}
              </td>
              <td className="p-4 text-[11px] lg:text-[16px] text-black">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureDescription;
