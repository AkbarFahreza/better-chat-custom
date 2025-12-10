import type { ReactNode } from "react";

interface TabButtonProps {
  children: ReactNode;
  isActive: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  classnames?: string;
}

function TabButton({
  children,
  isActive,
  isDisabled,
  onClick,
  classnames,
}: TabButtonProps) {
  return (
    <button
      className={`${isActive ? "border-b border-main text-main" : ""} ${
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : " hover:text-main cursor-pointer"
      } py-1.5 px-4 font-bold transition-colors duration-200 flex flex-row gap-2 ${classnames}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default TabButton;
