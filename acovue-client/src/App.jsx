import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AppRouter from "./Approuter.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";



function App() {
  return (
    <BrowserRouter>  {/* <-- 반드시 이 안에 Header와 Routes를 넣어야 함 */}
      <AuthProvider>
        <Header />

        <main className="body">
          <div className="body-container">
            <AppRouter />
          </div>
        </main>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
