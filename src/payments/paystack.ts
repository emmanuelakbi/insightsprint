/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export interface PaystackCheckoutOptions {
  email: string;
  amountInKobo: number;
  metadata?: Record<string, unknown>;
  reference?: string;
  // Paystack expects `callback` to be a plain function. Avoid passing an async function directly.
  onSuccess: (response: { reference: string }) => void;
  onCancel?: () => void;
}

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";
const PAYSTACK_INLINE_SRC = "https://js.paystack.co/v1/inline.js";

let paystackInlineLoadPromise: Promise<void> | null = null;

function ensurePaystackInlineLoaded(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.PaystackPop) return Promise.resolve();
  if (paystackInlineLoadPromise) return paystackInlineLoadPromise;

  paystackInlineLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PAYSTACK_INLINE_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });

  return paystackInlineLoadPromise;
}

export function openPaystackCheckout(options: PaystackCheckoutOptions) {
  if (typeof options.onSuccess !== "function") {
    console.error(
      "Paystack checkout misconfigured: onSuccess is not a function",
    );
    return;
  }

  if (typeof window === "undefined") return;

  console.log("Paystack: opening checkout", {
    email: options.email,
    amountInKobo: options.amountInKobo,
    ref: options.reference,
  });

  // If the inline script hasn't finished loading yet, load it and then open.
  void ensurePaystackInlineLoaded()
    .then(() => {
      if (!window.PaystackPop) {
        console.error("Paystack SDK not loaded after script injection");
        return;
      }

      console.log("Paystack: SDK ready, calling setup()");
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: options.email,
        amount: options.amountInKobo,
        currency: "NGN",
        ref:
          options.reference ||
          `INSIGHTSPRINT_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
        metadata: options.metadata,
        callback: (response: { reference: string }) => {
          // Keep callback sync; run async work from inside `onSuccess` if needed.
          options.onSuccess(response);
        },
        onClose: options.onCancel,
      });

      try {
        handler.openIframe();
      } catch (e) {
        console.error("Paystack openIframe failed", e);
      }
    })
    .catch((e) => {
      console.error("Failed to load Paystack inline script", e);
    });
}
