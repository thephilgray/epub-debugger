var epubdebugger=function(){var o,n,e={},g={},r={el:"body"},d="debugger__logger",l="debugger__textarea",i="debugger__evalButton",a="debugger__btn",s="debugger__console",c="debugger__input",u="debugger__main",b="debugger__title",p="debugger__headerLeft",_="debugger__closeButton",f="debugger__expandButton",h="debugger__headerRight",m="debugger__header",v="debugger",x=function(){var o={},n=!1,e=0;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(n=arguments[0],e++);for(var t=function(e){for(var t in e)e.hasOwnProperty(t)&&(n&&"[object Object]"===Object.prototype.toString.call(e[t])?o[t]=x(o[t],e[t]):o[t]=e[t])};e<arguments.length;e++){t(arguments[e])}return o},w=function(e,t,o,n){t||(t="div");var r=document.createElement(t);if(r.id=e,o)for(var d=0;d<o.length;d++)r.setAttribute(o[d][0],o[d][1]);if(n)for(d=0;d<n.length;d++)if("string"==typeof n[d]){var l=document.createTextNode(n[d]);r.appendChild(l)}else"object"==typeof n[d]&&n[d]instanceof HTMLElement&&r.appendChild(n[d]);g[e]=r},y=function(e){var t=document.createElement("li"),o=document.createElement("pre");o.textContent=e,t.appendChild(o),g[d].appendChild(t),g[s].scrollTop=g[s].scrollHeight};return e.init=function(e){o=x(r,e||{}),n=document.querySelector(o.el),function(){w(d,"ul",[["class",d]]),w(l,"textarea",[["class",l]]),w(i,"button",[["class",a]],["EVAL"]),w(s,"div",[["class",s]],[g[d]]),w(c,"div",[["class",c]],[g[l],g[i]]),w(u,"div",[["class",u]],[g[s],g[c]]),w(b,"p",[["class",b]],"Console"),w(p,"div",[["class",p]],[g[b]]),w(_,"button",[["class",a]],["X"]),w(f,"button",[["class",a]],[" ^ "]),w(h,"div",[["class",h]],[g[_],g[f]]),w(m,"div",[["class",m]],[g[p],g[h]]),w(v,"div",[["class",v]],[g[m],g[u]]),n.appendChild(g[v]);var e=".debugger{width:100%;background:rgba(0,0,0,0.8);box-shadow:1px 1px 1px #ddd;position:absolute;bottom:0;overflow:hidden;color:white}.debugger--closed{width:25%}.debugger .debugger__main{position:relative}.debugger--closed .debugger__main{display:none}.debugger__header{height:20px;box-shadow:1px 1px 1px #ddd;position:relative;display:flex;padding:0.5em 0.25em 0.5em 0.5em;justify-content:center;align-items:center;cursor:pointer}.debugger__headerRight{margin-left:auto}.debugger__btn{padding:0.25em 0.5em;text-align:center;box-shadow:1px 1px 1px #ddd;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.debugger__btn:hover{cursor:pointer}.debugger--closed #debugger__closeButton{display:none}.debugger #debugger__expandButton{display:none}.debugger--closed #debugger__expandButton{display:block}.debugger__console{width:100%;height:200px;overflow:scroll}.debugger__console::-webkit-scrollbar{width:0.5em}.debugger__console::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(255,255,255,0.3)}.debugger__console::-webkit-scrollbar-thumb{background-color:darkgrey;outline:1px solid slategrey}.debugger__logger{margin:0;padding:0;padding:2em;font-family:monospace}.debugger__logger pre{overflow-wrap:break-word}.debugger__input{width:100%;bottom:0;display:flex}.debugger__input textarea{width:75%;padding:1em;position:relative;float:left;font-family:monospace;resize:none}.debugger__input button{width:20%;position:relative;float:left;padding:0.75em 0}",t=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e)),t.appendChild(o)}();var t=console.log;console.log=function(e){y("LOG: "+e),t.apply(console,arguments)},window.onerror=function(e){y("ERROR: "+e)},g[i].addEventListener("click",function(e){!function(e){y("INPUT: "+e);var t=window.eval(e),o=Object.prototype.toString.call(t),n="";if(null!==t&&"object"==typeof t){for(var r in t)n+=" \n  ",n+=r+": "+t[r];"Array"===o.slice(8,-1)&&(n="\n ["+n+"\n ]"),"Object"===o.slice(8,-1)&&(n="\n {"+n+"\n }"),t=n=o+", properties/values: "+n}y("EVAL: "+t)}(g[l].value)}),g[m].addEventListener("click",function(){for(var e=!0,t=0;t<g[v].classList.length;t++)-1<g[v].classList[t].indexOf("debugger--closed")&&(e=!1);e=e?(g[v].classList.add("debugger--closed"),!1):(g[v].classList.remove("debugger--closed"),!0)})},e}();epubdebugger.init();