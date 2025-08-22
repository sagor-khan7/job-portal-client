import { useContext, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Signin = () => {
  // Use auth context
  const { signinUser } = useContext(AuthContext);

  // State to manage the password input value
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // State for the email input
  const [email, setEmail] = useState("");

  // State to store and display the error message
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Signin user
    signinUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorMessage = error.code;
        setErrorMessage(errorMessage.split("/")[1]);
      });
  };

  return (
    <div className="mt-20 flex items-center font-exo justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-md border p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">Sign In Here!</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xl font-medium mb-1">Email*</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-500 text-lg" />
              <input
                type="email"
                name="email"
                placeholder="info@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xl font-medium mb-1">Password*</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-500 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-black text-xl"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
          )}

          {/* Forgot Password */}
          <div>
            <NavLink to="/forgot-password" className="hover:underline">
              Forget Password?
            </NavLink>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="relative w-full px-4 cursor-pointer py-2 flex justify-center items-center gap-2 text-lg border border-black overflow-hidden group bg-black text-white"
          >
            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
              Sign Up
            </span>
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out"></span>
          </button>
        </form>

        {/* Sign In link */}
        <p className="text-lg text-center mt-6">
          Don't have an account?{" "}
          <NavLink to="/signup" className="hover:underline text-gray-900">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signin;
