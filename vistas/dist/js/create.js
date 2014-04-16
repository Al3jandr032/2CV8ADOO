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
    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
      extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      },
      lineNumbers: true,
      styleActiveLine: true,
      lineWrapping: true
    });

  $("#save").on("click",function(){
    var texto = editor.getValue();
    window.location.href = server+"/Ajax/savecode?code="+texto;
    //var res = texto.split("\n");
    //console.log(res);
  });
    });
});
