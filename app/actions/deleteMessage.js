"use server";
import connectDB from "@/app/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  await connectDB();

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  // verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  await message.deleteOne();
  revalidatePath("/", "layout");

  return { success: true };

}

export default deleteMessage;
