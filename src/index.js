const express = require('express');
// tá importando só uma função da biblioteca.
// Botou primeiro a chave vazia, completou a linha e depois voltou na chave pra selecionar a função
const { uuid, isUuid } = require('uuidv4');
const { request, response } = require('express');
const app = express();

app.use(express.json()); //quando quer adicionar um tipo de função que todas as rotas vão ter que passar por elas
                        //Tem que vir antes das rotas, no express, no node, as coisas funcionam de maneira LINEAR

const projects = []; //array p/ guardar os dados (pq ainda não entramos em BD)

function logRequests(request, response, next){ //MIDDLEWARE
    const { method, url } = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;
    
    console.time(logLabel); //primeiro executa essa
    //return next();
    
    //depois essa
    next(); //tirou o return pq senão ele vai parar o código por aqui
    
    // e só depois vai passar por aqui
    console.timeEnd(logLabel);
}

function validateProjectId(request, response, next){
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json({ error: 'Invalid project ID.' });
    }

    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId); //vai aplicar o middleware apenas nas rodar que forem desse jeito

//Essa rota aqui vai listar todos os projetos
//app.get('/projects', logRequests, (request, response) => {//aplicou o middleware ali
app.get('/projects', (request, response) => {
    const {title} = request.query;

    const results = title
    //isso aqui é dentro do array projects chama o método filter
    //filter: for each project in projects, if project.title = title) results.add(project)
    ? projects.filter(project => project.title.includes(title))
    : projects // else results projects


    return response.json(results);
});


app.post('/projects', (request, response) => { 
    const {title, owner} = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);
    
    return response.json(project);   
});

//app.put('/projects/:id', validateProjectId, (request, response) => { //aqui aplicou o middleware
app.put('/projects/:id', (request, response) => {
    const {title, owner} = request.body;
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0){
        return response.status(400).json({error: 'Project not found'});        
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return response.json(projects[projectIndex]);
});

//app.delete('/projects/:id', validateProjectId, (request, response) => { //aqui aplicou o middleware
app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0){
        return response.status(400).json({error: 'Project not found'});        
    }

    projects.splice(projectIndex, 1) 

    return response.status(204).send(); //quando é uma resposta vazia -> 204
});

app.listen(3333, () => {
    console.log('🎿 Back-end started!'); //mensagem toda vez que o server é iniciado
});