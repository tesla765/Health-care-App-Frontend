import { create } from 'zustand';

const useStore = create((set) => ({
  patientDetails: null,
  setPatientDetails: (details) => set({ patientDetails: details }),
}));

export default useStore;