import convo from "../../assets/image/convo.svg";
import { FaBell } from "react-icons/fa";
import useOpenToggle from "../../hooks/useOpenToggle";
import AlarmModal from "../common/modal/AlarmModal";

const Header = () => {
  const { isOpen, setIsOpen } = useOpenToggle();

  return (
    <header className="flex items-center justify-between w-full">
      <img src={convo} alt="convo 로고" className="w-[150px] h-auto" />
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        <FaBell className="text-neutral-600 w-[24px] h-[24px]" />
      </button>
      {isOpen && (
        <AlarmModal
          onClose={() => {
            setIsOpen(!isOpen);
          }}
        />
      )}
    </header>
  );
};

export default Header;
