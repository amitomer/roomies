class UsersRenderer {
    constructor() {
        this.$users = $(".results");
        this.$matches = $('.matchesRes');
        this.$usersTemplate = $('#users-template').html();
        this.$matchesTemplate = $('#matches-template').html();
    }

    renderUsers(users) {
        this.$users.empty();
        let template = Handlebars.compile(this.$usersTemplate);
        let newHTML = template({users});
        this.$users.append(newHTML);
    }
    renderMatches( matches){
        this.$matches.empty();
        let template = Handlebars.compile(this.$matchesTemplate);
        let newHTML = template({matches});
        this.$matches.append(newHTML);
    }
}
export default UsersRenderer