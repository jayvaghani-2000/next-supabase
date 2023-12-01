import { useHomeStore } from "@/app/store/home";
import { useLazyGetTrendingStickerQuery } from "@/app/store/home/api";
import { useEffect } from "react";
import { MotionImage } from "../../MotionImage";
import { Typography } from "@mui/material";
import Button from "../../Shared/Button";
import classNames from "classnames";
import { paddingSpacing } from "@/app/utils/styles";
import { useMobileScreen, useTabScreen } from "@/app/utils/useScreenSize";

const StickerTrend = () => {
  const { trendingSticker } = useHomeStore();
  const [getStickers] = useLazyGetTrendingStickerQuery({});
  const isTab = useTabScreen();
  const isMobile = useMobileScreen();

  useEffect(() => {
    if (trendingSticker.length !== 0) return;
    getStickers({});
  }, []);

  const getImageSize = () => {
    if (isMobile) {
      return "100px";
    } else if (isTab) {
      return "150px";
    }
    return "200px";
  };

  return (
    <div className={classNames("py-[32px] md:py-[64px]", paddingSpacing)}>
      <div className="flex justify-between items-center pb-[16px] md:pb-[28px]">
        <Typography variant="h6">TRENDING STICKERS</Typography>
        <Button
          className="bg-purple hover:bg-purple"
          variant="rounded-shadow-flat"
        >
          See All
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,160px)] sm:grid-cols-[repeat(auto-fit,180px)] md:grid-cols-[repeat(auto-fit,280px)]  gap-[20px] scrollbar-hide  justify-center">
        {trendingSticker.map((i, index) => {
          const aspectRatio =
            trendingSticker[index].image[0].width /
            trendingSticker[index].image[0].height;

          return (
            <div
              key={i.id}
              className="w-[160px] sm:w-[180px] md:w-[280px]  border-2 border-black rounded-2xl bg-white flex flex-col"
            >
              <div
                className={`h-[120px] sm:h-[140px] md:h-[240px] m-auto overflow-hidden rounded-[30px] bg-white flex justify-center items-center py-[20px]`}
                style={{ aspectRatio: aspectRatio }}
              >
                <MotionImage
                  src={trendingSticker[index].image[0].url}
                  alt=""
                  fill
                  placeholder="blur"
                  blurDataURL={trendingSticker[index].image[0].blurUrl}
                  style={{ objectFit: "cover" }}
                  sizes={getImageSize()}
                />
              </div>

              <div className="px-[4px] sm:px-[12px] md:px-[32px] flex-1 border-t-2 border-black rounded-b-2xl py-[10px] md:py-[20px] bg-lightBlue">
                <Typography variant="subtitle2" className="text-center">
                  {i.productName}
                </Typography>
                <Typography variant="body2" className="text-center md:mt-2">
                  ₹ {i.price}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StickerTrend;
