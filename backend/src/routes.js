const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); /** Validação */

const  OngController = require ('./controllers/OngController'); 
const  IncidentController = require ('./controllers/IncidentController');
const  ProfileController = require ('./controllers/ProfileController');
const  SessionController = require ('./controllers/SessionController');

// const ValidationPostSession = require ('./validators/ValidationPostSession');
//const ValidationPostOngs
//const ValidationGetProfile
//const ValidationGetIncidents
//const ValidationPostIncidents
//const ValidationDeleteIncidents


const routes = express.Router();

/**ROTA E VALIDAÇÃO CRIAR SESSÃO */
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required().length(8),
    })
}), SessionController.create);

/**ROTA E VALIDAÇÃO DADOS CRIAÇÃO ONGS */
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    /**Validação dos requests de body params */
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

/**ROTA E VALIDAÇÃO PROFILES */
routes.get('/profile', celebrate({
    /**Validação de route params para identificar os recursos */
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

/** ROTAS E VALIDAÇÕES DOS CASOS/INCIDENTS */
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().min(2),
    }),
}), IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

module.exports = routes;

/**
 * Rota / Recurso
 */

/** Métodos HTTP:
 * 
 * GET : Buscar/listar uma info do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end 
 * DELETE: Deletar uma informação no back-end
 * 
 * PATCH: ?
 * OPTION: ?
 * HEAD: ?
 * 
 */

 /** 
  * Tipos de parâmetros (params):
  * 
  * Query params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
  * Route params: Parâmetros utilizados para identificar recursos
  * Request body: Corpo da requisição utilizado para criar ou alterar os recursos 
  *  
  */

  /**
   * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
   * NoSQL: MongoDB, CouchDB, etc etc
   * 
   * Driver: SELECT * FROM users
   * Query Builder: table('users').select('*').where()
   * 
   */