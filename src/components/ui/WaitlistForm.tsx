import { useState, type FormEvent } from "react";
import { Button } from "./Button";

type FormStatus = "idle" | "loading" | "success" | "error";

const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

interface WaitlistFormProps {
  id?: string;
  compact?: boolean;
}

export function WaitlistForm({ id, compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    if (!endpoint) {
      setStatus("success");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className={`rounded-xl border border-reactor-green/24 bg-reactor-green/8 p-6 ${compact ? "" : "md:p-8"}`}
      >
        <p className="font-display text-[20px] font-medium text-cream">
          You&apos;re on the list.
        </p>
        <p className="mt-2 text-[15px] text-hot-steel">
          We&apos;ll email you when enrollment opens — curriculum previews and
          early access included.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 ${compact ? "sm:flex-row" : "md:flex-row"}`}
    >
      <label htmlFor={`${id ?? "waitlist"}-email`} className="sr-only">
        Email address
      </label>
      <input
        id={`${id ?? "waitlist"}-email`}
        type="email"
        name="email"
        autoComplete="email"
        required
        placeholder="you@youremail.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status === "error") {
            setStatus("idle");
            setErrorMessage("");
          }
        }}
        className="min-w-0 flex-1 rounded-full border border-cream/16 bg-cream/4 px-5 py-2.5 font-body text-[15px] text-cream placeholder:text-hot-steel focus:border-reactor-green/40 focus:outline-none"
      />
      <Button type="submit" variant="secondary" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Join waitlist"}
      </Button>
      {errorMessage && (
        <p className="text-[13px] text-warning-amber sm:basis-full" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
