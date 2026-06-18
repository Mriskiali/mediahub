import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth is handled by middleware.ts — no redirect needed here
  return (
    <div className="flex h-screen overflow-hidden bg-[#e4e4e7]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-auto bg-white brutal-shadow ml-6 my-6 mr-6 brutal-border">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
