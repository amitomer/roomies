class EventsHandler {
    constructor(usersRepository, usersRenderer) {
        this.usersRepository = usersRepository;
        this.usersRenderer = usersRenderer;
    }
    filter() {
        $('.findBtn').on('click', async () => {
            let address = $('.wantedLocation').val()
            let minage = $('minage').val()
            let maxage = $("maxage").val()
            let pets = $('.pets')
            let relevantApts = await this.usersRepository.findRelevantApts(address,  minage,  maxage, pets)
            this.usersRenderer.renderUsers(relevantApts)
        })      
    }

    OnLoad() {
        this.usersRepository.getUsers()
            .then(() => {
                this.postsRenderer.renderPosts(this.postsRepository.posts)
            })
            .catch(function (error) {
                throw error;
            })
    }


}
