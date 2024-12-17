"use server";

// IMPORTANT: Make sure to only run this code server-side
// to prevent leaking the SaleSnip API key.
export async function createNegotiationSession() {
  const config = {
    enviroment: process.env.NODE_ENV === "development" ? "test" : "live",
    projectId: process.env.SALESNIP_PROJECT_ID,
    productId: process.env.CREEM_PRODUCT_ID,
    minimumPrice: 100,
    callbacks: {
      success: "https://example.com/callback/creem",
    },
  };

  const res = await fetch("https://api.salesnip.com/v1/sessions/creem", {
    method: "POST",
    body: JSON.stringify(config),
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.SALESNIP_API_KEY,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("[SaleSnip] Failed to create session:", data, res);
    throw new Error("Failed to create negotiation session");
  }

  return {
    id: data.id,
    url: data.url,
  };
}
