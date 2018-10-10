class UsersRenderer {
    constructor() {
        this.$users = $(".results");
        this.$usersTemplate = $('#users-template').html();
    }

    renderUsers(users) {
        this.$users.empty();
        let template = Handlebars.compile(this.$usersTemplate);
        let newHTML = template({users});
        this.$users.append(newHTML);
    }
}
export default UsersRenderer