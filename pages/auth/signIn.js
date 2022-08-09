import { useAuthContext } from "../../context/authContext";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignIn() {
  const { LoginWithGoogle, Logout, user } = useAuthContext();

  const router = useRouter();

  async function handleLogin() {
    LoginWithGoogle();
  }

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="h-screen flex max-w-6xl mx-20 items-center  justify-center gap-x-16">
      <img
        className="w-96"
        src="https://pngimg.com/uploads/twitter/twitter_PNG31.png"
        alt="twitter mobile"
      />
      <div>
        <button
          onClick={handleLogin}
          className="bg-sky-500 hover:bg-sky-100 hover:text-black text-white flex items-center px-4 py-2"
        >
          <img
            className="w-12"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt="logo"
          />
          <span className="">Login With Google</span>
        </button>
      </div>
    </div>
  );
}
