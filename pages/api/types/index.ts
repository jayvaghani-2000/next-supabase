import { getStickerCategory } from "../models/category/sticker";
import {
  getStickerCount,
  getStickers,
  post as postSticker,
  trendingSticker,
} from "../models/sticker";
import { getUserById } from "../models/user";

export type addStickerType = NonNullable<
  Awaited<ReturnType<typeof postSticker>>
>;
export type trendingStickerType = NonNullable<
  Awaited<ReturnType<typeof trendingSticker>>
>;
export type stickerCategoryType = NonNullable<
  Awaited<ReturnType<typeof getStickerCategory>>
>;
export type stickersType = {
  sticker: NonNullable<Awaited<ReturnType<typeof getStickers>>>;
  page: number;
  totalPage: number;
  pageSize: number;
  result: number;
};
export type stickersCountType = NonNullable<
  Awaited<ReturnType<typeof getStickerCount>>
>;

export type userByIdType = NonNullable<Awaited<ReturnType<typeof getUserById>>>;
