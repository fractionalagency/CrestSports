import Footer from "@/components/Footer";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
