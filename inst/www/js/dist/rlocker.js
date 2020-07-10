/*! License information can be found in rlocker.js.LICENSES.txt */
!function(e){var t={};function __webpack_require__(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(__webpack_require__.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)__webpack_require__.d(n,r,function(t){return e[t]}.bind(null,r));return n},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(e,t,n){"use strict";n.r(t);var r={generate:function(){for(var e=[],t=0;t<256;t++)e[t]=(t<16?"0":"")+t.toString(16);var n=4294967295*Math.random()|0,r=4294967295*Math.random()|0,i=4294967295*Math.random()|0,a=4294967295*Math.random()|0;return e[255&n]+e[n>>8&255]+e[n>>16&255]+e[n>>24&255]+"-"+e[255&r]+e[r>>8&255]+"-"+e[r>>16&15|64]+e[r>>24&255]+"-"+e[63&i|128]+e[i>>8&255]+"-"+e[i>>16&255]+e[i>>24&255]+e[255&a]+e[a>>8&255]+e[a>>16&255]+e[a>>24&255]}};if("undefined"==typeof ADL)throw"Error: ADL Wrapper not defined";if(void 0===r)throw"Error: UUID Generator not defined";class rlocker_Locker{constructor(e){this.debug=!0,this.config=e||{base_url:"http://localhost:8000/xapi/",auth:"Basic "+toBase64("abcd:1234")},this.config.endpoint=(this.config.base_url+"/data/xAPI/").replace(/([^:]\/)\/+/g,"$1"),this.session={id:null,launched:null},this.agent=null,this.activity=null,this.init()}init(){ADL.XAPIWrapper.changeConfig(this.config),this.setSession(),this.setCurrentAgent("mailto:default@example.org"),this.setCurrentActivity(window.location.href,document.title),this.experienced_xAPI()}setSession(){let e="0000-0000-0000-0000";try{e=ADL.XAPIWrapper.lrs.agent.name}catch(t){t instanceof ReferenceError&&(e=r.generate())}if("undefined"!=typeof Storage){e!=sessionStorage.getItem("sid")?(sessionStorage.setItem("sid",e),this.session.launched=!0):this.session.launched=!1}else this.session.launched=!0;this.session.id=e}getSession(){return this.session}dateToLocalISO(e){const t=e.getTimezoneOffset(),n=Math.abs(t);return new Date(e.getTime()-60*t*1e3).toISOString().substr(0,23)+(t>0?"-":"+")+(n/60).toFixed(0).padStart(2,"0")+":"+(n%60).toString().padStart(2,"0")}store(e){let t=this.debug;ADL.XAPIWrapper.sendStatement(e,(function(e,n){return t&&(200!=e.status?console.error(e):console.info(n)),Shiny.onInputChange("storageStatus",e.status),n}))}setCurrentAgent(e,t=this.session.id){this.agent=new ADL.XAPIStatement.Agent(ADL.XAPIWrapper.hash(e),t)}getCurrentAgent(){return this.agent}setCurrentActivity(e,t){this.activity=new ADL.XAPIStatement.Activity(e,t)}getCurrentActivity(){return this.activity}getVerb(e,t){return new ADL.XAPIStatement.Verb(e,t)}createBasicStatement(e,t="http://adlnet.gov/expapi/verbs/"+e){let n=new ADL.XAPIStatement(this.getCurrentAgent(),this.getVerb(t,e),this.getCurrentActivity());return n.timestamp=this.dateToLocalISO(new Date),n}createStatement(e){let t=new ADL.XAPIStatement(this.getCurrentAgent(),new ADL.XAPIStatement.Verb(e.verb),new ADL.XAPIStatement.Activity(e.object));return t.timestamp=this.dateToLocalISO(new Date),t.result=e.result,t}experienced_xAPI(){let e=this.session.launched?"launched":"experienced";this.store(this.createBasicStatement(e)),this.session.launched=!1}terminated_xAPI(){this.store(this.createBasicStatement("terminated"))}completed_xAPI(){this.store(this.createBasicStatement("completed"))}answered_xAPI(e,t,n,r){let i=t.attempt?t.attempt:1,a=this.activity.id+"#"+e,s=this.activity.definition.name["en-US"]+" :: "+e,o=this.getCurrentAgent(),c=this.getVerb("http://adlnet.gov/expapi/verbs/answered","answered"),u=new ADL.XAPIStatement.Activity(a,s),_=new ADL.XAPIStatement(o,c,u);return _.object.definition.type="http://adlnet.gov/expapi/activities/interaction",_.object.definition.interactionType=t.interactionType,_.object.definition.correctResponsesPattern=[JSON.stringify(t.validateOn),t.answers.toString()],_.result={success:r,response:String(n),extensions:{"http://adlnet.gov/expapi/verbs/attempted":i.toString()}},this.store(_),_}interacted_xAPI(e){let t=this.activity.id+"#"+e,n=this.activity.definition.name["en-US"]+" :: "+e,r=this.getCurrentAgent(),i=this.getVerb("http://adlnet.gov/expapi/verbs/interacted","interacted"),a=new ADL.XAPIStatement.Activity(t,n),s=new ADL.XAPIStatement(r,i,a);s.object.definition.type="http://adlnet.gov/expapi/activities/interaction",s.object.definition.interactionType="other",this.store(s)}}var i=i||{};Shiny.addCustomMessageHandler("rlocker-setup",(function(e){i=new rlocker_Locker(e)})),Shiny.addCustomMessageHandler("rlocker-store",(function(e){let t=i.createStatement(e);i.store(t)})),Shiny.addCustomMessageHandler("create-statement",(function(e){let t=i.createBasicStatement(e.verb.display["en-US"]);i.store(t)}))}]);