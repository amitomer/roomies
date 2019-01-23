class UsersRenderer {
    constructor() {
        this.$users = $(".results");
        this.$matches = $(".matchesRes");
        this.$usersTemplate = $('#users-template').html();
        this.$offersTemplate = $('#offers-template').html();
        this.$roomiesTemplate = $('#roomies-template').html();
        this.$requestTemplate = $('#request-template').html();
        this.$messageTemplate = $('#message-template').html();
       
    }

    renderUsers(users) {
        this.$users.empty();
        let template = Handlebars.compile(this.$usersTemplate);
        let newHTML = template({ users });
        this.$users.append(newHTML);
        let slideIndex = 1;
        let x = $(".mySlides");
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex - 1].style.display = "block";
    }
    renderMatches(matches, type) {
        let template;
        let newHTML;
        this.$matches.empty();
        if (matches.length == 0) {
            template = Handlebars.compile(this.$messageTemplate);
            newHTML = template({ type:type });
        }
        else {
            switch (type) {
                case "matches":
                    template = Handlebars.compile(this.$offersTemplate);
                    break;
                case "roomies":
                    template = Handlebars.compile(this.$roomiesTemplate);
                    break;
                case "requests":
                    template = Handlebars.compile(this.$requestTemplate);
            }
            newHTML = template({ matches });
        }
        this.$matches.append(newHTML);
    }

}
export default UsersRenderer