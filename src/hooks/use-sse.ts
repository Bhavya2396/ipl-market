import { useEffect, useRef, useState } from "react";

type SSEEvent = {
  type: "MATCH_UPDATE" | "MARKET_UPDATE";
  data: any;
};

export function useSSE(matchId?: string, marketId?: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!matchId && !marketId) {
      return;
    }

    const params = new URLSearchParams();
    if (matchId) params.append("matchId", matchId);
    if (marketId) params.append("marketId", marketId);

    const eventSource = new EventSource(`/api/events?${params.toString()}`);

    eventSource.onmessage = (event) => {
      try {
        const parsedEvent: SSEEvent = JSON.parse(event.data);
        setData(parsedEvent.data);
      } catch (err) {
        console.error("Error parsing SSE event:", err);
        setError(err instanceof Error ? err : new Error("Failed to parse event"));
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      setError(new Error("SSE connection error"));
      eventSource.close();
    };

    eventSourceRef.current = eventSource;

    return () => {
      eventSource.close();
    };
  }, [matchId, marketId]);

  return { data, error };
} 