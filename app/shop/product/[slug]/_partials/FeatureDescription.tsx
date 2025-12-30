"use client";

interface Feature {
  title: string;
  description: string;
}

interface FeatureDescriptionProps {
  features?: Feature[];
}

const FeatureDescription: React.FC<FeatureDescriptionProps> = ({ features }) => {
  if (!features || features.length === 0) {
    return (
        <div className="text-center py-6 text-gray-500">
          No features available
        </div>
    );
  }

  return (
      <div className="my-5 overflow-hidden rounded-2xl border">
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
          {features.map((item, idx) => (
              <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"}
              >
                <td className="p-4 text-[11px] lg:text-[16px] text-black">
                  {item.title}
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
