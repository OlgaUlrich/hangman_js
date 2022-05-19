const audio = new Audio;
audio.src = "./click.mp3"

function badLetter(arg){
  const letter = document.getElementById(`keyboardButton_${arg}`);
  letter.classList.toggle("container_color_redBad");
  setTimeout(function(){
    letter.classList.remove("container_color_redBad")
  }, 2000)
 
 

}


class Game {
      constructor(word, triesStart = 0, usedLetters = [], openedLetters = 0, rightLettersArr=[]) {
        this.wordH = word
        let count = triesStart;
        let letters = usedLetters;
        let matchCounter = openedLetters;
        let rightLettersArray = rightLettersArr;
        this.addrightLettersArr = (arg) => rightLettersArray.push(arg);
        this.getRightLettersArr = () => rightLettersArray;
        this.increase = (x=1) => count +=x;
        this.getCount = () => count;
        this.addLetter = (arg) => letters.push(arg);
        this.getLetters = () => letters;
        this.addOpenedLetter = (x=1) => matchCounter +=x;
        this.getOpenedLetters = () => matchCounter;
  
        
      }



    checkLetter(arg){
  
          const regexp = new RegExp(arg, "g");
          let matches = [...this.wordH.matchAll(regexp)];
        
              if(matches.length===0){
                let letArr = this.getLetters()
                badLetter(arg)
                if(!letArr.includes(arg)){
                  this.addLetter(arg)
                  this.increase();
                  document.getElementById("count").textContent=`Count of 	tries ${7 - this.getCount()}`;
                  document.getElementById("usedL").textContent=`Wrong letters ${this.getLetters()}`;
              let img = document.getElementById("images");
              let num = this.getCount();
              let url = "./hm/"+num+".png";
              img.src = url;
                /*  
             console.log("opened", this.getOpenedLetters())
              console.log("count", num)
              */

          
                  if(num <= 7 && this.getOpenedLetters()===this.wordH.length){
                    document.getElementById("win").style.display="flex";
                    } else if(num >= 7 && this.getOpenedLetters()<this.wordH.length){
                      document.getElementById("game_over").style.display="flex";
                      document.getElementById("game_over_text").textContent=`You have lost. The word was ${this.wordH}`;
                    }
                }
              }
          else{
            if(!this.getRightLettersArr().includes(arg)){
              this.addrightLettersArr(arg)
              for (const match of matches) {
                  /*  
                console.log(match)
                */
                let num = this.getCount();
                 this.addOpenedLetter()
                 if(num <= 7 && this.getOpenedLetters()===this.wordH.length){
                  document.getElementById("win").style.display="flex";
                  }else if(num >= 7 && this.getOpenedLetters()<this.wordH.length){
                    document.getElementById("game_over").style.display="flex";
                    document.getElementById("game_over_text").textContent=`You have lost. The word was ${this.wordH}`;
                      }
                 /*   
                 console.log("count", this.getCount())
                 console.log("opened", this.getOpenedLetters())
                 */
                
                  let id = `letter${match.index}`;
                  let letterToShow = document.getElementById(id);
                  letterToShow.style.opacity="1"
              }

            }

          }
           
        }



  representGuessedWord(arg){
    console.log("word is", arg)
          let arr = Array.from(arg.split(''));
          let word = document.getElementById('word')
          var elements = document.getElementsByClassName("letterWrapper");
          while(elements.length > 0){
              elements[0].parentNode.removeChild(elements[0]);
          }
          for(let i=0; i<=arr.length-1; i++){
                let letterWrapper =document.createElement('div');
                letterWrapper.className = `letterWrapper`;
                word.appendChild(letterWrapper);
                let letter = document.createElement('div');
                letter.textContent = arr[i];
                letter.className = `letter${i}`;
                letter.setAttribute("id", `letter${i}`);
                letter.style.opacity = "0";
                letterWrapper.appendChild(letter);
          }
  
  
  }

  KeyboardLetters(){
   var l1 = document.getElementById("line0");
   var l2 = document.getElementById("line1");
   var l3 = document.getElementById("line2");
   if(l1 !=null && l2 != null && l3 != null){
    l1.remove();
    l2.remove();
    l3.remove();
   }


    let keyboard = document.getElementById("keyboard")
      const letters = 
      [
          ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
          ['a','s','d','f','g','h','j','k','l'],
          ['y','x','c','v','b','n','m']

      ]
      for(let i=0; i<= letters.length - 1; i++){
        // create line
        let new_line = document.createElement('div');
        new_line.className = `line${i}`;
        new_line.setAttribute("id", `line${i}`);
        keyboard.append(new_line);

        for(let j=0; j<= letters[i].length - 1; j++){
          let but = document.createElement('div');
          but.textContent = letters[i][j];
          but.className = "keyboardButton";
          but.setAttribute("id", `keyboardButton_${letters[i][j]}`);
          new_line.append(but)
      
      }

    }

    let arr = document.getElementsByClassName('keyboardButton')

    Array.from(arr).forEach(item => {
      item.addEventListener('click', event => {
        audio.play();
        let guessedLetter = event.target.textContent
        this.checkLetter(guessedLetter)
      })
    })
}
}




document.getElementById('start_again').addEventListener('click', ()=>start())

document.getElementById('start_again_go').addEventListener('click', ()=>{ location.reload()
                                                                          start() 
                                                                          document.getElementById("game_over").style.display="none"})

document.getElementById('start_again_bt').addEventListener('click', ()=>{ location.reload()
                                                                            start() 
                                                                            document.getElementById("game_over").style.display="none"})
                                                                         

  function start(){
  let str = "";

        const url = "https://random-word-api.herokuapp.com/word" 
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            str=data[0];
            let newGame = new Game(str);
            newGame.representGuessedWord(newGame.wordH)
            newGame.KeyboardLetters()
          

        
          });

   }






