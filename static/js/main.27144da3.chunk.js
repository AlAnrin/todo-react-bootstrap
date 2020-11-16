(this["webpackJsonpsome-react-app"]=this["webpackJsonpsome-react-app"]||[]).push([[0],{17:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var r=n(0),o=(n(17),n(2)),a=n.n(o),c=n(13),i=n.n(c),s=n(1),u=n.n(s),d=n(3),l=n(11),b=n(6),h=n(7),j=n(4),f=n(9),g=n(8),p=n(5);function O(e){var t=Object(o.useState)(""),n=Object(p.a)(t,2),a=n[0],c=n[1],i=Object(o.useState)({color:"",code:""}),s=Object(p.a)(i,2),u=s[0],d=s[1];return Object(r.jsxs)("div",{className:"p-1",children:[Object(r.jsx)("h4",{className:"mt-1 ml-1",children:"\u0421\u043c\u0435\u043d\u0438\u0442\u044c \u0444\u043e\u043d: "}),Object(r.jsxs)("div",{className:"input-group",children:[Object(r.jsx)("input",{type:"text",className:"form-control",value:a,onChange:function(e){return c(e.target.value)},"aria-describedby":"backgroundInput"}),Object(r.jsx)("div",{className:"input-group-append",children:Object(r.jsx)("button",{className:"btn btn-secondary",onClick:function(){return e.changeBackground(a)},type:"button",id:"button-addon2",children:"Load"})})]}),Object(r.jsx)("h4",{className:"mt-1 ml-1",children:"\u0438\u043b\u0438 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442: "}),Object(r.jsx)("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap"},children:[{color:"Soft pink",code:"#ce6991"},{color:"Blue",code:"#5e76c4"},{color:"Orange",code:"#ffb432"},{color:"Green",code:"#69d452"},{color:"Purple",code:"#b721d0"}].map((function(t){return Object(r.jsx)("div",{onClick:function(){d(t),e.changeBackground(t)},className:u.code===t.code?"active-color-card color-card":"color-card",style:{background:t.code}},t.code)}))})]})}function m(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("button",{type:"button",onClick:function(){return e.changeSettingsOpen()},className:"btn btn-sm m-1 position-absolute close-settings-btn",children:Object(r.jsx)("svg",{width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",className:"bi bi-x svg-close-settings-btn",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:Object(r.jsx)("path",{"fill-rule":"evenodd",d:"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"})})}),Object(r.jsx)("div",{className:"mt-4",children:Object(r.jsx)(O,{changeBackground:e.changeBackground})})]})}var v=n(14),x=Object(v.a)("store",6,{upgrade:function(e){e.objectStoreNames.contains("settings")||e.createObjectStore("settings",{keyPath:"name",autoIncrement:!1}).createIndex("value","value",{unique:!1});if(!e.objectStoreNames.contains("dirs")){var t=e.createObjectStore("dirs",{keyPath:"id",autoIncrement:!0});t.createIndex("title","title",{unique:!1}),t.createIndex("order","order",{unique:!1})}if(!e.objectStoreNames.contains("todos")){var n=e.createObjectStore("todos",{keyPath:"id",autoIncrement:!0});n.createIndex("title","title",{unique:!1}),n.createIndex("describe","describe",{unique:!1}),n.createIndex("data","data",{unique:!1}),n.createIndex("dir_id","dir_id",{unique:!1}),n.createIndex("order","order",{unique:!1})}}}),k=function(e,t){return Object(d.a)(u.a.mark((function n(){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x;case 2:return n.abrupt("return",n.sent.get(e,t));case 3:case"end":return n.stop()}}),n)})))()},y=function(e){return Object(d.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x;case 2:return t.abrupt("return",t.sent.getAll(e));case 3:case"end":return t.stop()}}),t)})))()},w=function(e,t){return Object(d.a)(u.a.mark((function n(){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x;case 2:return n.abrupt("return",n.sent.add(e,t));case 3:case"end":return n.stop()}}),n)})))()},S=function(e,t){return Object(d.a)(u.a.mark((function n(){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x;case 2:return n.abrupt("return",n.sent.put(e,t));case 3:case"end":return n.stop()}}),n)})))()},D=function(e,t){return Object(d.a)(u.a.mark((function n(){return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x;case 2:return n.abrupt("return",n.sent.delete(e,t));case 3:case"end":return n.stop()}}),n)})))()},N=function(e){return Object(d.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x;case 2:return t.abrupt("return",t.sent.clear(e));case 3:case"end":return t.stop()}}),t)})))()};function I(e){var t=Object(o.useState)(!1),n=Object(p.a)(t,2),a=n[0],c=n[1],i=Object(o.useState)(e.obj.title),s=Object(p.a)(i,2),u=s[0],d=s[1];function l(){e.obj.title=u,S(e.table,e.obj).then((function(){c(!1),k(e.table,e.obj.id).then((function(e){d(e.title)}))}))}return Object(o.useEffect)((function(){document.getElementById(e.id)&&document.getElementById(e.id).focus()})),Object(r.jsxs)("div",{className:"todos"===e.table?"todo-card p-1 m-1 draggable":"dir-title p-1",id:e.id,onDragStart:function(t){return function(e,t){e.dataTransfer.setData("obj",t.id)}(t,e.obj)},draggable:"todos"===e.table,children:[a?Object(r.jsx)("input",{id:e.id,type:"text",className:"form-control title-input",onBlur:function(){return c(!1),void l()},onKeyUp:function(e){return function(e){"Enter"===e.key&&l()}(e)},onChange:function(e){return d(e.target.value)},value:u}):Object(r.jsx)("div",{className:"title-span",id:"title-span"+e.id,onClick:function(){c(!0)},children:u}),Object(r.jsx)("div",{className:"spacer"}),Object(r.jsx)("button",{type:"button",onClick:function(){e.deleteObj(e.obj.id)},className:"delete-button btn",children:Object(r.jsx)("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-x",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:Object(r.jsx)("path",{d:"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"})})})]})}function B(e){return Object(r.jsx)(r.Fragment,{children:0!==e.dirs.length&&e.dirs.map((function(t){return Object(r.jsxs)("div",{className:"directory-card p-2 m-2 droppable",onDrop:function(n){return e.onDrop(n,t)},onDragOver:function(t){return e.onDragOver(t)},children:[Object(r.jsx)(I,{table:"dirs",deleteObj:e.deleteDir,obj:t.dir,id:"dirs"+t.dir.id}),Object(r.jsx)("div",{className:"todos-scroll",children:t.todos.map((function(n){return Object(r.jsx)(I,{table:"todos",deleteObj:e.deleteTodo,obj:n,id:"todos/dir"+t.dir.id+"/todo:"+n.id},"todo"+n.id)}))}),Object(r.jsx)("button",{type:"button",className:"btn btn-outline-primary m-1",onClick:function(){return e.addNewTODO(t)},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})]},t.dir.id)}))})}var C=function(e){Object(f.a)(n,e);var t=Object(g.a)(n);function n(e){var r;return Object(b.a)(this,n),(r=t.call(this,e)).state={isOpenSettings:!1,db:x,dirs:[],background_url:"",background_color:""},r.changeBackground=r.changeBackground.bind(Object(j.a)(r)),r.addNewTODO=r.addNewTODO.bind(Object(j.a)(r)),r.deleteDir=r.deleteDir.bind(Object(j.a)(r)),r.deleteToDo=r.deleteToDo.bind(Object(j.a)(r)),r.clear=r.clear.bind(Object(j.a)(r)),r.onDrop=r.onDrop.bind(Object(j.a)(r)),r}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.updateDirs(),y("settings").then((function(t){var n,r=Object(l.a)(t);try{for(r.s();!(n=r.n()).done;){var o=n.value;"url"===o.name&&e.setState({background_url:o.value,background_color:""},(function(){e.changeStyleRoot()})),"color"===o.name&&e.setState({background_url:"",background_color:o.value},(function(){e.changeStyleRoot()}))}}catch(a){r.e(a)}finally{r.f()}}))}},{key:"updateDirs",value:function(){var e=this;y("dirs").then((function(t){y("todos").then((function(n){var r,o=[],a=Object(l.a)(t);try{var c=function(){var e=r.value;o.push({dir:e,todos:n.filter((function(t){return t.dir_id===e.id})).sort((function(e,t){return e.order-t.order}))})};for(a.s();!(r=a.n()).done;)c()}catch(i){a.e(i)}finally{a.f()}o.sort((function(e,t){return e.order-t.order})),e.setState({dirs:o})}))}))}},{key:"addNewDir",value:function(){var e=this;w("dirs",{title:"New list",order:this.state.dirs.length}).then((function(){return e.updateDirs()}))}},{key:"addNewTODO",value:function(e){var t=this;w("todos",{title:"New todo",describe:"new",data:(new Date).toISOString(),dir_id:e.dir.id,order:e.todos.length}).then((function(){return t.updateDirs()}))}},{key:"deleteDir",value:function(e){var t=this;D("dirs",e).then((function(){return t.updateDirs()}))}},{key:"deleteToDo",value:function(e){var t=this;D("todos",e).then((function(){return t.updateDirs()}))}},{key:"clear",value:function(){var e=Object(d.a)(u.a.mark((function e(){var t=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N("todos").then((function(){return N("dirs").then((function(){return t.updateDirs()}))}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"setNewSettingsPanelPosition",value:function(){var e=this;this.setState((function(e){return{isOpenSettings:!e.isOpenSettings}}),(function(){e.state.isOpenSettings&&(document.getElementById("settings").style.animation="open-settings-panel 1s")}))}},{key:"changeSettingsOpenState",value:function(){var e=this;this.state.isOpenSettings?(document.getElementById("settings").style.animation="close-settings-panel 1s",setTimeout((function(){return e.setNewSettingsPanelPosition()}),1e3)):this.setNewSettingsPanelPosition()}},{key:"changeStyleRoot",value:function(){var e=document.getElementById("root");e.style.backgroundImage="none",e.style.background="transparent",this.state.background_color&&(e.style.background=this.state.background_color),this.state.background_url&&(e.style.backgroundImage="url(".concat(this.state.background_url,")"))}},{key:"changeBackground",value:function(e){var t=this;D("settings","url"),D("settings","color"),e instanceof Object?(this.setState({background_url:"",background_color:e.code}),w("settings",{name:"color",value:e.code}).then((function(){return t.changeStyleRoot()}))):(this.setState({background_url:e}),w("settings",{name:"url",value:e}).then((function(){return t.changeStyleRoot()})),this.changeSettingsOpenState())}},{key:"onDragOver",value:function(e){e.preventDefault()}},{key:"onDrop",value:function(e,t){var n=this,r=+e.dataTransfer.getData("obj");k("todos",r).then((function(o){if(o.dir_id!==t.dir.id)o.dir_id=t.dir.id,o.order=t.todos.length,S("todos",o).then((function(){return n.updateDirs()}));else{var a=e.target.id;if(a){var c=+a.split(":")[1];c!==r&&k("todos",c).then((function(e){var r=0;o.order=e.order+1,t.todos.find((function(e){return e.id===o.id})).order=e.order+1,t.todos=t.todos.sort((function(e,t){return e.order<t.order?-1:e.order>t.order?1:e.order===t.order?e.id===o.id?-1:1:0}));var a,c=[],i=Object(l.a)(t.todos);try{for(i.s();!(a=i.n()).done;){var s=a.value;s.order=r,c.push(S("todos",s)),r++}}catch(u){i.e(u)}finally{i.f()}Promise.all(c).then((function(){return n.updateDirs()}))}))}}}))}},{key:"render",value:function(){var e=this;return Object(r.jsx)("div",{className:"container-xl",children:Object(r.jsxs)(r.Fragment,{children:[this.state.isOpenSettings&&Object(r.jsx)("div",{id:"settings",className:"settings-panel position-absolute",children:Object(r.jsx)(m,{changeBackground:this.changeBackground,changeSettingsOpen:function(){return e.changeSettingsOpenState()}})}),Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{className:"row",children:[Object(r.jsx)("button",{type:"button",className:"btn btn-outline-primary m-2",onClick:function(){return e.addNewDir()},children:"\u041d\u043e\u0432\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a"}),Object(r.jsx)("button",{type:"button",className:"btn btn-outline-primary m-2",onClick:function(){return e.clear()},children:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0432\u0441\u0435"}),Object(r.jsx)("div",{className:"spacer"}),Object(r.jsx)("button",{type:"button",onClick:function(){return e.changeSettingsOpenState()},className:"btn btn-outline-primary m-2",children:Object(r.jsx)("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-toggles",children:Object(r.jsx)("svg",{width:"1em",height:"1em",viewBox:"0 0 16 16",className:"bi bi-toggles",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:Object(r.jsx)("path",{d:"M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"})})})})]}),Object(r.jsx)("div",{className:"row directories-scroll",children:Object(r.jsx)(B,{onDrop:this.onDrop,onDragOver:this.onDragOver,deleteDir:this.deleteDir,deleteTodo:this.deleteToDo,addNewTODO:this.addNewTODO,clear:this.clear,dirs:this.state.dirs})})]})]})})}}]),n}(a.a.Component),_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,23)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),o(e),a(e),c(e)}))},T=function(e){Object(f.a)(n,e);var t=Object(g.a)(n);function n(e){var r;return Object(b.a)(this,n),(r=t.call(this,e)).state={error:null,errorInfo:null},r}return Object(h.a)(n,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"render",value:function(){return this.state.errorInfo?Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Something went wrong."}),Object(r.jsxs)("details",{style:{whiteSpace:"pre-wrap"},children:[this.state.error&&this.state.error.toString(),Object(r.jsx)("br",{}),this.state.errorInfo.componentStack]})]}):this.props.children}}]),n}(a.a.Component);i.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(T,{children:Object(r.jsx)(C,{})})}),document.getElementById("root")),_(console.log)}},[[22,1,2]]]);
//# sourceMappingURL=main.27144da3.chunk.js.map