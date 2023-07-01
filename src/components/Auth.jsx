import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState(false); // Novo estado para o erro de email
  const [senhaError, setSenhaError] = useState(false); // Novo estado para o erro de senha
  const navigate = useNavigate();

  console.log(auth?.currentUser?.email);

  const login = async () => {
    setEmailError(!email); // Se email for vazio, emailError será true
    setSenhaError(!senha); // Se senha for vazio, senhaError será true

    if (email && senha) {
      // Só prossegue se email e senha não forem vazios
      try {
        console.log("email= " + email);
        await createUserWithEmailAndPassword(auth, email, senha);
        navigate("/Contato");
      } catch (err) {
        console.error(err);
      }
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
          {emailError && (
            <p style={{ color: "red" }}>Por favor, insira um email.</p>
          )}
        </div>
        <div className="mb-6">
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Senha"
            type="password"
            onChange={(e) => setSenha(e.target.value)}
          />
          {senhaError && (
            <p style={{ color: "red" }}>Por favor, insira uma senha.</p>
          )}
        </div>
        <div className="flex items-center justify-evenly">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={login}
          >
            Login
          </button>

          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={login}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};
