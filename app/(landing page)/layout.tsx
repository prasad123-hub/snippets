import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

interface LandingPageLayoutProps {
  children: React.ReactNode;
}

export default async function LandingPageLayout({
  children,
}: LandingPageLayoutProps) {
  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="py-6 border-b">
        <MainNav />
      </div>
      <main className="max-w-7xl mx-auto">{children}</main>
      <hr />
      <SiteFooter />
    </div>
  );
}
