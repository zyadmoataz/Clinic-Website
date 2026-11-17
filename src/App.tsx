import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { Spinner } from './components/ui/Spinner';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import NotFound from './pages/NotFound';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const DoctorsList = lazy(() => import('./pages/doctors/DoctorsList'));
const DoctorDetail = lazy(() => import('./pages/doctors/DoctorDetail'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const Booking = lazy(() => import('./pages/booking/Booking'));
const BookingConfirmation = lazy(() => import('./pages/booking/BookingConfirmation'));
const MyAppointments = lazy(() => import('./pages/appointments/MyAppointments'));
const MyPrescriptions = lazy(() => import('./pages/prescriptions/MyPrescriptions'));

function LoadingFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner className="text-primary h-8 w-8" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<RootLayout />}>
            {/* Public Browsing Routes — No Login Required */}
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Authenticated Booking & Patient Portal Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/confirmation" element={<BookingConfirmation />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/my-prescriptions" element={<MyPrescriptions />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
