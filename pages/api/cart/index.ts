import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import {
  handleAddToCart,
  handleDeleteCartItem,
  handleGetUserCart,
  handleUpdateCart,
} from "../helpers/cart";
import { getTokenData } from "../helpers/utils/getTokenData";
import { handleErrorMsg } from "../helpers/utils/handleErrorMsg";
import jwtMiddleware from "../helpers/utils/validateToken";

async function handler(req: NextApiRequest, res: NextApiResponse, user: any) {
  const { id } = getTokenData(user);
  try {
    switch (req.method) {
      case "GET":
        const cart = await handleGetUserCart(id);
        return res.status(200).json({ cart });
      case "POST":
        const updatedCart = await handleAddToCart(id, req.body);
        return res.status(201).json({ cart: updatedCart });
      case "PUT":
        const newCart = await handleUpdateCart(id, req.body);
        return res.status(200).json({ cart: newCart });
      case "DELETE":
        await handleDeleteCartItem(id, req.body);
        return res.status(200).json({ success: true });
      default:
        res.setHeader("Allow", "POST, GET, PUT, DELETE");
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const errorObj = handleErrorMsg(error);
      return res.status(400).json({ error: errorObj });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export default jwtMiddleware(handler);
