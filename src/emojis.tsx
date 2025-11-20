import * as React from 'react';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';

export function LottieEmoji({
  codePoint,
  fallbackEmoji,
}: {
  codePoint: string;
  fallbackEmoji: string;
}) {
  const [instance, setInstance] = React.useState<DotLottie | null>(null);
  const [fallback, setFallback] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const controller = new AbortController();
    fetch(
      `https://fonts.gstatic.com/s/e/notoemoji/latest/${codePoint}/lottie.json`,
      { cache: 'force-cache', signal: controller.signal },
    ).then((response) => {
      if (!response.ok) {
        setFallback(fallbackEmoji);
      }
    }).finally(() => {
      setLoading(false);
    });
    return () => {
      controller.abort();
    };
  }, [fallbackEmoji, codePoint]);
  React.useEffect(() => {
    if (instance) {
      const id = setTimeout(() => {
        instance.stop();
      }, 3000);
      return () => {
        clearTimeout(id);
      };
    }
    return undefined;
  }, [instance]);
  if (loading) return null;
  if (fallback) return fallback;
  return (
    <DotLottieReact
      src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${codePoint}/lottie.json`}
      dotLottieRefCallback={setInstance}
      autoplay
      width={14}
      height={14}
      loop
      onMouseEnter={() => instance.play()}
      onMouseLeave={() => instance.stop()}
    />
  );
}
