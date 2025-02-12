import Home from "../../screens/Home/Home";
import Options from "../../screens/Options/Options.js";

export default function Router({ screen, handleLogout }) {
  switch (screen) {
    case "Home":
      return <Home />;
    case "Options":
      return <Options handleLogout={handleLogout} />;
    default:
      return <Home />;
  }
}
