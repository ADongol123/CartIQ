import {
  ApiPromise,
  Chatbot,
  ChatbotCreatePayload,
  ChatbotUpdatePayload,
} from "@/global-types";
import { getCookie, setCookie } from "@/helper/cookieHelper";
import { post, get, put, del } from "@/lib/fetcher";
import { cache } from "react";
import { getAuthToken } from "./auth_service";

// --------------------------------------------------
//  Create a new chatbot
// -----------------------------------------------------
export async function createChatbot(
  payload: ChatbotCreatePayload
): Promise<ApiPromise> {
  const token: any = getAuthToken();
  try {
    const res = await post("chatbots", payload, token);
    return res;
  } catch (err) {
    console.error("Error creating chatbot:", err);
    throw err;
  }
}

// ---------------------------------------------------------------------
// Update an existing chatbot
//----------------------------------------------------
export async function updateChatbot(
  chatbotId: string,
  payload: ChatbotUpdatePayload
): Promise<ApiPromise> {
  try {
    const res = await put(`chatbots/${chatbotId}`, payload);
    return res;
  } catch (err) {
    console.error("Error updating chatbot:", err);
    throw err;
  }
}

// --------------------------------------------------
// Delete a chatbot
// ----------------------------------------------------
export async function deleteChatbot(chatbotId: string): Promise<ApiPromise> {
  try {
    const res = await del(`chatbots/${chatbotId}`);
    return res;
  } catch (err) {
    console.error("Error deleting chatbot:", err);
    throw err;
  }
}

//------------------------------------------------------------
// Get a single chatbot by ID
// ------------------------------------------------------------
export async function getChatbot(chatbotId: string): Promise<Chatbot | null> {
  try {
    const res = await get(`chatbots/?chatbot_id=${chatbotId}`);
    return res.data as Chatbot;
  } catch (err) {
    console.error("Error fetching chatbot:", err);
    throw err;
  }
}

// ---------------------------------------------------------------------------------
//  Get all chatbots for the current user
// ---------------------------------------------------------------------------------
export const getUserChatbots = cache(
  async (token: string): Promise<Chatbot[]> => {
    try {
      const res = await get("chatbots/", token);
      return res.data as Chatbot[];
    } catch (err) {
      console.error("Error fetching user chatbots:", err);
      throw err;
    }
  }
);
