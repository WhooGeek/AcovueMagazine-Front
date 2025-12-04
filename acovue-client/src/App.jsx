import { RouterProvider } from "react-router-dom";
import router from "./router";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
