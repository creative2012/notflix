import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn, getSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { NextPageContext } from "next";
import PaulMorris from "@/components/PaulMorris";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/profiles",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const router = useRouter();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [noGo, setNoGo] = useState(true);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
        redirect: false,
      }).then((error) => {
        if (error?.error === null) {
          router.push("/profiles");
        } else {
          handleError(error?.error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    setNoGo(true);
    await axios
      .post("api/register", {
        email,
        name,
        password,
      })
      .catch(function (error) {
        if (error.code === "ERR_BAD_REQUEST") {
          let msg = error.response.data.error;
          handleError(msg);
          setNoGo(false);
          return {};
        }
      });
      if(!noGo){
        login();
      }

  }, [email, login, name, noGo, password]);

  const [open, setOpen] = useState(false);
  const [errorMsg, setOErrorMsg] = useState("");

  const handleError = (e: any) => {
    setOErrorMsg(e);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cener bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            width={200}
            height={100}
            alt="logo"
            className="h-12"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: any) => {
                    setname(e.target.value);
                  }}
                  id="name"
                  type="text"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message={errorMsg}
              action={action}
            />
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            {/* <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div> */}
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Hoboflix? "
                : "Already have an account?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <PaulMorris />
    </div>
  );
};

export default Auth;
