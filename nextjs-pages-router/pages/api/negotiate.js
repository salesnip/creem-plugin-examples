export default async function handler(_, res) {
  const config = {
    enviroment: process.env.NODE_ENV === "development" ? "test" : "live",
    projectId: process.env.SALESNIP_PROJECT_ID,
    productId: process.env.CREEM_PRODUCT_ID,
    minimumPrice: 100,
    callbacks: {
      success: "https://example.com/callback/creem",
    },
  };

  const response = await fetch("https://api.salesnip.com/v1/sessions/creem", {
    method: "POST",
    body: JSON.stringify(config),
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.SALESNIP_API_KEY,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("[SaleSnip] Failed to create session:", data, response);
    throw new Error("Failed to create negotiation session");
  }

  res.status(200).json({
    id: data.id,
    url: data.url,
  });
}
