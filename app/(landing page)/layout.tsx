interface LandingPageLayoutProps {
  children: React.ReactNode;
}

export default async function LandingPageLayout({
  children,
}: LandingPageLayoutProps) {
  return (
    <div>
      <h1>Header</h1>
      {children}
      <h1>Footer</h1>
    </div>
  );
}
