import { MainNav } from "@/components/main-nav";
import { Sidebar } from "@/components/sidebar";
import { SiteFooter } from "@/components/site-footer";

interface DashboarLayoutProps {
  children: React.ReactNode;
}

export default async function DashboarLayout({
  children,
}: DashboarLayoutProps) {
  return (
    <div className="flex h-[100vh] flex-col justify-between">
      <div className="py-6 border-b">
        <MainNav />
      </div>

      <div className="">
        <main className="max-w-5xl mx-auto">{children}</main>
      </div>

      <SiteFooter />
    </div>
  );
}
