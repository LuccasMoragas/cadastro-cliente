import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  console.log(auth?.currentUser?.email);

  const login = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  function prevent(event) {
    event.preventDefault();
  }

  return (
    <div className="flex h-screen items-start justify-center">
      <form
        onSubmit={prevent}
        className="mb-4 w-full max-w-xs rounded-2xl bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Senha"
            type="password"
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-evenly">
          <Link to={"/Contato"}>
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              onClick={login}
            >
              Login
            </button>
          </Link>
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};
