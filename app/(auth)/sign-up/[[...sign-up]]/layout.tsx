import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

interface SignUpLayoutProps {
  children: React.ReactNode;
}

export default async function SignUpPageLayout({
  children,
}: SignUpLayoutProps) {
  return (
    <div>
      <div className="py-6 border-b">
        <MainNav />
      </div>
      <main className="max-w-7xl mx-auto flex items-center justify-center min-h-[calc(100vh-100px)]">
        {children}
      </main>
      <hr />
      <SiteFooter />
    </div>
  );
}
