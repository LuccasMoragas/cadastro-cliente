import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [loginError, setLoginError] = useState(""); // Novo estado para o erro de login
  const navigate = useNavigate();

  const login = async () => {
    setEmailError("");
    setSenhaError("");
    setLoginError("");

    let hasError = false;

    if (!email || !validateEmail(email)) {
      setEmailError("Por favor, insira um email válido.");
      hasError = true;
    }

    if (!senha || senha.length < 6) {
      setSenhaError(
        "Por favor, insira uma senha válida com no mínimo 6 caracteres."
      );
      hasError = true;
    }

    if (!hasError) {
      try {
        await signInWithEmailAndPassword(auth, email, senha);
        navigate("/Contato");
      } catch (err) {
        console.error(err);
        setLoginError("Email ou senha incorretos."); // Define a mensagem de erro de login
      }
    }
  };

  function prevent(event) {
    event.preventDefault();
  }

  function validateEmail(value) {
    // Regex para validar o formato do email
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(value);
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
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>
        <div className="mb-6">
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Senha"
            type="password"
            onChange={(e) => setSenha(e.target.value)}
          />
          {senhaError && <p style={{ color: "red" }}>{senhaError}</p>}
        </div>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}{" "}
        {/* Exibe a mensagem de erro de login */}
        <div className="flex items-center justify-evenly">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={login}
          >
            Login
          </button>
          <Link to={"/Cadastro"}>
            <button className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
              Cadastre-se
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
