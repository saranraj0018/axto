import { RatingStarIcon } from "../../../../components/all_icons";

const ProgressBar = () => {
  return (
    <>
      <div className="space-y-3">
        {/* 5 STAR */}
        <div className="flex gap-3">
          <div className="flex gap-1">
            <div className="flex mt-1">
              <RatingStarIcon />
            </div>
            <div className="font-medium">5</div>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-500 my-auto">
            <div className="h-full w-full bg-black rounded-full"></div>
          </div>
        </div>
        {/* 5 STAR */}
        <div className="flex gap-3">
          <div className="flex gap-1">
            <div className="flex mt-1">
              <RatingStarIcon />
            </div>
            <div className="font-medium">4</div>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-500 my-auto">
            <div className="h-full w-4/5 bg-black rounded-full"></div>
          </div>
        </div>
        {/* 5 STAR */}
        <div className="flex gap-3">
          <div className="flex gap-1">
            <div className="flex mt-1">
              <RatingStarIcon />
            </div>
            <div className="font-medium">3</div>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-500 my-auto">
            <div className="h-full w-3/5 bg-black rounded-full"></div>
          </div>
        </div>
        {/* 5 STAR */}
        <div className="flex gap-3">
          <div className="flex gap-1">
            <div className="flex mt-1">
              <RatingStarIcon />
            </div>
            <div className="font-medium">2</div>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-500 my-auto">
            <div className="h-full w-2/5 bg-black rounded-full"></div>
          </div>
        </div>
        {/* 5 STAR */}
        <div className="flex gap-3">
          <div className="flex gap-1">
            <div className="flex mt-1">
              <RatingStarIcon />
            </div>
            <div className="font-medium">1</div>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-500 my-auto">
            <div className="h-full w-1/5 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
