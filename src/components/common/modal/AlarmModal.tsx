import ModalContainer from "./ModalContainer";

const AlarmModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalContainer onClose={onClose} variantClasses="w-[400px] h-[400px]">
      <div></div>
    </ModalContainer>
  );
};

export default AlarmModal;
