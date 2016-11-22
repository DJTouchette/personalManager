	import TodoRoutes from './Todo.js';
  
  export default function testRoute(app, port) {
    app.get('/', (req, res) => {
      res.send('Hello! The API is at http://localhost:' + port + ' /api/v1');
    });

    const todoRoutes = new TodoRoutes().initiate(app);
  }