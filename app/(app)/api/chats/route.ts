import { NextRequest, NextResponse } from "next/server";

import { findChatsByUser } from "@/db/services/chats";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId)
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    const chats = await findChatsByUser(userId);
    return NextResponse.json(chats);
  } catch (error) {
    console.error("Error in /api/chats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
