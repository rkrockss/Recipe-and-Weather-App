const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const  searchIN = document.querySelectorAll('input');


// event listener

clearBtn.addEventListener('click', ()=>{
    searchIN.forEach(clr => clr.value='' );
    
    mealList.innerHTML = ` it is clear!`;
    mealList.classList.add('notFound');
    infoTxt.classList.remove("pending");
    infoTxt.innerHTML='';

});

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    if(searchInputTxt){
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            mealList.innerHTML = "";
            if(data.meals){
                data.meals.forEach(meal => {
                    mealList.innerHTML += `
                        <div class = "meal-item" data-id = "${meal.idMeal}">
                        <h3 class="meal-heading">${meal.strMeal}</h3>
                            <div class = "meal-img">
                                <img src = "${meal.strMealThumb}" alt = "food">
                            </div>
                            <div class = "meal-name">
                                
                                <a href = "#" class = "recipe-btn">Recipe</a>
                            </div>
                        </div>
                    `;
                });
                
            } else{
                mealList.innerHTML = ` Sorry, we didn't find any meal like ${searchInputTxt}!`;
                mealList.classList.add('notFound');
                
            }
    
            
        });
    }
    else{mealList.innerHTML = ` please any dish first!`;
    mealList.classList.add('notFound');}

 
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => {
            
            data.meals = data.meals[0];
            mealDetailsContent.innerHTML= `
            <h2 class = "recipe-title">${data.meals.strMeal}</h2>
            <p class = "recipe-category">   ${data.meals.strCategory}</p>
            <div class =    "recipe-instruct">
                <h3>Instructions:</h3>
                <p>${data.meals.strInstructions}</p>
            </div>
            <div class = "recipe-meal-img">
                <img src =    "${data.meals.strMealThumb}" >
            </div>
           
        
    
            <div class = "recipe-link">
            <a href = "${data.meals.strYoutube}" target = "_blank">Watch Videoo</a>
        </div>
            
        `;
         
        mealDetailsContent.parentElement.classList.add('showRecipe');
        });
    }
}


//weather

const weatherBtn = document.getElementById('weather-btn'),
weatherCloseBtn= document.getElementById('weather-close-btn'),
infoTxt=document.getElementById('info-txt');

weatherBtn.addEventListener('click',()=>{
    document.getElementById("overlay").style.display = "block";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success,onerror);
      } 
      else{
        alert('nooo')
      }
})

const success =(position)=>{
    infoTxt.innerHTML= "Geolocation Found Successfuly";
    infoTxt.classList.add("not-pending"); 
    console.log(position);
    const{latitude , longitude} = position.coords;
    let RhythmApi =`2c7ac09aad7b869c1142a813160eb7d6`;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${RhythmApi}`)
    .then(res => res.json())
    .then(data=> showData(data) );
}


const onerror =(error)=>{
    document.getElementById("overlay").style.display = "none";
    infoTxt.innerHTML= error.message;
    infoTxt.classList.add("pending");
    

}

const showData =(info)=>{
    const feelsLike=info.main.feels_like;
    const Temp=info.main.temp;
    const Hum=info.main.humidity;

    const City=info.name;
    const {description , id}= info.weather[0];
    console.log(info);


    document.getElementById('hum').innerHTML= Hum;
    document.getElementById('prediction').innerHTML= feelsLike;
    document.getElementById('des').innerHTML=description;
   
   

    document.getElementById('temperature').innerHTML=Math.floor(Temp);
    document.getElementById('city').innerHTML= City;

  

}


weatherCloseBtn.addEventListener('click',()=>{
    document.getElementById("overlay").style.display = "none";
    infoTxt.classList.remove("not-pending"); 
    infoTxt.innerHTML='';
})












/* 2c7ac09aad7b869c1142a813160eb7d6
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={2c7ac09aad7b869c1142a813160eb7d6}
*/

