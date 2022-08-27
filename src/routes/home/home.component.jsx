import { Outlet } from 'react-router-dom';
import TodoHome from '../../components/todo-home/todo-home.component';

const Home = () => {
  return (
    <div>
      <TodoHome />
      <Outlet />
    </div>
  );
}

export default Home