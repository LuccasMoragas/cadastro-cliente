import { useEffect, useState } from "react";
import Header from "../components/Header";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import ContatoItem from "../components/ContatoItem";

export default function Contato() {
  const [listaContatos, setListaContatos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const colecaoContatosRef = collection(db, "contatos");

  // Estado dos Contatos
  const [newContatoNome, setNewContatoNome] = useState("");
  const [newContatoEmail, setNewContatoEmail] = useState("");
  const [newContatoTelefone, setNewContatoTelefone] = useState("");

  // Verificar se o usuário está logado
  const [user, setUser] = useState({});

  const getListaContatos = async () => {
    try {
      const data = await getDocs(colecaoContatosRef);

      const filteredData = data.docs
        .filter((doc) => doc.data().userId === auth?.currentUser?.uid)
        .map((doc) => ({ ...doc.data(), id: doc.id }));

      if (filtro) {
        const filteredContatos = filteredData.filter((contato) => {
          const { nome, email, telefone } = contato;
          const telefoneString = telefone ? telefone.toString() : ""; // Trata o caso em que o telefone é null
          return (
            nome.toLowerCase().includes(filtro.toLowerCase()) ||
            email.toLowerCase().includes(filtro.toLowerCase()) ||
            telefoneString.includes(filtro)
          );
        });
        setListaContatos(filteredContatos);
      } else {
        setListaContatos(filteredData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getListaContatos();

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    getListaContatos();
  }, [filtro]);

  const salvarContato = async () => {
    if (
      newContatoNome.length === 0 &&
      newContatoEmail.length === 0 &&
      newContatoTelefone === ""
    ) {
      return alert("Preencha o nome, email ou telefone do contato");
    }
    if (
      newContatoNome.length > 0 &&
      newContatoEmail.length === 0 &&
      newContatoTelefone === ""
    ) {
      return alert("Preencha o email ou telefone do contato");
    }
    if (
      newContatoNome.length === 0 &&
      newContatoEmail.length > 0 &&
      newContatoTelefone === ""
    ) {
      return alert("Preencha o nome ou telefone do contato");
    }
    if (
      newContatoNome.length === 0 &&
      newContatoEmail.length === 0 &&
      newContatoTelefone !== ""
    ) {
      return alert("Preencha o nome ou email do contato");
    }
    try {
      await addDoc(colecaoContatosRef, {
        nome: newContatoNome,
        email: newContatoEmail,
        telefone: newContatoTelefone || null, // Define como null quando nenhum telefone é inserido
        userId: auth?.currentUser?.uid,
      });
      getListaContatos();
    } catch (err) {
      console.error(err);
    }
  };

  const deletarContato = async (id) => {
    const contatoDoc = doc(db, "contatos", id);
    await deleteDoc(contatoDoc);
    getListaContatos();
  };

  const atualizarContato = async (id, novosDados) => {
    const contatoDoc = doc(db, "contatos", id);

    if (!novosDados.nome && !novosDados.email && !novosDados.telefone)
      return alert("Insira um Nome, Email ou Telefone");

    if (!novosDados.nome && !novosDados.email)
      return alert("Insira um Nome ou Email");

    if (!novosDados.nome && novosDados.email && !novosDados.telefone)
      return alert("Insira um Nome ou Telefone");

    if (novosDados.nome && !novosDados.email && !novosDados.telefone)
      return alert("Insira um Email ou Telefone");

    if (!contatoDoc) return;

    await updateDoc(contatoDoc, novosDados);
    getListaContatos();
  };

  function prevent(event) {
    event.preventDefault();
    salvarContato();
  }

  return (
    <div className="Contato">
      <Header />
      <h2 className="">Usuário:</h2>
      {user?.email}
      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={prevent}
          className="mb-4 w-full max-w-xs rounded-2xl bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <div className="mb-4">
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Nome"
              onChange={(e) => setNewContatoNome(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Email"
              onChange={(e) => setNewContatoEmail(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Telefone"
              type="number"
              onChange={(e) => setNewContatoTelefone(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-evenly">
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Salvar Contato
            </button>
          </div>
        </form>
        <div className="mb-4">
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Pesquisar contato"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 gap-6">
          {listaContatos.map((contato) => (
            <ContatoItem
              key={contato.id}
              contato={contato}
              onDeletaContato={(contatoID) => deletarContato(contatoID)}
              onAtualizaContato={(novosDados) =>
                atualizarContato(contato.id, novosDados)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
