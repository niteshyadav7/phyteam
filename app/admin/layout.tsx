import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Phyteam",
  description: "Phyteam Admin Dashboard & Lead Management",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070d19] text-[#e2e8f0] font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {children}
    </div>
  );
}
