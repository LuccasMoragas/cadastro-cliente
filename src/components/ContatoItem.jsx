import React, { useState } from "react";

export default function ContatoItem({
  contato,
  onDeletaContato,
  onAtualizaContatoNome,
}) {
  const [nomeAtualizado, setNomeAtualizado] = useState("");
  return (
    <div className="py-4">
      <div>
        <p> Nome: {contato.nome}</p>
        <p> Email: {contato.email}</p>
        <p> Telefone: {contato.telefone}</p>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          onClick={() => onDeletaContato(contato.id)}
        >
          Deletar Contato
        </button>

        <input
          placeholder="Novo Nome"
          className=" focus:shadow-outline rounded border-2 border-gray-400 px-3 py-1.5 focus:outline-none"
          onChange={(e) => setNomeAtualizado(e.target.value)}
        />

        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          onClick={() => onAtualizaContatoNome(nomeAtualizado)}
        >
          Atualizar
        </button>
      </div>
    </div>
  );
}
