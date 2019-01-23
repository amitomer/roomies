class EventsHandler {
    constructor(usersRepository, usersRenderer) {
        this.usersRepository = usersRepository;
        this.usersRenderer = usersRenderer;
    }

    OnLoad() {
        let htmlNav = `<div id="mainNav">
            <nav class=" main-nav nav navbar navbar-expand-sm navbar-expand-lg fixed-top navbar-light">
                <div class="container">
                    <a class="navbar-brand" href="index.html">Roomies</a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarResponsive">
                        <ul class="navbar-nav ml-auto ">
                            <li class="nav-item  ">
                                <a class="nav-link" href="index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="search.html">Serch</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link NavMatches" href="matches.html">matches</a>
                            </li> 
                          
                            <li class="nav-item">
                            <li class="nav-item">
                            <a class="nav-link" href="signup2.html">Signup</a>
                            </li>
                            <a class="nav-link login" href="signin.html">Login</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link logout" href="#">Logout</a>                           
                             </li>   
                        </ul>
                    </div>
                </div>
            </nav>
        </div >`
        $('.nav-container').empty().append(htmlNav);
        this.IsLogin() ? this.hideLogin() : this.hideLogout()
    }
//     <li class="nav-item">
//     <a class="nav-link " href="profile.html">Me</a>
// </li>

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

    hideLogout() {
      $('.logout').hide();
    }

    hideLogin() {
       $('.login').hide();
    }

    IsLogin() {
        if (this.usersRepository.getFromLocalStorage()) {
            return true;
        }
        return false;
    }

    Logout() {
        $('.nav-container').on('click', '.logout', (e) => {
            this.usersRepository.ClearLocal();
            location.href = "index.html";
        })
    }

    AddRoomie() {
        $('.matchesRes').on('click', '.checkB', async (e) => {
            let MatchID = $(e.currentTarget).closest('.match').data().id;
            let UserData = this.usersRepository.getFromLocalStorage();
            let UserId = UserData._id;
            console.log(MatchID, UserId)
            await this.usersRepository.matchStatus(true, MatchID, UserId);
            this.OnLoadmatches();
        })
    }
    RejectRoomie() {
        $('.matchesRes').on('click', '.crossB', async (e) => {
            let MatchID = $(e.currentTarget).closest('.match').data().id;
            let UserData = this.usersRepository.getFromLocalStorage();
            let UserId = UserData._id;
            console.log(MatchID, UserId)
            await this.usersRepository.matchStatus(false, MatchID, UserId);
            this.OnLoadmatches();
        })
    }

    LikeUser() {
        $('.results').on('click', '.checkB', async (event) => {
            let MatchID = $(event.currentTarget).closest('.roomate').data().id;
            let UserData = this.usersRepository.getFromLocalStorage();
            let UserId = UserData._id;
            let match = {
                offeree: MatchID,
                offerer: UserId,
            }
            await this.usersRepository.AddMatch(match, MatchID, UserId);
            //  let newusers = this.usersRepository.RemoveMatchUser(MatchID);
            this.usersRenderer.renderUsers(this.usersRepository.users);
        })
    }

    dislikeUser() {
        $('.results').on('click', '.crossB', (event) => {
            let MatchID = $(event.currentTarget).closest('.roomate').data().id;
            this.usersRepository.RemoveMatchUser(MatchID);
            this.usersRenderer.renderUsers(this.usersRepository.users);
        })
    }
    Requests() {
        $('.requests-match').on('click', async (event) => {
            let UserData = this.usersRepository.getFromLocalStorage();
            let UserId = UserData._id;
            let requests = await this.usersRepository.GetRequests(UserId);
            this.usersRenderer.renderMatches(requests, "requests");
        })
    }

    Roomies() {
        $('.roomies-match').on('click', async (event) => {
            let UserData = this.usersRepository.getFromLocalStorage();
            let UserId = UserData._id;
            let roomies = await this.usersRepository.GetRoomies(UserId);
            this.usersRenderer.renderMatches(roomies, "roomies");
        })
    }

    offers() {
        $('.offers-match').on('click', () => {
            this.OnLoadmatches()
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
    async  OnLoadmatches() {

        try {
            let UserData = this.usersRepository.getFromLocalStorage();
            let UserId = UserData._id;
            let matches = await this.usersRepository.GetMatch(UserId);
            this.usersRenderer.renderMatches(matches, "matches")
        }
        catch (error) {
            if(error.status == 500)
            throw error;
        }


    }

    async OnLoadSearch() {
        try {
            await this.usersRepository.getUsers()
            this.usersRenderer.renderUsers(this.usersRepository.users)
        }
        catch (error) {
        
            throw error;
        }
    }
    registerAddUser() {
        $(".add-user").on('click', async (event) => {
            let signUp2 = $(event.currentTarget).closest(".sign-up2");
            var name = signUp2.find(".name").val();
            var password = signUp2.find(".pass").val();
            // var verify = signUp2.find(".verify-pass").val();
            var email = signUp2.find(".email").val();
            let age = signUp2.find(".age").val();
            let gender = $('input[name=gender]:checked').val();
            let phone = signUp2.find(".phone").val();
            let smoker = signUp2.find(".smoker").val() === "on";
            let alcohol = signUp2.find(".alco").val() === "on";
            let pets = signUp2.find(".pets").val() === "on";
            let proffession = signUp2.find(".proffession").val();
            let wantedLocation = signUp2.find(".wanted-location").val();
            let diet = signUp2.find(".veggie").val();
            let religion = signUp2.find(".religion").val();
            let hygenicRating = signUp2.find(".hygiene").val();
            let hobbies = signUp2.find(".hobbies").val();
            let host = signUp2.find(".host").val() === "on";
            let joinedGrocery = signUp2.find(".grocery").val() === "on";
            let quietRating = signUp2.find(".quiet").val();
            let financesRating = signUp2.find(".finance").val();
            let maxrent = signUp2.find(".max-rent").val();
            var instance = M.FormSelect.getInstance(signUp2.find(".chores"));
            let chores =instance.getSelectedValues();
            let maxnumroomates = signUp2.find(".num-roomates").val();
            let roomatetime = signUp2.find(".time-roomates").val();
            let allergies = signUp2.find(".allergy").val();
            let photo = signUp2.find(".photoUrl").val();
            let aboutMe = signUp2.find(".about").val();
            let tvShows = signUp2.find(".tv").val();
            let hangout = signUp2.find(".hang").val();
            let music = signUp2.find(".music").val();

            await this.usersRepository.addUser(roomatetime, name, password, age, gender, phone, email, smoker, alcohol, pets, proffession,
                 wantedLocation, diet, religion, hygenicRating, hobbies, host,joinedGrocery, quietRating, financesRating,
                  maxrent, chores, maxnumroomates, allergies, photo, aboutMe, tvShows, hangout, music)
            location.href = "index.html";
        });
    }
}
export default EventsHandler