import styled, { keyframes } from 'styled-components';

const slideInFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fancyEmojiEntry = keyframes`
  0% {
    transform: scale(2);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const ReactionList = styled.ul`
  list-style: none;
  padding: 2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
`;

export const ReactionItem = styled.li<{ backgroundColor: string }>`
  padding-inline-start: 2rem;
  padding-inline-end: 1rem;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  height: calc(2rem - 2px);
  width: 8rem;

  @media (max-width: 768px) {
    height: calc(1.5rem - 2px);
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slideInFade} 0.4s ease-out forwards,
      ${fadeOut} 30s linear forwards;
  }
`;

export const UserName = styled.span`
  color: #eee;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Emoji = styled.span`
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 2rem;
  aspect-ratio: 1;
  position: absolute;
  left: -1rem;

  @media (max-width: 768px) {
    height: 2rem;
    line-height: 2rem;
    font-size: 1.5rem;
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${fancyEmojiEntry} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
`;
