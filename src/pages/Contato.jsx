import { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Contato() {
  const [listaContatos, setListaContatos] = useState([]);
  const colecaoContatosRef = collection(db, "contatos");

  //Estado dos Contatos
  const [newContatoNome, setNewContatoNome] = useState("");
  const [newContatoEmail, setNewContatoEmail] = useState("");
  const [newContatoTelefone, setNewContatoTelefone] = useState(0);

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

  return (
    <div className="Contato">
      <Header />
      <div>
        <input
          placeholder="Nome"
          onChange={(e) => setNewContatoNome(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setNewContatoEmail(e.target.value)}
        />
        <input
          placeholder="Telefone"
          type="number"
          onChange={(e) => setNewContatoTelefone(Number(e.target.value))}
        />
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          onClick={salvarContato}
        >
          Salvar Contato
        </button>
      </div>
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
          </div>
        ))}
      </div>
    </div>
  );
}
