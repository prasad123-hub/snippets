import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

interface SignUpPageLayoutProps {
  children: React.ReactNode;
}

export default async function SignUpPageLayout({
  children,
}: SignUpPageLayoutProps) {
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
