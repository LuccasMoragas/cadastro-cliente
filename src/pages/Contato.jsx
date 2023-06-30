import { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../config/firebase";
import { getDocs } from "firebase/firestore";

export default function Contato() {
  const [listaContatos, setListaContatos] = useState([]);
  const colecaoContatosRef = colecao(db, "contatos");

  useEffect(() => {
    const getListaContatos = async () => {
      try {
        const data = await getDocs(colecaoContatosRef);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    getListaContatos;
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}
