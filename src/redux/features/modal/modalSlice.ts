import { createSlice } from '@reduxjs/toolkit'

interface ModalState {
  isModalOpen: boolean
}

const initialState: ModalState = {
  isModalOpen: false,  // Modal is closed by default
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.isModalOpen = false
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen
    },
  },
})

export const { openModal, closeModal, toggleModal } = modalSlice.actions
export default modalSlice.reducer
