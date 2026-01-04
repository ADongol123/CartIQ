export type ApiPromise<T = any> = {
    success: boolean;
    data: T;
    error?: string;
    errorType?: string; // For special error handling (e.g., account_deactivated)
};

export type AccountStatus = "active" | "inactive" ;

export type AuthenticatedUser = {
    username: string,
    email: string,
    _id: string,
    token: string,
    profileUrl: string,
    account_status: AccountStatus,
}
export type AccountType = "user" | "admin"

export type SignUpPayload = {
    username: string;
    email: string;
    password: string;
    accountType: AccountType
};

// Chatbot data structure returned by API
export interface Chatbot {
    id: string;
    name: string;
    description?: string;
    templates: string[];
    primaryColor: string;
    secondaryColor: string;
    welcomeMessage: string;
    autoShow: boolean;
    delayTime: number;
    collectEmail: boolean;
    fallbackContact: boolean;
    owner?: string;
}

// Payload for creating a chatbot
export interface ChatbotCreatePayload {
    name: string;
    description?: string;
    templates?: string[];
    primaryColor?: string;
    secondaryColor?: string;
    welcomeMessage?: string;
    autoShow?: boolean;
    delayTime?: number;
    collectEmail?: boolean;
    fallbackContact?: boolean;
}

// Payload for updating a chatbot
export interface ChatbotUpdatePayload {
    name?: string;
    description?: string;
    templates?: string[];
    primaryColor?: string;
    secondaryColor?: string;
    welcomeMessage?: string;
    autoShow?: boolean;
    delayTime?: number;
    collectEmail?: boolean;
    fallbackContact?: boolean;
}

// Optional: Payload for sending a message to a chatbot
export interface ChatMessagePayload {
    chatbotId: string;
    message: string;
    userEmail?: string; // if needed for backend
}

// Optional: Response for chat messages
export interface ChatMessageResponse {
    chatbotId: string;
    message: string;
    reply: string;
    timestamp: string;
}

