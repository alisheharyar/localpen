var localpen=(()=>{var t="#pen",n=document.createElement("style");n.innerHTML=`
        ${t} {
            min-width: 300px;
            min-height: 200px;
            padding: 0;
            overflow: hidden;
        }
        ${t} > iframe {
            border: 0;
            width: 100%;
            height: 100%;
        }
        ${t}.embed iframe {
            width: calc(100% - 2px);
            height: calc(100% - 2px);
            border: 1px solid #001b25;
            border-radius: 5px;
        }
    `;document.body.appendChild(n);var e=document.createElement("iframe");e.style.display="none";var o=document.querySelector(t);e.src="http://localhost:8080";o?.appendChild(e);e.style.display="block";e.addEventListener("load",async()=>{let d=document.querySelector("#pen");e.contentDocument?.body.appendChild(d.cloneNode(!0)),e.style.display="block"});})();
