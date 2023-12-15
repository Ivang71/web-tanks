var H=Object.defineProperty;var R=(i,t,e)=>t in i?H(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var v=(i,t,e)=>(R(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();var C=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var i=0,t=arguments.length;t--;)i+=arguments[t]*arguments[t];return Math.sqrt(i)});function B(){var i=new C(9);return C!=Float32Array&&(i[1]=0,i[2]=0,i[3]=0,i[5]=0,i[6]=0,i[7]=0),i[0]=1,i[4]=1,i[8]=1,i}function Y(i){var t=new C(9);return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t}function P(i,t,e){var s=t[0],n=t[1],r=t[2],o=t[3],h=t[4],d=t[5],u=t[6],m=t[7],p=t[8],c=e[0],g=e[1];return i[0]=s,i[1]=n,i[2]=r,i[3]=o,i[4]=h,i[5]=d,i[6]=c*s+g*o+u,i[7]=c*n+g*h+m,i[8]=c*r+g*d+p,i}function X(i,t,e){var s=t[0],n=t[1],r=t[2],o=t[3],h=t[4],d=t[5],u=t[6],m=t[7],p=t[8],c=Math.sin(e),g=Math.cos(e);return i[0]=g*s+c*o,i[1]=g*n+c*h,i[2]=g*r+c*d,i[3]=g*o-c*s,i[4]=g*h-c*n,i[5]=g*d-c*r,i[6]=u,i[7]=m,i[8]=p,i}function G(i,t,e){var s=e[0],n=e[1];return i[0]=s*t[0],i[1]=s*t[1],i[2]=s*t[2],i[3]=n*t[3],i[4]=n*t[4],i[5]=n*t[5],i[6]=t[6],i[7]=t[7],i[8]=t[8],i}function N(i,t,e){return i[0]=2/t,i[1]=0,i[2]=0,i[3]=0,i[4]=-2/e,i[5]=0,i[6]=-1,i[7]=1,i[8]=1,i}class O{constructor(t){v(this,"id",Math.random());this.position=t}}const U=(i,t,e)=>{const s=F(i,i.VERTEX_SHADER,t),n=F(i,i.FRAGMENT_SHADER,e);if(!s||!n)throw"Failed to load shader";const r=i.createProgram();if(!r)throw"Failed to create shader program";return i.attachShader(r,s),i.attachShader(r,n),i.linkProgram(r),i.getProgramParameter(r,i.LINK_STATUS)||alert(`Unable to initialize the shader program: ${i.getProgramInfoLog(r)}`),r},F=(i,t,e)=>{const s=i.createShader(t);if(!s)throw"failed to create shader";return i.shaderSource(s,e),i.compileShader(s),i.getShaderParameter(s,i.COMPILE_STATUS)?s:(alert(`An error occurred compiling the shaders: ${i.getShaderInfoLog(s)}`),i.deleteShader(s),null)};function j(i){const t=i.clientWidth,e=i.clientHeight,s=i.width!==t||i.height!==e;return s&&(i.width=t,i.height=e),s}var K=`#version 300 es

in vec2 a_position;

uniform mat3 u_matrix;

void main() {
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
}`,W=`#version 300 es

precision highp float;

uniform vec4 u_color;

out vec4 outColor;

void main() {
    outColor = u_color;
}`;class J{constructor(){v(this,"gl");v(this,"program");v(this,"renderQueue",[]);v(this,"positionAttribLoc");v(this,"positionBuffer");v(this,"vao");v(this,"colorLoc");v(this,"matrixLoc");const e=document.querySelector("#canvas").getContext("webgl2");this.gl=e,this.program=U(e,K,W),this.positionAttribLoc=e.getAttribLocation(this.program,"a_position"),this.positionBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.positionBuffer),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),e.enableVertexAttribArray(this.positionAttribLoc),this.colorLoc=e.getUniformLocation(this.program,"u_color"),this.matrixLoc=e.getUniformLocation(this.program,"u_matrix")}render(){if(this.renderQueue.length<1)return;const t=this.gl,e=t.canvas;j(e),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.useProgram(this.program),t.bindVertexArray(this.vao);const s=B();N(s,e.clientWidth,e.clientHeight);for(const n of this.renderQueue){const r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,n.vertices,t.DYNAMIC_DRAW),t.vertexAttribPointer(this.positionAttribLoc,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(this.positionAttribLoc),t.bufferSubData(t.ARRAY_BUFFER,0,n.vertices),t.uniform4f(this.colorLoc,...n.color);const o=Y(s);P(o,o,n.position),X(o,o,n.rotation),G(o,o,n.size),t.uniformMatrix3fv(this.matrixLoc,!1,o),t.drawArrays(t.TRIANGLES,0,n.vertices.length/2),t.deleteBuffer(r)}this.renderQueue=[]}enqueue(t){this.renderQueue.push(t)}}const k=new J;class Q extends O{constructor(t,e,s=[.7,.7,.7,1],n=new Float32Array,r=[5.5,5.5],o=0){super(t),this.position=t,this.velocity=e,this.color=s,this.vertices=n,this.size=r,this.rotation=o;const h=this.size[0]/2,d=12;this.vertices=q(h,d)}update(t){const e=this.velocity[0]*t,s=this.velocity[1]*t;this.position[0]+=e,this.position[1]+=s,k.enqueue(this)}render(){}}function q(i,t){const e=[];for(let s=0;s<=t;s++){const n=s/t*Math.PI;for(let r=0;r<=t;r++){const o=r/t*2*Math.PI,h=i*Math.sin(n)*Math.cos(o),d=i*Math.sin(n)*Math.sin(o),u=i*Math.cos(n);e.push(h,d,u)}}return new Float32Array(e)}class Z extends O{constructor(t,e=[10,10],s=0,n=0,r=0,o=3,h=100,d=!0,u=!1,m=1e3,p=B(),c=new Float32Array,g=[.3,.5,.5,1]){super(t),this.size=e,this.rotation=s,this.speed=n,this.rotationSpeed=r,this.maxSpeed=o,this.health=h,this.isAlive=d,this.isCooldown=u,this.cooldown=m,this.transform=p,this.vertices=c,this.color=g,this.updateVertices(),y.add({posiitonX:400},"posiitonX",-100,1e3).onChange(A=>this.position[0]=A),y.add({positionY:400},"positionY",-100,1e3).onChange(A=>this.position[1]=A),y.add(this,"rotation",0,Math.PI),y.add({sizeX:10},"sizeX",-30,30).onChange(A=>this.size[0]=A),y.add({sizeY:10},"sizeY",-30,30).onChange(A=>this.size[1]=A)}update(t){this.position[0]+=Math.cos(this.rotation)*this.speed,this.position[1]+=Math.sin(this.rotation)*this.speed,Math.abs(this.speed)>0&&(this.speed=this.speed*.93),this.rotation+=this.rotationSpeed,Math.abs(this.rotationSpeed)>.001?this.rotationSpeed*=.83:this.rotationSpeed=0,k.enqueue(this)}rotate(t){this.rotationSpeed+=t}accelerate(t){this.speed+Math.abs(t)>this.maxSpeed||(this.speed=Math.sign(t)*this.maxSpeed)}fire(){if(this.isCooldown)return;this.isCooldown=!0,setTimeout(()=>this.isCooldown=!1,this.cooldown);const t=90,e=.4,s=[e*Math.cos(this.rotation),e*Math.sin(this.rotation)],n=[this.position[0]+t*Math.cos(this.rotation),this.position[1]+t*Math.sin(this.rotation)];return new Q(n,s)}render(){}updateVertices(){const t=-this.size[0]/2,e=this.size[0]/2,s=-this.size[1]/2,n=this.size[1]/2,r=e+this.size[0]*.6,o=s+this.size[1]/3,h=n-this.size[1]/3;this.vertices=new Float32Array([t,s,e,s,t,n,t,n,e,s,e,n,e,o,r,o,e,h,e,h,r,o,r,h])}}class tt{constructor(){v(this,"keys",{});v(this,"mouse",{x:0,y:0});addEventListener("keydown",t=>{this.keys[t.code]=!0}),addEventListener("keyup",t=>{delete this.keys[t.code]}),addEventListener("mousemove",t=>{this.mouse.x=t.clientX,this.mouse.y=t.clientY})}updateUserTank(t){this.keys.KeyW&&t.accelerate(.4),this.keys.KeyS&&t.accelerate(-.4),this.keys.KeyA&&t.rotate(-.007),this.keys.KeyD&&t.rotate(.007),this.keys.Space&&S.fireTank(t)}}const et=new tt;class it{constructor(){v(this,"entities",[]);v(this,"userTank",null)}tick(t){this.userTank&&et.updateUserTank(this.userTank);for(const e of this.entities)e.update(t)}createTank(t,e,...s){const n=new Z(t,...s);this.entities.push(n),e&&(this.userTank=n)}fireTank(t){const e=t.fire();e&&this.entities.push(e)}}const S=new it;/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.18.2
 * @author George Michael Brower
 * @license MIT
 */class b{constructor(t,e,s,n,r="div"){this.parent=t,this.object=e,this.property=s,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("name"),b.nextNameID=b.nextNameID||0,this.$name.id=`lil-gui-name-${++b.nextNameID}`,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(s)}name(t){return this._name=t,this.$name.innerHTML=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.object[this.property]=t,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class st extends b{constructor(t,e,s){super(t,e,s,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function L(i){let t,e;return(t=i.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const nt={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:L,toHexString:L},_={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},rt={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,t,e=1){const s=_.fromHexString(i);t[0]=(s>>16&255)/255*e,t[1]=(s>>8&255)/255*e,t[2]=(s&255)/255*e},toHexString([i,t,e],s=1){s=255/s;const n=i*s<<16^t*s<<8^e*s<<0;return _.toHexString(n)}},ot={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,t,e=1){const s=_.fromHexString(i);t.r=(s>>16&255)/255*e,t.g=(s>>8&255)/255*e,t.b=(s&255)/255*e},toHexString({r:i,g:t,b:e},s=1){s=255/s;const n=i*s<<16^t*s<<8^e*s<<0;return _.toHexString(n)}},lt=[nt,_,rt,ot];function at(i){return lt.find(t=>t.match(i))}class ht extends b{constructor(t,e,s,n){super(t,e,s,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=at(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=L(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class $ extends b{constructor(t,e,s){super(t,e,s,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class dt extends b{constructor(t,e,s,n,r,o){super(t,e,s,"number"),this._initInput(),this.min(n),this.max(r);const h=o!==void 0;this.step(h?o:this._getImplicitStep(),h),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let l=parseFloat(this.$input.value);isNaN(l)||(this._stepExplicit&&(l=this._snap(l)),this.setValue(this._clamp(l)))},s=l=>{const f=parseFloat(this.$input.value);isNaN(f)||(this._snapClampSetValue(f+l),this.$input.value=this.getValue())},n=l=>{l.key==="Enter"&&this.$input.blur(),l.code==="ArrowUp"&&(l.preventDefault(),s(this._step*this._arrowKeyMultiplier(l))),l.code==="ArrowDown"&&(l.preventDefault(),s(this._step*this._arrowKeyMultiplier(l)*-1))},r=l=>{this._inputFocused&&(l.preventDefault(),s(this._step*this._normalizeMouseWheel(l)))};let o=!1,h,d,u,m,p;const c=5,g=l=>{h=l.clientX,d=u=l.clientY,o=!0,m=this.getValue(),p=0,window.addEventListener("mousemove",A),window.addEventListener("mouseup",w)},A=l=>{if(o){const f=l.clientX-h,x=l.clientY-d;Math.abs(x)>c?(l.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(f)>c&&w()}if(!o){const f=l.clientY-u;p-=f*this._step*this._arrowKeyMultiplier(l),m+p>this._max?p=this._max-m:m+p<this._min&&(p=this._min-m),this._snapClampSetValue(m+p)}u=l.clientY},w=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",A),window.removeEventListener("mouseup",w)},E=()=>{this._inputFocused=!0},a=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",g),this.$input.addEventListener("focus",E),this.$input.addEventListener("blur",a)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(a,l,f,x,I)=>(a-l)/(f-l)*(I-x)+x,e=a=>{const l=this.$slider.getBoundingClientRect();let f=t(a,l.left,l.right,this._min,this._max);this._snapClampSetValue(f)},s=a=>{this._setDraggingStyle(!0),e(a.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",r)},n=a=>{e(a.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",r)};let o=!1,h,d;const u=a=>{a.preventDefault(),this._setDraggingStyle(!0),e(a.touches[0].clientX),o=!1},m=a=>{a.touches.length>1||(this._hasScrollBar?(h=a.touches[0].clientX,d=a.touches[0].clientY,o=!0):u(a),window.addEventListener("touchmove",p,{passive:!1}),window.addEventListener("touchend",c))},p=a=>{if(o){const l=a.touches[0].clientX-h,f=a.touches[0].clientY-d;Math.abs(l)>Math.abs(f)?u(a):(window.removeEventListener("touchmove",p),window.removeEventListener("touchend",c))}else a.preventDefault(),e(a.touches[0].clientX)},c=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",c)},g=this._callOnFinishChange.bind(this),A=400;let w;const E=a=>{if(Math.abs(a.deltaX)<Math.abs(a.deltaY)&&this._hasScrollBar)return;a.preventDefault();const f=this._normalizeMouseWheel(a)*this._step;this._snapClampSetValue(this.getValue()+f),this.$input.value=this.getValue(),clearTimeout(w),w=setTimeout(g,A)};this.$slider.addEventListener("mousedown",s),this.$slider.addEventListener("touchstart",m,{passive:!1}),this.$slider.addEventListener("wheel",E,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:s}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,s=-t.wheelDelta/120,s*=this._stepExplicit?1:10),e+-s}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){const e=Math.round(t/this._step)*this._step;return parseFloat(e.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class ct extends b{constructor(t,e,s,n){super(t,e,s,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(n)?n:Object.values(n),this._names=Array.isArray(n)?n:Object.keys(n),this._names.forEach(r=>{const o=document.createElement("option");o.innerHTML=r,this.$select.appendChild(o)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.innerHTML=e===-1?t:this._names[e],this}}class ut extends b{constructor(t,e,s){super(t,e,s,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const pt=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function gt(i){const t=document.createElement("style");t.innerHTML=i;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let D=!1;class M{constructor({parent:t,autoPlace:e=t===void 0,container:s,width:n,title:r="Controls",closeFolders:o=!1,injectStyles:h=!0,touchStyles:d=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",u=>{(u.code==="Enter"||u.code==="Space")&&(u.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),d&&this.domElement.classList.add("allow-touch-styles"),!D&&h&&(gt(pt),D=!0),s?s.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=o}add(t,e,s,n,r){if(Object(s)===s)return new ct(this,t,e,s);const o=t[e];switch(typeof o){case"number":return new dt(this,t,e,s,n,r);case"boolean":return new st(this,t,e);case"string":return new ut(this,t,e);case"function":return new $(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,o)}addColor(t,e,s=1){return new ht(this,t,e,s)}addFolder(t){const e=new M({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(s=>{s instanceof $||s._name in t.controllers&&s.load(t.controllers[s._name])}),e&&t.folders&&this.folders.forEach(s=>{s._title in t.folders&&s.load(t.folders[s._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(s=>{if(!(s instanceof $)){if(s._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${s._name}"`);e.controllers[s._name]=s.save()}}),t&&this.folders.forEach(s=>{if(s._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${s._title}"`);e.folders[s._title]=s.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const s=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",s))};this.$children.addEventListener("transitionend",s);const n=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(t){return this._title=t,this.$title.innerHTML=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(s=>s.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}const mt=M,y=new mt({width:400});S.createTank([400,400],!0);let V=Date.now()-16,z=0;const T=i=>{z=i-V,V=i,S.tick(z),k.render(),requestAnimationFrame(T)};requestAnimationFrame(T);
