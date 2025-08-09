import { useState } from 'react';
import { FormRegister } from '../FormRegister';
import Modal from '../Modal';
import { TransparentButton } from '../TransparentButton';

export const ModalRegister = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <TransparentButton onClick={() => setModalOpen(true)}>Cadastro</TransparentButton>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <FormRegister onRegister={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};
