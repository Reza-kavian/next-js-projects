////zare_nk_041011_okk
"use client"; 
import { memo } from 'react'

interface TodosProps {
  todos: string[];
  addTodo: () => void;
}

const Todos = ({ todos, addTodo }: TodosProps) => {  //1 zare_nk_040424_nokteh(in khatte 1 dorosteh chon kollan ye parametre props darim ke dar inja shamele do ozve todos, addTodo hast)
// const Todos = ( todos: string[], addTodo: () => void  ) => {  //2 zare_nk_040424_nokteh(in khatte 2 eshtebahe chon do parametere voroodi dare ne yek props va barnameh oono be onvane tabee mamooli dar nazar migire na componene reacti va age dar componente digeei oono be soorate ye component seda bezanim errore(yani in errore: <Todos todos={todos} addTodo={addTodo} />))
    console.log("child render");
    return (
      <>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>add todo</button>
      </>
    );
  };
  
  export default memo(Todos);