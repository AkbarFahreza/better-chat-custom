// App.tsx
import ConfigSection from "./lib/components/config-section";
import CreditButton from "./lib/ui/credits-button";
import { ChatConfigProvider } from "./lib/context/chat-config-context";
import ResizablePanels from "./lib/components/resizable-panel";
import PreviewChat from "./lib/components/preview-chat";
import { GoogleFontsProvider } from "./lib/context/google-fonts-context";

function App() {
  const creditsBtn = [
    {
      link: "https://paypal.me/",
      logoSrc: "/paypal-logo.svg",
      imageAlt: "PayPal logo",
    },
    {
      link: "https://www.x.com/revernry",
      logoSrc: "/x-logo.svg",
      imageAlt: "X logo",
    },
  ];
  return (
    <GoogleFontsProvider>
      <ChatConfigProvider>
        <div className="flex flex-col 2xl:flex-row gap-6 p-6 text-base">
          <ResizablePanels>
            <div id="config-panel" className="flex flex-col gap-6 w-full">
              <div className="flex flex-row justify-between w-full">
                <div>
                  <h1
                    id="title"
                    className="text-4xl items-center flex font-bold"
                  >
                    Better Chat Custom{" "}
                    <span className="text-sm py-1 ml-4 px-4 text-yellow-300 rounded-3xl bg-secondary font-sans">
                      Dev 0.0.1
                    </span>
                  </h1>
                  <p>Create your own Youtube Custom CSS chat with no code</p>
                </div>
                <div className="flex flex-row items-center">
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
              <ConfigSection />
            </div>
            <PreviewChat />
          </ResizablePanels>
        </div>
      </ChatConfigProvider>
    </GoogleFontsProvider>
  );
}
export default App;
