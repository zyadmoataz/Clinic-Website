// ==========================================
// OWNER: Othman

import { PageContainer } from '../components/layout/PageContainer';
import { Button, Spinner } from '../components/ui';
import { useAuthMeQuery } from '../services/api/queries/authMe.query';

// ==========================================
export default function Page() {
  const { data: user, isLoading, isError } = useAuthMeQuery(true);
  if (isLoading) return <Spinner />;
  if (isError) return <p>error</p>;
  console.log(user);

  return (
    <>
      <PageContainer>
        <section className="mt-20 flex items-center justify-between">
          <div className="relative">
            <img
              src={user?.avatarUrl}
              alt={`${user?.name}'s profile photo`}
              className="h-24 w-24 rounded-full border-4 border-blue-100 object-cover"
            />
            <span className="border-border bg-success absolute right-1 bottom-1 h-4 w-4 rounded-full border-2" />
          </div>
          <Button variant="ghost">Edit</Button>
        </section>

        <section className="border-border bg-surface mt-8 rounded-2xl border shadow-sm">
          <div className="border-border flex items-center justify-between border-b px-6 py-4">
            <span className="text-sm text-gray-500">Name</span>
            <span className="text-text text-sm font-medium">{user?.name}</span>
          </div>
          <div className="border-border flex items-center justify-between border-b px-6 py-4">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-text text-sm font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-gray-500">Phone</span>
            <span className="text-text text-sm font-medium">{user?.phone}</span>
          </div>
        </section>
      </PageContainer>
    </>
  );
}
