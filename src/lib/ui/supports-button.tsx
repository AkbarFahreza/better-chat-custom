import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

function SupportsButton() {
  const items = [
    {
      name: "PayPal",
      link: "https://paypal.me/revernry",
      color: "#FFFFFF",
    },
    {
      name: "Trakteer",
      link: "https://trakteer.id/DekReza",
      color: "#be1e2d",
    },
    {
      name: "Tako",
      link: "https://tako.id/dekreza",
      color: "#0A84FF",
    },
    {
      name: "Ko-fi",
      link: "https://ko-fi.com/arzee",
      color: "#FFFFFF",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const supportBtnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        supportBtnRef.current &&
        !supportBtnRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  return (
    <div className="relative">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="bg-secondary w-30 py-1 px-3 rounded-sm flex flex-row justify-between items-center"
      >
        <p>Support</p>
        <ChevronRight
          className={` ${
            isOpen ? "rotate-0" : "rotate-90"
          } transition-all duration-200`}
          size={15}
        />
      </div>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -30 }}
            className="bg-secondary shadow-lg w-30 py-1 px-1 rounded-sm absolute top-[130%] left-0"
            ref={supportBtnRef}
          >
            {items.map((item) => (
              <a
                href={item.link}
                className="justify-between items-center flex py-1 px-2 hover:bg-background rounded-sm"
              >
                <p style={{ color: item.color, fontWeight: "bold" }}>
                  {item.name}
                </p>
              </a>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default SupportsButton;
