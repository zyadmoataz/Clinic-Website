// ==========================================
// OWNER: Othman

import { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button, Spinner } from '../components/ui';
import { Modal } from '../components/ui/Modal';
import { useAuthMeQuery } from '../services/api/queries/authMe.query';
import { useUpdateProfileMutation } from '../services/api/mutations/updateProfile.mutation';
import { showToast } from '../lib/toast';

// ==========================================
export default function Page() {
  const { data: user, isLoading, isError } = useAuthMeQuery(true);
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ displayName: '', phone: '' });

  if (isLoading) return <Spinner />;
  if (isError) return <p>error</p>;
  if (!user) return null;

  const handleOpenModal = () => {
    setForm({ displayName: user.name, phone: user.phone });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    updateProfile(form, {
      onSuccess: () => {
        setIsModalOpen(false);
        showToast.success('Your changes have been saved.');
      },
      onError: () => {
        showToast.error('Something went wrong. Please try again.');
      }
    });
  };

  return (
    <>
      <PageContainer>
        {/* Header: avatar + edit button */}
        <section className="mt-20 flex items-center justify-between">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={`${user.name}'s profile photo`}
              className="h-24 w-24 rounded-full border-4 border-blue-100 object-cover"
            />
            <span className="absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-400" />
          </div>
          <Button variant="ghost" onClick={handleOpenModal}>
            Edit
          </Button>
        </section>

        {/* Info fields */}
        <section className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <span className="text-sm text-gray-500">Name</span>
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-900">{user.email}</span>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-gray-500">Phone</span>
            <span className="text-sm font-medium text-gray-900">{user.phone}</span>
          </div>
        </section>
      </PageContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit profile">
        <div className="mb-4">
          <label className="mb-1 block text-sm text-gray-500">Full name</label>
          <input
            type="text"
            value={form.displayName}
            onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500"
          />
        </div>

        <div className="mb-8">
          <label className="mb-1 block text-sm text-gray-500">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? <Spinner /> : 'Save'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
