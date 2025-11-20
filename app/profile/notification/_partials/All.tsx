import { NotificationCircle } from "../../../../components/all_icons";
interface AllProps {
  NotificationData: {
    icon: any;
    Title: string;
    Description: string;
    Duration: string;
    Status: string;
  }[];
}

const All: React.FC<AllProps> = ({ NotificationData }) => {
  return (
    <div className="space-y-5">
      {NotificationData.map((item, index) => (
        <div
          key={index}
          className={`border border-gray-300 p-3 rounded-3xl ${
            item.Status == "Unread" ? "bg-[#FFF9F4]" : "bg-white"
          }`}
        >
          <div className="flex gap-3">
            <div>{item.icon}</div>
            <div className="space-y-3 w-full">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="text-[16px] font-medium text-black">
                    {item.Title}
                  </h3>
                  <div
                    className={` ${
                      item.Status === "Unread" ? "block" : "hidden"
                    }`}
                  >
                    {NotificationCircle}
                  </div>
                </div>
                <p className="text-secondary text-sm">{item.Description}</p>
              </div>
              <p className="text-secondary text-sm">{item.Duration}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default All;
