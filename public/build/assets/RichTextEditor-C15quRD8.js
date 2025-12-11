import{d as o,Y as c,j as n,_ as b}from"./vendor-BnbgrNvg.js";import{M as q}from"./MediaPicker-Bs1F3hOt.js";c.register("modules/resize",b);function k({value:i,onChange:d,placeholder:m="Start writing...",className:u="",error:l}){const a=o.useRef(null),e=o.useRef(null),[f,s]=o.useState(!1),g=r=>{if(r&&e.current){const t=e.current.getSelection(!0);e.current.insertEmbed(t.index,"image",r.url),e.current.setSelection(t.index+1)}s(!1)};return o.useEffect(()=>{if(!a.current||e.current)return;const r=function(){s(!0)},t=new c(a.current,{theme:"snow",placeholder:m,modules:{toolbar:{container:[[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],[{align:[]}],["link","image","video"],[{color:[]},{background:[]}],["blockquote","code-block"],["clean"]],handlers:{image:r}},resize:{locale:{}},clipboard:{matchVisual:!1}}});return e.current=t,i&&(t.root.innerHTML=i),t.on("text-change",()=>{const h=t.root.innerHTML;d&&d(h)}),()=>{e.current=null}},[]),o.useEffect(()=>{if(e.current&&i!==e.current.root.innerHTML){const r=e.current.getSelection();e.current.root.innerHTML=i||"",r&&e.current.setSelection(r)}},[i]),n.jsxs("div",{className:u,children:[n.jsx("div",{ref:a,className:l?"border-red-500 rounded-lg":""}),l&&n.jsx("p",{className:"mt-1 text-sm text-red-600",children:l}),n.jsx(q,{open:f,onClose:()=>s(!1),onSelect:g,multiple:!1,accept:"image",folder:"articles"}),n.jsx("style",{children:`
                .quill {
                    background: white;
                }
                .ql-container {
                    min-height: 300px;
                    font-size: 16px;
                    font-family: inherit;
                }
                .ql-editor {
                    min-height: 300px;
                }
                .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                }
                .ql-toolbar {
                    background: #f9fafb;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }
                .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                }
                .ql-editor img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }
                .ql-editor h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 1.5rem 0 1rem;
                }
                .ql-editor h2 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin: 1.25rem 0 0.75rem;
                }
                .ql-editor h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 1rem 0 0.5rem;
                }
                .ql-editor h4 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin: 1rem 0 0.5rem;
                }
                .ql-editor p {
                    margin-bottom: 1rem;
                    line-height: 1.75;
                }
                .ql-editor ul,
                .ql-editor ol {
                    margin-bottom: 1rem;
                }
                .ql-editor li {
                    line-height: 1.75;
                }
                .ql-editor blockquote {
                    border-left: 4px solid #e5e7eb;
                    padding-left: 1rem;
                    margin: 1rem 0;
                    color: #6b7280;
                }
                .ql-editor pre.ql-syntax {
                    background: #1f2937;
                    color: #f9fafb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1rem 0;
                }
                .ql-snow .ql-picker.ql-header {
                    width: 100px;
                }
            `})]})}export{k as R};
