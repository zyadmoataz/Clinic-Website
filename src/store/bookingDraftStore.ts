import { create } from 'zustand';
import type { BookingDraftParams } from '@/utils/safeRedirect';

const DRAFT_KEY = 'medora_pending_booking';

function loadDraft(): BookingDraftParams | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BookingDraftParams;
  } catch {
    sessionStorage.removeItem(DRAFT_KEY);
    return null;
  }
}

interface BookingDraftState {
  draft: BookingDraftParams | null;
  setDraft: (draft: BookingDraftParams) => void;
  clearDraft: () => void;
}

export const useBookingDraftStore = create<BookingDraftState>((set) => ({
  draft: loadDraft(),
  setDraft: (draft) => {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    set({ draft });
  },
  clearDraft: () => {
    sessionStorage.removeItem(DRAFT_KEY);
    set({ draft: null });
  }
}));
