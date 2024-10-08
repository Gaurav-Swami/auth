import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Pop } from "./assets/Pop";
import { signIn } from "./features/auth/authSlice";
import { useSelector } from "react-redux";
import { ProtectedRoute, RedirectIfAuthenticated } from "./ProtectedRoute";
import Blog from "./pages/Blog";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";
import TextEditor from "./components/TextEditor";
import ShowBlogs from "./pages/ShowBlogs";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import DelPopup from "./components/DelPopup";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (token && user) {
      dispatch(signIn({ user, token }));
    }
  }, [dispatch]);

  return (
    <div className={`${isDarkMode ? "dark" : ""}  h-full `}>
      <div className="dark:bg-black bg-white flex flex-col  ">
        <Pop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<ShowBlogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/aboutus" element={<DelPopup />} />
          <Route path="/texteditor" element={<TextEditor />} />
          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/blogs/create" element={<CreateBlog />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
