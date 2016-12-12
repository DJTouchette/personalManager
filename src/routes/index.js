	import TodoRoutes from './Todo.js';
  import UserRoutes from './User.js';
  import TodoEventRoutes from './TodoEvent.js';
  import { Router } from 'express';
  import RouteProtector from './ProtectedRoute';

  export default function testRoute(app, port) {
    const protectedRoutes = Router().use(RouteProtector);
    app.get('/', (req, res) => {
      res.send('Hello! The API is at http://localhost:' + port + ' /api/v1');
    });
    app.use('/api', protectedRoutes)
    
    const todoRoutes = new TodoRoutes().initiate(app);
    const userRoutes = new UserRoutes().initiate(app);
    const todoEventRoutes = new TodoEventRoutes().initiate(app);
  }