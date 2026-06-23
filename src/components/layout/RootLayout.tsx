// ==========================================
// OWNER: Zyad, Othman
// PURPOSE: Global Shared Layout - Root Layout
// ==========================================
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function RootLayout() {
  return (
    <div className="selection:bg-primary-soft selection:text-primary min-h-screen font-sans">
      <Navbar />
      <main className="my-20">
        <Outlet />
      </main>
    </div>
  );
}
