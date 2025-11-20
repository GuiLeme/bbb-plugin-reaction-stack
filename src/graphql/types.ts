export interface UserReaction {
  createdAt: string; // ISO string
  expiresAt: string; // ISO string
  reactionEmoji: string;
  userId: string;
  user: {
    name: string;
    color: string;
  };
}

export interface UserReactionResponse {
  user_reaction_stream: UserReaction[];
}
