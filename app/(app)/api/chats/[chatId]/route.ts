import { NextRequest, NextResponse } from "next/server";

import { addChat, getChat, updateChatMessages } from "@/db/services";

import { generateText } from "ai";
import { Message } from "ai";
import { openai } from "@ai-sdk/openai";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) => {
  const { chatId } = await params;

  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json(await getChat(chatId, body.id));
  } catch (error) {
    console.error("Error in /api/chats/[chatId]:", error);
    return NextResponse.json(null, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) => {
  const { chatId } = await params;

  const { messages, id } = await req.json();

  try {
    const chat = await getChat(chatId, id);

    if (!chat) {
      return NextResponse.json(
        await addChat({
          id: chatId,
          userId: id,
          messages,
          tagline: await generateTagline(messages),
        })
      );
    } else {
      return NextResponse.json(
        await updateChatMessages(chatId, id, messages)
      );
    }
  } catch (error) {
    console.error("Error in /api/chats/[chatId]:", error);
    return NextResponse.json(false, { status: 500 });
  }
};

const generateTagline = async (messages: Omit<Message, "id">[]) => {
  // return "A chat about " + messages[0].content;
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    messages: [
      messages[0],
      {
        role: "user",
        content:
          "Generate a 3-5 word description of the chat. Do not include any quotation marks or other punctuation.",
      },
    ],
  });

  return text;
};
