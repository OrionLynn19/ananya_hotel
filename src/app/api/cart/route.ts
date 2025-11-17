import { NextResponse } from "next/server";
import { getCartData } from "../../../mocks/cartData";

export async function GET() {
  const data = getCartData();
  return NextResponse.json(data);
}
