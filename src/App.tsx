import { t } from 'i18next';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { Spinner } from './components/ui/Spinner';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import NotFound from './pages/NotFound';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() =>
  import('./pages/auth/Login').catch(() => ({ default: () => <div>{t('common.page_shell')}</div> }))
);
const Register = lazy(() =>
  import('./pages/auth/Register').catch(() => ({
    default: () => <div>{t('common.page_shell')}</div>
  }))
);
const Profile = lazy(() =>
  import('./pages/profile/Profile').catch(() => ({
    default: () => <div>{t('common.page_shell')}</div>
  }))
);
const DoctorsList = lazy(() =>
  import('./pages/doctors/DoctorsList').catch(() => ({
    default: () => <div>{t('common.page_shell')}</div>
  }))
);
const DoctorDetail = lazy(() =>
  import('./pages/doctors/DoctorDetail').catch(() => ({
    default: () => <div>{t('common.page_shell')}</div>
  }))
);
const Booking = lazy(() =>
  import('./pages/booking/Booking').catch(() => ({
    default: () => <div>{t('common.page_shell')}</div>
  }))
);
const BookingConfirmation = lazy(() =>
  import('./pages/booking/BookingConfirmation').catch(() => ({
    default: () => <div>{t('common.page_shell')}</div>
  }))
);
const MyAppointments = lazy(() => import('./pages/appointments/MyAppointments'));
const MyPrescriptions = lazy(() => import('./pages/prescriptions/MyPrescriptions'));

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="h-8 w-8 text-blue-500" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/doctors/:id" element={<DoctorDetail />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/confirmation" element={<BookingConfirmation />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/my-prescriptions" element={<MyPrescriptions />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
