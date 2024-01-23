const API_Key ="05cae1c06be4453b8af7824294f63c40";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("india"));
async function fetchNews(query) {
 const res = await fetch(`${url}${query}&apiKey=${API_Key}`);
 const data = await res.json();
 console.log(data);
 bindDtata(data.articles);
}

function bindDtata(article) {
    const cardsContainer = document.querySelector("#cards-container");
    const newsCardTemplate = document.querySelector("#template-news-card");
    cardsContainer.innerHTML =" ";
    article.forEach(articles => {
        if(!articles.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        console.log(articles.title);
        fillData(cardClone,articles);
        cardsContainer.appendChild(cardClone);
        
    });
}

function fillData(cardClone,article){
    console.log(article.urlToImage);
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
  const date=new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
  });
  newsSource.innerHTML=`${article.source.name} . ${date}`;
  cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank")
  })
}
let currentSelect = null;

function onNavClick(id){
  fetchNews(id)
  const navItem =document.getElementById(id);
  currentSelect?.classList.remove('active');
  currentSelect=navItem;
  currentSelect.classList.add('active');

}
const SearchValue = document.getElementById("Search-text");
const searchbutton = document.getElementById("search-button");
searchbutton.addEventListener("click",()=>{
const query = SearchValue.value;
if(!query) return;
fetchNews(query);
currentSelect?.classList.remove('active');

});

function Reload(){
    window.location.reload();
}