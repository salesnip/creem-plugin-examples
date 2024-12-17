import "./globals.css";

export const metadata = {
  title: "SaleSnip x Creem",
  description: "An example project using the SaleSnip x Creem integration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
