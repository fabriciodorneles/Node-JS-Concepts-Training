const express = require('express'); 
const app = express();

app.use(express.json()); //quando quer adicionar um tipo de função que todas as rotas vão ter que passar por elas
                        //Tem que vir antes das rotas, no express, no node, as coisas funcionam de maneira LINEAR

/**
 * Métodos HTTP
 * 
 * GET: Buscar Informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: apagar uma info no back-end
 */

 /**
  * Tipos de Parâmetros
  * 
  * Query Params: Filtros e paginação(ex. só os proj que começam contem react)
  * ?title=React&owner=fabricio( aí a gente decide lá backend o que faz com essa info)
  * Route Param: identificar recursos na hora de atualizar ou deletar
  * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
  * 
  */


app.get('/projects', (request, response) => { //isso é um método http
    const { title, owner } = request.query; // passa para a const query os parametros
    console.log(title, owner);
    return response.json([
        'Projeto 1',
        'Projeto 2',
    ]);   
});


app.post('/projects', (request, response) => { 
    //const body = request.body;
    //console.log(body);
    const {title, owner} = request.body;
    console.log(title, owner);
    
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3',
    ]);   
});

//aqui adiciona um parametro na rota, pq tem que indicar qual projeto vai mudar
app.put('/projects/:id', (request, response) => { 
    
    const params = request.params; //vai aparecer id: '1' pq ele definiu :id ali em cima
    console.log(params);

    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3',
    ]);   
});

//aqui tb adiciona um parametro na rota, pq tem que indicar qual projeto vai deletar
app.delete('/projects/:id', (request, response) => { 
    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3',
    ]);   
});

// app.get('/', (request, response) => { //isso é um método http
//     return response.json({message: 'Hello Dev'});   
// });

app.listen(3333, () => {
    console.log('🎿 Back-end started!'); //mensagem toda vez que o server é iniciado
});