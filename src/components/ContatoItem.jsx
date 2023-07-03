import React, { useState } from "react";

export default function ContatoItem({
  contato,
  onDeletaContato,
  onAtualizaContato,
}) {
  const [exibeModal, setExibeModal] = useState(false);

  const [novosDados, setNovosDados] = useState({ ...contato });

  function handleSubmit(e) {
    e.preventDefault();
    onAtualizaContato(novosDados);
    setExibeModal(false);
  }

  return (
    <div className="rounded-md border-[1px] border-gray-300 p-4 shadow-md">
      <div>
        <p>Nome: {contato.nome}</p>
        <p>Email: {contato.email}</p>
        <p>Telefone: {contato.telefone}</p>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          onClick={() => onDeletaContato(contato.id)}
        >
          Deletar Contato
        </button>
        <button
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          onClick={() => setExibeModal(true)}
        >
          Atualizar
        </button>
      </div>

      {exibeModal && (
        <div
          className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 text-gray-600"
          onClick={() => setExibeModal(false)}
        >
          <div className="flex min-h-full items-center justify-center p-6 text-center sm:items-center sm:py-8">
            <div
              className="relative z-10 w-full overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl sm:max-w-lg sm:rounded-b-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="" className="mb-1.5 block font-medium">
                    Novo Nome
                  </label>
                  <input
                    className="focus:shadow-outline block w-full rounded border-2 border-gray-400 px-3 py-1.5 focus:outline-none"
                    value={novosDados.nome}
                    onChange={(e) =>
                      setNovosDados((dados) => ({
                        ...dados,
                        nome: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label htmlFor="" className="mb-1.5 block font-medium">
                    Novo E-mail
                  </label>
                  <input
                    type="email"
                    className="focus:shadow-outline block w-full rounded border-2 border-gray-400 px-3 py-1.5 focus:outline-none"
                    value={novosDados.email}
                    onChange={(e) =>
                      setNovosDados((dados) => ({
                        ...dados,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label htmlFor="" className="mb-1.5 block font-medium">
                    Novo Telefone
                  </label>
                  <input
                    type="number"
                    className="focus:shadow-outline block w-full rounded border-2 border-gray-400 px-3 py-1.5 focus:outline-none"
                    value={novosDados.telefone}
                    onChange={(e) =>
                      setNovosDados((dados) => ({
                        ...dados,
                        telefone: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <button
                    className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                    type="submit"
                  >
                    Atualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
