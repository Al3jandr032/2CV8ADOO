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
        //Contextpath name
    var server="http://localhost:8088/SyntaxHighlighter";
    //----------------------------------------------------------------------------------------------------
    //---------------------------------tab 1----------------------------------------------
    //----------------------------------------------------------------------------------------------------

    /*
     *      Obtener los cursos disponibles que tiene registrados el usuario 
     *      <?xml version="1.0" encoding="UTF-8"?>
     *       <resuldatos>
     *           <numero>3</numero>
     *           <curso>
     *               <id>1</id>
     *               <name>Iniciando con python</name>
     *               <owner>1</owner>
     *               <code>3</code>
     *           </curso>
     *     </resuldatos>
     */
    $("#getcursos").on("click",function(){
        var id = $("#title").data("id");
        var fr =  getXmlHttpRequestObject();
        var url = server+"/Ajax/listCourse";
        fr.open("GET", url, true);
        fr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fr.onreadystatechange = function() {
        if(fr.readyState === 4 && fr.status === 200) {
            if(fr.responseXML !== null){
                console.log("exito");
                $( ".course" ).remove();
                    xmlDoc=fr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                                var index=xmlDoc.getElementsByTagName("owner")[i].childNodes[0].nodeValue;
                                var nombre=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                                var id_curso =xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
                                var code=xmlDoc.getElementsByTagName("code")[i].childNodes[0].nodeValue;
                                if(+id == +index)
                                $( "#result" ).append("<tr class=\"course\"><td data-curso=\""+ id_curso+"\">"+nombre+"</td><td>"+code+"</td></tr>" );
                    }
                }
                else{
                    console.log("Error al recibir xml");
                }
        }
    };
    fr.send();
    });
    
    /*
     *      Al dar click al curso llenar con los codigos guardados en el sistema el apartado de codigos
     *       <resuldatos>
     *           <numero>3</numero>
     *           <name>hola.php</name>
     *           <path>\hola.xml</path>
     *           <name>for.php</name>
     *           <path>\for.xml</path>
     *           <name>if.php</name>
     *           <path>\if.xml</path>
     *       </resuldatos>
     */
    $("#result").on("click",".course",function(){
        $( "#codes" ).find("tbody").empty().append("<tbody></tbody>");
        console.log($( "#codes > tbody > tr" ).data("id"));
        var id = $(this).find("td:eq(0)").data("curso");
        var hr =  getXmlHttpRequestObject();
        var url = server+"/Ajax/Code?id="+id;
        hr.open("GET", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            if(hr.responseXML !== null){
                console.log("exito");
                    $( ".code" ).remove();
                    xmlDoc=hr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                                //var id=xmlDoc.getElementsByTagName("id")[i].nodeValue;
                                var nombre=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                                var path=xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue;

                                $( "#codes" ).append("<tr class=\"code\" data-id=\""+id+"\" data-path="+path+"><td>"+nombre+"</td><td><button class=\"btn btn-success btn-large editcode\">Abrir</button> <button class=\"btn btn-danger btn-large deletecode\">Borrar</button></td></tr>" );
                    }
                }
                else{
                    console.log("Error al recibir xml");
                }
        }
    };
    hr.send();
    });
 /***********************************************************************************************************************/
     /*
      *
      *     fucniones para interactuar con los codigos 
      *     que se agregan dinamicamente
      */
    /*
     *      Al dar click envia al edito del codigo
     */
    $("#codes").on("click",".editcode",function(){
        event.preventDefault();
        var file = $(this).closest("tr").data("path");
        window.open(server+"/Code?file="+file);
    });
    /*
     *      Al dar click envia peticion para borrar el archivo
     */

    $("#codes").on("click",".deletecode",function(){
        event.preventDefault();
        var file = $(this).closest("tr").find("td:eq(0)").text();
        var id= $(this).closest("tr").data("id");
        $(this).parent().parent().remove();
        console.log("nombre:"+file+" id del curso:"+ id);
        var hr =  getXmlHttpRequestObject();
        var url = server+"/Ajax/deleteCode?name="+file+"&index="+id;
        hr.open("GET", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.onreadystatechange = function() {
        if(hr.readyState === 4 && hr.status === 200) {
            if(hr.responseXML !== null){
              
                }
                else{
                    console.log("Error al recibir xml");
                }
        }
    };
    hr.send();
        //window.open(server+"/Code?file="+file);
    });
    /***********************************************************************************************************************/

    /*
     *  ABRIR los models para trabajar con los
     *  cursos 
     *
     *
     */
    /*
    *   Crear un curso
    */
    $("#crear").on("click",function(){
        event.preventDefault();
        $("#createcoursename").val("");
        $("#createmodallist").find(".list-group-item").remove();
        $('#createmodal').modal('show');
    });
    /*
    *   Editar un curso (lista de alumno)
    */
    $("#editar").on("click",function(){
        event.preventDefault();
        $("#editcoursename").val("");
        var id = $("#title").data("id");
        var fr =  getXmlHttpRequestObject();
        var url = server+"/Ajax/listCourse";
        fr.open("GET", url, true);
        fr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fr.onreadystatechange = function() {
        if(fr.readyState === 4 && fr.status === 200) {
            if(fr.responseXML !== null){
                console.log("exito");
                    xmlDoc=fr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                                var index=xmlDoc.getElementsByTagName("owner")[i].childNodes[0].nodeValue;
                                var nombre=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                                var id_curso =xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
                                var code=xmlDoc.getElementsByTagName("code")[i].childNodes[0].nodeValue;
                                if(+id == +index)
                                $( "#editmodalcourse" ).append("<option class=\"curso\" data-index=\""+ id_curso+"\" data-owner=\""+index+"\" >"+nombre+"</option>");
                                    
                    }
                }
                else{
                    console.log("Error al recibir xml");
                }
                }
            };
            fr.send();
        $('#editmodal').modal('show');
    });
    
    /*
    *   eliminar el curso con todo su contenido
    */
    $("#borrar").on("click",function(){
        event.preventDefault();
        $('#deletemodalcourse').empty()
        .append('<option selected="selected">selecciona un curso</option>');
        var id = $("#title").data("id");
        var fr =  getXmlHttpRequestObject();
        var url = server+"/Ajax/listCourse";
        fr.open("GET", url, true);
        fr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fr.onreadystatechange = function() {
        if(fr.readyState === 4 && fr.status === 200) {
            if(fr.responseXML !== null){
                console.log("exito");
                    xmlDoc=fr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                                var index=xmlDoc.getElementsByTagName("owner")[i].childNodes[0].nodeValue;
                                var nombre=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                                var id_curso =xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
                                var code=xmlDoc.getElementsByTagName("code")[i].childNodes[0].nodeValue;
                                if(+id == +index)
                                $( "#deletemodalcourse" ).append("<option class=\"curso\" data-index=\""+ id_curso+"\" data-owner=\""+index+"\" >"+nombre+"</option>");
                                    
                    }
                }
                else{
                    console.log("Error al recibir xml");
                }
                }
            };
            fr.send();
        $('#deletemodal').modal('show');
        //primera peticion para optener los indices de los codigo que pertenecen al usuario
        
        });
    /***********************************************************************************************************************/
    /*
    *   Prepar los models para cargarse con los datos necesarios
    *
    */
    $("#createcoursename").on("change",function(){

        var create = getXmlHttpRequestObject();
                    create.open("GET", server+"/Ajax/User?tipo=alumno" , true);
                    create.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    create.onreadystatechange=function(){
                    if(create.readyState === 4 && create.status === 200) {
                        if(create.responseXML !== null){
                                console.log("exito"); 
                                xmlDoc=create.responseXML;
                                var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue; 
                                for (var i=0;i<n;i++){
                                var index=xmlDoc.getElementsByTagName("index")[i].childNodes[0].nodeValue;
                                var nombre=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                                
                                $( "#createmodallist" ).append("<li class=\"list-group-item\">"+nombre+"<input type=\"checkbox\" name=\"optionsCheckboxes"+i+"\" value=\"option1\" style=\"float:right;clear:both;\"></li>");
                                    
                    }

                            }
                        else{
                                console.log("Error al recibir xml");
                        }
                }
            };
        create.send();
    });
    //lenar los valores de los alumnos que pertenecen al codigo
    $("#editmodalcourse").on("change",function(){
        $("#editcoursename").val($(this).val());
        $( "#resulteditmodal" ).find("tbody").empty().append("<tbody></tbody>");
        var index = $(this).find(':selected').data("index");
        console.log("index  =     "+ index);
        var fr =  getXmlHttpRequestObject();
        var url = server+"/Ajax/listS_C";
        fr.open("GET", url, true);
        fr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fr.onreadystatechange = function() {
        if(fr.readyState === 4 && fr.status === 200) {
            if(fr.responseXML !== null){
                console.log("exito cargar lista de alumnos modal editar");
                    cont=0;
                    xmlDoc=fr.responseXML;
                    var n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    for (var i=0;i<n;i++){
                      
                      var id=xmlDoc.getElementsByTagName("course")[i].getAttribute('id');
                      var m=xmlDoc.getElementsByTagName("course")[i].getAttribute('len'); 
                      for (var j=cont;j<  +cont + +m ;j++){
                       var alumno=xmlDoc.getElementsByTagName("alum")[j].childNodes[0].nodeValue;
                       if(+index === +id)
                       $( "#resulteditmodal" ).append("<tr class=\"course\"><td>"+alumno+"</td><td><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Eliminar</button></td></tr>" );
                       
                       
                      }
                      cont= +cont + +m;
                      
                   }
                }
                else{
                    console.log("Error al recibir xml");
                }
                }
            };
            fr.send();
        //$(this).val();
    });
    //Curso seleccionado paaa borrar
    $("#deletemodalcourse").on("change",function(){
        var index = $(this).find(':selected').data("index");
        console.log("index  =     "+ index);

    });
    /***********************************************************************************************************************/
    /*
     *  Guardar los cambios de los
     *  models de cursos
     *
     *
     */
    /*
    *   Crear un curso
    */
    $("#savecreatemodal").on("click",function(){
        event.preventDefault();
        var list =$("#createmodallist").toArray();
        alert(list);
        var id = $("#title").data("id");
        var name = $("#createcoursename").val();
        //ajax call to get the last index 
        var n;
        var fr =  getXmlHttpRequestObject();
        var url = server+"/Ajax/listCourse";
        fr.open("GET", url, true);
        fr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        fr.onreadystatechange = function() {
        if(fr.readyState === 4 && fr.status === 200) {
            if(fr.responseXML !== null){
                    xmlDoc=fr.responseXML;
                    n=xmlDoc.getElementsByTagName("numero")[0].childNodes[0].nodeValue;
                    //crear curso 
                    var create = getXmlHttpRequestObject();
                    create.open("GET", server+"/Ajax/insertCourse?name="+name+"&owner="+id+"&index="+(+n + 1) , true);
                    create.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    create.onreadystatechange=function(){
                         if(create.readyState === 4 && create.status === 200) {
                        if(create.responseXML !== null){
                                console.log("exito");    
                            }
                            else{
                                console.log("Error al recibir xml");
                            }
                        }
                    };
                    create.send();
                    
                }
                else{
                    console.log("Error al recibir xml");
                }
            }
        };
        fr.send();
        $('#createmodal').modal('hide');
        
    });


    /*
    *   Editar un curso (lista de alumno)
    */
    $("#saveeditmodal").on("click",function(){
        event.preventDefault();
        
            //fin ajax
        $('#editmodal').modal('hide');
    });



    
    /*
    *   eliminar el curso con todo su contenido
    */
    $("#savedeletemodal").on("click",function(){
        event.preventDefault();
         var index = $("#deletemodalcourse").find(':selected').data("index");
        console.log("index  =     "+ index);
        var create = getXmlHttpRequestObject();
                    create.open("GET", server+"//Ajax/deleteCourse?index="+index , true);
                    create.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    create.onreadystatechange=function(){
                    if(create.readyState === 4 && create.status === 200) {
                        if(create.responseXML !== null){
                                console.log("exito");    
                            }
                        else{
                                console.log("Error al recibir xml");
                        }
                }
            };
        create.send();
        $('#deletemodal').modal('hide');
        
        //primera peticion para optener los indices de los codigo que pertenecen al usuario
        
        });
        //End of document ready
});

//End of jquery function    
});