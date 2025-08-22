import { useContext, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Signup = () => {
  // Use auth context
  const { signupUser } = useContext(AuthContext);

  // State to manage the password input value
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // State for the email input
  const [email, setEmail] = useState("");

  // State to store and display the error message
  const [errorMessage, setErrorMessage] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'<,>.?/~`|\\-]).{6,}$/;

  const getPasswordStrength = (password) => {
    let score = 0;
    // Add points for length
    if (password.length >= 6) score += 1;
    // Add points for each character type found
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*()_+{}[\]:;"'<,>.?/~`|\\-]/.test(password)) score += 1;
    return score;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = getPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const getStrengthBarClasses = () => {
    // Return transparent bar if password is empty
    if (password.length === 0) {
      return "w-0";
    }
    // Weak: Red, width 1/3
    if (passwordStrength <= 2) {
      return "w-1/3 bg-red-500";
    }
    // Medium: Orange, width 2/3
    if (passwordStrength <= 4) {
      return "w-2/3 bg-orange-500";
    }
    // Strong: Green, full width
    return "w-full bg-green-500";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Sign up login
    signupUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        setEmail("");
        setPassword("");
        setPasswordStrength("");
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
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up Here!</h2>

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
                onChange={handlePasswordChange}
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

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getStrengthBarClasses()}`}
                ></div>
              </div>
              {/* Textual feedback on password strength */}

              <div className="text-sm mt-1 font-semibold">
                {passwordStrength <= 2 && (
                  <span className="text-red-500">Weak</span>
                )}
                {passwordStrength > 2 && passwordStrength <= 4 && (
                  <span className="text-orange-500">Medium</span>
                )}
                {passwordStrength > 4 && (
                  <span className="text-green-500">Strong</span>
                )}
              </div>
            </div>
          )}
          {/* Error Message Display */}
          {errorMessage && (
            <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
          )}

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
          Already have an account?{" "}
          <NavLink to="/signin" className="hover:underline text-gray-900">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
