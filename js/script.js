window.onload = function(){

    /***Fonction qui prends en paramètre un nombre et affiche dans le catalogue le film associé a ce nopmbre  */

    /***  <div class="film">
                <img src="images/Batman.png" alt="Batman">
                <h3>Test titre</h3>

            </div> */
   
           for ( var i= 0; i< filmData.length; i++) {
                
            createFilm(i)
           }
    
    function createFilm (number){

        var someFilm = filmData[number];

        //création d'un film 
        var film = document.createElement("div");
        film.className = "film";
       film.id = number + "-film";

       //création de l'image 

       var image = document.createElement("img")
       image.src= someFilm.image
       image.alt = someFilm.title


       //création du titre du film

       var titre = document.createElement("h3")
       titre.innerHTML = someFilm.title

       film.appendChild(image)
       film.appendChild(titre)

       document.getElementById("films").appendChild(film);



    }

    var input =  document.getElementsByTagName("input")
    var films = document.getElementById("films")
    var selection = document.getElementById("selection");
    input[0].addEventListener("keyup",recherhe);
    input[1].addEventListener("mouseup",checkbox);
    films.addEventListener("mouseover",survolFilm)
    films.addEventListener("mouseout",finSurvol)
    films.addEventListener("click",selectionFilm)
    selection.addEventListener("click", clickSelection)


    function recherhe(event){

        var inputValue = event.target.value;
        inputValue = inputValue.toLowerCase()
       
        if (inputValue == "") {
         //input est vide 
       }else{

        //input n'est pas vide 

        for ( var i  = 0; i < filmData.length; i++) {
           
           var titre = filmData[i].title
           
           titre = titre.toLowerCase()

           var film = document.getElementById(i+"-film")

           if (titre.includes(inputValue) == false) {

            film.style.display = "none";
            
           }else{

            film.style.display = "inline-block";
           }
            
        }
       }
    }//fin fonction recherche


    function checkbox(event) {
        
        var details = document.getElementById("details");
        if (event.target.checked) {
            details.style.display ="none";
        }else{
            details.style.display="block";
        }
    }//fin fonction checkbox

    function survolFilm(event) {

        var elementSurvole = event.target.parentNode;
        var identifiantFilm = elementSurvole.id;
        var position ;
        if (identifiantFilm == "catalog") {
            
            return;
        }else if(identifiantFilm.length== 6){

            position = identifiantFilm[0]
        }else if(identifiantFilm.length == 7){

            position = identifiantFilm[0]+identifiantFilm[1]
        }else{

            return
        }

        var descriptionFilm = filmData[position].text;
        document.getElementById("details").innerHTML = descriptionFilm

        
    }//fin fonction survolFilm


    function finSurvol(event){
             document.getElementById("details").innerHTML = ""
    }//fin fonction survolFilm


    function selectionFilm(event) {

        var film = event.target.parentNode;
        var select1 = document.getElementById("selection1")
        var select2 = document.getElementById("selection2")
        film.addEventListener("mouseover",survolFilm)
        film.addEventListener("mouseout",finSurvol)

        var select1Child = select1.childNodes;
        var select2Child = select2.childNodes;

        if (select1Child.length == 1) {
            //partie selection 1 est vide 
            select1.insertBefore(film,select1Child[0])
        }else if (select2Child.length == 1) {
             //partie selection 2 est vide
              select2.insertBefore(film,select2Child[0]) 
        }else{

            alert("désolé vous avez deja choisi deux films")
        }
        
    }//fin fonction selectionFilm

   

    function clickSelection(event) {
        var elementClickee = event.target;
        var film = elementClickee.parentNode;
        var select = film.parentNode
        var selectChild = select.childNodes

        if (selectChild[0].className == "film") {
            
            var copyFilm = selectChild[0];
            select.removeChild(copyFilm);
            document.getElementById("films").appendChild(copyFilm)
        }
    }



}