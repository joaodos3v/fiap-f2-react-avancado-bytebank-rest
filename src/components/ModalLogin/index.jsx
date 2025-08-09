import { useState } from 'react';
import Modal from '../Modal';
import { FormLogin } from '../FormLogin';
import { TransparentButton } from '../TransparentButton';

export const ModalLogin = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <TransparentButton onClick={() => setModalOpen(true)}>Login</TransparentButton>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormLogin onLogin={() => setModalOpen(false)}/>
      </Modal>
    </>
  );
};
