"use client"; //Client component - serve para rodar o código no lado do navegador.//
import { useState } from "react"; //(useState) - Funciona como uma caixinha de memória, guarda um valor enqnto você usa a página.//

type Tarefa = {  //type Tarefa - serve para descrever o tipo de dado que cada tarefa deve ter.//
  id: number; // id: number - serve para identificar cada tarefa de forma única.//
  texto: string; // texto: string - serve para guardar o conteúdo da tarefa, uma palavra ou uma frase.//
  concluida: boolean; // concluido: boolean - serve para indicar se a tarefa foi concluída ou não, usando true ou false.//
};

export default function Home() { //export default - significa que essa função é a principal do arquivo.//
  const [texto, setTexto] = useState(""); //texto - valor guardado, setTexto - função para atualizar o valor, "" - começamos com um texto vazio.//
  const [tarefas, setTarefas] = useState<Tarefa[]>([]); //Ele guarda a lista de tarefas. Começa vazia [] e quando add uma tarefa, o setTarefas atualiza a lista.//

  function adicionarTarefa() { // Uma função é um conjunto de instrunções que executamos quando precisamos realizar uma ação.//
    if (texto.trim() === "") { // trim() - remove espaços no começo e no final do texto.//
      return; // Se a pessoa digitar somente espaços, a função return encerra a execução e não adiciona nada.//
    }


    const novaTarefa: Tarefa = { // const - cria uma variável que não pode ser alterada depois, Tarefa - é o objeto que guarda as informações da nova tarefa.//
      id: Date.now(), // id: Date.now() - fornece um número baseado no horário atual, usado aqui como identificador.//
      texto: texto, // texto: pega o valor que a pessoa digitou e guarda na novaTarefa.//
      concluida: false // indica que a tarefa ainda não foi concluída.//
    }

    setTarefas([...tarefas, novaTarefa]); // setTarefas - cria uma nova lista com as tarefas antigas e acrescenta a nova.//
    //Os três pontos (...) - são chamados de spread sintax: pegam todos os elementos da lista antiga e adicionam na nova lista junto com a nova tarefa.//
    setTexto(""); // limpa o campo de texto para que possa digitar outra tarefa.//

  }

  function concluirTarefa(id: number) {
    setTarefas(
      tarefas.map((tarefa) => //O map() - percorre a lista e cria um elemento visual para cada tarefa. Se houver 33 tarefas, serão exibidos 3 itens. //
        tarefa.id === id
          ? {...tarefa, concluida: !tarefa.concluida}
          : tarefa
      )
    );
  }

  function excluirTarefa(id: number) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  // O filter() - cria uma nova lista contendo apenas os itens que passam por uma condição.//
  // Aqui, mantemos as tarefas cujo identificar é diferente (!==) do identificador que queremos excluir.//
  // Assim, a tarefa escolhida desaparece da lista.//
  }

    return(
    <main className="min-h-screen bg-gray-100 px-4 py-10 text-gray-800">
      <section className="mx-auto max-w-x1 rounded-x1 bg-white p-6 shadow-md">
        <h1 className="mb-2 text-3x1 font-bold">
          Minha Lista de Tarefas
        </h1>

        <p className="mb-6 text-gray-600">
          Organize suas atividades do dia
        </p>

        <form className="mb-6 flex gap-2" 
          onSubmit={(e) => { // faz o formulário funcionar, onSubmit - significa "quando o formulário for enviado, execute estas instuções".//
            //(e) => {...} - uma função executada quando o formulário é enviado. O (e) - é o evento que representa a ação que aconteceu.//
            e.preventDefault(); // um formulário HTML pode recarregar quando é enviado. Essa instrução impede esse comportamento padrão.//
            adicionarTarefa(); // chama a função adicionarTarefa(), verifica se o campo está vazio e cria uma nova tarefa atualizando a lista.//
          }}
        >
          <input 
          type="text"
          placeholder="Digite uma tarefa"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border-gray-300 px-3 py-2 outline-none focus:border-blue-500"/>

          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Adicionar
          </button>
        </form>

        <ul className="space-y-3">
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className="flex items-center gap-3 rounded-lg border-gray-200 p-3">
              <input type="checkbox"
                checked={tarefa.concluida}
                onChange={() => concluirTarefa(tarefa.id)}
                arial-label={`Concluir ${tarefa.texto}`} 
              />
              <span className={`min-w-0 flex-1 break-words ${tarefa.concluida ? "text-gray-400 line-through" : ""}`}>
                {tarefa.texto}
              </span>

              <button type="button"
                onClick={() => excluirTarefa(tarefa.id)}
                className="text-sm font-medium text-red-600 houver:text-red-800"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
        
        <p>
          {tarefas.filter((tarefa) => !tarefa.concluida).length} de {" "}
          {tarefas.length} tarefas concluídas
        </p>
      </section>
    </main>
  );
}