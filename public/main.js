import UsersRepository from './users-repository.js';
import UsersRenderer from './users-renderer.js';
import EventsHandler from './events-handler.js'; 



let  usersRepository = new UsersRepository();
let  usersRenderer = new  UsersRenderer();
let eventsHandler = new EventsHandler( usersRepository, usersRenderer);


// ()=>{
//     $('.button-collapse').on('click', (event) => {
//       $('.button-collapse').sideNav('show');
//     })
// }

if (top.location.pathname === '/matches.html')
{
    eventsHandler.OnLoadmatches()
}
if(top.location.pathname === '/search.html'){
    eventsHandler.OnLoadSearch();
}
eventsHandler.OnLoad();
eventsHandler.registerAddUser();
eventsHandler.checksignin();
eventsHandler.filter();
eventsHandler.LikeUser();
eventsHandler.dislikeUser()
eventsHandler.Requests();
eventsHandler.Roomies();
eventsHandler.offers()
eventsHandler.AddRoomie();
eventsHandler.RejectRoomie()
eventsHandler.Logout()


$(document).ready(function () {
    $('.sidenav').sidenav();
    $('select').formSelect();
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.board .nav-tabs a.active');
        $active.parent().next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {
        var $active = $('.board .nav-tabs a.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).parent().next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).parent().prev().find('a[data-toggle="tab"]').click();
}