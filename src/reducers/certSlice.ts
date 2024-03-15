import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICertificate } from '../types/ICertificate.ts';

export interface ICertState {
  certificates: ICertificate[],
}

const initialState: ICertState = {
  certificates: [],
};

export const certSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    addCertificate: (state: ICertState, action: PayloadAction<ICertificate>) => {
      const duplicate = state.certificates.some((certificate) => certificate.id === action.payload.id);
      if (duplicate) {
        return;
      }
      state.certificates = [...state.certificates, action.payload]
    },
  }
})

export const { addCertificate} = certSlice.actions;
export default certSlice.reducer;
