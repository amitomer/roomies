class UsersRepository {
    constructor() {
        this.users = [];
        this.STORAGE_ID = 'Roomies'
    }

    saveToLocalStorage(user) {
        localStorage.setItem(this.STORAGE_ID, JSON.stringify(user));
    }

    getFromLocalStorage() {
        let data=JSON.parse(localStorage.getItem(this.STORAGE_ID) ||null);
        return  data;
    }
    ClearLocal(){
        localStorage.clear()
    }
    findUserIndex(id) {
        for (let i = 0; i < this.users.length; i += 1) {
            if (this.users[i]._id === id) {
                return i;
            }
        }
    }
    RemoveMatchUser(UserID) {
         let index = this.findUserIndex(UserID);
         this.users.splice(index, 1);  
    }

    async GetMatch(UserId) {
        try {
            let matches = await $.get(`/Users/${UserId}/matches/propses`);
            console.log(matches)
            return  matches;
        }
        catch (error) {
            throw error;
        }
    }

    async  GetRequests(UserId) {
        try {
            let requests = await $.get(`/Users/${UserId}/matches/requests`);
            console.log(requests)
            return  requests;
        }
        catch (error) {
            throw error;
        }
    }

    async  GetRoomies(UserId) {
        try {
            let roomies = await $.get(`/Users/${UserId}/matches/roomies`);
            console.log(roomies)
            return roomies;
        }
        catch (error) {
            throw error;
        }
    }


    async  matchStatus(status, MatchID, UserId){
        try {
            let ress= await $.ajax({
            url: `/users/${UserId}/matches/${MatchID}/status`, 
            method: 'PUT', 
            data: {statuss:`${status}`}, 
             })
           console.log("sucsess")
           console.log(ress)
        } catch (error) {
            throw error;
        }

    }

    async AddMatch(match, MatchID,UserId) {
        try {
            await $.post(`/users/${UserId}/matches/${MatchID}`, match)
            let index = this.findUserIndex(MatchID)
            this.users.splice(index, 1);
        } catch (error) {
            throw error;
        }
    }


    async findUser(fullname, password) {
        try {
            let user = await $.get(`/users/${password}/${fullname}`)
            if(user[0]!= undefined){
                console.log(user)
            this.saveToLocalStorage(user);
            return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async getUsers() {
        try {
            let UserData = this.getFromLocalStorage();
            let id = UserData[0]._id;
            let data = await $.get(`/users/${id}`)
            this.users = data;
        }
        catch (error) {
            throw error;
        }
    }

    async addUser(roomatetime,name, password, age, gender, phone, email, smoker, alcohol, pets, proffession, wantedLocation, diet, religion, hygenicRating, hobbies, host, joinedGrocery, quietRating, financesRating, maxrent, chores, maxnumroomates, allergies, photo, aboutMe, tvShows, hangout, music) {
        try {
            let newuser = await $.post('/users', { fullName: name, password: password, age: age, gender: gender, phone: phone, email: email, smoker: smoker, alcohol: alcohol, pets: pets, proffession: proffession, wantedLocation: wantedLocation, diet: diet, religion: religion, hygenicRating: hygenicRating, hobbies: hobbies, host: host, joinedGrocery: joinedGrocery, quietRating: quietRating, financesRating: financesRating, maxrent: maxrent, chores: chores, maxnumroomates: maxnumroomates,roomatetime:roomatetime, allergies: allergies, photo: photo, aboutMe: aboutMe, tvShows: tvShows, hangout: hangout, music: music, matches:[] })
            this.users.push(newuser);
        } catch (error) {
            throw error;
        }
    }

     findRelevantApts(address, minage, maxage, pets, maxnumroomates, maxrent) {
        let relevantApts = this.users.filter(a =>
            a.wantedLocation.toLowerCase().includes(address.toLowerCase() || "") &&
            a.age >= (minage || 0) &&
            a.age <= (maxage || a.age) &&
            a.maxnumroomates <= (maxnumroomates || a.maxnumroomates) &&
            a.maxrent <= (maxrent || a.maxrent) 

        )
        pets = !pets[0].checked
        return pets ? relevantApts : relevantApts.filter(a => (a.pets))
    }
}

export default UsersRepository