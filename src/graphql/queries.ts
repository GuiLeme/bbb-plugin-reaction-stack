export const USER_REACTIONS = `
  subscription UserReactions($initialCursor: timestamptz) {
    user_reaction_stream(
      batch_size: 10,
      cursor: { initial_value: { createdAt: $initialCursor } },
    ) {
      createdAt
      expiresAt
      reactionEmoji
      userId
      user {
        name
        color
      }
    }
  }
`;
