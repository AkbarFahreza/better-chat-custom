import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useChatConfig } from "../../../context/chat-config-context";
import { CSSRenderer } from "./css-renderer";

export default function CSSOutput() {
  const [isCopied, setIsCopied] = useState(false);
  const { config } = useChatConfig();

  const code = CSSRenderer(config);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="relative">
      <Copy
        size={34}
        onClick={copyToClipboard}
        className="cursor-pointer absolute top-3 right-3 px-2 bg-background rounded-sm"
      />

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
