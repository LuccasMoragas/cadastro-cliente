import { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Contato() {
  const [listaContatos, setListaContatos] = useState([]);
  const colecaoContatosRef = collection(db, "contatos");

  //Estado dos Contatos
  const [newContatoNome, setNewContatoNome] = useState("");
  const [newContatoEmail, setNewContatoEmail] = useState("");
  const [newContatoTelefone, setNewContatoTelefone] = useState(0);

  const [nomeAtualizado, setNomeAtualizado] = useState("");

  const getListaContatos = async () => {
    try {
      const data = await getDocs(colecaoContatosRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setListaContatos(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getListaContatos();
  }, []);

  const salvarContato = async () => {
    try {
      await addDoc(colecaoContatosRef, {
        nome: newContatoNome,
        email: newContatoEmail,
        telefone: newContatoTelefone,
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

  const atualizarContatoNome = async (id) => {
    const contatoDoc = doc(db, "contatos", id);
    await updateDoc(contatoDoc, { nome: nomeAtualizado });
    getListaContatos();
  };

  function prevent(event) {
    event.preventDefault();
  }

  return (
    <div className="Contato">
      <Header />
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
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              onClick={salvarContato}
            >
              Salvar Contato
            </button>
          </div>
        </form>
        <div>
          {listaContatos.map((contato) => (
            <div key={contato.id}>
              <p> Nome: {contato.nome}</p>
              <p> Email: {contato.email}</p>
              <p> Telefone: {contato.telefone}</p>
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onClick={() => deletarContato(contato.id)}
              >
                Deletar Contato
              </button>

              <input
                placeholder="Novo Nome"
                onChange={(e) => setNomeAtualizado(e.target.value)}
              />
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                onClick={() => atualizarContatoNome(contato.id)}
              >
                Atualizar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
