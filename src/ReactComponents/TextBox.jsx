import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { motion } from "framer-motion";
import { isTextBoxVisibleAtom, textBoxContentAtom } from "../store";
import "./textbox.css";

const variants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 0, scale: 0.5 },
};

export default function TextBox() {
  const [isVisible, setIsVisible] = useAtom(isTextBoxVisibleAtom);
  const [isCloseRequest, setIsCloseRequest] = useState(false);
  const content = useAtomValue(textBoxContentAtom);

  const handleAnimationComplete = () => {
    if (isCloseRequest) {
      setIsVisible(false);
      setIsCloseRequest(false);
    }
  };

  useEffect(() => {
    const closeHandler = (e) => {
      if (!isVisible) return;
      if (e.code === "Space") {
        setIsCloseRequest(true);
      }
    };

    window.addEventListener("keydown", closeHandler);

    return () => {
      window.removeEventListener("keydown", closeHandler);
    };
  }, [isVisible, setIsVisible]);

  return (
    isVisible && (
      <motion.div
        className="text-box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isCloseRequest ? "closed" : "open"}
        variants={variants}
        transition={{ duration: 0.2 }}
        onAnimationComplete={handleAnimationComplete}
      >
        <p>{content}</p>
      </motion.div>
    )
  );
}
