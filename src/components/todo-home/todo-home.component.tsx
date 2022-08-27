import { FormEvent } from "react";
import FormInput from "../form-input/form-input.component";

const TodoHome = () => {

    const addItemHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    }

    return (
        <div>
            <h1>Todolist</h1>
            <h2>Add an Item:</h2>
            <form onSubmit={addItemHandler}>
            <FormInput 
                    label="new Todo"
                    type="text" 
                    required 
                    // onChange={null} 
                    name="todo" 
                    // value={}
                />
                <button>Add</button>
            </form>
        </div>
    )
}

export default TodoHome;