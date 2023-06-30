import { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

export default function Contato() {
  const [listaContatos, setListaContatos] = useState([]);
  const colecaoContatosRef = collection(db, "contatos");

  useEffect(() => {
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

    getListaContatos();
  }, []);

  return (
    <div className="Contato">
      <Header />

      <div>
        {listaContatos.map((contato) => (
          <div>
            <h1> Nome: {contato.nome}</h1>
            <span> Email: {contato.email}</span>
            <span> Telefone: {contato.telefone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
