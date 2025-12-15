import { Routes, Route } from "react-router-dom";
import BetterChatCustom from "./pages/better-chat-custom";
import BetterVar from "./pages/better-var";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BetterChatCustom />} />
      <Route path="/better-var" element={<BetterVar />} />
    </Routes>
  );
}

export default App;
