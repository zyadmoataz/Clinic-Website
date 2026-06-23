import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { Spinner } from './components/ui/Spinner';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Lazy-loaded routes for code splitting and placeholder structure
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() =>
  import('./pages/Login').catch(() => ({ default: () => <div>Login Page Shell</div> }))
);
const Register = lazy(() =>
  import('./pages/Register').catch(() => ({ default: () => <div>Register Page Shell</div> }))
);
const Profile = lazy(() =>
  import('./pages/Profile').catch(() => ({ default: () => <div>Profile Page Shell</div> }))
);
const DoctorsList = lazy(() =>
  import('./pages/DoctorsList').catch(() => ({ default: () => <div>Doctors List Page Shell</div> }))
);
const DoctorDetail = lazy(() =>
  import('./pages/DoctorDetail').catch(() => ({
    default: () => <div>Doctor Detail Page Shell</div>
  }))
);
const Booking = lazy(() =>
  import('./pages/Booking').catch(() => ({ default: () => <div>Booking Confirm Page Shell</div> }))
);
const BookingConfirmation = lazy(() =>
  import('./pages/BookingConfirmation').catch(() => ({
    default: () => <div>Booking Success Page Shell</div>
  }))
);
const MyAppointments = lazy(() =>
  import('./pages/MyAppointments').catch(() => ({
    default: () => <div>My Appointments Page Shell</div>
  }))
);
const MyPrescriptions = lazy(() =>
  import('./pages/MyPrescriptions').catch(() => ({
    default: () => <div>My Prescriptions Page Shell</div>
  }))
);

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="h-8 w-8 text-blue-500" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<RootLayout />}>
              {/* Othman */}
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />

              {/* Zyad */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Omar */}
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/doctors/:id" element={<DoctorDetail />} />

              {/* Doaa */}
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/confirmation" element={<BookingConfirmation />} />

              {/* Helda */}
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/my-prescriptions" element={<MyPrescriptions />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
