/**
 * Chat API Response
 */
export type ChatResponse = {
  answer: string;
};

/**
 * Auth API Response
 */
export type SignupResponse = {
  id: number;
  email: string;
  username: string;
  created_at: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  user_id: string;
};
