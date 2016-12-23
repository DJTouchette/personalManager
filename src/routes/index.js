	import TodoRoutes from './Todo.js';
  import UserRoutes from './User.js';
  import TodoEventRoutes from './TodoEvent.js';
  import { Router } from 'express';
  import RouteProtector from './ProtectedRoute';

  const allRoutes = [TodoRoutes, UserRoutes, TodoEventRoutes];

  export default function testRoute(app, port) {
    const protectedRoutes = Router().use(RouteProtector);
    
    app.get('/', (req, res) => {
      res.send('Hello! The API is at http://localhost:' + port + ' /api/v1');
    });

    app.use('/api', protectedRoutes)

    for (let i = 0; i < allRoutes.length; i ++) {
      new allRoutes[i]().initiate(app);
    }
  }