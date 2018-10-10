import UsersRepository from './users-repository.js';
import UsersRenderer from './users-renderer.js';
import EventsHandler from './events-handler.js'; 

let  usersRepository = new UsersRepository();
let  usersRenderer = new  UsersRenderer();
let eventsHandler = new EventsHandler( usersRepository, usersRenderer);

eventsHandler.OnLoad();
eventsHandler.filter();
eventsHandler.registerAddUser();
// eventsHandler.registerRemovePost();
// eventsHandler.registerToggleComments();
// eventsHandler.registerAddComment();
// eventsHandler.registerRemoveComment();
