import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useChatConfigContext } from "../../../context/chat-config-context";
import { CSSRenderer } from "./css-renderer";
import { AnimatePresence, motion } from "motion/react";

export default function CSSOutput() {
  const [isCopied, setIsCopied] = useState(false);
  const { config } = useChatConfigContext();

  const code = CSSRenderer(config);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="relative">
      <div
        onClick={copyToClipboard}
        className="cursor-pointer absolute top-3 right-3 p-3 bg-background rounded-sm"
      >
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {isCopied ? <Check size={15} /> : <Copy size={15} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <SyntaxHighlighter
        language="css"
        style={dracula}
        showLineNumbers
        customStyle={{
          borderRadius: "7px",
          padding: "16px",
          maxHeight: "75vh",
          overflowY: "scroll",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
