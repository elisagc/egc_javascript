
document.addEventListener("DOMContentLoaded", function(){
    
    var container = document.getElementById("change_heading");
    container.innerHTML = "Hello World"; 

    var textoColor=document.getElementsByClassName("selected");
    var cajasColores=document.getElementsByTagName("section");
   
    // crear un nuevo elemento div que cuelga de section
    var newDiv=document.createElement("div");
    newDiv.classList.add("purple");
    cajasColores[0].appendChild(newDiv);

    // al hacer hover sobre la caja sale el nombre, en este caso de la clase
    cajasColores[0].addEventListener("mouseover",color);
      
      function color(event){
        var colorLetras=event.target.classList.value;
        textoColor[0].innerHTML=colorLetras;
      }

      // cajas de carreras

      document.getElementsByTagName("button")[0].addEventListener("click",function(){

        var coche1=document.getElementsByClassName("car1");
        var coche2=document.getElementsByClassName("car2");
        var cont1=0;
        var cont2=0;
      
        var carrera1=setInterval(function(){
          cont1=cont1+Math.random();
          
          coche1[0].style.marginLeft=cont1+"%";
            if (cont1>=99){
              clearInterval(carrera1);
              clearInterval(carrera2);
              window.alert("Ganador Coche 1!");
              reset();
            }
        },0.1);
      
        var carrera2=setInterval(function(){
          cont2=cont2+Math.random();
          coche2[0].style.marginLeft=cont2+"%";
            if (cont2>=99){
              clearInterval(carrera2);
              clearInterval(carrera1);
              window.alert("Ganador Coche 2!");
              reset();
            }
        },0.1);
        
        function reset(){
          coche1[0].style.marginLeft=0;
          coche2[0].style.marginLeft=0;
        }
      });

      var form=document.getElementById("newTodoForm");
    var ul=document.getElementById("todoList");
    var texto=document.getElementById("task");
    var notasAlmacenadas=JSON.parse(localStorage.getItem("notas")) ; 

    // versión corta:  var notasAlmacenadas=JSON.parse(localStorage.getItem("notas")) || [];
      if (notasAlmacenadas===null){
          notasAlmacenadas=[];
      }

      // mostrar lo que hay en localStorage, se pone al principio para que lo  lea al inicio
      for (var i = 0; i < notasAlmacenadas.length; i++) {
          var li=document.createElement("li");
          li.innerHTML=notasAlmacenadas[i].nota;
          
            if (notasAlmacenadas[i].tachada===true){
                li.style["text-decoration"]="line-through";
             }else{
                li.style["text-decoration"]="none";
             }
             ul.appendChild(li);
      };

    // añadir nota
    form.addEventListener("submit",function(event){ 

        event.preventDefault(); // Arregla error al añadir la primera nota;

        var defined=texto.value;
          
        if(defined !== ""){
          
            var li=document.createElement("li"); 
            li.style["text-decoration"]="none";
            li.innerHTML=texto.value;
            ul.appendChild(li);
            texto.value="";

            // almacenar en localStorage

            notasAlmacenadas.push({nota: defined, tachada: false});
            localStorage.setItem("notas", JSON.stringify(notasAlmacenadas));
           
            li.addEventListener("click", tachar);             
        }
    });
    
    // nuevos elementos li que se asocian a tachar, si son nuevos no se tachan

    var li=document.getElementsByTagName("li");
    
    for (let i = 0; i < li.length; i++) {
        li[i].addEventListener("click", tachar)
    }

    // tacha el elemento li seleccionado 

    function tachar(event){
        var decor=event.target.style["text-decoration"];

            if(decor == "none"){
                event.target.style["text-decoration"]="line-through";
                changeToTrue(event);
            }else{
                event.target.style["text-decoration"]="none";  
                changeToFalse(event);
            }
            // como se cambia el valor 'tachada' se vuelven a guardar los elementos en localStorage
            localStorage.setItem("notas", JSON.stringify(notasAlmacenadas));
    }

        // cambia a true o false el valor tachada del objeto

        function changeToTrue(event){
             for (let i =0 ; i < notasAlmacenadas.length; i++) {
                if (notasAlmacenadas[i].nota === event.target.innerHTML){
                    notasAlmacenadas[i].tachada=true; 
                }
            }
        }  

        function changeToFalse(event){
            for (let i =0 ; i < notasAlmacenadas.length; i++) {
               if (notasAlmacenadas[i].nota === event.target.innerHTML){
                   notasAlmacenadas[i].tachada=false; 
               }
           }
       }      
});