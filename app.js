let btn_search = document.querySelector("#Search")
let userText = document.querySelector(".userSearch")
let box_div = document.querySelector(".box")
let allDishes = document.querySelectorAll("#dish")


let app_id = `8b9be8a1`;
let app_key = `7e7e28e234349e886718945c5d884fa1`

const SearchRec = async (value) => {
    let api = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${value}&app_id=${app_id}&app_key=${app_key}`)
    let { hits } = api.data
    showCards(hits)
}


allDishes.forEach((singalDish) => {
    singalDish.addEventListener("click", (e) => {
        SearchRec(e.target.value)
    })
})



btn_search.addEventListener("click", () => {
    let searchValue = userText.value;
    console.log(searchValue);
    SearchRec(searchValue)
})

if (box_div.innerHTML) {
    let errorDiv = document.createElement("h1")
    errorDiv.innerHTML = `NO DISH`
    box_div.appendChild(errorDiv)
}

const showCards = (hits) => {
    box_div.innerHTML = ""
    hits.forEach((result) => {
        box_div.innerHTML += `
            <div class="firstCard">
            <img src="${result.recipe.image}" alt="">
            <div class="overlay">
            <div class="text">
            <h1>${result.recipe.label}</h1>
            <div class="content">
            <p>Dish Type : ${result.recipe.dishType}</p>
            <p>DietLabels : ${result.recipe.dietLabels[0]}</p>
            <p>HealthLabels : ${result.recipe.healthLabels[0]}</p>
            </div>
            <div class="footer">
            <button> <a href="${result.recipe.url}" target="_blank"> See More </a></button>
            </div>
            </div>
            </div>
            </div>
         `
    });
}










let dishesScroll = document.querySelectorAll(".dishes")
let counter = 0;

dishesScroll.forEach((dish, index) => {
    dish.style.left = `${index * 100}%`
})


const AutoScroll = (e) => {
    dishesScroll.forEach((scrollDish) => {
        scrollDish.style.transform = `translateX(-${counter * 100}%)`
    })
}


let next = () => {
    counter++;
    if (counter == dishesScroll.length) {
        counter = 0;
    }
    AutoScroll()
}

let previous = () => {
    counter--;
    if (counter == -1) {
        counter = dishesScroll.length - 1;
    }
    AutoScroll()
}

document.querySelector("#pre").addEventListener("click", previous);
document.querySelector("#next").addEventListener("click", next);