class UsersRepository {
    constructor() {
        this.users = [];
    }

    async getUsers() {
        try {
            let data = await $.get('/users')
            // console.log(data);
            this.pusers = data;
        }
        catch (error) {
            throw error;
        }
    }

    async addUser(user) {
        const newUser = {  };
        try {
            let newuser = await $.post('/users',newUser)
            this.users.push(newuser);
        } catch (error) {
            throw error;
        }
    }
}

