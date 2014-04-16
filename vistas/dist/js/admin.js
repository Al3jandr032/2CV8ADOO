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
    //_______________________________________________________________________________________________
  //PANEL 1

    $("#tabs1-pane1").on("click","#registrar",function(){
		var nombre=$("#insertname").val();
		var pass=$("#insertpassword").val();
		var email=$("#insertemail").val();
		var priv=$("#insertpriv").val();
		var hr =  getXmlHttpRequestObject();
    //url completa para la peticion ajax
		var url = server+"/Ajax/insertUser";
    //Variables que se envian al servlet
    var vars = "name="+nombre+"&pass="+pass+"&email="+email+"&tipo="+priv;
    
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
          console.log("Exito");
          //alert("exito");
            $("#insertname").val("");
            $("#insertpassword").val("");
            $("#insertemail").val("");
            $("#insertpriv").val("");
        }
    };
    hr.send(vars);	

  });
  //_______________________________________________________________________________________________
  //PANEL 2
  $("#tabs1-pane2").on("click","#getusers",function(){
		var hr =  getXmlHttpRequestObject();
		var url = server+"/Ajax/User?tipo=profesor";
    console.log(url);
    var clas="<button class=\"btn btn-danger user\" >Eliminar</button>";
    hr.open("GET", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            if(hr.responseXML !== null){
                console.log("exito");
                    xmlDoc=hr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                      var index=xmlDoc.getElementsByTagName("index")[i].childNodes[0].nodeValue;
            					var nombre=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
            					var email=xmlDoc.getElementsByTagName("email")[i].childNodes[0].nodeValue;
            					$( "#result" ).append("<tr ><td class=index>"+index+"</td><td class=username>"+nombre+"</td><td>"+email+"</td><td>"+clas+"</td></tr>" );
					         }
                }
                else{
                    console.log("Error al recibir xml");
                }
        }
    };
    hr.send();
  });
  $("#tabs1-pane2").on("click",".user",function(){
  var username=$(this).closest("tr").find(".username").text();
  var r=confirm("Eliminar a "+ username);
  if (r===true)
  {
      $(this).parent().parent().remove();
        var hr =  getXmlHttpRequestObject();
        var url = server+"/Ajax/deleteUser?tipo=profesor&index="+$(this).closest("tr").find(".index").text();
        
          hr.open("GET", url, true);
          hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          hr.onreadystatechange = function() {
              if(hr.readyState === 4 && hr.status === 200) { 
                      console.log("exito");
              }
    };
    hr.send();
          
  }
else
  {
  alert("cancelado!!!");
  }
  });
  //_______________________________________________________________________________________________
  //PANEL 3
  $("#tabs1-pane3").on("click","#getusers",function(){
		
		var hr =  getXmlHttpRequestObject();
		var url = server+"/Ajax/User?tipo=profesor";
    var clas="<button class=\"btn btn-danger user\" >Modificar</button>";
    hr.open("GET", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            if(hr.responseXML !== null){
                console.log("exito");
                    xmlDoc=hr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                      var index=xmlDoc.getElementsByTagName("index")[i].childNodes[0].nodeValue;
                      var nombre=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                      var email=xmlDoc.getElementsByTagName("email")[i].childNodes[0].nodeValue;
          $( "#xml" ).append("<tr><td class=index>"+index+"</td><td class=username>"+nombre+"</td><td>"+email+"</td><td>"+clas+"</td></tr>" );
					}
                }
                else{

                    console.log("Error al recibir xml");
                }
        }
    };
    hr.send();
  });
 $("#tabs1-pane3").on("click",".user",function(){
  var username=$(this).closest("tr").find(".username").text();
  var r=confirm("Modificar a "+ username);
  if (r === true)
  {
	var hr =  getXmlHttpRequestObject();
	var url = server+"/Ajax/getuser?tipo=profesor&name="+username;
    hr.open("GET", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            xmlDoc=hr.responseXML;
					var nombre=xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
					var email=xmlDoc.getElementsByTagName("email")[0].childNodes[0].nodeValue;
					var pass=xmlDoc.getElementsByTagName("pass")[0].childNodes[0].nodeValue;
					
					
          $(".formulariom").show();
					$(".formulariom").find("#modificarnombre").val(nombre);
					$(".formulariom").find("#modificarpassword").val(pass);
					$(".formulariom").find("#modificaremail").val(email);
					
        }
    };
    hr.send();
  }
	else
	  {
	  alert("cancelado!!!");
	  }
  });
	
$("#modif").on("click",function(){
	  var nombre=$("#modificarnombre").val();
		var pass=$("#modificarpassword").val();
		var email=$("#modificaremail").val();
			
		var hr =  getXmlHttpRequestObject();
		var url = server+"/Ajax/editUser";
        var vars = "tipo=profesor&pass="+pass+"&name="+nombre+"&email="+email+"&index="+$(this).closest("tr").find(".index").text();
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            $(".formulariom").hide();
            $("#modif").hide();
            $("#otrom").show();
        }
    };
    hr.send(vars);
  });
});
});