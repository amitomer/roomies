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

    // async addUser(user) {
    //     const newUser = {};
    //     try {
    //         let newuser = await $.post('/users', newUser)
    //         this.users.push(newuser);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async findRelevantApts(address, minage, maxage, pets) {
        let relevantApts = users.filter(a =>
            a. wantedLocation.toLowerCase().includes(address.toLowerCase() || "") &&
            a.age >= (minage || 0) &&
            a.age <= (maxage || a.price) 
        )
        pets= !pets[0].checked
        return pets ? relevantApts : relevantApts.filter(a => (a.pets))
    }
}

