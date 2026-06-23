import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
        <Button variant="primary" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
