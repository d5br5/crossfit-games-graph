import GoogleSignIn from "@/src/layouts/header/GoogleSignIn";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2>WOD PARK</h2>
      <GoogleSignIn />
    </div>
  );
};

export default LoginPage;
