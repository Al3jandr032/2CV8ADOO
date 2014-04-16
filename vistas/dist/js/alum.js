 function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {
	return new XMLHttpRequest(); //To support the browsers IE7+, Firefox, Chrome, Opera, Safari
	} else if(window.ActiveXObject) {
	return new ActiveXObject("Microsoft.XMLHTTP"); // For the browsers IE6, IE5
	} else {
	alert("Error due to old verion of browser upgrade your browser");
	}
}
jQuery(function() {

$(document).ready(function(){
    /*nombre del servidor o url para las peticiones ajax
     *editar el valor para coincidir con la ruta en donde
     *se encuentran los servlets a utilizar
     */
    var server="http://localhost:8088/SyntaxHighlighter";
    var index =$("#title").data("id");
    //_______________________________________________________________________________________________
  //PANEL 1

    $("#getcursos").on("click",function(){
    
    console.log(index);
		var hr =  getXmlHttpRequestObject();
    var url = server+"/Ajax/listS_C";
    hr.open("GET", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            if(hr.responseXML !== null){
                console.log("exito");
                    cont=0;
                    xmlDoc=hr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                      
                      var id=xmlDoc.getElementsByTagName("course")[i].getAttribute('id');
                      var m=xmlDoc.getElementsByTagName("course")[i].getAttribute('len'); 
                      for (var j=cont;j<  +cont + +m ;j++){
                       var alumno=xmlDoc.getElementsByTagName("alum")[j].childNodes[0].nodeValue;
                       if(+index === +alumno)
                       $( "#result" ).append("<tr class=\"course\"><td>"+id+"</td><td>"+alumno+"</td></tr>" );
                       
                       
                      }
                      cont= +cont + +m;
                      
                   }
                }
                else{
                    console.log("Error al recibir xml");
                }
        }
    };
    hr.send();
  });

  
  $("#result").on("click",".course",function(){
    var curso =$(this).find("td:eq(0)").text();
    var hr =  getXmlHttpRequestObject();
    var url = server+"/Ajax/listCourse";
    hr.open("GET", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            if(hr.responseXML !== null){
                console.log("exito");
                    cont=0;
                    xmlDoc=hr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                      
                      var id=xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
                      var name=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                      var owner=xmlDoc.getElementsByTagName("owner")[i].childNodes[0].nodeValue; 
                      var code=xmlDoc.getElementsByTagName("code")[i].childNodes[0].nodeValue; 
                      if(+curso === +id)
                      $( "#code" ).append("<tr class=\"course\"><td data-id=\""+id+"\" >"+name+"</td><td>"+owner+"</td><td>"+code+"</td></tr>" );
                   }
                }
                else{
                    console.log("Error al recibir xml");
                }
        }
    };
    hr.send();
  });



 $("#code").on("click",".course",function(){
    var codigo =$(this).find("td:eq(0)").data("id");
    var hr =  getXmlHttpRequestObject();
    var url = server+"/Ajax/Code?id="+codigo;
    hr.open("GET", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            if(hr.responseXML !== null){
                    xmlDoc=hr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                                
                                var nombre=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                            
                                var code=xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue;
                                console.log(nombre+"   "+code);
                                $( "#codigos" ).append("<tr class=\"course\"><td data-codigo=\""+code+"\">"+nombre+"</td></tr>" );

                    }
                }
                else{
                    console.log("Error al recibir xml");
                }
        }
    };
    hr.send();
  });
  
});
});