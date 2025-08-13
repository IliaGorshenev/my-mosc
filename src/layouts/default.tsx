export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col max-h-screen h-screen">
      <main className="container min-w-full mx-auto flex-grow">{children}</main>
    </div>
  );
}
