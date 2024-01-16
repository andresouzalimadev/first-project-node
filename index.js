const express = require('express');
const app = express();
const uuid = require('uuid');
const port = 3000;
app.use(express.json());


const users = [];

const verifyUserId = (request, response, next) => {
    const { id } = request.params;
    const index = users.findIndex(user => user.id === id);

    if (index < 0) {
        return response.status(404).json({ error: "User not found!"});
    };

    request.userIndex = index;
    request.userId = id;

    next();
}

app.get('/users', (request, response) => {
    return response.json(users);
});

app.post('/users', (request, response) => {
    const { name, age } = request.body;
    const user = { id: uuid.v4(), name, age };
    users.push(user);    
    return response.status(201).json(user);
});                                                  

app.put('/users/:id', verifyUserId, (request, response) => {
    const { name, age } = request.body;
    const id = request.userId;
    const index = request.userIndex;

    const updateUser = { id, name, age };
    
    users[index] = updateUser;
    
    return response.json(updateUser);
});

app.delete('/users/:id', verifyUserId, (request, response) => {
    const index = request.userIndex;

    users.splice(index, 1);
    
    return response.status(204).json();
});


app.listen(port, () => {
    console.log(`🖥🖥🖥 - Server started on port ${port} - 🖥🖥🖥`);
});

// Vamos estudar:

//         GET => BUSCAR informação no back end
//        POST => CRIAR informação no back end
// PUT / PATCH => ALTERAR/ATUALIZAR informação no back end
//      DELETE => APAGAR informação no back end

// MIDDLEWARE => INTERCEPTADOR => tem o poder de parar ou alterar dados da requisição.

// Instalar biblioteca UUID para gerar id único através
// do comando "npm i uuid" no Powershell
// cria-se uma variável no início do código para armazenar
// a biblioteca - const uuid = require('uuid')

// Nessa variável chama-se a função para criar o id
// -> id:uuid.v4()    
// Inserir o status 201 entre response e json