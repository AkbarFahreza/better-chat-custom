import React from "react";
import SupportsButton from "../lib/ui/supports-button";
import CreditButton from "../lib/ui/credits-button";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

function BetterVar() {
  const creditsBtn = [
    {
      link: "https://instagram.com/dekreeza",
      logoSrc: "/instagram-logo.svg",
      imageAlt: "Instagram dekreza",
    },
    {
      link: "https://www.x.com/revernry",
      logoSrc: "/x-logo.svg",
      imageAlt: "X dekreza",
    },
  ];
  return (
    <div className="flex flex-row  gap-6 p-6 text-base">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col 2xl:flex-row justify-between w-full">
          <div>
            <h1 id="title" className="text-4xl items-center flex font-bold">
              Better Var Maker{" "}
              <span className="text-sm py-1 ml-4 px-4 text-yellow-300 rounded-3xl bg-secondary font-sans">
                Dev 0.0.1
              </span>
            </h1>
            <p>
              Easly make Variable CSS for your Youtube Custom Chat CSS Wiget
            </p>
          </div>
          <div className="flex flex-row gap-3 items-center z-50">
            <SupportsButton />
            {creditsBtn.map((btn, index) => (
              <CreditButton
                key={index}
                link={btn.link}
                logoSrc={btn.logoSrc}
                imageAlt={btn.imageAlt}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col border 2xl:flex-row gap-6">
          <div className="w-6/12">
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
              lhaa
            </SyntaxHighlighter>
          </div>
          <div className="w-6/12">
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
              lhaa
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetterVar;
