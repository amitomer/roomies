

$(".move-to-signup2").on('click', function () {
    var signUp = $(this).closest(".sign-up");
    var name = signUp.find(".name").val();
    var password = signUp.find(".pass").val();
    var verify = signUp.find(".verify-pass").val();
    var email = signUp.find(".email").val();
});

$(".add-user").on('click', function () {
    
    let signUp2 = $(this).closest(".sign-up2");
    let age = signUp2.find(".age").val();
    let gender = signUp2.find(".gender").val();
    let phone = signUp2.find(".phone").val();
    let smoker = signUp2.find(".smoker").val();
    let alcohol = signUp2.find(".alco").val();
    let pets = signUp2.find(".pets").val();
    let proffession = signUp2.find(".proffession").val();
    let wantedLocation = signUp2.find(".wanted-location").val();
    let diet = signUp2.find(".veggie").val();
    let religion = signUp2.find(".religion").val();
    let hygenicRating = signUp2.find(".hygiene").val();
    let hobbies = signUp2.find(".hobbies").val();
    let host = signUp2.find(".host").val();
    let joinedGrocery = signUp2.find(".grocery").val();
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

    createUser(name, password, age, gender, phone, email, smoker, alcohol, pets, proffession, wantedLocation, diet, religion, hygenicRating, hobbies, host, joinedGrocery, quietRating, financesRating, maxrent, chores, maxnumroomates, allergies, photo, aboutMe, tvShows, hangout, music)
});

let users = [];
async function createUser(name, password, age, gender, phone, email, smoker, alcohol, pets, proffession, wantedLocation, diet, religion, hygenicRating, hobbies, host, joinedGrocery, quietRating, financesRating, maxrent, chores, maxnumroomates, allergies, photo, aboutMe, tvShows, hangout, music) {
    let data = await $.post('/users', { fullName: name, password: password, age: age, gender: gender, phone: phone, email: email, smoker: smoker, alcohol: alcohol, pets: pets, proffession: proffession, wantedLocation: wantedLocation, diet: diet, religion: religion, hygenicRating: hygenicRating, hobbies: hobbies, host: host, joinedGrocery: joinedGrocery, quietRating: quietRating, financesRating: financesRating, maxrent: maxrent, chores: chores, maxnumroomates: maxnumroomates, allergies: allergies, photo: photo, aboutMe: aboutMe, tvShows: tvShows, hangout: hangout, music: music })
    users.push(data);
}
