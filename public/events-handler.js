class EventsHandler {
    constructor(usersRepository, usersRenderer) {
        this.usersRepository = usersRepository;
        this.usersRenderer = usersRenderer;
    }
    getmatches() {
        $('.NavMatches').on('click', async () => {
            let UserData = this.usersRepository.getFromLocalStorage();
            let UserId = UserData[0]._id;
            let matches = await this.usersRepository.GetMatch(UserId);
            this.usersRenderer.renderMatches(matches);
        })
    }

    // matchLike(){
    //    $('.matchesRes').on('click','.checkB' , async (event) =>{
    //     let MatchID = $(event.currentTarget).closest('.match').data().id;
    //     let UserData = this.usersRepository.getFromLocalStorage();
    //     let UserId = UserData[0]._id;
    //     await this.usersRepository.UpdateMatch(UserId,MatchID);
    //     // let newmatches = this.usersRepository.RemoveMatchUser(MatchID);
    //     // this.usersRenderer.renderUsers(newmatches);
    //     })
    // }

    LikeUser() {
        $('.checkB').on('click', async (event) => {
            let MatchID = $(event.currentTarget).closest('#container').find('.roomate').data().id;
            let UserData = this.usersRepository.getFromLocalStorage();
            let UserId = UserData[0]._id;
            let match = {
                offeree: UserId,
                offerer: MatchID,
                status: null
            }
            await this.usersRepository.AddMatch(match, UserId);
            // let newusers = this.usersRepository.RemoveMatchUser(MatchID);
            this.usersRenderer.renderUsers(this.usersRepository.users);
        })
    }

    checksignin() {
        $('.signin').on('click', async () => {
            let $inputfullname = $("#fullName-input");
            let $inputpassword = $("#password-input");
            if (($inputfullname.val() === "") || ($inputpassword.val() === "")) {
                alert("Please enter text!");
            } else {
                if (await this.usersRepository.findUser($inputfullname.val(), $inputpassword.val())) {
                    location.href = "search.html";
                }
                else {
                    alert("user or passowrd not correct");
                }
            }
        });
    }

    filter() {
        $('.findBtn').on('click', async () => {
            let address = $('.wantedLocation').val()

            let minage = $('.minage').val()
            let maxage = $(".maxage").val()
            let maxrent = $('.maxrent').val()
            let maxnumroomates = $(".maxnumroomates").val()
            let pets = $('.pets')
            
            let relevantApts = await this.usersRepository.findRelevantApts(address, minage, maxage, pets, maxnumroomates, maxrent)
            this.usersRenderer.renderUsers(relevantApts)
        })
    }

    async  OnLoad() {
        try {
            await this.usersRepository.getUsers()

            this.usersRenderer.renderUsers(this.usersRepository.users)
        }
        catch (error) {
            throw error;


        }
    }
    registerAddUser() {
        // $(".move-to-signup2").on('click', async (event) => {
        //     var signUp = $(event.currentTarget).closest(".sign-up");
        //     var name = signUp.find(".name").val();
        //     var password = signUp.find(".pass").val();
        //     var verify = signUp.find(".verify-pass").val();
        //     var email = signUp.find(".email").val();
        // });

        $(".add-user").on('click', async (event) => {

            let signUp2 = $(event.currentTarget).closest(".sign-up2");
            var name = signUp2.find(".name").val();
            var password = signUp2.find(".pass").val();
            var verify = signUp2.find(".verify-pass").val();
            var email = signUp2.find(".email").val();

            let age = signUp2.find(".age").val();
            let gender = signUp2.find(".gender").val();
            let phone = signUp2.find(".phone").val();
            let smoker = signUp2.find(".smoker").val() ==="on";
            let alcohol = signUp2.find(".alco").val() ==="on";
            let pets = signUp2.find(".pets").val() ==="on";
            let proffession = signUp2.find(".proffession").val();
            let wantedLocation = signUp2.find(".wanted-location").val();
            let diet = signUp2.find(".veggie").val();
            let religion = signUp2.find(".religion").val();
            let hygenicRating = signUp2.find(".hygiene").val();
            let hobbies = signUp2.find(".hobbies").val();
            let host = signUp2.find(".host").val() ==="on";
            let joinedGrocery = signUp2.find(".grocery").val() ==="on"  ;
            let quietRating = signUp2.find(".quiet").val();
            let financesRating = signUp2.find(".finance").val();
            let maxrent = signUp2.find(".max-rent").val();
            let chores = signUp2.find(".chores").val();
            let maxnumroomates = {
                num: signUp2.find(".num-roomates").val(),
                time: signUp2.find(".time-roomates").val()
            };
            let allergies = signUp2.find(".allergy").val();
            let photo = signUp2.find(".photoUrl").val();
            let aboutMe = signUp2.find(".about").val();
            let tvShows = signUp2.find(".tv").val();
            let hangout = signUp2.find(".hang").val();
            let music = signUp2.find(".music").val();

            await this.usersRepository.addUser(name, password, age, gender, phone, email, smoker, alcohol, pets, proffession, wantedLocation, diet, religion, hygenicRating, hobbies, host, joinedGrocery, quietRating, financesRating, maxrent, chores, maxnumroomates, allergies, photo, aboutMe, tvShows, hangout, music)
            location.href = "homepage.html";
        });
    }
}
export default EventsHandler