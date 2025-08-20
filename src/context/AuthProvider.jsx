import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const authInfo = { name: "John doe" };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
