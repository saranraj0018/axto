import { RatingStarIcon } from "../../../../../components/all_icons";

interface ProgressBarProps {
  total: number;
  ratings: number[]; // [5★, 4★, 3★, 2★, 1★]
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, ratings }) => {
  return (
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((star, index) => {
          const count = ratings[index] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;

          return (
              <div key={star} className="flex gap-3 items-center">
                {/* Star label */}
                <div className="flex gap-1 w-10">
                  <div className="mt-1">
                    <RatingStarIcon />
                  </div>
                  <div className="font-medium">{star}</div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-gray-300">
                  <div
                      className="h-full bg-black rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
          );
        })}
      </div>
  );
};

export default ProgressBar;
