import * as React from 'react';
import { PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { USER_REACTIONS } from '../../graphql/queries';
import { type UserReactionResponse, type UserReaction } from '../../graphql/types';
import {
  ReactionList, ReactionItem, UserName, Emoji,
} from './styles';
import { LottieEmoji } from '../../emojis';

const initialCursor = new Date().toUTCString();
const timeoutIds = new Map<string, ReturnType<typeof setTimeout>>();

interface ReactionWindowProps {
  pluginApi: PluginApi;
}

function ReactionWindow({
  pluginApi,
}: ReactionWindowProps) {
  const {
    data: userReactions,
  } = pluginApi.useCustomSubscription<UserReactionResponse>(
    USER_REACTIONS,
    { variables: { initialCursor } },
  );
  const [reactions, setReactions] = React.useState<Record<string, UserReaction>>({});

  React.useEffect(() => {
    if (!userReactions) {
      return;
    }
    const newReactions = { ...reactions };
    userReactions.user_reaction_stream.forEach((reaction) => {
      const userTimeout = timeoutIds.get(reaction.userId);
      if (userTimeout) clearTimeout(userTimeout);
      if (reaction.reactionEmoji === 'none') {
        delete newReactions[reaction.userId];
      } else {
        newReactions[reaction.userId] = reaction;
        timeoutIds.set(
          reaction.userId,
          setTimeout(
            () => {
              timeoutIds.delete(reaction.userId);
              setReactions((prevReactions) => {
                const newState = { ...prevReactions };
                delete newState[reaction.userId];
                return newState;
              });
            },
            Math.max(new Date(reaction.expiresAt).getTime() - Date.now(), 0),
          ),
        );
      }
    });
    setReactions(newReactions);
  }, [userReactions]);

  if (!Object.values(reactions).length) return null;

  const reactionsItems = Object.values(reactions)
    .sort((reaction1, reaction2) => (
      new Date(reaction2.createdAt).getTime() - new Date(reaction1.createdAt).getTime()));

  return (
    <ReactionList>
      {reactionsItems.map((reaction) => (
        <ReactionItem
          key={`${reaction.userId}-${reaction.createdAt}`}
          backgroundColor={reaction.user.color}
        >
          <Emoji>
            <LottieEmoji
              codePoint={reaction.reactionEmoji.codePointAt(0).toString(16)}
              fallbackEmoji={reaction.reactionEmoji}
            />
          </Emoji>
          <UserName>{reaction.user.name}</UserName>
        </ReactionItem>
      ))}
    </ReactionList>
  );
}

export default ReactionWindow;
