import { Outlet, Link } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">ClinicNow</Link>
          <div className="flex gap-4">
            <Link to="/doctors" className="text-gray-600 hover:text-blue-600 font-medium">Find Doctors</Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} ClinicNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
