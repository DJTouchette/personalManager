	import TodoRoutes from './Todo.js';
  import UserRoutes from './User.js';
  import TodoEventRoutes from './TodoEvent.js';

  export default function testRoute(app, port) {
    app.get('/', (req, res) => {
      res.send('Hello! The API is at http://localhost:' + port + ' /api/v1');
    });

    const todoRoutes = new TodoRoutes().initiate(app);
    const userRoutes = new UserRoutes().initiate(app);
    const todoEventRoutes = new TodoEventRoutes().initiate(app);
  }