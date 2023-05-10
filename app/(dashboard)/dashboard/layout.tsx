import { Sidebar } from "@/components/sidebar";
import { SiteFooter } from "@/components/site-footer";

interface DashboarLayoutProps {
  children: React.ReactNode;
}

export default async function DashboarLayout({
  children,
}: DashboarLayoutProps) {
  return (
    <div className="md:px-10">
      <div className="flex items-start">
        <Sidebar />
        <main className="p-10 w-full">{children}</main>
      </div>
      <hr />
      <SiteFooter />
    </div>
  );
}
