import { ApiPromise } from "@/global-types";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const get = async (path: string, token = ""): Promise<ApiPromise> => {
  try {
    if (!path) {
      console.error("get: Missing path parameter");
      return { error: "Missing path parameter", success: false, data: null };
    }

    const res = await fetch(`${API_URL}/${path.replace(/^\/+/, "")}`, {
      headers: { "x-access-token": token },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`GET ${path} failed with status ${res.status}:`, errorText);
      return {
        error: `Request failed with status ${res.status}`,
        success: false,
        data: null,
      };
    }

    const resJson = await res.json();
    return { data: resJson, success: true };
  } catch (error: any) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    console.error(`GET ${path} failed with error:`, error);
    return {
      error: error.message || "Unknown error occurred",
      success: false,
      data: null,
    };
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const put = async (
  path: string,
  data: any,
  token = ""
): Promise<ApiPromise> => {
  try {
    if (!path) {
      console.error("put: Missing path parameter");
      return { error: "Missing path parameter", success: false, data: null };
    }

    const res = await fetch(`${API_URL}/${path}`, {
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.json();
      console.error(`PUT ${path} failed with status ${res.status}:`, errorText);
      return {
        error: errorText.error || `Request failed with status ${res.status}`,
        errorType: errorText.errorType, // Include errorType for special handling
        success: false,
        data: null,
      };
    }

    const resJson = await res.json();
    return { data: resJson, success: true };
  } catch (error: any) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    console.error(`PUT ${path} failed with error:`, error);
    return {
      error: error.message || "Unknown error occurred",
      success: false,
      data: null,
    };
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const post = async (
  path: string,
  data: any,
  token = ""
): Promise<ApiPromise> => {
  try {
    if (!path) {
      console.error("post: Missing path parameter");
      return { error: "Missing path parameter", success: false, data: null };
    }

    const res = await fetch(`${API_URL}/${path.replace(/^\/+/, "")}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.json();
      console.log(`is res ok ${res.ok ? "yes" : "no"}`);
      return {
        error: errorText.error || `Request failed with status ${res.status}`,
        errorType: errorText.errorType, // Include errorType for special handling
        success: false,
        data: null,
      };
    }

    const resJson = await res.json();
    return { data: resJson, success: true };
  } catch (error: any) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    console.error(`POST ${path} failed with error:`, error);
    return {
      error: error.message || "Unknown error occurred",
      success: false,
      data: null,
    };
  }
};

export const del = async (
  path: string,
  token = "",
  data?: any
): Promise<ApiPromise> => {
  try {
    if (!path) {
      console.error("del: Missing path parameter");
      return { error: "Missing path parameter", success: false, data: null };
    }

    const res = await fetch(`${API_URL}/${path}`, {
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      ...(data ? { body: JSON.stringify(data) } : {}),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `DELETE ${path} failed with status ${res.status}:`,
        errorText
      );
      return {
        error: `Request failed with status ${res.status}`,
        success: false,
        data: null,
      };
    }

    const resJson = await res.json();
    return { data: resJson, success: true };
  } catch (error: any) {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    console.error(`DELETE ${path} failed with error:`, error);
    return {
      error: error.message || "Unknown error occurred",
      success: false,
      data: null,
    };
  }
};
