import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalOutside = document.getElementById('meme-modal-outside')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

memeModalOutside.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

document.addEventListener("click", function(e){
  if (!e.target.closest(".meme-modal") && !e.target.closest(".get-image-btn")) {
    closeModal();
  }
});

function renderCat() {
    const catObject = getSingleCatObject();
    memeModalInner.innerHTML = `
        <img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
        >
        <div class="vote-buttons">
            <button id="upvote" class="upvote">👍</button>
            <span class="vote-count">${catObject.voteCount}</span>
            <button id="downvote" class="downvote">👎</button>
        </div>
    `;
    document.getElementById('upvote').addEventListener('click', () => handleVote(catObject.image, true));
    document.getElementById('downvote').addEventListener('click', () => handleVote(catObject.image, false));
    memeModal.style.display = 'flex';
}

function handleVote(image, isUpvote) {
    const catIndex = catsData.findIndex(cat => cat.image === image);
    if (isUpvote) {
        catsData[catIndex].voteCount++;
    } else {
        catsData[catIndex].voteCount--;
    }
    document.querySelector('.vote-count').innerText = catsData[catIndex].voteCount;
}



function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




