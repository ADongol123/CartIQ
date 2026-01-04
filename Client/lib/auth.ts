// utils/auth.ts

// Set cookie
export const setToken = (token: string) => {
  if (typeof document !== "undefined") {
    document.cookie = `auth_token=${token}; path=/; max-age=3600; Secure; SameSite=Lax`;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("auth_token="));
};

// Get the token from cookies
export const getToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )auth_token=([^;]+)"));
  return match ? match[2] : null;
};

// Remove the token
export const logout = () => {
  if (typeof document !== "undefined") {
    document.cookie = "auth_token=; path=/; max-age=0; Secure; SameSite=Lax";
  }
};
