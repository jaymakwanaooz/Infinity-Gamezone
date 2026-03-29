export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gaming-bg via-gaming-bg to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {children}
      </div>
    </div>
  );
}
