interface TabButtonProps {
  name: string;
  isActive: boolean;
  isDisabled?: boolean;
  onClik: () => void;
}

function TabButton({ name, isActive, isDisabled, onClik }: TabButtonProps) {
  return (
    <button
      className={`${isActive ? "border-b border-main text-main" : ""} ${
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : " hover:text-main cursor-pointer"
      } py-1.5 px-4 font-bold transition-colors duration-200`}
      onClick={onClik}
      disabled={isDisabled}
    >
      {name}
    </button>
  );
}

export default TabButton;
