"use client";
import { SORT_BY } from "@/app/utils/enum";
import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { stickersType } from "../../../../pages/api/types";
import { RootState } from "../index";
import { stickerApi } from "./api";

export type StickerData = {
  loading: boolean;
  sticker: stickersType["sticker"];
  page: stickersType["page"];
  pageSize: stickersType["pageSize"];
  totalPage: stickersType["totalPage"];
  result: number;
  filter: {
    category: number[];
    price?: [number, number];
    sortBy?: SORT_BY;
  };
};

export const initialState = {
  loading: false,
  sticker: [] as stickersType["sticker"],
  page: 1,
  pageSize: 20,
  totalPage: 0,
  result: 0,
  filter: { category: [] },
} as StickerData;

export const stickerSlice = createSlice({
  name: "stickers",
  initialState,
  reducers: {
    setStickerData: (state, action: { payload: Partial<StickerData> }) => {
      Object.assign(state, action.payload);
    },

    resetStickerData: (state, action: { payload: number }) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(stickerApi.endpoints.getSticker.matchPending, state => {
      if (!state.loading) {
        state.loading = true;
      }
    });
    builder.addMatcher(
      stickerApi.endpoints.getSticker.matchFulfilled,
      state => {
        if (state.loading) {
          state.loading = false;
        }
      }
    );
    builder.addMatcher(stickerApi.endpoints.getSticker.matchRejected, state => {
      if (state.loading) {
        state.loading = false;
      }
    });
  },
});

const selectSticker = (state: RootState) => state.stickers;
export const useStickerStore = () => {
  const sticker = useSelector(selectSticker);
  return useMemo(() => sticker, [sticker]);
};

export const { setStickerData } = stickerSlice.actions;
export default stickerSlice.reducer;
