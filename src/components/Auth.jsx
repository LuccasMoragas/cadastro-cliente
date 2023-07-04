import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [loginError, setLoginError] = useState(""); // Novo estado para o erro de login
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  console.log(auth?.currentUser?.email);

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
      setSenhaError("Por favor, insira uma senha válida.");
      hasError = true;
    }

    if (!hasError) {
      try {
        console.log("email= " + email);
        await signInWithEmailAndPassword(auth, email, senha);
        navigate("/Contato");
      } catch (err) {
        console.error(err);
        setLoginError("Email ou senha incorretos."); // Define a mensagem de erro de login
      }
    }
  };

  const resetPassword = async () => {
    if (!email || !validateEmail(email)) {
      setEmailError("Por favor, insira um email válido.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        "Um email para redefinição de senha foi enviado para o seu endereço de email."
      );
    } catch (err) {
      console.error(err);
      setLoginError(
        "Ocorreu um erro ao enviar o email de redefinição de senha."
      );
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Redireciona para a página de contato se o usuário já estiver logado
    if (user) {
      navigate("/Contato");
    }

    return () => unsubscribe(); // Limpa a assinatura quando o componente desmontar
  }, [user, navigate]);

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
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={login}
          >
            Login
          </button>
          <button
            className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={resetPassword}
          >
            Esqueci minha senha
          </button>
          <Link to={"/Cadastro"}>
            <button className="focus:shadow-outline w-full rounded px-4 py-2 font-bold text-blue-500 hover:text-blue-700 focus:outline-none">
              Cadastre-se
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
