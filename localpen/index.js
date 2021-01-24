var b={babel:"vendor/prettier/parser-babel.mjs",html:"vendor/prettier/parser-html.mjs",markdown:"vendor/prettier/parser-markdown.mjs",postcss:"vendor/prettier/parser-postcss.mjs",pug:"vendor/prettier/parser-pug.mjs"},L=[{name:"html",title:"HTML",parser:{name:"html",pluginUrls:[b.html]},extensions:["html","htm"],editor:"markup"},{name:"pug",title:"Pug",parser:{name:"pug",pluginUrls:[b.pug]},compiler:{url:"vendor/pug/pug.min.js",factory:()=>window.pug.render,umd:!0},extensions:["pug","jade"],editor:"markup"},{name:"markdown",title:"Markdown",parser:{name:"markdown",pluginUrls:[b.markdown,b.html]},compiler:{url:"vendor/marked/marked.esm.min.js",factory:t=>t.default},extensions:["md","markdown","mdown","mkdn","mdx"],editor:"markup",preset:"github-markdown-css"},{name:"asciidoc",title:"AsciiDoc",compiler:{url:"vendor/asciidoctor/asciidoctor.min.js",factory:()=>{let t=window.Asciidoctor();return t.convert.bind(t)},umd:!0},extensions:["adoc","asciidoc","asc"],editor:"markup",preset:"asciidoctor.css"},{name:"css",title:"CSS",parser:{name:"css",pluginUrls:[b.postcss]},extensions:["css"],editor:"style"},{name:"scss",title:"SCSS",parser:{name:"scss",pluginUrls:[b.postcss]},compiler:{url:"vendor/sass.js/sass.js",factory:(t,r)=>t.createCompile(r)},extensions:["scss"],editor:"style"},{name:"sass",title:"Sass",compiler:"scss",extensions:["sass"],editor:"style"},{name:"less",title:"Less",parser:{name:"less",pluginUrls:[b.postcss]},compiler:{url:"vendor/less/less.js",factory:t=>t.render},extensions:["less"],editor:"style"},{name:"stylus",title:"Stylus",compiler:{url:"vendor/stylus/stylus.min.js",factory:()=>window.stylus.render,umd:!0},extensions:["styl"],editor:"style"},{name:"javascript",title:"JS",longTitle:"JavaScript",parser:{name:"babel",pluginUrls:[b.babel,b.html]},extensions:["js"],editor:"script"},{name:"typescript",title:"TS",longTitle:"TypeScript",parser:{name:"babel-ts",pluginUrls:[b.babel,b.html]},compiler:{url:"vendor/typescript/typescript.min.js",factory:t=>t.transpile},extensions:["ts"],editor:"script"},{name:"jsx",title:"JSX",parser:{name:"babel",pluginUrls:[b.babel,b.html]},compiler:"typescript",extensions:["jsx"],editor:"script"},{name:"tsx",title:"TSX",parser:{name:"babel",pluginUrls:[b.babel,b.html]},compiler:"typescript",extensions:["tsx"],editor:"script"},{name:"coffeescript",title:"Coffee",longTitle:"CoffeeScript",compiler:{url:"vendor/coffeescript/coffeescript.js",factory:()=>window.CoffeeScript.compile,umd:!0},extensions:["coffee"],editor:"script"}],u=t=>{let r=t?.toLowerCase();return L.find(e=>e.name===r||e.title.toLowerCase()===r||e.extensions.map(s=>s.toLowerCase()).includes(r))?.name},f=t=>L.find(r=>r.name===u(t))?.editor,k=t=>{let r=document.createElement("textarea");return r.innerHTML=t,r.value},j=(...t)=>t.reduce((r,e)=>(...s)=>e(r(...s))),E=t=>Object.keys(t).reduce((r,e)=>{let s=u(e);if(!s)return r;let l=f(s);return!l||r[l]?r:{...r,[l]:{language:s,selector:t[e]}}},{}),F=(t,r)=>{let e=t.querySelector(r);return e?k(e?.innerHTML||""):void 0},I=async(t,r,e)=>{let s;try{s=await fetch(t).then(p=>p.text())}catch(p){return console.error("Error fetching "+t),{}}let l=new DOMParser,a=l.parseFromString(s,"text/html"),g=L.map(p=>p.name).reduce((p,o)=>({...p,[o]:`.localpen [data-lang="${o}"]`}),{}),i=["markup","style","script"].reduce((p,o)=>e[o].language&&e[o].selector?{...p,[o]:{language:e[o].language,selector:e[o].selector}}:p,{}),d={...E(g),...i,...E(r)},c=Object.keys(d).reduce((p,o)=>{let n=F(a,d[o].selector);return n===void 0?p:{...p,[o]:{language:d[o].language,content:n}}},{});if(Object.keys(c).length<3){let p=Object.keys(g).reduce((o,n)=>{let m=f(n);if(!m||c[m])return o;let h=F(a,g[n]);return h===void 0?o:{...o,[m]:{language:n,content:h}}},{});return{...c,...p}}return c};var q=["https://github.com/","github.com/"],G=(t,r=q)=>{if(!r.map(e=>t.startsWith(e)).some(Boolean))return;try{let e=$(t),s=e.pathname.split("/");return s[3]==="blob"}catch(e){return}},$=t=>t.startsWith("https://")?new URL(t):new URL("https://"+t),Z=t=>{let r=t.pathname.split("/"),e=r[1],s=r[2],l=r[4],a=r.slice(5,r.length).join("/"),g=a.split(".")[a.split(".").length-1]||"md",i=t.hash.split("-"),d=t.hash!==""?Number(i[0].replace("#L","")):-1,c=t.hash!==""&&i.length>1?Number(i[1].replace("L","")):d,p=`https://raw.githubusercontent.com/${e}/${s}/${l}/${a}`;return{rawURL:p,extension:g,startLine:d,endLine:c}},Y=async t=>{let{rawURL:r,extension:e,startLine:s,endLine:l}=t;try{let a=await fetch(r).then(c=>c.text()),g=s>0?a.split(`
`).slice(s-1,l).join(`
`):a,i=u(e)||"html",d=f(i)||"markup";return{[d]:{language:i,content:g},language:i}}catch(a){return console.error("Cannot fetch: "+r),{}}},R=j($,Z,Y),y=t=>{try{return t.startsWith("https://")?new URL(t):new URL("https://"+t)}catch(r){return}},x=(t,r)=>{let e=Object.keys(r).some(u);return e?Object.keys(r).reduce((s,l)=>{let a=u(l);if(!a)return s;let g=t.find(d=>d?.filename===r[l]);if(!g)return s;let i=f(a);return!i||s[i]?s:{...s,[i]:{language:a,content:g.content}}},{}):t.sort((s,l)=>L.findIndex(a=>a.name===s.language)-L.findIndex(a=>a.name===l.language)).reduce((s,l)=>!l?.editorId||s[l.editorId]?s:{...s,[l.editorId]:{language:l.language,content:l.content}},{})},v={github:["https://github.com/","github.com/"],githubGist:["https://gist.github.com/","gist.github.com/"],gitlab:["https://gitlab.com/","gitlab.com/"]},T=(t,r=v.github)=>{if(!r.map(e=>t.startsWith(e)).some(Boolean))return;try{let e=K(t),s=e.pathname.split("/");return s[3]==="tree"}catch(e){return}},K=t=>t.startsWith("https://")?new URL(t):new URL("https://"+t),D=async(t,r)=>{try{let e=t.startsWith("https://")?new URL(t):new URL("https://"+t),s=e.pathname.split("/"),l=s[1],a=s[2],g=s[4],i=s.slice(5,s.length).join("/"),d=`https://api.github.com/repos/${l}/${a}/git/trees/${g}?recursive=true`,c=await fetch(d).then(n=>n.json()).then(n=>n.tree),p=c.filter(n=>n.type==="blob"&&n.path.startsWith(i)&&n.path.split("/").length===i.split("/").length+1),o=await Promise.all(Object.values(p).map(async n=>{let m=n.path.split("/")[n.path.split("/").length-1],h=m.split(".")[m.split(".").length-1]||"md",w=u(h)||"md",U=f(w),C=atob(await fetch(n.url).then(S=>S.json()).then(S=>S.content));return{filename:m,language:w,content:C,editorId:U}}));return x(o,r)}catch(e){return console.error("Cannot fetch directory: "+t),console.error(e),{}}},O=(t,r=v.githubGist)=>r.map(e=>t.startsWith(e)).some(Boolean),A=async(t,r)=>{try{let e=y(t);if(!e)return{};let s=e.pathname.split("/"),l=s[s.length-1],a=await fetch(`https://api.github.com/gists/${l}`).then(o=>o.json()).then(o=>o.files).then(o=>Object.values(o).map(n=>{let m=n.filename.endsWith(".babel")?"jsx":n.filename.endsWith(".typescript")?"typescript":n.language,h=n.filename.split(".")[n.filename.split(".").length-1],w=u(m)||u(h);return{...n,language:w}})),g=Object.values(a).map(o=>({filename:o.filename,language:o.language,content:o.content,editorId:f(o.language)})),i=[],d=g.find(o=>o.filename==="styles");if(d)try{let o=new DOMParser,n=o.parseFromString(d.content,"text/html");n.querySelectorAll("link").forEach(m=>{try{i.push(new URL(m.href).href)}catch(h){}})}catch(o){}let c=[],p=g.find(o=>o.filename==="scripts");if(p)try{let o=new DOMParser,n=o.parseFromString(p.content,"text/html");n.querySelectorAll("script").forEach(m=>{try{c.push(new URL(m.src).href)}catch(h){}})}catch(o){}return{...x(g,r),stylesheets:i,scripts:c}}catch(e){return console.error("Cannot fetch gist: "+t),console.error(e),{}}},M=(t,r=v.gitlab)=>{if(!r.map(e=>t.startsWith(e)).some(Boolean))return;try{let e=y(t);if(!e)return;let s=e.pathname.split("/");return s[4]==="blob"}catch(e){return}},Q=async t=>{let r=t.pathname.split("/"),e=r[1],s=r[2],l=r[5],a=r.slice(6,r.length).join("/"),g=a.split(".")[a.split(".").length-1]||"md",i=t.hash.split("-"),d=t.hash!==""?Number(i[0].replace("#L","")):-1,c=t.hash!==""&&i.length>1?Number(i[1].replace("L","")):d,p=await fetch(`${t.origin}/api/v4/projects/${e}%2F${s}`).then(n=>n.json()).then(n=>n.id),o=`${t.origin}/api/v4/projects/${p}/repository/files/${encodeURIComponent(a)}/raw?ref=${l}`;return{rawURL:o,extension:g,startLine:d,endLine:c}},tt=async t=>{let{rawURL:r,extension:e,startLine:s,endLine:l}=await t;try{let a=await fetch(r).then(c=>c.text()),g=s>0?a.split(`
`).slice(s-1,l).join(`
`):a,i=u(e)||"html",d=f(i)||"markup";return{[d]:{language:i,content:g},language:i}}catch(a){return console.error("Cannot fetch: "+r),console.error(a),{}}},W=j(y,Q,tt),B=(t,r=v.gitlab)=>{if(!r.map(e=>t.startsWith(e)).some(Boolean))return;try{let e=y(t);if(!e)return;let s=e.pathname.split("/");return s[4]==="tree"}catch(e){return}},H=async(t,r)=>{try{let e=y(t);if(!e)return{};let s=e.pathname.split("/"),l=s[1],a=s[2],g=s[5],i=await fetch(`${e.origin}/api/v4/projects/${l}%2F${a}`).then(n=>n.json()).then(n=>n.id),d=s.slice(6,s.length).join("/"),c=`${e.origin}/api/v4/projects/${i}/repository/tree?per_page=100&path=${d}`,p=await fetch(c).then(n=>n.json()).then(n=>n.filter(m=>m.type==="blob")),o=await Promise.all(Object.values(p).map(async n=>{let m=n.path.split("/")[n.path.split("/").length-1],h=m.split(".")[m.split(".").length-1]||"md",w=u(h);if(!w)return{};let U=f(w),C=`${e.origin}/api/v4/projects/${i}/repository/files/${encodeURIComponent(n.path)}/raw?ref=${g}`,S=await fetch(C).then(X=>X.text());return{filename:m,language:w,content:S,editorId:U}}));return x(o,r)}catch(e){return console.error("Cannot fetch directory: "+t),console.error(e),{}}},N=(t,r=v.gitlab)=>{if(!r.map(l=>t.startsWith(l)).some(Boolean))return;let e=y(t);if(!e)return;let s=e.pathname.split("/");return s[s.length-2]==="snippets"},J=async(t,r)=>{try{let e=y(t);if(!e)return{};let s=e.pathname.split("/"),l=s[s.length-1],a=await fetch(`${e.origin}/api/v4/snippets/${l}`).then(i=>i.json()).then(i=>i.files),g=await Promise.all(Object.values(a).map(async i=>{let d=i.path,c=u(d.split(".")[d.split(".").length-1]||"md"),p=await fetch(`${e.origin}/api/v4/snippets/${l}/files/master/${encodeURIComponent(d)}/raw`).then(o=>o.text());return{filename:d,language:c,content:p,editorId:f(c)}}));return x(g,r)}catch(e){return console.error("Cannot fetch snippet: "+e),{}}},_=async(t,r,e)=>O(t)?A(t,r):T(t)?D(t,r):G(t)?R(t):N(t)?J(t,r):B(t)?H(t,r):M(t)?W(t):t?I(t,r,e):Promise.resolve({});var P={baseUrl:"/localpen/",title:"Untitled Project",autoupdate:!0,autosave:!1,delay:500,emmet:!0,autoprefixer:!0,mode:"full",editor:{fontSize:14,theme:"vs-dark",formatOnType:!1,tabSize:2,lineNumbersMinChars:3,minimap:{enabled:!1},scrollbar:{useShadows:!1},mouseWheelZoom:!0,automaticLayout:!0},allowLangChange:!0,language:"html",markup:{language:"html",content:"",contentUrl:"",selector:""},style:{language:"css",content:"",contentUrl:"",selector:""},script:{language:"javascript",content:"",contentUrl:"",selector:""},stylesheets:[],scripts:[],cssPreset:"",modules:[]},et={editor:{readOnly:!0,lineNumbers:!1},autoupdate:!1},z=async(t={})=>{let r=window.location.hash.substring(1),e=Object.fromEntries(new URLSearchParams(location.search));Object.keys(e).forEach(n=>{e[n]===""&&(e[n]=!0),e[n]==="true"&&(e[n]=!0),e[n]==="false"&&(e[n]=!1)});let s=e.config||"./localpen.json",l=s?await fetch(s).then(n=>n.json()).catch(()=>({})):{},a=Object.keys(P).reduce((n,m)=>(n[m]=e[m],n),{});Object.keys(e).forEach(n=>{let m=u(n);if(!m)return;let h=f(m);if(h&&!a[h]){let w=typeof e[n]=="string"?k(decodeURIComponent(e[n])):m===t[h]?.language?t[h]?.content:m===l[h]?.language?l[h]?.content:m===P[h]?.language?P[h]?.content:"";a[h]={language:m,content:w},a.language=a.language||m}}),Object.keys(a).forEach(n=>{a[n]===void 0&&delete a[n]});let g=a.mode||t.mode||l.mode||P.mode,i=g==="codeblock"?et:{editor:{}},d={...P.editor,...i.editor,...l.editor,...t.editor,...a.editor},c={...P,...i,...l,...t,...a,editor:d};delete c.editor.language,delete c.editor.value;let p=await Promise.all([c.markup,c.style,c.script].map(n=>n.contentUrl&&!n.content?fetch(n.contentUrl).then(m=>m.text()):Promise.resolve(n.content)));c.markup.content=p[0],c.style.content=p[1],c.script.content=p[2];let o=await _(r,e,c);return c={...c,...o},c},V=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LocalPen</title>
    <style>
      body {
        overflow: hidden;
      }
    </style>
    <link rel="stylesheet" href="{{baseUrl}}assets/localpen.css" />
  </head>
  <body>
    <div id="container">
      <div id="toolbar">
        <div id="logo">
          <a href="#" title="LocalPen: code pens that run locally!"
            ><img src="{{baseUrl}}assets/images/localpen-logo.svg" width="50"
          /></a>
        </div>
        <div id="select-editor">
          <ul>
            <li id="markup-selector" class="editor-title" data-editor="markup">
              <span>HTML</span>
              <button onclick="event.stopPropagation();">
                <img
                  width="20"
                  height="20"
                  style="filter: invert(1)"
                  src="{{baseUrl}}assets/images/down_arrow.svg"
                />
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a href="#" data-editor="markup" data-lang="html">HTML</a>
                </li>
                <li>
                  <a href="#" data-editor="markup" data-lang="markdown">Markdown</a>
                </li>
                <li>
                  <a href="#" data-editor="markup" data-lang="pug">Pug</a>
                </li>
                <li>
                  <a href="#" data-editor="markup" data-lang="asciidoc">AsciiDoc</a>
                </li>
              </ul>
            </li>
            <li id="style-selector" class="editor-title" data-editor="style">
              <span>CSS</span>
              <button onclick="event.stopPropagation();">
                <img
                  width="20"
                  height="20"
                  style="filter: invert(1)"
                  src="{{baseUrl}}assets/images/down_arrow.svg"
                />
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a href="#" data-editor="style" data-lang="css">CSS</a>
                </li>
                <li>
                  <a href="#" data-editor="style" data-lang="scss">SCSS</a>
                </li>
                <li>
                  <a href="#" data-editor="style" data-lang="sass">Sass</a>
                </li>
                <li>
                  <a href="#" data-editor="style" data-lang="less">Less</a>
                </li>
                <li>
                  <a href="#" data-editor="style" data-lang="stylus">Stylus</a>
                </li>
              </ul>
            </li>
            <li id="script-selector" class="editor-title" data-editor="script">
              <span>JS</span>
              <button onclick="event.stopPropagation();">
                <img
                  width="20"
                  height="20"
                  style="filter: invert(1)"
                  src="{{baseUrl}}assets/images/down_arrow.svg"
                />
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a href="#" data-editor="script" data-lang="javascript" title="JavaScript"
                    >JavaScript</a
                  >
                </li>
                <li>
                  <a href="#" data-editor="script" data-lang="typescript" title="TypeScript"
                    >TypeScript</a
                  >
                </li>
                <li>
                  <a href="#" data-editor="script" data-lang="jsx" title="JSX">JSX</a>
                </li>
                <!-- <li>
                  <a href="#" data-editor="script" data-lang="tsx" title="TSX">TSX</a>
                </li> -->
                <li>
                  <a href="#" data-editor="script" data-lang="coffeescript" title="CoffeeScript"
                    >CoffeeScript</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div id="project-title" contenteditable="true">Untitled Project</div>
        <div id="buttons">
          <button id="run-button" title="Format & Run (Ctrl/Cmd + Enter)">
            <img width="20" height="20" src="{{baseUrl}}assets/images/play.svg" />
          </button>
          <button id="settings-button" title="Settings">
            <img width="20" height="20" src="{{baseUrl}}assets/images/gear.png" />
          </button>
          <div id="settings-menu-container">
            <ul id="settings-menu" class="dropdown-menu">
              <li>
                <a href="#" id="new-link">New</a>
              </li>
              <li>
                <a href="#" id="open-link">Open</a>
              </li>
              <li>
                <a href="#" id="save-link">Save</a>
              </li>
              <li>
                <a href="#" id="save-as">Save as</a>
                <ul class="dropdown-menu submenu" id="save-as-menu">
                  <li>
                    <a href="#" id="fork-link">Fork (New Project)</a>
                  </li>
                  <li>
                    <a href="#" id="template-link">Template</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" id="import-link">Import</a>
              </li>
              <li>
                <a href="#" id="export">Export</a>
                <ul class="dropdown-menu submenu" id="export-menu">
                  <li>
                    <a href="#" id="export-json">Export Project (JSON)</a>
                  </li>
                  <li>
                    <a href="#" id="export-src">Export Source (ZIP)</a>
                  </li>
                  <li>
                    <a href="#" id="export-result">Export Result (HTML)</a>
                  </li>
                  <li>
                    <a href="#" id="export-codepen">Edit in CodePen</a>
                  </li>
                  <li>
                    <a href="#" id="export-jsfiddle">Edit in JSFiddle</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" id="external-resources-link">External CSS/JS</a>
              </li>
              <li>
                <a href="#" id="css-preset-link">CSS Preset</a>
                <ul class="dropdown-menu submenu" id="css-preset-menu">
                  <li>
                    <a href="#" data-preset="">None</a>
                  </li>
                  <li>
                    <a href="#" data-preset="normalize.css">Normalize.css</a>
                  </li>
                  <li>
                    <a href="#" data-preset="reset-css">CSS reset</a>
                  </li>
                  <li>
                    <a href="#" data-preset="github-markdown-css">github-markdown-css</a>
                  </li>
                  <li>
                    <a href="#" data-preset="asciidoctor.css">Asciidoctor CSS</a>
                  </li>
                </ul>
              </li>
              <li>
                <label class="switch">
                  <span>Auto update</span>
                  <div>
                    <input id="autoupdate" type="checkbox" data-config="autoupdate" />
                    <span class="slider round"></span>
                  </div>
                </label>
              </li>
              <li>
                <label class="switch">
                  <span>Auto save</span>
                  <div>
                    <input id="autosave" type="checkbox" data-config="autosave" />
                    <span class="slider round"></span>
                  </div>
                </label>
              </li>
              <li>
                <label class="switch">
                  <span>Enable Emmet</span>
                  <div>
                    <input id="emmet" type="checkbox" data-config="emmet" />
                    <span class="slider round"></span>
                  </div>
                </label>
              </li>
              <li>
                <label class="switch">
                  <span>Enable Autoprefixer</span>
                  <div>
                    <input id="autoprefixer" type="checkbox" data-config="autoprefixer" />
                    <span class="slider round"></span>
                  </div>
                </label>
              </li>
              <li>
                <a href="https://github.com/hatemhosny/localpen/" target="_blank">About</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="editor-container">
        <div id="editors">
          <div id="markup"></div>
          <div id="style"></div>
          <div id="script"></div>
        </div>
        <div id="result"></div>
      </div>
    </div>
    <div id="notifications" class="hidden" style="display: none"></div>
    <div id="overlay" style="display: none"></div>
    <div id="modal-container" style="display: none">
      <div id="modal"></div>
    </div>
    <script type="module">
      import { app } from '{{baseUrl}}app.js';
      window.app = app;
    </script>
  </body>
</html>
`,rt=async(t,r={})=>new Promise(async e=>{let s=document.querySelector(t);if(!s)throw new Error(`Cannot find element with the selector: "${t}"`);let l=await z(r),{baseUrl:a}=l;window.addEventListener("hashchange",()=>{try{new URL(location.hash.substr(1)),window.location.reload()}catch(d){}});let g=document.createElement("style");g.innerHTML=`
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
    `,document.body.appendChild(g);let i=document.createElement("iframe");i.style.display="none",s.appendChild(i),i.contentWindow?.document.open(),i.contentWindow?.document.write(V.replace(/{{baseUrl}}/g,a)),i.contentWindow?.document.close(),i.addEventListener("load",async()=>{let d=i.contentWindow?.app;if(typeof d=="function"){let c=await d(l);i.style.display="block";let p=window.__localpenEmbed;typeof p=="function"&&p(),e(c)}})});export{rt as localpen};
