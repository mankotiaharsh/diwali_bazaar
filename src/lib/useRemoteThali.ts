import { useEffect, useState } from "react";
import { ApiError, api } from "./api";
import { fromThaliData } from "./thali";

export type RemoteThali =
  | { state: "loading" }
  | { state: "ok"; thali: ReturnType<typeof fromThaliData> }
  | { state: "notfound" }
  | { state: "error"; message: string; retry: () => void };

const ID_PATTERN = /^[A-Za-z0-9_-]{6,16}$/;

/** Load a paid thali by its link id. Unpaid, unknown and malformed ids all come back as "notfound". */
export function useRemoteThali(id: string): RemoteThali {
  const [result, setResult] = useState<RemoteThali>({ state: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!ID_PATTERN.test(id)) return setResult({ state: "notfound" });
    let alive = true;
    setResult({ state: "loading" });
    api
      .thali(id)
      .then((r) => {
        const thali = fromThaliData(r.thali);
        if (alive) setResult(thali.items.length ? { state: "ok", thali } : { state: "notfound" });
      })
      .catch((e) => {
        if (!alive) return;
        if (e instanceof ApiError && e.status === 404) return setResult({ state: "notfound" });
        setResult({
          state: "error",
          message: e instanceof ApiError ? e.message : "Couldn't load this thali.",
          retry: () => setAttempt((a) => a + 1),
        });
      });
    return () => {
      alive = false;
    };
  }, [id, attempt]);

  return result;
}
