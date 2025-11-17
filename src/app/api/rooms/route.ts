import { NextResponse } from "next/server";
import { getRooms } from "../../../mocks/roomsData";

export async function GET() {
  const rooms = getRooms();
  return NextResponse.json({ rooms });
}
