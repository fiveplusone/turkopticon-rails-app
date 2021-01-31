/**
 * Extend jquery with a scrollspy plugin.
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.1.2
 */
!function(t){/**
	 * Find elements that are within the boundary
	 * @param {number} top
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} left
	 * @return {jQuery}		A collection of elements
	 */
function n(n,e,o,r){var l=t();return t.each(i,function(t,i){var u=i.offset().top,c=i.offset().left,f=c+i.width(),a=u+i.height(),s=!(c>e||r>f||u>o||n>a);s&&l.push(i)}),l}/**
	 * Called when the user scrolls the window
	 */
function e(){
// unique tick id
++f;
// viewport rectangle
var e=l.scrollTop(),o=l.scrollLeft(),r=o+l.width(),i=e+l.height(),c=n(e+a.top,r+a.right,i+a.bottom,o+a.left);t.each(c,function(t,n){var e=n.data("scrollSpy:ticks");"number"!=typeof e&&
// entered into view
n.triggerHandler("scrollSpy:enter"),
// update tick id
n.data("scrollSpy:ticks",f)}),
// determine which elements are no longer in view
t.each(u,function(t,n){var e=n.data("scrollSpy:ticks");"number"==typeof e&&e!==f&&(
// exited from view
n.triggerHandler("scrollSpy:exit"),n.data("scrollSpy:ticks",null))}),
// remember elements in view for next tick
u=c}/**
	 * Called when window is resized
	*/
function o(){l.trigger("scrollSpy:winSize")}/**
	 * Returns a function, that, when invoked, will only be triggered at most once
	 * during a given window of time. Normally, the throttled function will run
	 * as much as it can, without ever going more than once per `wait` duration;
	 * but if you'd like to disable the execution on the leading edge, pass
	 * `{leading: false}`. To disable execution on the trailing edge, ditto.
	 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @param {function} func
	 * @param {number} wait
	 * @param {Object=} options
	 * @returns {Function}
	 */
function r(t,n,e){var o,r,l,i=null,u=0;e||(e={});var c=function(){u=e.leading===!1?0:s(),i=null,l=t.apply(o,r),o=r=null};return function(){var f=s();u||e.leading!==!1||(u=f);var a=n-(f-u);return o=this,r=arguments,0>=a?(clearTimeout(i),i=null,u=f,l=t.apply(o,r),o=r=null):i||e.trailing===!1||(i=setTimeout(c,a)),l}}var l=t(window),i=[],u=[],c=!1,f=0,a={top:0,right:0,bottom:0,left:0},s=Date.now||function(){return(new Date).getTime()};/**
	 * Enables ScrollSpy using a selector
	 * @param {jQuery|string} selector  The elements collection, or a selector
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
t.scrollSpy=function(n,o){n=t(n),n.each(function(n,e){i.push(t(e))}),o=o||{throttle:100},a.top=o.offsetTop||0,a.right=o.offsetRight||0,a.bottom=o.offsetBottom||0,a.left=o.offsetLeft||0;var u=r(e,o.throttle||100),f=function(){t(document).ready(u)};
// perform a scan once, after current execution context, and after dom is ready
return c||(l.on("scroll",f),l.on("resize",f),c=!0),setTimeout(f,0),n},/**
	 * Listen for window resize events
	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
	 * @returns {jQuery}		$(window)
	 */
t.winSizeSpy=function(n){// lock from multiple calls
return t.winSizeSpy=function(){return l},n=n||{throttle:100},l.on("resize",r(o,n.throttle||100))},/**
	 * Enables ScrollSpy on a collection of elements
	 * e.g. $('.scrollSpy').scrollSpy()
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
t.fn.scrollSpy=function(n){return t.scrollSpy(t(this),n)}}(jQuery);
/*!
 * wordcloud2.js
 * http://timdream.org/wordcloud2.js/
 *
 * Copyright 2011 - 2013 Tim Chien
 * Released under the MIT license
 */
"use strict";
// setImmediate
window.setImmediate||(window.setImmediate=function(){
// fallback
return window.msSetImmediate||window.webkitSetImmediate||window.mozSetImmediate||window.oSetImmediate||function(){if(!window.postMessage||!window.addEventListener)return null;var t=[void 0],e="zero-timeout-message",r=function(r){var a=t.length;return t.push(r),window.postMessage(e+a.toString(36),"*"),a};/* specify clearImmediate() here since we need the scope */
return window.addEventListener("message",function(r){
// Skipping checking event source, retarded IE confused this window
// object with another in the presence of iframe
if("string"==typeof r.data&&r.data.substr(0,e.length)===e){r.stopImmediatePropagation();var a=parseInt(r.data.substr(e.length),36);t[a]&&(t[a](),t[a]=void 0)}},!0),window.clearImmediate=function(e){t[e]&&(t[e]=void 0)},r}()||function(t){window.setTimeout(t,0)}}()),window.clearImmediate||(window.clearImmediate=function(){
// "clearZeroTimeout" is implement on the previous block ||
// fallback
return window.msClearImmediate||window.webkitClearImmediate||window.mozClearImmediate||window.oClearImmediate||function(t){window.clearTimeout(t)}}()),function(t){
// Check if WordCloud can run on this browser
var e=function(){var t=document.createElement("canvas");if(!t||!t.getContext)return!1;var e=t.getContext("2d");return e.getImageData&&e.fillText&&Array.prototype.some&&Array.prototype.push?!0:!1}(),r=function(){if(e){for(var t,r,a=document.createElement("canvas").getContext("2d"),o=20;o;){if(a.font=o.toString(10)+"px sans-serif",a.measureText("Ｗ").width===t&&a.measureText("m").width===r)return o+1;t=a.measureText("Ｗ").width,r=a.measureText("m").width,o--}return 0}}(),a=function(t){for(var e,r,a=t.length;a;e=Math.floor(Math.random()*a),r=t[--a],t[a]=t[e],t[e]=r);return t},o=function(t,o){function i(t,e){return"hsl("+(360*Math.random()).toFixed()+","+(30*Math.random()+70).toFixed()+"%,"+(Math.random()*(e-t)+t).toFixed()+"%)"}if(e){Array.isArray(t)||(t=[t]),t.forEach(function(e,r){if("string"==typeof e){if(t[r]=document.getElementById(e),!t[r])throw"The element id specified is not found."}else if(!e.tagName&&!e.appendChild)throw"You must pass valid HTML elements, or ID of the element."});/* Default values to be overwritten by options object */
var n={list:[],fontFamily:'"Trebuchet MS", "Heiti TC", "微軟正黑體", "Arial Unicode MS", "Droid Fallback Sans", sans-serif',fontWeight:"normal",color:"random-dark",minSize:0,// 0 to disable
weightFactor:1,clearCanvas:!0,backgroundColor:"#fff",// opaque white = rgba(255, 255, 255, 1)
gridSize:8,origin:null,drawMask:!1,maskColor:"rgba(255,0,0,0.3)",maskGapWidth:.3,wait:0,abortThreshold:0,// disabled
abort:function(){},minRotation:-Math.PI/2,maxRotation:Math.PI/2,shuffle:!0,rotateRatio:.1,shape:"circle",ellipticity:.65,classes:null,hover:null,click:null};if(o)for(var s in o)s in n&&(n[s]=o[s]);/* Convert weightFactor into a function */
if("function"!=typeof n.weightFactor){var l=n.weightFactor;n.weightFactor=function(t){return t*l}}/* Convert shape into a function */
if("function"!=typeof n.shape)switch(n.shape){case"circle":/* falls through */
default:
// 'circle' is the default and a shortcut in the code loop.
n.shape="circle";break;case"cardioid":n.shape=function(t){return 1-Math.sin(t)};break;/*

        To work out an X-gon, one has to calculate "m",
        where 1/(cos(2*PI/X)+m*sin(2*PI/X)) = 1/(cos(0)+m*sin(0))
        http://www.wolframalpha.com/input/?i=1%2F%28cos%282*PI%2FX%29%2Bm*sin%28
        2*PI%2FX%29%29+%3D+1%2F%28cos%280%29%2Bm*sin%280%29%29

        Copy the solution into polar equation r = 1/(cos(t') + m*sin(t'))
        where t' equals to mod(t, 2PI/X);

        */
case"diamond":case"square":
// http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
// %28t%2C+PI%2F2%29%29%2Bsin%28mod+%28t%2C+PI%2F2%29%29%29%2C+t+%3D
// +0+..+2*PI
n.shape=function(t){var e=t%(2*Math.PI/4);return 1/(Math.cos(e)+Math.sin(e))};break;case"triangle-forward":
// http://www.wolframalpha.com/input/?i=plot+r+%3D+1%2F%28cos%28mod+
// %28t%2C+2*PI%2F3%29%29%2Bsqrt%283%29sin%28mod+%28t%2C+2*PI%2F3%29
// %29%29%2C+t+%3D+0+..+2*PI
n.shape=function(t){var e=t%(2*Math.PI/3);return 1/(Math.cos(e)+Math.sqrt(3)*Math.sin(e))};break;case"triangle":case"triangle-upright":n.shape=function(t){var e=(t+3*Math.PI/2)%(2*Math.PI/3);return 1/(Math.cos(e)+Math.sqrt(3)*Math.sin(e))};break;case"pentagon":n.shape=function(t){var e=(t+.955)%(2*Math.PI/5);return 1/(Math.cos(e)+.726543*Math.sin(e))};break;case"star":n.shape=function(t){var e=(t+.955)%(2*Math.PI/10);return(t+.955)%(2*Math.PI/5)-2*Math.PI/10>=0?1/(Math.cos(2*Math.PI/10-e)+3.07768*Math.sin(2*Math.PI/10-e)):1/(Math.cos(e)+3.07768*Math.sin(e))}}/* Make sure gridSize is a whole number and is not smaller than 4px */
n.gridSize=Math.max(Math.floor(n.gridSize),4);/* shorthand */
var f,// 2d array containing filling information
d,c,// width and height of the grid
u,// position of the center of the cloud
h,m,v,g=n.gridSize,w=g-n.maskGapWidth,p=Math.abs(n.maxRotation-n.minRotation),M=Math.min(n.maxRotation,n.minRotation);switch(n.color){case"random-dark":v=function(){return i(10,50)};break;case"random-light":v=function(){return i(50,90)};break;default:"function"==typeof n.color&&(v=n.color)}/* function for getting the classes of the text */
var x=null;"function"==typeof n.classes&&(x=n.classes);/* Interactive */
var b,C=!1,y=[],I=function(t){var e,r,a=t.currentTarget,o=a.getBoundingClientRect();/** Detect if touches are available */
t.touches?(e=t.touches[0].clientX,r=t.touches[0].clientY):(e=t.clientX,r=t.clientY);var i=e-o.left,n=r-o.top,s=Math.floor(i*(a.width/o.width||1)/g),l=Math.floor(n*(a.height/o.height||1)/g);return y[s][l]},T=function(t){var e=I(t);if(b!==e)return b=e,e?void n.hover(e.item,e.dimension,t):void n.hover(void 0,void 0,t)},k=function(t){var e=I(t);e&&(n.click(e.item,e.dimension,t),t.preventDefault())},E=[],S=function(t){if(E[t])return E[t];
// Look for these number of points on each radius
var e=8*t,r=e,a=[];for(0===t&&a.push([u[0],u[1],0]);r--;){
// distort the radius to put the cloud in shape
var o=1;"circle"!==n.shape&&(o=n.shape(r/e*2*Math.PI)),
// Push [x, y, t]; t is used solely for getTextColor()
a.push([u[0]+t*o*Math.cos(-r/e*2*Math.PI),u[1]+t*o*Math.sin(-r/e*2*Math.PI)*n.ellipticity,r/e*2*Math.PI])}return E[t]=a,a},R=function(){return n.abortThreshold>0&&(new Date).getTime()-m>n.abortThreshold},P=function(){return 0===n.rotateRatio?0:Math.random()>n.rotateRatio?0:0===p?M:M+Math.random()*p},F=function(t,e,a){
// calculate the acutal font size
// fontSize === 0 means weightFactor function wants the text skipped,
// and size < minSize means we cannot draw the text.
var o=!1,i=n.weightFactor(e);if(i<=n.minSize)return!1;
// Scale factor here is to make sure fillText is not limited by
// the minium font size set by browser.
// It will always be 1 or 2n.
var s=1;r>i&&(s=function(){for(var t=2;r>t*i;)t+=2;return t}());var l=document.createElement("canvas"),f=l.getContext("2d",{willReadFrequently:!0});f.font=n.fontWeight+" "+(i*s).toString(10)+"px "+n.fontFamily;
// Estimate the dimension of the text with measureText().
var d=f.measureText(t).width/s,c=Math.max(i*s,f.measureText("m").width,f.measureText("Ｗ").width)/s,u=d+2*c,h=3*c,m=Math.ceil(u/g),v=Math.ceil(h/g);u=m*g,h=v*g;
// Calculate the proper offsets to make the text centered at
// the preferred position.
// This is simply half of the width.
var w=-d/2,p=.4*-c,M=Math.ceil((u*Math.abs(Math.sin(a))+h*Math.abs(Math.cos(a)))/g),x=Math.ceil((u*Math.abs(Math.cos(a))+h*Math.abs(Math.sin(a)))/g),b=x*g,C=M*g;l.setAttribute("width",b),l.setAttribute("height",C),o&&(
// Attach fcanvas to the DOM
document.body.appendChild(l),
// Save it's state so that we could restore and draw the grid correctly.
f.save()),
// Scale the canvas with |mu|.
f.scale(1/s,1/s),f.translate(b*s/2,C*s/2),f.rotate(-a),
// Once the width/height is set, ctx info will be reset.
// Set it again here.
f.font=n.fontWeight+" "+(i*s).toString(10)+"px "+n.fontFamily,
// Fill the text into the fcanvas.
// XXX: We cannot because textBaseline = 'top' here because
// Firefox and Chrome uses different default line-height for canvas.
// Please read https://bugzil.la/737852#c6.
// Here, we use textBaseline = 'middle' and draw the text at exactly
// 0.5 * fontSize lower.
f.fillStyle="#000",f.textBaseline="middle",f.fillText(t,w*s,(p+.5*i)*s);
// Get the pixels of the text
var y=f.getImageData(0,0,b,C).data;if(R())return!1;o&&(
// Draw the box of the original estimation
f.strokeRect(w*s,p,d*s,c*s),f.restore());for(
// Read the pixels and save the information to the occupied array
var I,T,k,E=[],S=x,P=[M/2,x/2,M/2,x/2];S--;)for(I=M;I--;){k=g;t:{for(;k--;)for(T=g;T--;)if(y[4*((I*g+k)*b+(S*g+T))+3]){E.push([S,I]),S<P[3]&&(P[3]=S),S>P[1]&&(P[1]=S),I<P[0]&&(P[0]=I),I>P[2]&&(P[2]=I),o&&(f.fillStyle="rgba(255, 0, 0, 0.5)",f.fillRect(S*g,I*g,g-.5,g-.5));break t}o&&(f.fillStyle="rgba(0, 0, 255, 0.5)",f.fillRect(S*g,I*g,g-.5,g-.5))}}
// Return information needed to create the text on the real canvas
return o&&(f.fillStyle="rgba(0, 255, 0, 0.5)",f.fillRect(P[3]*g,P[0]*g,(P[1]-P[3]+1)*g,(P[2]-P[0]+1)*g)),{mu:s,occupied:E,bounds:P,gw:x,gh:M,fillTextOffsetX:w,fillTextOffsetY:p,fillTextWidth:d,fillTextHeight:c,fontSize:i}},L=function(t,e,r,a,o){for(
// Go through the occupied points,
// return false if the space is not available.
var i=o.length;i--;){var n=t+o[i][0],s=e+o[i][1];if(n>=d||s>=c||0>n||0>s||!f[n][s])return!1}return!0},z=function(e,r,a,o,i,s,l,f,d){var c,u=a.fontSize;c=v?v(o,i,u,s,l):n.color;var h;h=x?x(o,i,u,s,l):n.classes;var m,w=a.bounds;m={x:(e+w[3])*g,y:(r+w[0])*g,w:(w[1]-w[3]+1)*g,h:(w[2]-w[0]+1)*g},t.forEach(function(t){if(t.getContext){var i=t.getContext("2d"),s=a.mu;
// Save the current state before messing it
i.save(),i.scale(1/s,1/s),i.font=n.fontWeight+" "+(u*s).toString(10)+"px "+n.fontFamily,i.fillStyle=c,
// Translate the canvas position to the origin coordinate of where
// the text should be put.
i.translate((e+a.gw/2)*g*s,(r+a.gh/2)*g*s),0!==f&&i.rotate(-f),
// Finally, fill the text.
// XXX: We cannot because textBaseline = 'top' here because
// Firefox and Chrome uses different default line-height for canvas.
// Please read https://bugzil.la/737852#c6.
// Here, we use textBaseline = 'middle' and draw the text at exactly
// 0.5 * fontSize lower.
i.textBaseline="middle",i.fillText(o,a.fillTextOffsetX*s,(a.fillTextOffsetY+.5*u)*s),
// The below box is always matches how <span>s are positioned
/* ctx.strokeRect(info.fillTextOffsetX, info.fillTextOffsetY,
            info.fillTextWidth, info.fillTextHeight); */
// Restore the state.
i.restore()}else{
// drawText on DIV element
var l=document.createElement("span"),m="";m="rotate("+-f/Math.PI*180+"deg) ",1!==a.mu&&(m+="translateX(-"+a.fillTextWidth/4+"px) scale("+1/a.mu+")");var v={position:"absolute",display:"block",font:n.fontWeight+" "+u*a.mu+"px "+n.fontFamily,left:(e+a.gw/2)*g+a.fillTextOffsetX+"px",top:(r+a.gh/2)*g+a.fillTextOffsetY+"px",width:a.fillTextWidth+"px",height:a.fillTextHeight+"px",lineHeight:u+"px",whiteSpace:"nowrap",transform:m,webkitTransform:m,msTransform:m,transformOrigin:"50% 40%",webkitTransformOrigin:"50% 40%",msTransformOrigin:"50% 40%"};c&&(v.color=c),l.textContent=o;for(var w in v)l.style[w]=v[w];if(d)for(var p in d)l.setAttribute(p,d[p]);h&&(l.className+=h),t.appendChild(l)}})},W=function(e,r,a,o,i){if(!(e>=d||r>=c||0>e||0>r)){if(f[e][r]=!1,a){var n=t[0].getContext("2d");n.fillRect(e*g,r*g,w,w)}C&&(y[e][r]={item:i,dimension:o})}},A=function(e,r,a,o,i,s){var l,f=i.occupied,d=n.drawMask;d&&(l=t[0].getContext("2d"),l.save(),l.fillStyle=n.maskColor);var c;if(C){var u=i.bounds;c={x:(e+u[3])*g,y:(r+u[0])*g,w:(u[1]-u[3]+1)*g,h:(u[2]-u[0]+1)*g}}for(var h=f.length;h--;)W(e+f[h][0],r+f[h][1],d,c,s);d&&l.restore()},D=function(t){var e,r,o;Array.isArray(t)?(e=t[0],r=t[1]):(e=t.word,r=t.weight,o=t.attributes);var i=P(),s=F(e,r,i);
// not getting the info means we shouldn't be drawing this one.
if(!s)return!1;if(R())return!1;
// Skip the loop if we have already know the bounding box of
// word is larger than the canvas.
var l=s.bounds;if(l[1]-l[3]+1>d||l[2]-l[0]+1>c)return!1;for(
// Determine the position to put the text by
// start looking for the nearest points
var f=h+1,u=function(a){var n=Math.floor(a[0]-s.gw/2),l=Math.floor(a[1]-s.gh/2),d=s.gw,c=s.gh;
// If we cannot fit the text at this position, return false
// and go to the next position.
// If we cannot fit the text at this position, return false
// and go to the next position.
// Actually put the text on the canvas
// Mark the spaces on the grid as filled
return L(n,l,d,c,s.occupied)?(z(n,l,s,e,r,h-f,a[2],i,o),A(n,l,d,c,s,t),!0):!1};f--;){var m=S(h-f);n.shuffle&&(m=[].concat(m),a(m));
// Try to fit the words by looking at each point.
// array.some() will stop and return true
// when putWordAtPoint() returns true.
// If all the points returns false, array.some() returns false.
var v=m.some(u);if(v)
// leave putWord() and return true
return!0}
// we tried all distances but text won't fit, return false
return!1},O=function(e,r,a){return r?!t.some(function(t){var o=document.createEvent("CustomEvent");return o.initCustomEvent(e,!0,r,a||{}),!t.dispatchEvent(o)},this):void t.forEach(function(t){var o=document.createEvent("CustomEvent");o.initCustomEvent(e,!0,r,a||{}),t.dispatchEvent(o)},this)},H=function(){
// For dimensions, clearCanvas etc.,
// we only care about the first element.
var e=t[0];if(e.getContext)d=Math.floor(e.width/g),c=Math.floor(e.height/g);else{var r=e.getBoundingClientRect();d=Math.floor(r.width/g),c=Math.floor(r.height/g)}
// Sending a wordcloudstart event which cause the previous loop to stop.
// Do nothing if the event is canceled.
if(O("wordcloudstart",!0)){
// Determine the center of the word cloud
u=n.origin?[n.origin[0]/g,n.origin[1]/g]:[d/2,c/2],
// Maxium radius to look for space
h=Math.floor(Math.sqrt(d*d+c*c)),/* Clear the canvas only if the clearCanvas is set,
         if not, update the grid to the current canvas state */
f=[];var a,o,i;if(!e.getContext||n.clearCanvas)for(t.forEach(function(t){if(t.getContext){var e=t.getContext("2d");e.fillStyle=n.backgroundColor,e.clearRect(0,0,d*(g+1),c*(g+1)),e.fillRect(0,0,d*(g+1),c*(g+1))}else t.textContent="",t.style.backgroundColor=n.backgroundColor}),/* fill the grid with empty state */
a=d;a--;)for(f[a]=[],o=c;o--;)f[a][o]=!0;else{/* Determine bgPixel by creating
           another canvas and fill the specified background color. */
var s=document.createElement("canvas").getContext("2d");s.fillStyle=n.backgroundColor,s.fillRect(0,0,1,1);var l=s.getImageData(0,0,1,1).data,v=e.getContext("2d").getImageData(0,0,d*g,c*g).data;a=d;for(var w,p;a--;)for(f[a]=[],o=c;o--;){p=g;t:for(;p--;)for(w=g;w--;)for(i=4;i--;)if(v[4*((o*g+p)*d*g+(a*g+w))+i]!==l[i]){f[a][o]=!1;break t}f[a][o]!==!1&&(f[a][o]=!0)}v=s=l=void 0}
// fill the infoGrid with empty state if we need it
if(n.hover||n.click){for(C=!0,/* fill the grid with empty state */
a=d+1;a--;)y[a]=[];n.hover&&e.addEventListener("mousemove",T),n.click&&(e.addEventListener("click",k),e.addEventListener("touchstart",k),e.addEventListener("touchend",function(t){t.preventDefault()}),e.style.webkitTapHighlightColor="rgba(0, 0, 0, 0)"),e.addEventListener("wordcloudstart",function F(){e.removeEventListener("wordcloudstart",F),e.removeEventListener("mousemove",T),e.removeEventListener("click",k),b=void 0})}i=0;var M,x;0!==n.wait?(M=window.setTimeout,x=window.clearTimeout):(M=window.setImmediate,x=window.clearImmediate);var I=function(e,r){t.forEach(function(t){t.addEventListener(e,r)},this)},E=function(e,r){t.forEach(function(t){t.removeEventListener(e,r)},this)},S=function L(){E("wordcloudstart",L),x(P)};I("wordcloudstart",S);var P=M(function z(){if(i>=n.list.length)return x(P),O("wordcloudstop",!1),void E("wordcloudstart",S);m=(new Date).getTime();var t=D(n.list[i]),e=!O("wordclouddrawn",!0,{item:n.list[i],drawn:t});return R()||e?(x(P),n.abort(),O("wordcloudabort",!1),O("wordcloudstop",!1),void E("wordcloudstart",S)):(i++,void(P=M(z,n.wait)))},n.wait)}};
// All set, start the drawing
H()}};o.isSupported=e,o.minFontSize=r,
// Expose the library as an AMD module
"function"==typeof t.define&&t.define.amd?t.define("wordcloud",[],function(){return o}):"undefined"!=typeof t.module&&t.module.exports?t.module.exports=o:t.WordCloud=o}(window);
!function(e,t){this.ExplorerViewFilters=jInterface.extend({init:function(t){this.options=e.extend(!0,ExplorerViewFilters.Defaults,t||{}),this._$menuBar=e("#explorer-nav"),e("[data-filter]",this._$menuBar).each(function(){var t=e(e(this).data("filter")),i=t.html();e(this).popover({placement:"bottom",html:!0,content:i,title:e(this).data("title")}),t.remove()}),this.$viewEditPane=e("#view-edit-pane"),this.$viewSwitchFilter=e(".js-switch-filter"),this.setupTips(),this.setupPanel()},setupPanel:function(){var t=this;this.$viewEditPane.off().on(Panel.Events.SHOW,function(){var i=t.$viewEditPane.find("form");i.off(FormSubmit.Events.AFTER_SUBMIT).on(FormSubmit.Events.AFTER_SUBMIT,function(i,a,n){n.filterMenu&&t._$menuBar.find(".js-filter-split").replaceWith(n.filterMenu),t.$viewEditPane.data().panel.hide(),t._trigger(ExplorerViewFilters.Events.FILTER_UPDATE),t.$viewSwitchFilter=e(".js-switch-filter"),t.setupPanel()}),new FormSubmit(i)}),
//switch current filters 
this.$viewSwitchFilter.off().on("click",function(i){Spinner.on();var a="/explorer/change-view-filter/id/"+e(this).data("pid"),n=e(this).data("filter"),r=e(this).text(),s=e(this).data("view"),l={filterID:n,"filter-name":r,view:s};i.preventDefault(),e.ajax({data:l,url:a,type:"POST"}).done(function(i,a,n){n.responseJSON.filterMenu&&t._$menuBar.find(".js-filter-split").replaceWith(n.responseJSON.filterMenu),t._trigger(ExplorerViewFilters.Events.FILTER_UPDATE),t.$viewSwitchFilter=e(".js-switch-filter"),t.setupPanel()}),Spinner.off()})},setupTips:function(){var t=this,i=function(e,i){var a=e.find(":submit");e.on("change",":input",function(){a.prop("disabled",!1)}).on("keyup",":input",function(){a.prop("disabled",!1)}),a.click(function(){a.prop("disabled",!0),i.hide()}),e.on(FormSubmit.Events.AFTER_SUBMIT,function(){t._trigger(ExplorerViewFilters.Events.FILTER_UPDATE)}),new FormSubmit(e)};e("#explorer-nav .js-response-filter").on("click",function(){var t=e(this).data("state"),i=e(this).data("id"),a=e(this).data("view");if("all"==t){var n=[];n.push("Complete"),n.push("Partial"),n.push("Disqualified"),data={"view-rsp-states[]":n,"include-test-data":!0,"view-real":!0}}else"deleted"==t&&(data={"view-rsp-states[]":"Deleted","include-test-data":!0,"view-real":!0});Spinner.on(),e.ajax({url:"/explorer/save-view/id/"+i+"/view/"+a,type:"post",data:data}).done(function(){document.location=document.location})}),
// Reponse status popover
e('[data-filter="#js-status-filters"]').on("shown.bs.popover",function(){if(!t.setupStatus){t.setupStatus=1;var a=e(this).data("bs.popover").$tip,n=(e(this),a.find(".js-resp-states"));n.on("change",function(){var t=[],i={Complete:SGAPI.util.translate("Complete"),Partial:SGAPI.util.translate("Partial"),Disqualified:SGAPI.util.translate("Disqualified"),Deleted:SGAPI.util.translate("Deleted")};n.filter(":checked").each(function(){t.push(i[e(this).val()])})}),i(a.find("form"),e(this).data("bs.popover"))}}),
//Restore Responses setup
e("#restoreDeleted").click(function(){var t=e(this).data("id");e("#pdf-progress").modal({show:!0,remote:"/Response/restoreprogress/id/"+t}),request=e.ajax({url:"/response/revert-all-BG/id/"+t+"/explorer/1",type:"post",data:e("form").serialize()})}),
//convert all test to real
e("#convertTestToReal").click(function(){var t=e(this).data("id");e(".js-page-select .active a").data("page-num");e.ajax({url:"/response/convert-test-responses/id/"+t,type:"post",data:e("form").serialize()}).done(function(t){(t.status="ok")&&(new AlertSuccess("All test responses have been marked as real!"),e(".testdata").hide())})}),
// Response date range popover
e('[data-filter="#js-date-filters"]').on("shown.bs.popover",function(){if(!t.setupDate){t.setupDate=1;var a=e(this).data("bs.popover").$tip,n=a.find('[name="date-range"]'),r=e(this),s=a.find("#filter-min-date-range"),l=a.find("#filter-max-date-range");n.on("change",function(){var t=e(this).val();"any"==t?r.text(SGAPI.util.translate("Anytime")):"custom"==t?r.text(SGAPI.util.translate("Custom")):Number(t)>0&&r.text(SGAPI.util.translate("Last "+t+" days"))});var o=new Date;o.setDate(o.getDate()),s.add(this._$maxDate).on("click",function(){n.last().prop("checked",!0).trigger("change")}),s.datepicker({maxDate:o}),l.datepicker({maxDate:new Date}),i(a.find("form"),e(this).data("bs.popover"))}})}}),ExplorerViewFilters.Defaults={},ExplorerViewFilters.Events={FILTER_UPDATE:"ExplorerViewFilters.filterupdate"},this.ExplorerDatePicker=function(t){
// Change event
function i(){if(n){var t=l.val()||"-1";
// Relative date
null!==a&&void 0!==a&&(t=JSON.stringify({relativeDate:!0,key:s[a]})),e("body").trigger("datechange",[l,t]),a=null}}var a,n=0,r=null,s=["today","yesterday","last7days","lastweek","monthtodate","lastmonth","yeartodate"],l=e("#filterdate");
// Init the datepicker
e(".dpt-i").removeClass("hide"),l.daterangepicker({onOpen:function(){e(".comiseo-daterangepicker-buttonpanel .ui-priority-primary").addClass("btn btn-primary"),e(".comiseo-daterangepicker-buttonpanel .ui-priority-secondary").addClass("btn btn-default");
// Add clear range button: "All Time"
var t=e(".comiseo-daterangepicker-presets .ui-menu-item");if(!t.filter(".clear-range").length){t=t.last();var n=t.clone().addClass("clear-range").insertAfter(t);e("a",n).text(T("All Time")).click(function(e){e.preventDefault(),l.daterangepicker("clearRange").daterangepicker("close"),i()})}
// Relative ranges
r||(r=1,e(".comiseo-daterangepicker-presets .ui-menu-item:not(.clear-range)").each(function(t){e("a",this).click({index:t},function(e){a=e.data.index})}))},initialText:T("All Time"),onChange:i,datepickerOptions:{minDate:null,maxDate:null}}),
// Init the date range
t&&(t.start||t.end)&&l.daterangepicker("setRange",{start:moment(t.start).toDate(),end:moment(t.end).toDate()}),n=1}}(jQuery,window);
!function(t,e){this.ExplorerChartOptions=jInterface.extend({init:function(){this.options=t.extend(!0,{},ExplorerChartOptions.Defaults,arguments[0]||{})},get:function(){function e(t,e){return t-e}if(this.options.elasticsearch){var a;try{a=this.getES()}catch(l){console.log(l,this.options)}return a}var o={},s=this.options;switch(s.type){
//!VBAR
case"vbar":case"areaspline":var n=[],i=[{name:"Data",type:"areaspline"==s.type?"areaspline":"column",count:[],data:[]}],r=s.data.group_colors||{},c=s.data.colors||{};if(s.data.values){var d=null,u=0,p=[];for(var h in s.data.values)p.push(h);p.sort(e);for(var h in p){var y=p[h];
// Segmented
if("object"==typeof s.data.values[y].count){n.push(y),d||(d={});for(var f in s.data.values[y].count){d[f]||(d[f]={name:f,count:[],data:[]},r[f]&&(d[f].color=r[f])),d[f].count.push(s.data.values[y].count[f]);var v=s.data.values[y].percent[f];v>u&&(u=v),d[f].data.push(v)}}else if(s.questOvw&&!s.qPrimary){n.push(y),d||(d={});for(var x in s.data.values[y])t.isPlainObject(s.data.values[y][x])&&(d[x]||(d[x]={name:x,percent:[],data:[]}),d[x].data.push({y:parseInt(s.data.values[y][x].percent),color:"#"+s.data.values[y][x].color}));u=u>=100?100:null}else// Not segmented
{
// Skip zeros if not an area chart
if(0==s.data.values[y].count&&"areaspline"!=s.type)continue;n.push(y),i[0].count.push(s.data.values[y].count);var v=s.data.values[y].percent;v>u&&(u=v);var _={y:v};c[y]&&(_.color=-1!=c[y].indexOf("#")?c[y]:"#"+c[y]),i[0].data.push(_)}}if(d){i=[];for(var g in d)i.push(d[g])}}"undefined"!=typeof i[0].data&&i[0].data.length>0||(i=[]),xMax=n.length>35&&"areaspline"!=s.type?35:n.length-1,o=t.extend(!0,{},ExplorerChartOptions.DefaultChartOptions.vbar,{chart:{type:"areaspline"==s.type?"areaspline":"column"},series:i,xAxis:{max:xMax,categories:n},yAxis:{max:u},scrollbar:{enabled:n.length>20?!0:!1},tooltip:{formatter:function(){var t=0,e="";"object"==typeof s.data.values[this.x].count?(e=this.series.name,t=s.data.values[this.x].count[e]):t=s.data.values[this.x].count;var a='<div style="text-align:center;"><b>'+(""!=e?e+" - ":"")+this.x+": "+this.y+"% ";return s&&s.show_counts&&(a+="("+t+")"),a+="</b></div>"}},legend:{enabled:null!=y&&void 0!=y&&s.data.values[y]&&"object"==typeof s.data.values[y].count}}),
// Area chart e.g. sliders
"areaspline"==s.type&&(o.chart||(o.chart={}),o.chart.defaultSeriesType="areaspline",o.xAxis.labels={maxStaggerLines:1,step:10});break;
//!HBAR
case"hbar":var n=[],i=[{name:"Data",count:[],data:[]}],r=s.data.group_colors||{},c=s.data.colors||{};if(s.data.values){for(var y in s.data.values)
// Segmented
if(n.push(y),"object"==typeof s.data.values[y].count){d||(d={});for(var f in s.data.values[y].count)d[f]||(d[f]={name:f,count:[],data:[]}),r[f]&&(d[f].color=r[f]),d[f].count.push(s.data.values[y].count[f]),d[f].data.push(s.data.values[y].percent[f])}else// Not segmented
{i[0].count.push(s.data.values[y].count);var _={y:s.data.values[y].percent};c[y]&&(_.color="#"+c[y]),i[0].data.push(_)}if(d){i=[];for(var g in d)i.push(d[g])}}i.reverse(),o=t.extend(!0,{},ExplorerChartOptions.DefaultChartOptions.hbar,{chart:{height:40*n.length>400?40*n.length:400},series:i,xAxis:{categories:n},tooltip:{formatter:function(){var t=0,e="";"object"==typeof s.data.values[this.x].count?(e=this.series.name,t=s.data.values[this.x].count[e]):t=s.data.values[this.x].count;var a='<div style="text-align:center;"><b>'+(""!=e?e+" - ":"")+this.x+": "+this.y+"% ";return s&&s.show_counts&&(a+="("+t+")"),a+="</b></div>"}},legend:{enabled:null!=y&&void 0!=y&&s.data.values[y]&&"object"==typeof s.data.values[y].count}});break;
//!PIE
case"pie":var i=[{name:"Data",type:"pie",data:[]}],m=[],n=[],c=s.data.colors||{};if(s.data.values)for(var y in s.data.values)m.push(s.data.values[y].percent),n.push(y);for(var b=[],O=0;O<n.length;O++)if(0!=m[O]){var _={name:n[O],y:m[O],sku:s.data.values[n[O]].sku||""};c[n[O]]&&(_.color="#"+c[n[O]]),b.push(_)}i[0].data=b,void 0==s.decimals&&(s.decimals=2),o=t.extend(!0,{},ExplorerChartOptions.DefaultChartOptions.pie,{series:i,tooltip:{formatter:function(){var t='<div style="text-align:center;"><b>'+this.key+": "+this.y+"% ";return s&&s.show_counts&&(t+="("+s.data.values[this.key].count+")"),t+="</b></div>"}},plotOptions:{pie:{dataLabels:{enabled:!0,color:"#000000",connectorColor:"#000000",format:"{point.percentage:."+s.decimals+"f}% <b>{point.name}</b>: ",distance:5,style:{width:"350px"}},tooltip:{followPointer:!1}},series:{animation:!1,borderWidth:0}}})}/*
			if (this.options.transparent) {
				options.chart.backgroundColor = 'rgba(255, 255, 255, 0.1)'
			}
			*/
return this.options.exportUrl&&(o.exporting={url:this.options.exportUrl,enabled:!1,chartOptions:{chart:{backgroundColor:"#fff"}}}),o=t.extend(!0,o,this.options.chartExtend)},getES:function(){var e={},a=this.options,l=a.group_colors||{},o=Array.prototype.slice.call(a.colors,0),s=Array.prototype.slice.call(o,0);switch(a.type){case"vbar":case"areaspline":var n=[],i=[{name:"Data",type:"column",count:[],data:[]}];if(a.data.values){var r,c=0,d=[];for(var u in a.data.values)d.push(u);var p=[],h="value"==a.option_title_value?"rep_val":"option_title",y=a.data.values.length,f=[],v=0,x=0;if(a.has_data){if("areaspline"==a.type&&a.slider_vals)// Magic number
for(var _=[],g=-1===a.slider_vals.step.toString().indexOf(".")?!1:4,u=a.slider_vals.min;u<=a.slider_vals.max;u+=a.slider_vals.step)
// Avoid floating-point precision errors
g&&(u=Number(u.toPrecision(g))),_.push(u);for(var u in d){var m=a.data.values[u][h];
// Segmented
if(a.segments){n.push(m),r||(r={});for(var b in a.data.values[u].count){r[b]||(r[b]={name:b,count:[],data:[]},l[b]&&(r[b].color=l[b])),r[b].count.push(a.data.values[u].count[b]);var O=a.data.values[u].count[b];O>c&&(c=O),r[b].data.push({y:O,percentage:a.data.values[u].percent[b]})}}else{
// Skip zeros if not an area chart
if(0==a.data.values[u].count&&"areaspline"!=a.type&&!a.show_nodata_opts)continue;i[0].count.push(a.data.values[u].count);var O="areaspline"==a.type?a.data.values[u].count:a.data.values[u].percent;// Bar charts use the percent
if(y>20&&3>O&&"areaspline"!=a.type){v+=O,x+=a.data.values[u].count;var A={name:m,y:O};s.length||(s=Array.prototype.slice.call(a.colors,0)),(firstOtherColor=s.shift())&&(A.color="#"+firstOtherColor),f.push(A)}else{O>c&&(c=O);var w={y:O,name:m};if("areaspline"!=a.type){o.length||(o=Array.prototype.slice.call(a.colors,0));var z=o.shift();z&&(w.color=-1!=z.indexOf("#")?z:"#"+z)}n.push(m),i[0].data.push(w)}}p[a.data.values[u][h]]=u}}else c=1;if(f.length>0){var C={name:"All Others",id:"All Others",data:f,y:v,type:"column"},w={y:v,name:"All Others (click to expand)",drilldown:"All Others",id:"Other_drilldown"};if("areaspline"!=a.type){var z=o.shift();z&&(w.color=-1!=z.indexOf("#")?z:"#"+z)}
//cats.push('Other');
i[0].data.push(w),p.Other_drilldown={count:x},v>c&&(c=v)}if(r){i=[];for(var k in r)i.push(r[k])}}if("areaspline"==a.type&&(i[0].color="#"+a.chart_color),_&&_.length)for(var u=0,S=_.length;S>u;u++)if(-1===n.indexOf(_[u])){var w={y:0,name:_[u]};i[0].data.splice(u,0,w),n.splice(u,0,_[u])}var L=n.length>35&&"areaspline"!=a.type?35:n.length-1;
// style the charts
if(e=t.extend(!0,{},ExplorerChartOptions.DefaultChartOptions.vbar,{chart:{type:"areaspline"==a.type?"areaspline":"column",height:a.chart_height?a.chart_height:400,backgroundColor:"rgba(0,0,0,0)"},series:i,yAxis:{max:c},scrollbar:{enabled:n.length>20?!0:!1},tooltip:{formatter:function(){var t=0,e="";a.segments?(e=this.series.name,t=a.data.values[p[this.x]].count[e]):a.data.values[p[this.key]]?t=a.data.values[p[this.key]].count:f.length>0&&"All Others (click to expand)"==this.key&&!p[this.key]?t+=p.Other_drilldown.count:a.data.values[this.x]&&a.data.values[this.x].count&&(t=a.data.values[this.x].count);var l="";a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color&&(l+="font-size:"+a.style.font_size+";",l+="font-family:"+a.style.font_style+";",l+="color:#444;");var o='<div style="'+l+'text-align:center;"><b>'+(""!=e?e+" - ":"")+this.key+": ";return"areaspline"==a.type||a.segments||(o+=Number(this.y).toFixed(a.decimals)+"% "),a&&a.show_counts&&(o+=a.segments?this.y+" ("+this.percentage+"%)":"areaspline"==a.type?t:"("+t+")"),o+="</b></div>"}},legend:{enabled:a.segments}}),
//other drill down
f&&f.length>0?(e.drilldown={series:[C]},e.xAxis={type:"category"},a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color&&(e.drilldown.activeAxisLabelStyle={color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style})):a.has_data&&(e.xAxis={
//max: xMax,
categories:n}),a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color){var D={style:{color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style,textShadow:!1}};e.xAxis.labels=D,e.yAxis.labels=D,e.yAxis.title.style={color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style},e.yAxis.gridLineColor=a.line_color,e.xAxis.lineColor=a.line_color,e.legend.itemStyle={color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style},e.noData={style:{color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style}}}
// Area chart e.g. sliders
"areaspline"==a.type&&(e.chart||(e.chart={}),e.chart.defaultSeriesType="areaspline",e.xAxis.categories=n,
//delete options.xAxis.categories;
n.length>35&&(e.xAxis.tickInterval=parseInt(L/20)),n.length>1e3&&(e.plotOptions.series.turboThreshold=0),e.yAxis.title.text=T("Count"),e.yAxis.title.style={color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style}),
// segmented
a.segments&&(e.yAxis.title.text=T("Count"));break;case"hbar":var n=[],i=[{name:"Data",count:[],data:[]}];if(a.data.values){var r,c=0,d=[];for(var u in a.data.values)d.push(u);var p=[],h="value"==a.option_title_value?"rep_val":"option_title",y=a.data.values.length,f=[],v=0,x=0;if(a.has_data)for(var u in d){var m=a.data.values[u][h];
// Segmented
if(a.segments){n.push(m),r||(r={});for(var b in a.data.values[u].count){r[b]||(r[b]={name:b,count:[],data:[]},l[b]&&(r[b].color=l[b])),r[b].count.push(a.data.values[u].count[b]);var O=a.data.values[u].percent[b];O>c&&(c=O),r[b].data.push(O)}}else{
// Skip zeros 
if(0==a.data.values[u].count&&!a.show_nodata_opts)continue;i[0].count.push(a.data.values[u].count);var O=a.data.values[u].percent;if(y>20&&3>O){v+=O,x+=a.data.values[u].count;var A={name:m,y:O};s.length||(s=Array.prototype.slice.call(a.colors,0)),(firstOtherColor=s.shift())&&(A.color="#"+firstOtherColor),f.push(A)}else{O>c&&(c=O);var w={y:O,name:m};o.length||(o=Array.prototype.slice.call(a.colors,0));var z=o.shift();z&&(w.color=-1!=z.indexOf("#")?z:"#"+z),n.push(m),i[0].data.push(w)}}p[a.data.values[u][h]]=u}else c=1;if(f.length>0){var C={name:"All Others",id:"All Others",data:f,y:v,type:"column"},w={y:v,name:"All Others (click to expand)",drilldown:"All Others",id:"Other_drilldown"},z=o.shift();z&&(w.color=-1!=z.indexOf("#")?z:"#"+z),i[0].data.push(w),p.Other_drilldown={count:x},v>c&&(c=v)}if(r){i=[];for(var k in r)i.push(r[k])}}var L=n.length>35?35:n.length-1;if(e=t.extend(!0,{},ExplorerChartOptions.DefaultChartOptions.vbar,{chart:{type:"bar",height:a.chart_height?a.chart_height:400,backgroundColor:"rgba(0,0,0,0)"},series:i,yAxis:{max:c},scrollbar:{enabled:n.length>20?!0:!1},tooltip:{formatter:function(){var t=0,e="";a.segments?(e=this.series.name,t=a.data.values[p[this.x]].count[e]):a.data.values[p[this.key]]?t=a.data.values[p[this.key]].count:f.length>0&&"All Others"==this.key&&!p[this.key]?t+=p.Other_drilldown.count:a.data.values[this.x]&&a.data.values[this.x].count&&(t=a.data.values[this.x].count);var l="";a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color&&(l+="font-size:"+a.style.font_size+";",l+="font-family:"+a.style.font_style+";",l+="color:#444;");var o='<div style="'+l+'text-align:center;"><b>'+(""!=e?e+" - ":"")+this.key+": "+Number(this.y).toFixed(a.decimals)+"% ";return a&&a.show_counts&&(o+="("+t+")"),o+="</b></div>"}},legend:{enabled:a.segments}}),f.length>0?(e.drilldown={series:[C]},e.xAxis={type:"category"},a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color&&(e.drilldown.activeAxisLabelStyle={color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style})):a.has_data&&(e.xAxis={max:L,categories:n}),a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color){var D={style:{color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style,textShadow:!1}};e.xAxis.labels=D,e.yAxis.labels=D,e.yAxis.title.style={color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style}}break;
//!PIE
case"pie":var w,z,F,S,i=[{name:"Data",type:"pie",data:[]}],E=[],p=[],y=a.data.values.length,f=[],v=0,x=0,P=a.pdf?"150px":"250px";if(a.has_data&&a.data.values){for(F in a.data.values)if(S=a.data.values[F].percent||0,!(0>=S&&a)||a.show_nodata_opts){if(y>15&&3>S){v+=S,x+=a.data.values[F].count;var A={name:"value"==a.option_title_value?a.data.values[F].rep_val:a.data.values[F].option_title,y:S};s.length||(s=Array.prototype.slice.call(a.colors,0)),(firstOtherColor=s.shift())&&(A.color="#"+firstOtherColor),f.push(A)}else w={name:"value"==a.option_title_value?a.data.values[F].rep_val:a.data.values[F].option_title,y:S,sku:a.data.values[F].sku},o.length||(o=Array.prototype.slice.call(a.colors,0)),(z=o.shift())&&(w.color="#"+z),E.push(w);p["value"==a.option_title_value?a.data.values[F].rep_val:a.data.values[F].option_title]=F}if(f.length>0){var C={name:"All Others",id:"All Others",data:f,y:v,type:"pie"};w={name:"All Others (click to expand)",y:v,drilldown:"All Others"},(z=o.shift())&&(w.color="#"+z),E.push(w),p.Other_drilldown={count:x}}}i[0].data=E,void 0==a.decimals&&(a.decimals=2),e=t.extend(!0,{},ExplorerChartOptions.DefaultChartOptions.pie,{series:i,tooltip:{formatter:function(){var t="";a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color&&(t+="font-size:"+a.style.font_size+";",t+="font-family:"+a.style.font_style+";",t+="color:#444;");var e='<div style="'+t+'text-align:center;"><b>'+this.key+": "+Number(this.y).toFixed(a.decimals)+"% ";return a&&a.show_counts&&(e+="(",e+=f.length>0&&"All Others (click to expand)"==this.key&&!a.data.values[p[this.key]]?p.Other_drilldown.count:a.data.values[p[this.key]].count,e+=")"),e+="</b></div>"}},plotOptions:{pie:{dataLabels:{enabled:!0,color:"#000000",format:"{point.y:."+a.decimals+"f}% : <b>{point.name}</b> ",distance:20,style:{width:P}},tooltip:{followPointer:!1}},series:{animation:!1,borderWidth:0}},chart:{height:a.chart_height?a.chart_height:400,backgroundColor:"rgba(0,0,0,0)"}}),f.length>0&&(e.drilldown={series:[C]},a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color&&(e.drilldown.activeDataLabelStyle={color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style})),a.style&&""!=a.style.font_style&&""!=a.style.font_size&&""!=a.style.font_color&&(e.plotOptions.pie.dataLabels.color=a.style.font_color,e.plotOptions.pie.dataLabels.style.fontSize=a.style.font_size,e.plotOptions.pie.dataLabels.style.fontFamily=a.style.font_style,e.plotOptions.pie.dataLabels.style.textShadow=!1,e.noData={style:{color:a.style.font_color,fontSize:a.style.font_size,fontFamily:a.style.font_style}})}return this.options.exportUrl&&(e.exporting={url:this.options.exportUrl,enabled:!1,chartOptions:{chart:{backgroundColor:"#fff"}}}),e.yAxis&&e.yAxis.title&&("Count"==e.yAxis.title.text?e.yAxis.title.text=ReportView.T("count_text","Count"):e.yAxis.title.text=ReportView.T("percent_text","Percent")),e=t.extend(!0,e,this.options.chartExtend)}}),ExplorerChartOptions.Defaults={chartExtend:{},exportUrl:e.explorerExportHCPath},ExplorerChartOptions.DefaultChartOptions={vbar:{title:{text:"",style:{color:"#444",fontSize:"24px",fontWeight:"normal",fontFamily:'"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif'},align:"left"},xAxis:{min:0,labels:{rotation:-45,align:"right",formatter:function(){return this.value.length>15?this.value.slice(0,15)+"...":this.value}}},yAxis:{min:0,title:{text:T("Percent")}},tooltip:{useHTML:!0},plotOptions:{column:{pointPadding:.2},series:{animation:!1,borderWidth:0}},series:[],legend:{enabled:!1},credits:{enabled:!1},exporting:{enabled:!1}},hbar:{chart:{type:"bar"},title:{text:"",style:{color:"#444",fontSize:"24px",fontWeight:"normal",fontFamily:'"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif'},align:"left"},xAxis:{title:{text:null}},yAxis:{min:0,title:{text:T("Percent"),align:"middle"},labels:{overflow:"justify"},minPadding:.1,maxPadding:.1},tooltip:{useHTML:!0},plotOptions:{bar:{dataLabels:{enabled:!0}},series:{animation:!1}},legend:{enabled:!1},credits:{enabled:!1},exporting:{enabled:!1},series:[]},pie:{chart:{plotBackgroundColor:null,plotBorderWidth:0,plotShadow:!1},title:{text:"",style:{color:"#444",fontSize:"24px",fontWeight:"normal",fontFamily:'"Lato", "Helvetica Neue", Helvetica, Arial, sans-serif'},align:"left"},tooltip:{useHTML:!0},plotOptions:{pie:{dataLabels:{enabled:!0,color:"#000000",format:"<b>{point.name}</b>: {point.percentage:.2f}%",distance:20},tooltip:{followPointer:!1},minSize:130},series:{animation:!1,borderWidth:0}},exporting:{enabled:!1},series:[],credits:{enabled:!1},legend:{enabled:!1}}}}(jQuery,window);
!function(e,t){
// !-- ReportView --
this.ReportView=jInterface.extend({init:function(){this.indexingSnapshot=!1,this.options=e.extend(!0,{},ReportView.Defaults,arguments[0]||{}),this.$reportList=e("#report-list"),this.$placeholders=e(".report-row[data-question]",this.$reportList),this.loadAjaxQueue=new AjaxStack({wait:400,throttle:!0}),this.options.showMap&&this.showMap(),this.listen(),this.setupLoadRspView(),this.$currentBucket=null,this.chartQueue=[]},listen:function(){var t=e("#report-body");if(e(".js-tab-control",t).on("click",function(){e(".js-tab-control",t).removeClass("active"),e(this).addClass("active"),e(".tab-content",t).hide();var s=e(this).data("tab"),i=e("#tab-content-"+s,t);i.show()}),this.$placeholders.ex()){
// Opening index
if(e(".report-opening").length)this.checkIndexBGProgress();else if(e(".js-report-indexing-trigger").length>0&&!e(".js-report-indexing-trigger").hasClass("hide")){var s=this;this.checkIndexBGProgress(),e(".js-load-charts").on("click",function(){e.get("/explorer/clear-show-index-data-cache/id/"+s.options.projectID),e(".js-skip-loading").addClass("hide"),
// Flag is used to indicate that it will need to refresh 
// the charts when indexing has finished
s.indexingSnapshot=!0,
// Start loading the charts
s.loadView()})}else this.loadView();this.setupDatepicker()}},setupLoadRspView:function(){var t=this,s=e("#response-grid");s.on("click",function(){e("#response-grid-placeholder").length&&t.loadResponseView()})},loadResponseView:function(){var t=this,s=t.options.publicView?"sharedexplore":"explorer",i="/"+s+"/load-responses/id/"+t.options.projectID+"/vid/"+t.options.viewID+"/cid/"+t.options.customerID+"?explorer=true&key="+t.options.publicKey;e.post(i).done(function(s){e("#response-list").html(s),t.setupRspView()})},setupRspView:function(){
// Handling viewing an individual response and returning to the grid
var t=this,s=e("#individual-response"),i=e("#response-content"),o=this.options.publicView?"/sharedexplore/":"/explorer/";e("body").on("click",".js-view-response",function(){var a=o+"response/id/"+t.options.projectID+"/vid/"+t.options.viewID+"/cid/"+t.options.customerID+"/rid/"+e(this).closest("tr").data("id")+"?explorer=true&key="+t.options.publicKey;s.removeClass("hide").load(a,function(){i.addClass("hide")})}).on("click",".back-to-list",function(){i.removeClass("hide"),s.html("").addClass("hide")})},setupDatepicker:function(){var t=this;e("body").off("datechange.report").on("datechange.report",function(s,i,o){var a="/"+(t.options.publicView?"sharedexplore":"explorer")+"/save-view-date",r={id:t.options.projectID,view:t.options.viewID,vid:t.options.viewID,"date-range":o};
// Public view - add additional params
t.options.publicView&&(r.key=t.options.publicKey,r.cid=t.options.customerID),e.post(a,r).done(function(){e("#show-filter").is(":checked")?ReportEditInst.addAutoSave({redrawCharts:!0,all:!0}):t.refreshCharts()})}),ExplorerDatePicker(this.options.dateRange)},loadView:function(){
// Indexing just finished or already done - show report
e("#report-viewport-par").removeClass("hide"),this.options.preload||this.bindScrolling()},
// Setup scroll spy to lazy load charts
bindScrolling:function(){if(!this.boundScrolling){var t=this;e("#report-list li.js-spy").on("scrollSpy:enter",e.proxy(function(s){var i=e(s.target);t.$currentBucket=i,i.attr("data-load")&&t.loadChunk(i),t.reflowChartsPar(i)},this)).scrollSpy(),this.boundScrolling=!0}},loadChunk:function(t,s){s||(s={});var i,o=this,a=e(t),r=e("[data-qid]",a),n=r.map(function(){return e(this).data("qid")}).get(),l={id:o.options.projectID,view:o.options.viewID,vid:o.options.viewID,skus:n,temp_colors:s.tempColors};a.removeAttr("data-load"),
// Prefix the url with the appropriate controller
i="/"+(this.options.publicView?"sharedexplore":"explorer")+"/bulk-load",
// Add auth if in public view
this.options.publicView&&(l.key=this.options.publicKey,l.cid=this.options.customerID),Spinner.on(),o.loadAjaxQueue.add({url:i,data:l},function(t){e(".js-spy-load",a).empty().html(t),setTimeout(function(){o.doChartQueue()},300),s.done&&s.done(),e(".report-row",a).each(function(){o.makeReportRowES(e(this))});var i=e(".js-question-numbers").first().data("numtype");""==i&&e(".js-question-numbers").each(function(){return e(this).data("numtype")?(i=e(this).data("numtype"),!1):void 0}),renumberVisibleQuestions(i),Spinner.off()})},checkIndexBGProgress:function(){var t=this;e.get("/sharedexplore/get-index-progress/id/"+this.options.projectID,{key:this.options.publicKey,id:this.options.projectID,view:this.options.viewID,vid:this.options.viewID,cid:this.options.customerID}).done(function(s){s&&("error"==s.percent?(e(".js-report-indexing-trigger .js-skip-loading").addClass("hide"),e(".js-report-indexing-trigger .js-error-loading").removeClass("hide"),t.loadView()):(e(".js-index-progress-bar").css("width",s.percent+"%"),
// Is indexing or is opening?
s.percent!==!1&&s.percent<100||s.opening?setTimeout(function(){t.checkIndexBGProgress()},1e3):(e(".report-opening").hasClass("hide")?e(".js-report-indexing-trigger").addClass("hide"):e.get("/sharedexplore/check-index-for-update/id"+t.options.projectID,{key:t.options.publicKey,id:t.options.projectID,view:t.options.viewID,vid:t.options.viewID,cid:t.options.customerID}).done(function(s){e(".report-opening").addClass("hide"),1==s&&(t.indexingSnapshot=!0,e(".js-report-indexing-trigger").removeClass("hide"),setTimeout(function(){t.checkIndexBGProgress()},1e3))}),
// Refresh existing charts
t.indexingSnapshot?t.refreshCharts():t.loadView())))})},saveView:function(){if(!this.options.noAjax){var t=e.extend({},{spinner:!1,data:null,refreshCharts:!1,done:function(){}},arguments[0]||{}),s=this;if(t.data instanceof Array){var i=t.data;i.push({name:"view",value:this.options.viewID}),i.push({name:"id",value:this.options.projectID})}else if("object"==typeof t.data)var i=e.extend({id:this.options.projectID,view:this.options.viewID},t.data||{});if(!i)return this;t.spinner&&Spinner.on();var o="/explorer/save-view";
// Cannot update on public view for now so set always false
this.options.publicView||e.post(o,i).done(function(i){t.done.call(s),e(".js-report-indexing-trigger").length>0&&!e(".js-report-indexing-trigger").hasClass("hide")&&(t.refreshCharts=!1),t.refreshCharts&&s.refreshCharts()}).always(Spinner.off)}},setSaveProperty:function(e,t,s){if(3!=arguments.length)return!1;var i={};return i[e]={},i[e][t]=s,this.saveView({data:i}),this},reflowChartsPar:function(t){var s=this;e(".js-reflow-par[data-reflow]",t).each(function(){
// Reflow charts inside current element
e("[data-highcharts-chart]",this).each(function(){e(this).data().hc&&e(this).data().hc.reflow()}),
// Reflow word-clouds
e(".js-wc-cnvs",this).each(function(){s.buildWordCloud(this)})})},addRefreshProperty:function(t,s){if(s||(s={}),this.$currentBucket&&this.$currentBucket.length)if("load"==t){if(e(".js-spy").attr("data-load",!0),this.loadChunk(this.$currentBucket,{tempColors:s.colors}),s.previous===!0){var i=this.$currentBucket.prev(".js-spy");i.length&&this.loadChunk(i,{tempColors:s.colors})}}else if("reflow"==t){e(".js-reflow-par").attr("data-reflow",!0),this.reflowChartsPar(this.$currentBucket);var i=this.$currentBucket.prev(".js-spy");i.length&&this.reflowChartsPar(i)}e(window).trigger("scroll")},refreshCharts:function(t){if(console.log(e(".js-report-indexing-trigger")),!(e(".js-report-indexing-trigger").length>0)||e(".js-report-indexing-trigger").hasClass("hide")){t=e.extend({force:!1,done:function(){},colors:null,previous:!0},t||{}),e(".js-close-text-responses").hide(),e(".js-get-text-responses").show(),e(".open-text-container").html(""),
// Flag for reload
this.addRefreshProperty("load",t),t.done&&t.done()}},loadChart:function(t,s){function i(){e(".js-pager",a).each(function(){n.pagination||(n.pagination={});var t=e(this).data("paginator");n.pagination[t]={page_num:e(".js-pg-num",this).val()}})}s||(s={});var o=this,a=e(t),r=a.data(),n={id:this.options.projectID,view:this.options.viewID,vid:this.options.viewID,profileid:this.options.profileID,publicview:this.options.publicView},l="load-chart";
// Text elements
if(r.elementType){
// Summary chart: map, timeline, device, response metrics
if(
// Remove attribute, so that question is not refreshed multiple times
a.removeAttr("data-load"),"summary"==r.elementType)n.sku=r.question;else if("table"==r.elementType)n.sku=r.question,i();else{if(!r.question)return;n.quest=r.question,null!=r.num&&(n.qnum=Number(r.num)),null!=r.option&&(n.osku=Number(r.option)),s.tempColors&&(n.temp_colors=s.tempColors),i()}
// Prefix the url with the appropriate controller
// Add auth if in public view
// Execute AJAX load
return l=(this.options.publicView?"/sharedexplore/":"/explorer/")+l,this.options.publicView&&(n.key=this.options.publicKey,n.cid=this.options.customerID),e.get(l,n).done(function(e){o.loadChartDone(t,e,s)}),this}},loadChartDone:function(t,s,i){var o=e(s).insertAfter(t),a=o.data("question"),r=this;e(t).remove(),
// Callback
i.done&&i.done(o),o.hasClass("elasticsearch")?this.makeReportRowES(o):o.hasClass("report-group")?e(".report-sub-row",o).each(function(){r.makeReportRow(this,a)}):this.makeReportRow(o,a),renumberVisibleQuestions(e(".js-question-numbers").first().data("numtype"))},doChartQueue:function(){for(var e=0;e<this.chartQueue.length;e++)this.buildChart(this.chartQueue[e]);this.chartQueue=[]},buildWordCloud:function(t,s){var i=e(t);if(!WordCloud.isSupported)return void(i.length&&i.remove());
// PDFs, find the div instead of the canvas
this.options.preload&&(i=i.hide().next(".js-wc-html").removeClass("hide").height(300));var o=i.data("wordlist")||[],a=i.data("color").split(","),r=i.data("fontfamily"),n=function(){return Math.floor(Math.random()*a.length)},l=i.parent().width()||660;
// Initialize
if(s){o=[];for(var c in s.data)o.push([c,s.data[c]]);s.style&&(r=s.style.font_style)}if(i.data({wordlist:o,fontfamily:r}),i.is("canvas")?i.attr("width",l):i.width(l),i.show().siblings(".js-nd-al").length&&i.siblings(".js-nd-al").remove(),o.length){var d,h=o[0][1],p=o[o.length-1][1],u=o.length,f=h-p;
// Min size 18.1, max size 199.1
for(
// Prevent divide by 0
!f&&(f=1),d=0;u>d;d++)o[d][1]=Math.floor(181*(.1+(o[d][1]-p)/f));var v={list:o,color:function(){return"#"+a[n()]},backgroundColor:"transparent",wait:this.options.preload?150:0};r&&(v.fontFamily=r),WordCloud(i[0],v)}else i.hide().after('<div class="alert alert-default js-nd-al"><strong>No data:</strong> No responses found for this question.</div>')},buildChart:function(){var t=e.extend({type:"",report:"",data:{},id:0},arguments[0]||{}),s={};switch(t.type){case"vbar":case"hbar":case"pie":case"areaspline":case"spline":if(t.transparent=!0,null==t.data.values)e(t.report).html('<div class="alert alert-default col-md-9"><strong>No data:</strong> No responses found for this question.</div>');else{if(s=new ExplorerChartOptions(t).get(),_.isObject(s)){s.chart.renderTo=t.report[0];var i=new Highcharts.Chart(s);return t.report.data("hc",i),{options:s,chart:i}}e(t.report).html('<div class="alert alert-danger"><strong>Error:</strong> There was a problem creating this chart.</div>')}break;case"cloud":this.buildWordCloud(t.report,t);break;case"map":new ExplorerMapES(t);break;case"timeline":new ExplorerTimelineES(t)}return{}},makeReportRow:function(t,s){t=e(t);var i=t.data("question"),o=e(".report-types [data-chart]",t),a=e(".report-container [data-chart]",t),r=e(".js-toggle-grid",t),n=e(".js-report-grid",t),l=e(".js-get-text-responses",t),c=e(".js-close-text-responses",t),d=(e(".js-open-text-container",t),e(".js-chart-down",t)),h=t.data("sku"),p={},u=this;if(e(".show_rsp_grid",t).val()>0){var f=20,v=1;u.getOpenText(i,v,f,h)}if(o.ex()){var m=SGAPI.explorerChartData[i]||{},g=o.filter(".active").data("chart"),b=function(e){e!=g&&u.setSaveProperty("defaultVisuals",i,e);var t=a.filter('[data-chart="'+e+'"]');a.hide(),t.show(),e in p||(p[e]=u.buildChart({type:e,report:t,data:m,id:i}),d.ex()&&p[e].chart&&p[e].chart.exportChart&&d.click(function(t){t.preventDefault(),p[e].chart.exportChart()}))};b(g),o.off().on("click",function(){o.removeClass("active"),e(this).addClass("active"),b(e(this).data("chart"))}),r.on("click",function(){n.toggle(),u.setSaveProperty("visibleGrids",i,n.is(":visible")?1:0);var t=n.is(":visible")?r.data("hide"):r.data("show");e("span",r).text(t)}),l.on("click",function(){var t=20,s=1;e(this).toggleClass("hidden"),c.toggleClass("hidden");var o=h>0?"-"+h:"",a=e(".js-open-text-container-"+i+o);e(".list-grid",a).ex(function(){a.removeClass("hidden")},function(){u.getOpenText(i,s,t,h),u.setSaveProperty("visibleRspGrid",i,1)})}),c.on("click",function(){var t=h>0?"-"+h:"";e(".js-open-text-container-"+i+t).addClass("hidden"),e(this).toggleClass("hidden"),l.toggleClass("hidden"),u.setSaveProperty("visibleRspGrid",i,0)})}},makeReportRowES:function(t){var s=this;
// Page controls for grids
e(".js-pager",t).each(function(){var i=this,o=e(this).data("paginator"),a=t[0].id;
// Buttons
e("[data-page]",i).click(function(t){t.preventDefault(),e(".js-pg-num",i).val(e(this).data("page")).change()}),
// Menu, hidden input
e(".js-pg-lim, .js-pg-num",i).change(function(r){
// Go to page 1 if limit changes
e(r.target).hasClass("js-pg-lim")&&e(".js-pg-num",i).val(1),e("a, select",i).addClass("disabled").prop("disabled",!0),s.loadChart(t,{done:function(){var t=e("#"+a+' [data-paginator="'+o+'"]').prev();e(window).scrollTo(t,500,{offset:-60})}})})}),
// Equalize contact form column heights
e(".contactform-rows",t).each(function(){var t=e("> div",this),s=_.max(t.map(function(){return e(this).height()}).get());t.height(s)})},addESChart:function(t){var s=e("#"+t.id);e.extend(t,{type:t.current_type,report:s,elasticsearch:!0,id:0}),t.queue_chart?this.chartQueue.push(t):this.buildChart(t)},showMap:function(){this._mapClass=new ExplorerMap({id:"js-map-visual",forCharts:!0,projectID:this.options.projectID})},getOpenText:function(t,s,i,o){if(t){var a=o>0?"-"+o:"",r=this,n=e(".js-open-text-container-"+t+a),l="/explorer/get-open-text",c={qid:t,per:i,id:this.options.projectID,vid:r.options.viewID,jumpto:s,osku:o,solr:"true"};return SGAPI.explorePublicKey&&(l="/sharedexplore/get-open-text",c={id:this.options.projectID,key:SGAPI.explorePublicKey,cid:SGAPI.exploreCID,view:SGAPI.exploreVID,vid:SGAPI.exploreVID,qid:t,per:i,jumpto:s,osku:o,solr:"true"}),Spinner.on(),e.get(l,c).done(function(e){n.html(e).removeClass("hidden"),r.bindOpenTextGridEvents(t,n,o)}).always(Spinner.off),this}},bindOpenTextGridEvents:function(t,s,i){var o=this,a=function(){o.getOpenText(t,e(this).data("page"),e(".js-text-per-page",s).val(),i)};e("#js-text-next-page",s).click(a),e("#js-text-prev-page",s).click(a),e("#js-text-page-select a",s).click(function(){o.getOpenText(t,e(this).data("page"),e(".js-text-per-page",s).val(),i)}),e("#js-text-result-limit",s).change(function(){o.getOpenText(t,e(".js-text-current-page",s).val(),e(this).val(),i)})},translate:function(e,t){return this.options.translations?this.options.translations[e]:t}}),ReportView.Defaults={preload:!1,noAjax:!1,showMap:!1},ReportView.T=function(e,t){return ReportViewInstance?ReportViewInstance.translate(e,t):t},
// Export dialog
ReportView["export"]=function(t){e("#js-export-start").click(function(){var s=e("#js-exp-export-fm").serialize();return e.post(e("#js-exp-export-fm").attr("action"),s).done(function(s){if("good"==s.status){e(".js-ready").removeClass("hide"),e("#js-export-start").addClass("hide");var i=e(".js-export-progress"),o=e(".js-percent-info"),a=e(".js-down-link"),r=function(){e.get("/explorer/export-percent",{id:t.id,mkey:t.key}).done(function(e){var t=parseInt(e.status);isNaN(t)||0>t||(i.width(t+"%"),o.text(t+"%"),100==t?a.removeClass("hide"):window.setTimeout(r,500))})};r()}}),!1})},
// !-- ReportEdit --
this.ReportEdit=jInterface.extend({init:function(){this.options=e.extend(!0,{},ReportEdit.Defaults,arguments[0]||{}),this.$form=e("#report-form"),this.$reportPar=e("#report-viewport-par"),this.$saveBar=e(".save-btn-par",this.$reportPar),this.$saveBtn=e(".js-save-rp-btn",this.$saveBar),this.saveAjaxQueue=new AjaxQueue({wait:400,throttle:!0}),this.setupSettings(),this.setupStyles(),this.shareSection(),this.filterSection(),this.segmentSection(),this.bulkEdit(),this.listen()},setDirty:function(){this.$reportPar.addClass("bar-vis"),this.dirtyForm=!0},setClean:function(){this.$reportPar.removeClass("bar-vis"),this.dirtyForm=!1},listen:function(){
// Resize charts when tray opens/closes
function t(){ReportViewInstance&&ReportViewInstance.addRefreshProperty("reflow")}var s=this;this.$form.off("submit.form").on("submit.form",function(e){e.preventDefault(),s.postForm()}),this.$form.off("click.removefilter").on("click.removefilter",".js-remove-filter",function(){var t=e(this).closest(".list-group-item");s.removeGroup(t)});
// Report sidebar interaction
var i=600;e("#report-viewport-par").off("click.datafilter").on("click.datafilter","[data-filter]",function(){var s=e(e(this).data("filter")),o=e(this).data("href");s.hasClass("active")?o&&e('[href="'+o+'"]').hasClass("collapsed")?e('[href="'+o+'"]').click():(e("#report-viewport-par").removeClass("report-open"),setTimeout(function(){s.removeClass("active"),e(".style-bar-item").removeClass("active")},i)):(e(".pop-style").not(s).removeClass("active"),e("#report-viewport-par").width()>768&&e("#report-viewport-par").addClass("report-open"),s.addClass("active"),o&&e('[href="'+o+'"]').hasClass("collapsed")&&e('[href="'+o+'"]').click()),e(".style-bar-item").removeClass("active"),e(this).closest("li").toggleClass("active"),setTimeout(t,i+10)}),e(".style-bar-item a:not([data-toggle])").off().on("click",function(){e("#reporting-navbar-collapse").collapse("hide")}),this.$form.off("click.trayclose").on("click.trayclose",".tray-close",function(){e("#report-viewport-par").removeClass("report-open"),setTimeout(function(){e("[data-filter]").removeClass("active"),e(".style-bar-item").removeClass("active")},i),e(".style-bar-item, .pop-style").removeClass("active"),setTimeout(t,i+10)}),
//save response grid modals into hidden fields
e("body").off("submit.filterform").on("submit.filterform",".question-filter-form",function(t){t.preventDefault();var i=e("#in_pane").val(),o=e(this).serialize();i?e("#response_detail").val(o):e("#grid_columns").val(o),e("#question-filters").modal("hide"),s.addAutoSave({redrawCharts:!0,all:!0,tab:"browse"})}),
// Add new element
e("#report-view-print").off("click.addele").on("click.addele",".js-add-ele-btn",function(){var t=e("#report-list .insert-row").index(e(this).closest(".insert-row"));e("body").off("addelesubmit").on("addelesubmit",function(i,o){e.post(e(o).attr("action"),e(o).serialize()+"&position="+t).done(function(e){s.reloadContent({all:!0})})})}),e("body").off("click.removeele").on("click.removeele",".js-remove-report-el",function(){var t=e(this).data("qid"),i=e(this).closest("li[data-qid]");e.ajax({url:"/explorer/remove-report-element/",type:"post",data:{id:s.options.projectID,viewid:s.options.viewID,cid:s.options.customerID,qid:t}}).done(function(t){"good"==t.status&&(i.remove(),renumberVisibleQuestions(e(".js-question-numbers").first().data("numtype")))})});
// Theme title inline edit
var o=e(".js-report-title"),a="";o.length&&(e(".js-report-title-edit",o).focus(function(){a=this.value}).blur(function(){""==this.value||this.value==a?e(this).val(a):(e.post(o[0].action,o.serialize()),e(".app-second-nav .nav-ellipsis, h1.report-title").text(this.value))}),o.submit(function(e){e.preventDefault()})),
//basic question settings pane saving
e("body").off(".questionedit").on("submit.questionedit","#question-edit-form",function(t){t.preventDefault();var s=e(this);Spinner.on(),e.ajax({url:s.attr("action"),data:s.serialize(),type:"post"}).done(function(t){"ok"==t.status&&(e("#question-edit-pane"),Panel.get(e("#question-edit-pane")).hide()),s.find('[name="qid"]').length>0?ReportViewInstance.loadChart(e('.report-row[data-question="'+s.find('[name="qid"]').val()+'"]')):e("#report-"+s.find('[name="el_id"]').val()+" .report-elem-header .el-text").html(s.find(".sg-html").val())},this).always(Spinner.off)}),e("#report-list").sortable({handle:".js-move-report-el",items:"li[data-qid]",start:function(t,s){e("#report-viewport").addClass("sorting"),e(".report-row > div:not(.report-elem-header), .report-row > table").addClass("sorthide").hide(),s.placeholder.height(e(s.item[0].children[0]).height()),e("#report-list li[data-qid]").each(function(t){e(this).find(".report-row").css("min-height",e(this).find(".report-elem-header").height()+"px")}),e(".report-elem-header").css("border-bottom-width",0),e(this).sortable("refreshPositions")},stop:function(t,i){e("#report-viewport").removeClass("sorting"),e(".sorthide").removeClass("sorthide").show(),e(".report-elem-header").css("border-bottom-width",1),e(this).sortable("refreshPositions"),renumberVisibleQuestions(e(".js-question-numbers").first().data("numtype"));var o=[];e("#report-list li[data-qid]").each(function(t){o.push(e(this).data("qid"))}),e.ajax({url:"/explorer/reorder-report-elements/",type:"post",data:{id:s.options.projectID,viewid:s.options.viewID,cid:s.options.customerID,new_order:o}})}})},setupSettings:function(){var t=this;e(".toggle-setting").on("change",function(){if(e(".js-"+e(this).attr("id")+":not(.override)").toggleClass("hide"),"show-nodata-questions"==e(this).attr("id")&&(
//actually hide / show the questions
e(this).prop("checked")?e(".js-show-nodata-questions").removeClass("hide"):e(".js-show-nodata-questions").addClass("hide"),renumberVisibleQuestions(e(".js-question-numbers").first().data("numtype"))),e(this).closest(".js-stats-tbl").length&&e(".js-"+e(this).attr("id")+":not(.override)").closest("table").removeClass("hide"),"fake-stats-ck"==e(this).attr("id")){var t=e(".js-"+e(this).attr("id")+":not(.override)").find(".table");t.hasClass("hide")&&t.removeClass("hide"),t.find("tr").each(function(t,s){e(s).hasClass("hide")&&e(s).removeClass("hide")})}}),e(".refresh-charts").on("change",function(){t.addAutoSave(),setTimeout(function(){ReportViewInstance.refreshCharts()},500)}),e(".reload-charts").on("change",function(){t.addAutoSave(),setTimeout(function(){t.reloadContent({all:!0})},500)}),e(".toggle-stats").on("click",function(){this.checked?(e(".js-show-summary-table").removeClass("col-md-12").addClass("col-md-9"),e(".js-stats-tbl .toggle-setting").prop("checked",!0)):(e(".js-show-summary-table").addClass("col-md-12").removeClass("col-md-9"),e(".js-stats-tbl input").prop("checked",!1),e.each(e(".js-stats-tbl input"),function(){e(".js-"+e(this).attr("id")).addClass("hide")})),e(".js-stats-tbl").toggleClass("hide",!this.checked),t.addAutoSave()}),
// question numbering
e('[name="options[question-numbers]"]').on("change",function(){e('.js-question-numbers[data-numtype!=""]').data("numtype",e(this).val()),renumberVisibleQuestions(e(this).val())}),
// Option changes - save in BG
e("#js-pop-options").on("change",":input:not(#show-filter,#fake-stats-ck)",e.proxy(this.addAutoSave,this)),
// include filter
e("#show-filter").on("change",function(){t.addAutoSave({redrawCharts:!0,all:!0})}),
// Individuals changes - save in BG
e("#js-pop-individuals").on("change",":input",function(){t.addAutoSave({redrawCharts:!0,all:!0})}),
// Toggle chevron classes across panel headings
e('.panel-title[data-toggle="collapse"]').click(function(){e(this).closest(".panel").siblings(".panel").find(".panel-title i").removeClass("icon-chevron-down").addClass("icon-chevron-right"),e("i",this).toggleClass("icon-chevron-down icon-chevron-right")})},bulkEdit:function(){function t(){var t=!1;e(".bulk-checkbox").each(function(){e(this).is(":checked")&&(t=!0)}),t?(e("#bulk-remove").removeClass("hide"),e("#bulk-remove-link").addClass("hide")):(e("#bulk-remove").addClass("hide"),e("#bulk-remove-link").removeClass("hide"))}var s=this;
//bulk actions
e("body").on("click","#bulk-select",function(){e(this).prop("checked")?e(".bulk-checkbox:visible").prop("checked",!0):e(".bulk-checkbox").prop("checked",!1),t()}),e("body").on("click","#bulk-remove-link",function(){e(".bulk-checkbox, #bulk-select").toggleClass("hide")}),e("body").on("click","#bulk-remove",function(){e(".bulk-checkbox").each(function(){e(this).is(":checked")&&e(this).parents(".form-row-option").remove()}),e("#bulk-remove").addClass("hide"),e("#bulk-remove-link").removeClass("hide"),e("#bulk-select").prop("checked",!1)}),
//single row actions
e("body").on("click",".bulk-checkbox",function(){return e(this).hasClass("hide")?void e(this).attr("checked",!1):void t()}),e("body").on("click",".js-bulk-delete",function(){e(this).parents(".form-row-option").remove()}),e("body").on("click",".js-bulk-copy",function(){var t=e(this).parents(".form-row-option").clone(),s=t.attr("data-elsku").indexOf("copy")>=0?t.attr("data-elsku"):"copy_"+t.attr("data-elsku");t.attr("data-elsku",s),t.find(".bulk-checkbox").attr("id","element-"+s),t.find("label").attr("for","element-"+s),t.insertAfter(e(this).parents(".form-row-option"))}),e("body").on("click","#bulk-add-question",function(t){t.preventDefault();var s=e(".js-bulk-add-menu").val();if("all"==s)e(".js-bulk-add-menu option").each(function(){var t=e(this).val(),s=e(this).text();if(""!=t&&e.isNumeric(t)){e.each(e("#report-element-grid .form-row-option"),function(s,i){e(this).attr("data-elsku")==t&&(t="copy_"+t)});var i=e("#new_el_templ").clone().removeClass("hide");i.removeAttr("id").attr("data-elsku",t),i.find(".bulk-checkbox").attr("id","element-"+t),i.find("label").attr("for","element-"+t).text(s),e("#report-element-grid .form-row-option").last().length>0?i.insertAfter(e("#report-element-grid .form-row-option").last()):i.appendTo(e("#report-element-grid #sortable-els"))}});else if(""!=s){//Don't add placholder menu item - crystal
e.each(e("#report-element-grid .form-row-option"),function(t,i){e(this).attr("data-elsku")==s&&(s="copy_"+s)});var i=e("#new_el_templ").clone().removeClass("hide");i.removeAttr("id").attr("data-elsku",s),i.find(".bulk-checkbox").attr("id","element-"+s),i.find("label").attr("for","element-"+s).text(e(".js-bulk-add-menu option:selected").text()),e("#report-element-grid .form-row-option").last().length>0?i.insertAfter(e("#report-element-grid .form-row-option").last()):i.appendTo(e("#report-element-grid #sortable-els"))}}),
// submit
e("body").on("submit","#bulk-edit-form",function(t){t.preventDefault();var i=[];e("#report-element-grid .form-row-option").each(function(){i.push({sku:e(this).attr("data-elsku")})}),e.post(e(this).attr("action"),{id:e("#sid").val(),viewid:e("#vid").val(),new_order:i}).done(function(t){"ok"==t.status?(e("#bulk-edit-pane").modal("hide"),s.reloadContent({all:!0})):"error"==t.status&&e("#"+t.error).removeClass("hide")})})},shareSection:function(){function t(){var t=e('input[name="sSubType"]:checked',s).val(),i="",a="http://";"subdomain"==t?(i+=e("#subdomain-select",s).val(),i+="."+e("#subdomain-slug",s).val()+".sgizmo.com"):"private"==t?(i+=e("#privatedomain-select",s).val(),o.options.privateDomSec&&(a="https://")):(i+=o.options.standardDomain,o.options.forceHTTPS&&(a="https://")),i=a+i+o.options.linkPathname,e(".report-link",s).val(i),e(".js-embed-code").val('<iframe src="'+i+'" frameborder="0" width="700" height="500" style="overflow:hidden"></iframe>'),e(".report-link-a",s).attr("href",i)}var s=e("#js-share-modal"),i=e("#report-share-form",s),o=this,a="";
// Share modal trigger
e(".js-share-modal").click(function(e){s.removeClass("hide").appendTo("body").modal({show:!0}),a=i.serialize()}),
// Form submit - AJAX save
i.submit(function(t){t.preventDefault(),e.post(i.attr("action"),i.serialize())}),
// Privacy dropdown
e(".access-setting-select").click(function(){e("#share-settings").val(e(this).data("option")),e(".js-share-settings").html(e(this).html());var t=e(this).data("option"),s="password"===t||"private"===t;e(".js-password-container").toggleClass("hide","password"!=t),s?(e('.js-social-sharing input[type="checkbox"]').attr("checked",!1),e(".pii-warning").addClass("hide")):e(".pii-warning").removeClass("hide"),e(".js-social-sharing").toggleClass("hide",s),i.trigger("submit")}),e(".frequency",s).click(function(){e(".js-date-once",s).toggleClass("hidden","once"!=e(this).val()),e(".js-date-recurring",s).toggleClass("hidden","once"==e(this).val())}),
// Save on input change
e("#show-branding, #social-share, #date-filter, #access-password, .link-setup select, .link-setup :text",s).change(function(){i.trigger("submit")}),
// Toggle password visibility (if creating a new password)
// $('.js-tgl-pwd').click(function() {
// 	var $pwd = $('#access-password').attr('type', this.checked ? 'text' : 'password').focus()
// 	,	fill = $pwd.data('fakepwd');
// 	if (fill) {
// 		if (this.checked && fill == $pwd.val()) {
// 			$pwd.val('');
// 		}
// 		else if (!this.checked && !$pwd.val()) {
// 			$pwd.val(fill);
// 		}
// 	}
// });
e(".scheduler select, .scheduler textarea, .scheduler :text").change(function(){i.trigger("submit")}),e("#email-report").change(function(){e(".scheduler",s).toggleClass("hide",!e(this).is(":checked")),i.trigger("submit")}),e("input[name=sSubType]",s).click(function(){e(".link-setup",s).addClass("hidden"),e("."+e(this).val()+"-setup",s).removeClass("hidden"),i.trigger("submit")}),e(".js-embed-tab").click(function(){e(this).addClass("btn-primary").siblings().removeClass("btn-primary")}),e(".js-embed-code").mouseup(function(){e(this).select()}),e('input[name="sSubType"], #subdomain-select, #privatedomain-select',s).change(t),e("#subdomain-slug",s).blur(t)},setupStyles:function(){require(["plugins/minicolors/jquery.minicolors.js"]).done(this.setupColors,this),this.setupThemes(),this.setupCharts(),this.setupLogo(),
// Load resources - images and fonts
window.setTimeout(function(){
// Fonts
e("head").append("<link href='https://fonts.googleapis.com/css?family=Patrick+Hand|Lato|Neuton|Poiret+One|Lobster|Holtwood+One+SC|Rokkitt|Great+Vibes|Open+Sans|Roboto|Raleway|Montserrat|Roboto+Slab|Merriweather|Inconsolata|Pacifico|Amatic+SC|Special+Elite|Quattrocento|Cutive' rel='stylesheet' type='text/css'>")},400),this.setupFonts(),this.setupMiscStyles()},setupMiscStyles:function(){
//page width
var t=function(){var t=e("#width-slider").slider("value");e("#report-wrapper").css("width",t+"%"),e(".js-width-val").val(t)};e("#width-slider").slider({min:25,max:100,create:function(t,s){var i=e("#width-slider").data().width?e("#width-slider").data().width:55;e("#width-slider").slider("value",i),e(".ui-slider-handle").css("background-color","#C4C6C9")},slide:t,stop:t}),e(".js-width-unit").click(function(){var t=e(this).data().type;e(".js-width-unit").val(t),e(".js-width-unit-text .unit").text(t);var s=e(".js-width-val").val();"px"==t?s=700:"%"==t&&s>100&&(s=75),e(".js-width-val").val(s),
//disable slider for px width
e("#width-slider").slider("px"==t?"disable":"enable"),"%"==t&&e("#width-slider").slider("value",s),e("#report-viewport").find("#report-list").css("width",s+t)}),e(".js-width-val").change(function(){var t=e(this).val(),s=e("input.js-width-unit").val();t||(t="%"==s?55:500,e(".js-width-val").val(t)),"%"==s&&$widthSlider.slider("value",t),e("#report-viewport").find("#report-list").css("width",t+s)})},setupThemes:function(){var t=this,s=[];e(".select-preset").on("click",function(){e(this).find(".preset-val").each(function(t){var i=e(this).data();
// update chart colors
if(e(i.input).val(i.value),
// update minicolors
e(this).hasClass("update-controls")&&e(i.input).trigger("updatecontrols"),
// update word and grid color
e(this).hasClass("update-bg")&&e(i.input).prev("a").css("background-color","#"+i.value),
// update indicators
e(this).hasClass("update-ind")&&e('[data-reportattr="'+i.input.replace("#","")+'"]').css("background-color",i.value),e(this).hasClass("update-font")&&e(i.selector).html(i.value),"#chart-colors"==i.input){var o=i.value.split(";"),a="";e("#sortable a").css("background-color","#fff").addClass("empty").attr("data-color","");for(var t=0;t<o.length;t++)e("#sortable a").eq(t).css("background-color","#"+o[t]).removeClass("empty").attr("data-color",o[t]),a+='<span class="chart-color text-center" style="background-color: #'+o[t]+'; height: 20px;">',a+="</span>";e(".js-ch-clr-tab").html(a)}
//refresh color wheels
i.value&&i.value.toString().indexOf("#")>=0&&s.push('[name="so-'+i.input.substring(1)+'"]')});for(var i=0;i<s.length;i++){var o=s[i];e(o).change()}t.updateFontIndicators(),t.addAutoSave({redrawCharts:!0,all:!0})}),e("#save-theme").on("click",function(s){s.preventDefault();var i=e("input[name^=options], input[name^=so-], input[name^=view-table-stats], input[name^=view-stats]",e("#report-form")).serialize();Spinner.on(),e.ajax({url:"/explorer/save-report-theme",data:{id:t.options.projectID,settings:i,name:e("#new-theme-name").val()},type:"post"}).done(function(t){e(".save-theme").addClass("hide"),e(".theme-new").append(t.html)}).always(Spinner.off)}),e("body").on("click",".custom-theme-delete",function(s){var i=e(this).data("themeid");new Verify(T("Are you sure you want to delete this theme?"),function(){Spinner.on(),e.ajax({url:"/explorer/delete-report-theme",data:{id:t.options.projectID,theme_id:i},type:"post"}).done(function(t){"ok"==t.status&&e('[data-themeid="'+i+'"]').remove()}).always(Spinner.off)})}),e("body").on("click",".select-custom",function(){Spinner.on(),e.ajax({url:"/explorer/apply-report-theme",data:{id:t.options.projectID,theme_id:e(this).data("themeid")},type:"post"}).done(function(s){"ok"==s.status&&s.settings&&(e('[name="view-stats[]"], [name="view-table-stats[]"], [name^=options]').prop("checked",!1),e.each(s.settings,function(t,s){"object"==typeof s?"options"==t?e.each(s,function(s,i){e('[name="'+t+"["+s+']"]').val(i)}):("view-stats"==t||"view-table-stats"==t)&&e.each(s,function(s,i){e("#"+t+"-"+i).prop("checked",!0)}):(e('[name="'+t+'"]').val(s),s.indexOf("#")>=0&&//refresh color wheels
e('[name="'+t+'"]').change())}),t.addAutoSave({redrawCharts:!0,all:!0}))}).always(Spinner.off)})},setupCharts:function(){var t=this,s=e("#js-pop-style-charts"),i=e(".select-chart-preset",s),o=e(".select-custom-chart-color",s),a=e(".select-custom-grid-color",s),r=e(".select-custom-word-color",s),n=e("#chart-colors",s),l=function(){var t="";e("#sortable a").each(function(){e(this).attr("data-color")&&(t+=e(this).attr("data-color")+";")}),n.val(t.replace(/;$/,"")).change()};n.change(function(s){for(var i=this.value.split(";"),o="",a=i.length,r=0;a>r;r++)o+='<span class="chart-color text-center" style="background-color: #'+i[r]+'; height: 20px;">',o+="</span>";e(".js-ch-clr-tab").html(o);var n={chart:this.value,grid:e("#grid-color").val(),word:e("#word-color").val()};ReportViewInstance.refreshCharts({colors:n}),
// Save changes in BG
t.addAutoSave()}),i.click(function(){i.removeClass("active"),e(this).addClass("active");var t=e(this).data("colors"),s=t.split(";"),l=e(this).data("gridcolor"),c=e(this).data("wordcolor");e("#grid-color").val(l),a.css("background-color","#"+l),e("#word-color").val(c),r.css("background-color","#"+c),n.val(t).change(),o.css("background-color","").addClass("empty").attr("data-color","").removeClass("active");for(var d=0;d<s.length;d++)e("#sortable a").eq(d).css("background-color","#"+s[d]).removeClass("empty").attr("data-color",s[d])}),e("#sortable",s).sortable({stop:function(e,t){l()}}),o.filter(".empty:first").addClass("active"),o.click(function(){e(".select-custom-chart-color, .select-custom-grid-color, .select-custom-word-color",s).removeClass("active"),e(this).addClass("active"),e(this).attr("data-color").length>0&&e("#custom-color").val(e(this).attr("data-color")).trigger("updatecontrols")}),a.click(function(){o.removeClass("active"),r.removeClass("active"),e(this).addClass("active"),e("#custom-color").val(e("#grid-color").val()).trigger("updatecontrols")}),r.click(function(){o.removeClass("active"),a.removeClass("active"),e(this).addClass("active"),e("#custom-color").val(e("#word-color").val()).trigger("updatecontrols")}),e("#custom-color",s).change(function(){var i=this.value,n=this.value.replace("#","");o.filter(".active").length>0?(o.filter(".active").css("background-color",i).attr("data-color",n).removeClass("empty"),l()):a.filter(".active").length>0?(a.filter(".active").css("background-color",i),e("#grid-color",s).val(n),t.addAutoSave({redrawCharts:!0})):r.filter(".active").length>0&&(r.filter(".active").css("background-color",i),e("#word-color",s).val(n),t.addAutoSave(),e(".jqcloud span").css("color",i))}),e(".remove-color",s).click(function(){o.filter(".active").length>0&&(o.filter(".active").css("background-color","").attr("data-color","").addClass("empty"),l())})},setupColors:function(){var t=this;
//set up colors
e.minicolors={defaults:{animationSpeed:50,animationEasing:"swing",change:null,changeDelay:0,control:"wheel",defaultValue:"",hide:null,hideSpeed:100,inline:!0,letterCase:"lowercase",opacity:!1,position:"bottom left",show:null,showSpeed:100,theme:"default"}},e(".js-hex-input").on("keyup",function(){var t=e(this).val();e(this).closest(".panel-body").find(".minicolors-paste input").val(t).blur()}),e(".minicolors-input").minicolors({sliderLayout:"horizontal",change:function(s,i){var o=e(this).closest(".color-data").data("target"),a=e(this).closest(".color-data").data("attribute"),r=e(this).closest(".color-data").data("target2"),n=e(this).closest(".color-data").data("attribute2"),l="update-styles-"+this.id;if(o&&a){e(o).css(a,s),e("."+l).length&&e("."+l).remove();var c="<div class='"+l+"'><style>"+o+"{ "+a+":"+s+";}</style></div>";e("."+l).length>0?e("."+l).replaceWith(c):e(c).appendTo("body")}if(r&&n){e(r).css(n,s);var c="<div class='"+l+"'><style>"+r+"{ "+n+":"+s+";}</style></div>";e("."+l).length>0?e("."+l).replaceWith(c):e(c).appendTo("body")}t.setMixedColors(),
// Save changes in BG
t.addAutoSave(),t.updateFontIndicators(),"page-background"==this.id&&t.updateMisc(),
// Update tab color
a&&s&&e('[data-reportattr="'+this.id+'"').css(a,s)}}),e(".color-palettes .color").each(function(){e(this).css("background-color",e(this).parent("a").data("hex"))}),e(".select-color").click(function(){
// Set color
e(this).closest(".panel-body").find(".minicolors-paste input").val(e(this).data("hex")).blur()})},setupLogo:function(){var t=e("#img-width-slider"),s=this;e("#img-select-btn").click(function(){e("body").one("Builder.imageselectclose",function(){var i=ImagePicker.get("#image-select-picker").getImage();e(".js-header-image-hidden").val(i.url),e(".style-bar-logo-no-image, .style-bar-logo-image, #img-select-btn *, #img-select-btn + a").addClass("hide"),i.url?(e("#report-header img").removeClass("hide").attr("src",i.url).load(function(){e("#report-header img").css("max-width","100%");var s=Math.ceil(100*this.width/parseInt(e("#report-header").css("width"))),i=s>100?100:s;t.slider({max:i,value:i}),e(".js-img-width-max").val(i),e(".js-img-width-val").val(i)}),e(".show-logo-setup img").removeClass("hide").attr("src",i.url),e("#img-select-btn + a").removeClass("hide")):(e(".style-bar-logo-no-image, #img-select-btn div").removeClass("hide"),e("#report-header img").addClass("hide")),
// Update the thumbnail in the sidebar
e(".style-bar-logo-no-image, .style-bar-logo-image").addClass("hide"),i.url?e(".style-bar-logo-image").removeClass("hide").attr("src",i.url):e(".style-bar-logo-no-image").removeClass("hide"),
// Save changes in BG
s.addAutoSave()})}),e(".js-logo-align").change(function(){var t=e(this).data(),i=t.target,o=t.attribute,a=e(this).val(),r=t.attribute2,n=e(this).find("option:selected").data("val");e("#report-viewport").find(i).css(o,a),e("#report-viewport").find(i).css(r,n),
// Save changes in BG
s.addAutoSave()});var i=function(){var i=t.slider("value");e("#report-header img").css("max-width",i+"%"),e(".js-img-width-val").val(i),
// Save changes in BG
s.addAutoSave()};t.slider({min:10,max:t.data()?t.data().max:100,create:function(s,i){var o=""!=e(".js-img-width-val").val()?e(".js-img-width-val").val():100*parseFloat(e(".sg-report-logo img").width())/parseFloat(e(".sg-report-logo").width());t.slider("value",o),e(".ui-slider-handle").css("background-color","#C4C6C9")},slide:i,stop:i})},setupFonts:function(){var t=this;this.options.lightFonts;
// Font family select
e(".js-ff-par [data-font]").click(function(){var s=e(this).data().font,i=e(this).closest(".js-ff-par"),o=e('[type="hidden"].js-font-fam',i).val(s);
// Hide custom font inputs
e(this).closest(".panel-body").find('[class*="custom-font-"]').addClass("hidden").find("input").val(""),e(".ff-btn > span",i).text(s),e(o.data("target")).css(o.data("attribute"),s),
// Save changes in BG
t.addAutoSave({redrawCharts:!0,all:!0}),t.updateFontIndicators()}),
// Add a custom font
e(".js-custom-title").click(function(){e(".js-title-font").text("Custom Font"),e(".custom-font-title").removeClass("hidden")}),e(".js-custom-question").click(function(){e(".js-question-font").text("Custom Font"),e(".custom-font-question").removeClass("hidden")}),e(".custom-font-title input").on("blur",function(){var s=!0;e(".custom-font-title input").each(function(){""==e(this).val()&&(s=!1)}),s&&t.getFrame(function(t){t.find(e(".custom-font-title input:first-child").data("target")).css("font-family",e(".custom-font-title input").first().val()),t.find("head").append('<link href="'+e(".custom-font-title input").last().val().replace("http:","")+'" rel="stylesheet" type="text/css">')})}),e(".custom-font-question input").on("blur",function(){var s=!0;e(".custom-font-question input").each(function(){""==e(this).val()&&(s=!1)}),s&&t.getFrame(function(t){t.find(e(".custom-font-question input:first-child").data("target")).css("font-family",e(".custom-font-question input").first().val()),t.find("head").append('<link href="'+e(".custom-font-question input").last().val().replace("http:","")+'" rel="stylesheet" type="text/css">')})}),e(".custom-font-base input").on("blur",function(){var s=!0;e(".custom-font-base input").each(function(){""==e(this).val()&&(s=!1)}),s&&t.getFrame(function(t){t.find(e(".custom-font-base input").first().data("target")).css("font-family",e(".custom-font-base input").first().val()),t.find("head").append('<link href="'+e(".custom-font-base input").last().val().replace("http:","")+'" rel="stylesheet" type="text/css">')})}),e(".js-custom-base").click(function(){e(".js-base-font").text("Custom Font"),e(".custom-font-base").removeClass("hidden")}),
// Font size
e(".js-fs-select").change(function(){var s=e(this).data(),i=e(this).val();e(s.target).css(s.attribute,i),
// Save changes in BG
t.addAutoSave(),t.updateFontIndicators()}),
// Font weight
e(".js-font-weight").click(function(){e(this).toggleClass("active");var s=e(this).data(e(this).hasClass("active")?"on":"off"),i=e(this).data();e(this).prev("input:hidden").val(s),e(i.target).css(i.attribute,s),
// Save changes in BG
t.addAutoSave(),t.updateFontIndicators()})},updateFontIndicators:function(){
// Calculate relative font size for the indicators
function t(t){var s=(98+parseInt(e(t+" option:selected").text()))/5;return s+"px"}e(".js-head-text").css({fontFamily:e("#title-font").val(),color:e("#headertextcolor").val(),fontWeight:e('[name="so-title-weight"]').val(),fontSize:t("#title-size")}),e(".js-question-text").css({fontFamily:e("#question-font").val(),color:e("#questionfontcolor").val(),fontSize:t("#question-size")}),e(".js-body-text").css({fontFamily:e("#base-font").val(),color:e("#basefontcolor").val(),fontSize:t("#base-size")})},updateMisc:function(){var t=this;
// update report controls (edit, move, delete)
e(".report-action-links i").css("color",t.getContrastColor(e("#page-background").val()));
// update bar background
var i=s.hexToRgb(t.getContrastColor(e("#page-background").val()));e(".progress").css("background-color","rgba("+i.r+","+i.g+","+i.b+",0.25)")},setMixedColors:function(){if(!this.suppressMixed){var t=e("#page-background").val(),i=(e("#questionfontcolor").val(),e("#basefontcolor").val()),o=".report-elem-header, .nav-tabs, .report-container, .nav-tabs>li.active>a, .nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus,#report-wrapper table.table thead tr th,#report-wrapper table.table thead tr td,#report-wrapper table.table tbody tr th,#report-wrapper table.table > tfoot > tr > th,#report-wrapper table.table:not(.table-summary) tbody tr td,#response-content a.back-to-list",a={};a[o]={"border-color":{from:t,to:i,amount:".4"}};for(var o in a)for(var r in a[o])e(o).css(r,s.shiftTowards(a[o][r].from||"#ffffff",a[o][r].to||"#ffffff",a[o][r].amount))}},getContrastColor:function(e){var t=s.hexToRgb(e),i=(299*t.r+587*t.g+114*t.b)/1e3;return i>=128?"#252525":"#EFEFEF"},removeGroup:function(e){var t=e.data("grid");this.$segmentSelect.find('option[value="'+t+'"]').removeAttr("disabled"),e.remove()},postForm:function(t){this.formAjax||(Spinner.on(),this.$saveBtn.prop("disabled",!0),this.formAjax=e.ajax(this.postFormOptions()).done(_.bind(function(e){
// Error
"bad"==e.status?new AlertWarning(e.error||"An error occurred"):(this.reloadContent({all:!0}),t&&t(),this.setClean()),this.formAjax=!1,this.$saveBtn.prop("disabled",!1)},this)).always(Spinner.off))},postFormOptions:function(){return{url:this.$form.attr("action"),data:this.$form.serialize(),type:"post",error:function(){new AlertWarning("There was a problem saving your report!")},timeout:4e3}},addAutoSave:function(e){e||(e={});var t=this.postFormOptions(),s=this;t.beforeSend=function(){s.formAjax=!0,Spinner.on()},this.saveAjaxQueue.add(t,function(){s.formAjax=!1,Spinner.off(),e.redrawCharts&&s.reloadContent({charts:!0,all:!!e.all,tab:e.tab||null}),e.callback&&e.callback()})},reloadContent:function(t){var s=this,i="";e(".js-report-indexing-trigger").length>0&&!e(".js-report-indexing-trigger").hasClass("hide")||(t.tab&&(i="/tab/"+t.tab),t.all?(Spinner.on(),e("#report-view-print").load("/explorer/load-report-view/id/"+this.options.projectID+"/view/"+this.options.viewID+i,function(){Spinner.off(),s.listen()}),"browse"==t.tab&&ReportViewInstance.loadResponseView()):t.charts&&ReportViewInstance&&("browse"==t.tab?ReportViewInstance.loadResponseView():ReportViewInstance.refreshCharts()))},filterSection:function(){
// Updates the question answers label for a specific logic builder instance
function t(t){var i=e('.js-qst-ans-list li[data-index="'+t+'"]',s),o=e('.js-quest-filter[data-index="'+t+'"]',s),a=e(".logic-select.atom-1",o),r=e(".atom-2-container",o),n=e(":checked",r),l=e(":text",r),c=e(":selected",a).text(),d=l.length?l.val():n.map(function(){return e(this).siblings("label").text()}).get().join(", ");
// Update the LI with the title:answer
e("strong",i).text(c),e("span",i).text(d)}var s=e("#js-filter-control"),i=e(".js-filter-set",s),o=e(".js-filter-set [data-for]",s),a=e(".js-filter-ck-list ul",s),r=e(".js-filter-select",s),n=e("#js-cst-logic-modal").removeClass("hide"),l=e(".js-flt-act-num"),c=function(){var t=0;e(".js-edit:visible",s).each(function(){t+=e(this).closest("[data-label]").find(".js-flt-act-ck").prop("checked")?1:0}),l.text(t)},d=this,h=0;
// On select of filter type
r.find("a").on("click",function(){
// Reset visibility of filters
o.addClass("hide"),i.addClass("hide");var t=e(this).data("type");if(t)
// Custom logic filter - move modal to body
if("logic"==t){var a=!1;n.removeClass("hide").appendTo("body").modal({show:!0}),
// Move custom logic modal back into sidebar to save data in form
e(".js-save-custom-logic",n).on("click",function(){n.addClass("hide").appendTo(s),r.children(":first").prop("selected",!0),e('[data-label="logic"]',s).removeClass("hide").find(":checkbox").prop("checked",!0),d.addAutoSave({redrawCharts:!0,callback:function(){e.get("/explorer/filter-custom-logic-text",{id:d.options.projectID,view:d.options.viewID}).done(function(t){t&&t.text&&e(".js-flt-lg-txt").text(t.text)})}}),c(),a=!0}),n.one("hidden.bs.modal",function(){a?e(".js-filter-select option:first").prop("selected",!0):
// Cancelled: revert changes to saved version
n.load("/explorer/filter-custom-logic-html/id/"+d.options.projectID+"/view/"+d.options.viewID)})}else
// For question answer filters - pull a new logic builder
if(
// Show the chosen filter pane
i.removeClass("hide"),o.filter('[data-for="'+t+'"]').removeClass("hide"),"question-answers"==t){e(".js-add-quest-answ-filter").removeClass("hide").siblings().addClass("hide");var l={show_survey_links:!1,show_analysis:!1,hide_contact_options:!0,hide_cascade_menus:!0};
// AJAX request logic builder and append to placeholder
Spinner.on(),e.get("/logicbuilder/get-new-logic-builder",{id:d.options.projectID,qid:1,unit:"",map:"",options:JSON.stringify(l),element:"filter-question-answers-rules-"+(h+1)}).done(function(t){t&&t.response&&e(".js-add-quest-answ-filter",s).html(t.response.html),
//update placeholder text, this is super gross! 
e("#filter-question-answers-rules-"+(h+1)+"-logic-builder").on("LogicBuilder.refreshatom",function(){e(".atom-2-container .form-control[type=text]").attr("placeholder","Exactly matches some response text")})}).always(Spinner.off)}}),
// Nevermind button - reset filter content, hide panes
e(".js-filter-nvm",s).click(function(){o.addClass("hide"),i.addClass("hide")}),
// Update all labels on page load
e(".js-quest-filter[data-index]",s).each(function(){t(e(this).data("index"))}),
// Filter save button
e(".js-filter-save",s).click(function(){
// Get visible filter row and target LI
var i=o.filter(":visible"),r=i.data("for"),n=e('li[data-label="'+r+'"]',a).removeClass("hide");switch(r){
// Response status filter
case"rsp-status":if(e('[name^="view-rsp-states"]:checked',i).length<1)return e(".js-filter-select-one").removeClass("hide"),void e('[name^="view-rsp-states"]',i).on("click",function(){e(".js-filter-select-one").addClass("hide")});e(".js-rsp-st",n).text(e('[name^="view-rsp-states"]:checked',i).map(function(){return this.value}).get().join(", ")+(e("#include-test-data",i).prop("checked")?", Test Data":""));break;
// Link filter
case"link":e(".js-inc",n).html(e('[name^="filter-links"]:checked',i).map(function(){return e(this).siblings("label").text()}).get().join("<br>"));break;
// Response ID filter
case"rsp-ids":var l=e('[name^="include"]',i).val(),p=e('[name^="exclude"]',i).val();""==l&&""==p?e(".js-remove",n).click():(e(".js-inc",n).text(l),e(".js-exc",n).text(p));break;
// Question answer filters
case"question-answers":var u=e(".js-quest-filter:visible",s);
// Edit a question filter - update text
if(u.length)t(u.data("index"));else{var f=e(".js-add-quest-answ-filter",s);
// Add a new question filter
f.attr({"class":"js-quest-filter hide","data-index":++h}),
// Add a new filter placeholder
e('<div class="js-add-quest-answ-filter"></div>').insertAfter(f),
// Duplicate the template LI
f=e(".js-qst-ans-list .js-clone",s),f.clone().attr("data-index",h).removeClass("js-clone hide").insertBefore(f).find("a").attr("data-index",h),
// Update LI text
t(h),
// Update the index for the server
e(".js-count-input",s).val(h)}}e(":checkbox",n).prop("checked",!0),
// Done saving - click nevermind to reset
e(".js-filter-nvm",s).click();var v={redrawCharts:!0};e("#show-filter").is(":checked")&&(v.all=!0),e("#response-grid").hasClass("active")&&(v.tab="browse"),d.addAutoSave(v),c()}),
// Validation for the include, exclude inputs
e('[name^="include"]:text, [name^="exclude"]:text',s).change(function(){this.value=this.value.replace(/[^\d,-]/g,"")}),
// Edit a filter
a.on("click",".js-edit",function(t){t.preventDefault();var a=e(this).closest("[data-label]").data("label");
// Question answer filter? Show specific logic builder
if(e(".filter-options",s).addClass("hide"),"question-answers"==a){i.removeClass("hide"),o.filter('[data-for="question-answers"]').removeClass("hide");var n=e('.js-quest-filter[data-index="'+e(this).data("index")+'"]',s);n.removeClass("hide").siblings().addClass("hide"),e(".atom-2-container",n).show()}else"logic"==a?e('[data-type="logic"]',r).click():(i.removeClass("hide"),o.filter('[data-for="'+a+'"]').removeClass("hide"))}),
// Remove a filter
a.on("click",".js-remove",function(t){
// Question answer filter? Delete logic builder and LI
if(t.preventDefault(),e(this).hasClass("q-ans")){e('.js-quest-filter[data-index="'+e(this).data("index")+'"]',s).remove(),e(this).closest("li").remove();
// Uncheck and hide question rows if no filters
var i=e(".js-qst-ans-list",s);!e("li:visible",i).length&&i.siblings(":checkbox").prop("checked",!1).parent().addClass("hide")}else{var a=e(this).closest("li"),r=a.addClass("hide").data("label"),l=o.filter('[data-for="'+r+'"]');switch(e(":checkbox",a).prop("checked",!1),r){
// Response IDs - reset inputs
case"rsp-ids":e(".js-inc, .js-exc",a).text(""),e('[name^="include"], [name^="exclude"]',l).val("");break;
// Custom logic - clear out logic map
case"logic":
// Remove all logic
e(".remove-all-logic",n).click();break;case"link":e('[name^="filter-links"]').prop("checked",!1)}}var h={redrawCharts:!0};e("#show-filter").is(":checked")&&(h.all=!0),e("#response-grid").hasClass("active")&&(h.tab="browse"),d.addAutoSave(h),c()}),
// Toggling a filter
s.on("click",".js-flt-act-ck",function(e){d.addAutoSave({redrawCharts:!0}),c()})},segmentSection:function(){
// Get the serialized form for the segment editor
function t(){return e("#report-form .js-seg-filter-set :input").serialize()}
// Called when the segment editor has been loaded (setup color picker)
function s(t,s){
// Segment color
e(".select-color",a).click(function(){e(".minicolors-paste input",a).val(e(this).data("hex")).blur()}).each(function(){e(".color",this).css("background-color",e(this).data("hex"))}),e(".minicolors-input",a).minicolors({sliderLayout:"horizontal",change:function(t){e(".js-seg-color",a).css({backgroundColor:t})}});
// Date range
var i=e(".datepicker.min",a).datepicker({dateFormat:"yy-mm-dd",onClose:function(e){o.datepicker("option","minDate",e)}}),o=e(".datepicker.max",a).datepicker({dateFormat:"yy-mm-dd",onClose:function(e){i.datepicker("option","maxDate",e)}});"logic"==s&&e(".js-cl-trigger",a).click(),t&&e(".seg-editor .atom-2-container",a).show()}
// Load the editor for a new or an existing segment
function i(t,i){return Spinner.on(),e.get("/explorer/segment-edit",{tab:i||"",id:u.options.projectID,view:u.options.viewID,segment:t}).done(function(o){e(".js-load",r).html(o),r.removeClass("hide"),s(t,i)}).always(Spinner.off)}function o(s){s||(s=e.noop);var i=e.param({id:u.options.projectID,view:u.options.viewID})+"&"+t();Spinner.on(),e.post("/explorer/segment-save",i).done(s).always(Spinner.off)}var a=e("#js-seg-control"),r=e(".js-seg-filter-set",a),n=e(".js-seg-ck-list ul",a),l=e(".js-template",n),c=e(".js-seg-filter-select",a),d=e(".js-seg-act-num"),h=function(){return e("[data-id] .js-seg-act-ck:checked",n).length},p=function(t){d.text(t=h()),e("[data-id] .js-seg-act-ck:not(:checked)",n).prop("disabled",t>=10),u.addAutoSave({redrawCharts:!0})},u=this;
// On select of filter type
c.find("a").on("click",function(){r.addClass("hide");var t=e(this).data("type");t&&i("",t).done(function(){r.insertAfter(e(".js-seg-menu-par",a)),e("#report-seg-rules-logic-builder").on("LogicBuilder.refreshatom",function(){e(".atom-2-container .form-control[type=text]").attr("placeholder","Exactly matches some response text")})})}),
// Edit custom logic - show modal
a.on("click",".js-cl-trigger",function(){var t=e(this),s=e(this).siblings(".modal"),i=s.data("id"),a=!1;s.removeClass("hide").appendTo("body").modal({show:!0}),
// Logic saved - don't refresh
e(".js-sv-lg",s).click(function(){a=!0}),s.one("hidden.bs.modal",function(){s.addClass("hide").insertAfter(t),a?
// Saved and existing segment - update DB
i&&o():
// Cancelled: revert changes to saved version
s.load("/explorer/segment-edit-modal/id/"+u.options.projectID+"/view/"+u.options.viewID+"?segment="+i)})}),
// Nevermind button - reset seg content, hide panes
e(".js-seg-nvm",a).click(function(){r.addClass("hide")}),
// Filter save button
e(".js-seg-save",a).click(function(){var t=e("#new-segment-name:visible",r);t.length&&""==e.trim(t.val())?t.focus():(o(function(t){if(t&&t.segments){for(var s,i,o,a=0;a<t.segments.length;a++)i=t.segments[a],o="seg-ck-"+i.segment,i["new"]?(s=l.clone().attr("class","").insertBefore(l),e("a",s).add(s).attr("data-id",i.segment),
// Check the segment unless it goes over the cap: 10 segments
e(":checkbox",s).attr({value:i.segment,id:o}).prop("checked",h()<11)):s=e('li[data-id="'+i.segment+'"]',n),e(".js-seg-name",s).text(i.name).attr("for",o);
// Save and refresh
p()}}),e(".js-seg-nvm",a).click(),e(".js-current-segs").removeClass("hide"))}),
// Validation for the include, exclude inputs
a.on("change",'[name^="seg-include"]:text, [name^="seg-exclude"]:text',function(){this.value=this.value.replace(/[^\d,-]/g,"")}),
// Edit a segment
n.on("click",".js-edit",function(t){t.preventDefault();var s=e(this).data("id"),o=e(this).closest("li");i(s).done(function(){r.appendTo(o)})}),
// Remove a segment
n.on("click",".js-remove",function(t){t.preventDefault();var s=e(this).data("id");s&&e.post("/explorer/segment-delete",{id:u.options.projectID,view:u.options.viewID,segment:s}),e(this).closest("li").remove(),p()}),n.on("click",".js-seg-act-ck",p)}}),ReportEdit.Defaults={viewID:0},
// !-- NewReportElement --
this.NewReportElement=jInterface.extend({init:function(e){this.options=e||{},this.listen()},listen:function(){this.$form=e(".js-add-form"),"table"==this.options.type?this.listenTable():"text"==this.options.type&&this.listenMedia();this.$form.submit(function(t){t.preventDefault(),e("body").trigger("addelesubmit",[this]),e("#builder-misc-modal").modal("hide")})},listenMedia:function(){require("ckeditor").done(function(){CKEDITOR.config.extraPlugins="fullmode",CKEDITOR.replace(document.getElementById("text_elem_editor"),{toolbar:"Full_Limited",allowedContent:!0,basicEntities:!1,entities:!1});var t=function(){e("#text_elem_editor").val(this.getData()).trigger("keyup")};CKEDITOR.instances.text_elem_editor.on("change",t),CKEDITOR.instances.text_elem_editor.on("mode",t)})},listenTable:function(){new AppendixElement({parent:e(".js-new-table-par")})}}),this.AppendixElement=jInterface.extend({init:function(e){this.options=e||{},this.listenTable()},listenTable:function(){var t=this.options.parent,s=e(".row-template",t),i=_.template(s.html());e(".js-project-menu",t).change(function(){e(".js-add-question",t).toggleClass("disabled",!e(this).val())}),e(".js-add-question",t).click(function(){var s,o,a=e(".js-project-menu",t).val();""!=a&&(s=e(".js-project-menu option:selected",t),o=i({data:{id:a,title:s.data("title")||s.text()}}),e("#sortable-els",t).append(o),e(".js-project-menu",t).val("").change())}),t.on("click",".js-delete-row",function(){e(this).closest(".form-row-option").remove()}),e("#sortable-els",t).sortable({items:"> .form-row-option"})}});var s={hexToRgb:function(e){return e=parseInt(e.replace("#",""),16),{r:e>>16&255,g:e>>8&255,b:255&e}},rgbToHex:function(e,t,s){return"#"+((1<<24)+(e<<16)+(t<<8)+s).toString(16).slice(1)},shiftTowards:function(e,t,i){function o(e){if(e.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))return s.hexToRgb(e);var t=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);return t.length>3&&(t.shift(),t.pop()),{r:t[0],g:t[1],b:t[2]}}i=i||.5;var a=o(e),r=o(t),n=parseInt(a.r-(a.r-r.r)*i),l=parseInt(a.g-(a.g-r.g)*i),c=parseInt(a.b-(a.b-r.b)*i);return s.rgbToHex(n,l,c)}};this.renumberVisibleQuestions=function(t){var s=1;e.each(e(".report-row > .report-elem-header.question-header:visible"),function(){var i=e(this).find(".js-question-numbers"),o=e(this).find(".js-question-numbers-original").html();switch(t){case"no":i.html("");break;case"original":i.html(o);break;case"alph":s>26?s%26>0?i.html(String.fromCharCode(65+Math.floor(s/26)-1)+String.fromCharCode(65+s%26-1)+"."):i.html(String.fromCharCode(65+Math.floor(s/26)-2)+String.fromCharCode(90)+"."):i.html(String.fromCharCode(65+s-1)+".");break;case"num":default:i.html(s+".")}s++})},e(function(){
// Add copy to present triggers
e(".js-copy").length&&require(["plugins/clipboardjs/clipboard.min.js"],function(){new Clipboard(".js-copy")})})}(jQuery,window);
!function(e,t){var s=require(["tagsinput"]);
// !-- ExplorerResponsePane --
this.ExplorerResponsePane=jInterface.extend({init:function(t){this.options=e.extend(!0,{},ExplorerResponses.Defaults,t||{}),this.form=e("#response-form"),this.pane=this.form.closest(".pane"),this.refire=e(".js-refire"),this.changes={},this.setupRefire(),this.listen(),this.setupAnswerTagging(),this.setupReponseTagging()},listen:function(){var t=this;e("#comments").on("change",function(){t.postComment()}),e(document).on("click",".js-show-logs",function(){var t=e(this).attr("data-action");e(".action-"+t).hasClass("hide")?(e(".action-"+t).removeClass("hide"),e(this).text("Hide This Action's Older Logs")):(e(".action-"+t).addClass("hide"),e(this).text("Show All of This Action's Logs"))}),e(".js-select-quote").on("click",function(){var s=e(this).data("target-ele"),n=e(this).data("element-id");"true"==e(s).attr("contenteditable")?(e(s).removeAttr("contenteditable"),e(".js-quote-selector").off(),e(s).removeClass("js-quote-selector"),e(".js-save-button").toggleClass("hide"),t.clearSelection()):(e(s).attr("contenteditable","true"),e(s).addClass("js-quote-selector"),e(".js-quote-selector").on("focus",function(s){var n=this;requestAnimationFrame(function(){t.selectElementContents(n)}),e(this).off()}),e(".js-save-button").toggleClass("hide"),e(".js-delete-quote").on("click",function(){e(".js-save-quote").attr("disabled","disabled"),e(this).attr("disabled","disabled"),t.quoteDelete(n)}),e(".js-save-quote").on("click",function(){e(".js-delete-quote").attr("disabled","disabled"),e(this).attr("disabled","disabled"),t.quoteSave(n)}),e(".js-quote-selector").focus())}),e("#quarantine").on("click",function(){t.quarantine(!0)}),e("#mark-dq").on("click",function(){t.markDQ()}),e("#unquarantine").on("click",function(){t.quarantine(!1)}),e(".js-response-nav").on("click",function(s){s.preventDefault(),t.navResponse(e(this))}),
// Update the response grid with the updated note and tags
e("#responses-pane").off(Panel.Events.BEFORE_HIDE).on(Panel.Events.BEFORE_HIDE,e.proxy(this.leaveResp,this)).off(Panel.Events.BEFORE_SHOW).on(Panel.Events.BEFORE_SHOW,e.proxy(this.leaveResp,this))},leaveResp:function(){var t=e('[data-id="'+this.options.responseID+'"]');if(t.ex()&&(e("#comments").ex()&&e(".js-r-c",t).text(e("#comments").val()),e(".js-r-t-h").ex())){var s=String(e(".js-r-t-h").val()),n="",r=0;for(s=""==s?[]:s.split(",");r<s.length;r++)n+='<span class="label label-info">'+s[r]+"</span>&nbsp;";e(".js-r-t",t).html(n)}},showSpinner:Spinner.on,hideSpinner:Spinner.off,quarantine:function(t){var s=this;e.ajax({data:{id:s.options.projectID,rid:s.options.responseID,quarantined:t},url:"/Response/quarantine",type:"POST",success:function(n){new AlertSuccess(t?"Response has been quarantined!":"Response has been restored!");var r=e("#responses-pane"),i="/explorer/responses-pane/id/"+s.options.projectID+"/rid/"+s.options.responseID;r.panel({remote:i}).show(),$currRow=e("#recentResponses").find("tr.alert-success td:nth-child(3)"),$currRow.html(t?'<span class="label label-danger">'+T("Quarantined")+"</span>":""),Spinner.off()},error:function(e){new AlertWarning("Something went wrong, try again!"),Spinner.off()}})},markDQ:function(){var t=this;e.ajax({data:{id:t.options.projectID,rid:t.options.responseID},url:"/Response/mark-disqualified",type:"POST",success:function(s){new AlertSuccess("Response is marked as disqualified!");var n=e("#responses-pane"),r="/explorer/responses-pane/id/"+t.options.projectID+"/rid/"+t.options.responseID;n.panel({remote:r}).show(),$currRow=e("#recentResponses").find("tr.alert-success td:nth-child(3)"),$currRow.html('<span class="label label-warning">'+T("Disqualified")+"</span>"),Spinner.off()},error:function(e){new AlertWarning("Something went wrong, try again!"),Spinner.off()}})},selectElementContents:function(e){var t=document.createRange();t.setStartBefore(e.firstChild),t.setEndAfter(e.lastChild);var s=window.getSelection();s.removeAllRanges(),s.addRange(t)},clearSelection:function(){window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges():document.selection&&document.selection.empty()},quoteDelete:function(t){var s=this;e.ajax({data:{qid:t,id:s.options.projectID,rid:s.options.responseID},url:"/Response/delete-quote",type:"POST",success:function(t){new AlertSuccess("Your quote was deleted!!");var n=e("#responses-pane"),r="/explorer/responses-pane/id/"+s.options.projectID+"/rid/"+s.options.responseID;n.panel({remote:r}).show(),Spinner.off()},error:function(t){e(".js-delete-quote").removeAttr("disabled"),e(".js-save-quote").removeAttr("disabled"),new AlertWarning("Something went wrong deleting your quote, try again!"),Spinner.off()}})},quoteSave:function(t){var s=this,n=this.getSelectionText();return""==n?(new AlertWarning("Please highlight a quote to save!"),e(".js-delete-quote").removeAttr("disabled"),e(".js-save-quote").removeAttr("disabled"),!1):(Spinner.on(),void e.ajax({data:{qid:t,text:n,id:s.options.projectID,rid:s.options.responseID},url:"/Response/save-quote",type:"POST",success:function(t){new AlertSuccess("Your quote was saved!");var n=e("#responses-pane"),r="/explorer/responses-pane/id/"+s.options.projectID+"/rid/"+s.options.responseID;n.panel({remote:r}).show(),Spinner.off()},error:function(t){e(".js-delete-quote").removeAttr("disabled"),e(".js-save-quote").removeAttr("disabled"),new AlertWarning("Something went wrong saving your quote, try again!"),Spinner.off()}}))},getSelectionText:function(){var e="";return window.getSelection?e=window.getSelection().toString():document.selection&&"Control"!=document.selection.type&&(e=document.selection.createRange().text),e},navResponse:function(t){var s=t.data("dir");$grid=e("#recentResponses");var n=ExplorerGridInst;if($currRow=$grid.find("tr.alert-success"),$row="next"==s?$currRow.next():$currRow.prev(),$row.length>0)$currRow.removeClass("alert-success"),$row.find("a.edit-link").click(),$row.addClass("alert-success"),e("html, body").animate({scrollTop:$row.offset().top-60},100);else if($pgBtn=e("next"==s?".next-page":".prev-page"),!$pgBtn.hasClass("disabled")){var r=n.getParams();pg=parseInt(e(".pagination .active [data-page-num]").data("page-num")),r.page="next"==s?pg+1:pg-1,r.select="next"==s?"first":"last",n.browse(r)}},setupRefire:function(){var t=this;this.refire.off().on("click",function(s){var n=e(this).data(),r=n.qid,i=n.rid,o=n.sid;t.refireAction(r,o,i)})},refireAction:function(t,s,n){var r={sid:s,qid:t,rid:n};Spinner.on(),e.ajax({url:"/Response/refire",data:r,type:"POST",success:function(t){new AlertSuccess("Your action was re-fired"),e("#action-log-container-"+t.sku).html(t.html)},complete:function(e){Spinner.off()}})},postComment:function(){Spinner.on(),e.ajax({url:"/Response/save-comment",data:{comments:e("#comments").val(),response_id:this.options.responseID,survey_id:this.options.projectID},type:"POST"}).always(Spinner.off)},setupAnswerTagging:function(){function t(t){var r,i=e("#r-t-"+t),o={};
// Groups tags by analysis question
e(".js-r-t-bs [data-osku]:visible",i).each(function(){var t=e(this).data("aid");o[t]||(o[t]={}),o[t]["tag-"+e(this).data("osku")]=e("span",this).first().text()}),r={id:n.options.projectID,rid:n.options.responseID,qid:t,tags:o},s.add({type:"post",url:"/analysis/save-tags",data:r})}var s=new AjaxQueue,n=this;e("#static-survey").undelegate(".js-r-t-input","keydown").on("keydown",".js-r-t-input",function(s,n){var r,i=void 0===n,o=e.trim(i?e(this).val():n);if((!i||13==s.keyCode)&&o.length&&(
// Check for duplicates
e(this).siblings(".tag:visible").each(function(){return e.trim(e("span:first",this).text())==o?(r=!0,!1):void 0}),!r)){var a=e(this).siblings(".tag.hide").clone(),l=e(this).siblings('[data-aid!="0"]'),c=e(this).siblings('[data-osku^="n"]').length+1;a.removeClass("hide"),a.attr("data-osku","new"+c),
// Add option to the first real analysis question
l.ex()&&a.attr("data-aid",l.first().data("aid")),e("span",a).first().text(o),e(this).siblings(".tag").last().after(a),
// Not a triggered event then empty input
i&&e(this).val(""),t(e(this).closest("[data-tagqid]").data("tagqid"))}}),e("#static-survey").undelegate(".js-r-t-add","click").on("click",".js-r-t-add",function(t){var s=e.trim(e("span",this).text());e(this).closest("[data-tagqid]").find(".js-r-t-input").trigger("keydown",[s])}),e("#static-survey").undelegate(".js-r-t-rm","click").on("click",".js-r-t-rm",function(s){var n=e(this).closest("[data-tagqid]").data("tagqid");e(this).closest(".tag").remove(),t(n)})},setupReponseTagging:function(){var t=e(".js-r-t-w-l"),n=this;t.load("/response/tag-input?"+e.param({id:this.options.projectID,rid:this.options.responseID}),function(){var t=e(".js-r-t-h",this);s.done(function(){t.tagsinput({typeahead:{source:function(t){return e.get("/account/fetch-tags",{q:t[0]})}},trimValue:!0,maxChars:50});var s=t.siblings(".bootstrap-tagsinput").find(":text");s.blur(function(){this.value.length&&(t.data().tagsinput.add(this.value),this.value="")})});var r=new AjaxQueue;t.change(function(){r.add({type:"post",url:"/response/tag-response",data:{id:n.options.projectID,rid:n.options.responseID,tags:this.value}})})})}}),ExplorerResponsePane.Defaults={projectID:null,responseData:[]},
// !-- ExplorerResponses --
this.ExplorerResponses=jInterface.extend({init:function(s){this.options=e.extend(!0,{},ExplorerResponses.Defaults,s||{}),this.viewFilter=new ExplorerViewFilters,t.ExplorerGridInst=new ExplorerGrid,this.setupStats(),/*
			// JS to require
			var load = [];
			// Add HC if not loaded with page
			!w.Highcharts && load.push('highcharts');
			load = load.concat([
				'/public/dist/app/js/datepicker.js', 
				'plugins/highcharts/highcharts.map.js', 
				'pages/index/index.js'
			]);
			require(load);
			
*/
t.ReportViewInstance||this.reportView||this.respStats();var n=this;e("#js-status-filter-trigger").click(function(){n.setupTaggingFilters()})},setupStats:function(){var t=this,s=function(){e.ajax({type:"get",url:"/explorer/refresh-response-stats/id/"+t.options.projectID}).done(function(t){e(".js-filter-complete").text(t.filtered.Complete),e(".js-filter-partial").text(t.filtered.Partial),e(".js-filter-disqualified").text(t.filtered.Disqualified),e(".js-filter-abandoned").text(t.filtered.Abandoned),e(".js-complete").text(t.stats.Complete),e(".js-partial").text(t.stats.Partial),e(".js-disqualified").text(t.stats.Disqualified)})},n=function(){e("[data-history-chart]").each(function(){t.addHistoryChart(e(this).data())})};
// if (this.options._indexing == 'true') {
// 	$('body').on(ExplorerIndexer.Events.INDEX_DONE, histChart)
// }
// else {
n(),
// }
e("body").on(ExplorerViewFilters.Events.FILTER_UPDATE,s)},addHistoryChart:function(e){new ExplorerTimeline({chart:"#response-history",projectID:e.id,chartExtend:{chart:{height:250,plotBorderWidth:0,backgroundColor:null}}})},setupTaggingFilters:function(){var t=e(".js-filter-tags");t.load("/explorer/tag-input?"+e.param({id:this.options.projectID}),function(){var t=e(".js-grid-tags",this);s.done(function(){t.tagsinput({typeahead:{source:function(t){return e.get("/account/fetch-tags",{q:t[0]})}},trimValue:!0,maxChars:50});var s=t.siblings(".bootstrap-tagsinput").find(":text");s.blur(function(){this.value.length&&(t.data().tagsinput.add(this.value),this.value="")})});new AjaxQueue})},respStats:function(){function t(){e.get("/explorer/load-response-stats",{id:s.options.projectID,rsp:1}).done(function(t){e("#response-stats").html(t),e('#response-stats [data-toggle="tooltip"]').tooltip()})}var s=this;t(),e("body").on("datechange",t)}}),ExplorerResponses.Defaults={projectID:null},
// !-- ExplorerGrid --
this.ExplorerGrid=jInterface.extend({init:function(){SGAPI.explorePublicKey?this.browseUrl="/sharedexplore/load-responses":this.browseUrl="/explorer/browse",this.searchUrl="/explorer/browse",this.deleteUrl="/response/delete",this.closeUrl="/response/close",this.revertUrl="/response/revert",this.pdfUrl="/response/pdf",this.isSearchPage=!1,this.sortColumn=!1,this.sortOrder=!1,this.bulkAction=null,this.searching=!1,e("body").on(ExplorerViewFilters.Events.FILTER_UPDATE,_.bind(this.reloadFilteredPage,this)),
// .on(ExplorerIndexer.Events.INDEX_UPDATE, _.bind(this.refreshList, this))
this.listen()},/**
		 * Add event listeners to all interface elements
		 */
listen:function(){var t=this;e("#recentResponses th a").on("click",function(){t.sort.apply(t,arguments)}),e("#response-types").on("click",function(){t.types.apply(t,arguments)}),e("#result-limit").on("change",function(){t.limit.apply(t,arguments)}),e(".page-limit-select").on("change",function(){t.page.apply(t,arguments)}),e(".js-page-select li > a").on("click",function(){e(this).hasClass("disabled")||t.page.apply(t,arguments,{page:e(this).data("page-num")})}),e("#next-page").on("click",function(){t.nextPage.apply(t,arguments)}),e("#prev-page").on("click",function(){t.previousPage.apply(t,arguments)}),e("#js-response-select-all").on("click",function(){e(".js-response-select").prop("checked",e(this).is(":checked"))}),e(".js-response-select, #js-response-select-all").on("click",function(){selected=e(".js-response-select:checked").length>0,selected?(e(".js-response-sub").removeClass("hide"),e(".js-response-all").addClass("hide")):(t.resetBulkAction(),e(".js-response-all").removeClass("hide"))}),e(".js-response-sub a").on("click",function(){e("#bulk-select-action").text(e(this).text()+"..."),e("#bulk-trigger").text("Apply"),e("#bulk-trigger").addClass("btn-sub"),t.bulkAction=e(this).data("action")}),e("#bulk-trigger").on("click",function(){t.applyBulkAction()}),e("#responseSearch").on("submit",function(e){e.preventDefault(),t.searching||t.search.apply(t,arguments)}),e("#browse-again").on("click",function(e){e.preventDefault(),t.browse({})}),e("#responseSearchClear").on("click",function(s){s.preventDefault(),e("#search-term").val(""),Spinner.on(),t.reloadPage()}),e("#responseSearchClear").on("keyup keydown submit",function(e){event.preventDefault()}),e(".js-delete-response").on("click",function(){t.deleteResponseFromList.apply(t,arguments)}),e(".js-check-response").on("click",function(){t.closePartialFromList.apply(t,arguments)}),e("#recentResponses .responserow td.click-to-view").on("click",function(){t.viewFromList.apply(t,arguments)}),e(".js-restore-response").on("click",function(){t.restoreDeleted.apply(t,arguments)});var s=e("#recentResponses").find("[data-id]");return e("#responses-pane").on(Panel.Events.HIDE,function(){s.removeClass("alert-success")}),s.each(function(){var t=e(".edit-link",this),n=e(this);t.ex()&&e(this).on("click.controls",function(r){r.originalEvent&&(// prevent multiple events
s.removeClass("alert-success"),n.addClass("alert-success"),t[0]!=r.target&&(// the target is already the action
e(r.target).is(".js-delete-response")||e(r.target).is(".js-response-select")||e(r.target).closest(".js-delete-response").ex()||// the target is in or is a action
t.click()))})}),this},resetBulkAction:function(){var t=this;e("#bulk-select-action").html('Select a Bulk Action <i class="icon-chevron-down"></i>'),e(".js-response-sub").addClass("hide"),e(".js-response-all").removeClass("hide"),e("#bulk-trigger").removeClass("btn-sub"),e("#bulk-trigger").html("&nbsp;"),t.bulkAction=null},applyBulkAction:function(){var t=this;if(t.bulkAction){var s=[];if(e(".js-response-select:checked").each(function(t){s.push(e(this).val())}),s.length>0)if(this.bulkAction.indexOf("export-")>-1)
//handle reports/exports a bit differently
actionstr=this.bulkAction.replace("-selected",""),$helper=e("#js-"+actionstr),$helper.length>0&&(href=$helper.data("remote")+"&rids="+s.join(","),modal=$helper.data("target"),e(modal).modal({remote:href}),e(".js-response-select:checked, js-response-select-all").prop("checked",!1),t.resetBulkAction());else{var n=e(".js-page-select .active a").data("page-num");Spinner.on(),e.ajax({url:"/response/bulk-action/id/"+current_survey_id,type:"post",data:{"rids[]":s,a:t.bulkAction}}).done(function(){
//TODO: add response check & error/success messaging
Spinner.off(),document.location=document.location+"?page="+n})}}},/**
		 * for search.  refreshes the list for search results if search term is longer than 3 char
		 * @author Seth
		 */
search:function(t){this.searching=!0;
//if ($('#search-term').val() == 'search responses') $('#search-term').val("");
var s=e("#search-term").val(),n=s.length;if(4>n&&"NaN"==parseInt(s)&&s.indexOf("#")<0)e("#search-alert").show(),t.preventDefault(),e("#search-term").focus();else{var r=this;t&&t.preventDefault();var i=e("#search-term").val(),o={};if(o.srch=i,o.id=current_survey_id,r.browse(o),l&&i.indexOf("#")>-1){var a=i.split("#"),l=e("#responses-pane"),c="/explorer/responses-pane/id/"+current_survey_id+"/rid/"+a[1];l.panel({remote:c}).show()}}},/**
		 * gathers all the params from the page control elements
		 * returns an object (key/value) for all the params
		 */
getParams:function(){var t=e("#response-types").val(),s=e("#result-limit").val(),n=e("#search-term").val(),r={};
// if (page) params.page = page;
return t&&(r.response_types=t),s&&(r.results_per_page=s),n&&(r.srch=n),this.sortColumn&&(r.sort_column=this.sortColumn),this.sortOrder&&(r.sort_order=this.sortOrder),current_survey_id&&(r.id=current_survey_id),r},/**
		 * event handler for column sorts.  Uses the href from the column headers
		 * to determine the sort order and column. Stores this sort order and columns
		 * on this object so that other controls (like pagination, etc) use
		 * the same sort
		 */
sort:function(t){t.preventDefault();var s=e(t.target).attr("href"),n=this.getQueryString(s),r=this.getQueryParams(n);
//preserve these for the next request so we don't loose them.
this.sortOrder=r.sort_order,this.sortColumn=r.sort_column;var i=this.getParams();this.browse(i)},getQueryParam:function(e){return this.params||(this.params=this.getQueryParams()),"undefined"!=typeof this.params[e]?this.params[e]:!1},getQueryParams:function(e){if(useBase=!1,"undefined"==typeof e){var e=location.search.substring(1,location.search.length);if(useBase=!0,this.params)return this.params}for(var t,s=new Array,n=e.split("&"),r=0;r<n.length;r++)t=n[r].split("="),s[t[0]]=t[1];return useBase&&(this.params=s),s},getQueryString:function(e){var t=e||this.baseUrl,s=(t+"").split("#"),n=s[0].split("?");return n[1]},generate:function(e,t){return this.buildUrl(e,t)},buildUrl:function(e,t){return t?this.doBuildUrl(e,t):this.doBuildUrl(e,this.baseUrl)},doBuildUrl:function(t,s){var n=window.location.href.split("?");void 0!==n&&void 0!==n[1]&&(n=n[1].split("#"));var r=!1,i=(s+"").split("#");i[1]&&(r=i[1]);
//var requestString = (window.location + '').split('?');
var o=i[0].split("?"),a=[];n[0]&&e.extend(a,this.getQueryParams(n[0])),o[1]&&e.extend(a,this.getQueryParams(o[1])),a.cacheBust=(new Date).getTime(),t&&e.extend(a,t),s=o[0],params="?";var l=0;for(var c in a)"__sid"!=c&&("string"!=typeof a[c]&&"number"!=typeof a[c]||""==a[c]||(l>0&&(params+="&"),params+=c+"="+escape(a[c])),l++);return s+=params,r||(i=(window.location+"").split("#"),i[1]&&(r=i[1])),r&&(s+="#"+r),s},/**
		 * event handler for changing the status dropdown
		 */
types:function(t,s){t.preventDefault();var n=this.getParams();n.types=e("#response-types").attr("data-response-type"),this.browse(n)},/**
		 * event handler for changing the limit dropdown
		 */
limit:function(e){e.preventDefault();var t=this.getParams();t.page=1,//MJS 2-1-2012
this.browse(t)},/**
		 * event handler for changing the page dropdown
		 */
page:function(t){t.preventDefault();var s=this.getParams();s.page=e(t.currentTarget).data("page-num"),this.browse(s)},/**
		 * for next page button
		 */
nextPage:function(e){e.preventDefault();var t=this.getParams();t.page=t.page+1,this.browse(t)},/**
		 * for previous page button
		 */
previousPage:function(e){e.preventDefault();var t=this.getParams();t.page=t.page-1,this.browse(t)},/**
		 * refreshes the list when browsing.
		 * Many event handlers use this.
		 */
browse:function(s,n){if(t.ExplorerResponsesInst)var r=t.ExplorerResponsesInst;else var r=t.ExplorerResponses;SGAPI.explorePublicKey?(s.cid=SGAPI.exploreCID,s.vid=SGAPI.exploreVID):r.options.reportView?(this.browseUrl="/sharedexplore/load-responses",s.cid=r.options.customerID,s.vid=r.options.viewID,s.explorer=!0,s.key=r.options.key):r.options.viewID&&r.options.viewID>0&&(
//for responses grid in segmentation reports (in app)
s.cid=r.options.customerID,s.vid=r.options.viewID),browse_url=this.generate(s,this.browseUrl);var i=this,o=s;Spinner.on(),e.get(browse_url).done(function(t){SGAPI.explorePublicKey||r.options.reportView?($container=e("#response-list"),$container.html(t)):($container=e("#response-content"),$container.html(e(t)[0].innerHTML)),i.listen(),r.respStats(),new ExplorerViewFilters,o&&o.select&&($grid=e("#recentResponses").find("tbody"),$row="first"==o.select?$grid.find("tr").first():$grid.find("tr").last(),$row.find("a.edit-link").click(),$row.addClass("alert-success"),e("html, body").animate({scrollTop:$row.offset().top-60},100)),i.searching=!1,"function"==typeof n&&n(s),Spinner.off()})},/**
		 * event handler for deleting a response.
		 */
deleteResponseFromList:function(t){t.preventDefault();var s=e(t.target).closest("tr").data("id");this.doDelete(s)},/**
		 * event handler for deleting a response when 
		 * looking at it in the view modal.
		 */
deleteResponseFromView:function(t){t.preventDefault();var s=e("event").val();this.doDelete(s)},/**
		 * called by both the delete from list and delete from view
		 * event handlers.
		 * @param rid - the response id.
		 */
doDelete:function(t){if(confirm(T("Are you sure you want to delete this response?"))){var s={};s.rid=t,s.id=current_survey_id;var n=this;Spinner.on(),url=this.generate(s,this.deleteUrl);var r=this.getParams(),i=e(".active [data-page-num]");i.ex()&&(r.page=Number(i.text())),e.post(url).always(function(){n.browse(r),Spinner.off()})}},/**
		 * If from search page, re-runs the search
		 * otherwise, reruns the browse.
		 */
refreshList:function(){this.isSearchPage?this.search(!1):this.browse(this.getParams())},/**
		 * event handler for close partial
		 * when clicking on icon in list
		 */
closePartialFromList:function(t){t.preventDefault();var s=e(t.target).closest("tr").data("id");this.doClosePartial(s)},/**
		 * event handler for close partial
		 * when clicking on icon in view (modal)
		 */
closePartialFromView:function(t){t.preventDefault();var s=e("#response-id").val();this.doClosePartial(s)},/**
		 * ajax call closes a partial.
		 * @param rid - response id
		 */
doClosePartial:function(t){if(confirm(T("Mark this response as Complete?"))){var s={};s.rid=t,s.id=current_survey_id,url=this.generate(s,this.closeUrl);var n=this;e.get(url,function(){n.refreshList.apply(n,arguments)})}},/**
		 * event handler for restore deleted
		 */
restoreDeleted:function(t){if(t.preventDefault(),confirm(T("Restore this deleted response?"))){var s=e(t.target).closest("tr").data("id");this.doRestoreDeleted(s)}},/**
		 * ajax call to restore the deleted
		 * @param rid - the response id.
		 */
doRestoreDeleted:function(t){var s={};s.rid=t,s.id=current_survey_id,url=this.generate(s,this.revertUrl);var n=this;e.get(url,function(){n.refreshList.apply(n,arguments)}).error(function(){n.refreshList.apply(n,arguments)})},reloadPage:function(){location.reload()},reloadFilteredPage:function(){document.location=window.location.href.split("quarantined/true")[0]}}),this.QuestionFilters=function(t){if(t){
// select / unselect all for page in pane
e(".js-add-page").on("click",function(){var t=e(this).parents(".js-parent-section-"+e(this).val()).find("ul.list-group"),s=e(".js-grid-filter"),n=e(":checkbox:not('.js-add-page')",s);e(":checkbox",t).length+n.filter(":checked").length;e(":checkbox",t).prop("checked",this.checked)}),
// always select parent if selecting child
e(".subquestion").on("click",function(){e(this).closest(".list-group-item.ellipsis").find(".parent").prop("checked",!0)}),e(".parent").click(function(){e(this).siblings("ul.list-unstyled.sub-list").find(".subquestion").prop("checked",this.checked)});var s=e(".js-grid-filter"),n=e(":checkbox:not('.js-add-page')",s);
//form submit for pane customization
e(".question-filter-form").submit(function(t){t.preventDefault(),Spinner.on(),e.ajax({url:e(this).attr("action"),data:e(this).serialize(),async:!1,type:"POST"}).done(function(t){e("#question-filters").modal("hide"),Spinner.off();
//reload the response they were viewing
var s=e("#js-q-page").val();e("#response-list [data-id='"+s+"']").find("a").first().click()})})}else{var s=e(".js-grid-filter"),n=e(":checkbox:not('.js-add-page')",s);n.click(function(){n.filter(":checked").length<6||(e(this).prop("checked",!1),new AlertWarning(T("You can only show 5 questions in the grid!"),{title:T("Oh, hey...")}))})}}}(jQuery,window);
!function(t,e){this.ExplorerTimeline=Class.extend({init:function(){this.options=t.extend({},ExplorerTimeline.Defaults,arguments[0]||{}),this.highChart=null,this.$timeline=t(this.options.chart),this.refresh()},refresh:function(){var e=this,i=require(["highcharts"]);t.ajax({url:this.options.ajaxUrl,data:t.extend({},this.options.ajaxData,{id:this.options.projectID}),type:"get",dataType:"json"}).done(function(r){1==e.options.ajaxData.overview?r.noDateInfo?t("#quest-metric-timeline, .rsp-plot").addClass("hide"):(t("#quest-metric-timeline, .quest-meta, .rsp-plot").removeClass("hide"),i.done(function(){e._redrawChart(r||{})})):i.done(function(){e._redrawChart(r||{})})})},_redrawChart:function(e){if(this.highChart&&this.$timeline.empty(),e=e||{},e.timelineColors)var i=e.timelineColors;else var i={Complete:"8EC93C",Partial:"35A3BF",Disqualified:"F65F84",Quarantined:"F8A334"};var r=[];e.ProjectQuota>0&&(r.push({color:"#FF0000",width:2,value:e.ProjectQuota}),delete e.ProjectQuota);var s,o,a,n=[];for(o in e)if("timelineColors"!=o&&"singleDate"!=o){if(s={name:o,data:[]},i[o]&&(s.color="#"+i[o]),t.isPlainObject(e[o]))// Response timeline
for(a in e[o])
// [ milliseconds, value ]
s.data.push([1e3*a,e[o][a]]);else if(t.isArray(e[o]))// Link timeline
for(var l=0;l<e[o].length;l++)
// [ milliseconds, value ]
s.data.push([1e3*e[o][l][0],e[o][l][1]]);n.push(s)}var h=t.extend(!0,{},ExplorerTimeline.ChartOptions,{series:n,chart:{renderTo:this.$timeline[0].id},xAxis:{plotLines:r,labels:{formatter:function(){return Highcharts.dateFormat("%e. %b, %Y",this.value)}}}},this.options.chartExtend);this.highChart=new Highcharts.Chart(h)}}),ExplorerTimeline.Defaults={chart:"",projectID:0,ajaxUrl:"/explorer/load-summary-timeline",ajaxData:{},chartExtend:{}},ExplorerTimeline.ChartOptions={chart:{type:"spline",backgroundColor:"transparent",plotBorderWidth:1,plotBorderColor:"#D9D9D9",paddingTop:0,marginTop:0,paddingLeft:0,marginLeft:0},title:{text:T("Response Activity")},xAxis:{type:"datetime",startOnTick:!0,labels:{rotation:315,overflow:"justify"}},yAxis:{min:0,title:{text:"Responses"}},tooltip:{xDateFormat:"Week of %A, %b %e, %Y",headerFormat:'<span style="font-size:10px"> {point.key}</span><table>',pointFormat:'<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y}</b></td></tr>',footerFormat:"</table>",shared:!0,useHTML:!0,crosshairs:!0},series:[],credits:{enabled:!1},exporting:{enabled:!1}},this.ExplorerTimelineES=Class.extend({init:function(){this.options=t.extend({},ExplorerTimeline.Defaults,arguments[0]||{}),this.highchart=null,this.$timeline=t(this.options.report),this.data=this.options.data.values||[],this.StatusColors={complete:this.options.colors[0],partial:this.options.colors[1],disqualified:this.options.colors[2]},this.build()},ucfirst:function(t){return t.substr(0,1).toUpperCase()+t.substr(1)},build:function(){
// Build series for the responses statuses
var t,e,i,r=[];for(e in this.data){
// Convert seconds to milliseconds
for(t={name:ReportView.T("rsp_"+e,e),type:"area",data:[],color:"#"+this.StatusColors[e]},i=0;i<this.data[e].length;i++)t.data.push([1e3*this.data[e][i][0],this.data[e][i][1]]);r.push(t)}var s=ExplorerTimelineES.ChartOptions;s.series=r,s.yAxis.title.text=ReportView.T("responses_text","Responses"),this.$timeline.highcharts(s)}}),ExplorerTimelineES.ChartOptions={chart:{zoomType:"x",backgroundColor:"transparent",plotBorderWidth:1,plotBorderColor:"#D9D9D9"},title:{text:""},xAxis:{type:"datetime"},yAxis:{title:{text:"Responses"},min:0,allowDecimals:!1},legend:{enabled:!0},plotOptions:{area:{marker:{radius:3},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}},series:[],credits:{enabled:!1},exporting:{enabled:!1}}}(jQuery,window);
!function(t,e){
// !-- ExplorerMap --
this.ExplorerMap=jInterface.extend({init:function(e){this.options=t.extend(!0,{},ExplorerMap.Defaults,e||{}),this._mapData=[],SGAPI.explorePublicKey?this._respURL="/sharedexplore/response/id/"+this.options.projectID+"/cid/"+SGAPI.exploreCID+"/vid/"+SGAPI.exploreVID+"/key/"+SGAPI.explorePublicKey+"/rid/":this._respURL="/explorer/responses-pane/id/"+this.options.projectID+"/rid/",this.setup().listen()},_defaults:{id:""},setup:function(){return this._$exploreMap=t("#"+this.options.id),this._mapTM=null,this._forCharts=!!this.options.forCharts,this},refresh:function(){var e=this;if(this.options.ajaxUrl)var i=this.options.ajaxUrl,s={id:this.options.projectID};else if(SGAPI.explorePublicKey)var i="/sharedexplore/load-map-points",s={id:this.options.projectID,key:SGAPI.explorePublicKey,cid:SGAPI.exploreCID,vid:SGAPI.exploreVID,chart:e._forCharts};else var i="/explorer/load-map-points",s={id:this.options.projectID,chart:e._forCharts};t.ajax({url:i,data:s,type:"get",dataType:"json"}).done(function(t){e._mapData=t||[],e._redrawPoints()})},_redrawPoints:function(){if(this._mapInst&&this._mapLayer&&this._mapInst.removeLayer(this._mapLayer),this._mapData.length){this._mapLayer=L.markerClusterGroup();for(var t=0;t<this._mapData.length;t++){var e=this._mapData[t],i=""==SGAPI.exploreResponses?"":SGAPI.util.translate("View Response"),s=L.marker(new L.LatLng(e[0],e[1]),{icon:this._mapIcon,title:i});this._mapLayer.addLayer(s)}this._mapInst.addLayer(this._mapLayer)}},listen:function(){var i='&copy; OpenStreetMap contributors, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>';
// set up the map
this._mapInst=new L.Map(this._$exploreMap[0].id,{scrollWheelZoom:!1}).setView([20,-40],2);var s=this._$exploreMap.find(".leaflet-control-container .leaflet-bottom.leaflet-right");
// if (w.ExplorerIndexer)
// 	$('body').on(ExplorerIndexer.Events.INDEX_UPDATE, _.bind(this.refresh, this))
return s.css({height:"auto",width:"auto"}),s.find(".leaflet-control-attribution").css({display:"block"}),this._mapIcon=L.icon({iconUrl:"/public/themes/version1/gui/marker-icon.png"}),L.tileLayer("https://otile{s}-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png",{maxZoom:18,attribution:i,subdomains:["1","2","3","4"]}).addTo(this._mapInst),this.refresh(),e.ExplorerViewFilters&&t("body").on(ExplorerViewFilters.Events.FILTER_UPDATE,_.bind(this.refresh,this)),this}}),ExplorerMap.Defaults={id:"",projectID:0},
// !-- ExplorerMapES --
this.ExplorerMapES=jInterface.extend({init:function(i){this.options=t.extend({},ExplorerMapES.Defaults,i||{}),this.$map=t(this.options.report),this.mapInst=null,this.data=this.options.data||{},this.values=this.data.values||[],this.precision=this.data.precision,this.total=this.data.total,this.color=this.options.color,e.L?this.listen():require(["plugins/leaflet/leaflet.js"]).done(this.listen,this)},listen:function(){this.$map.height(500);var e='&copy; OpenStreetMap contributors, Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>';
// set up the map
this.mapInst=new L.Map(this.$map[0].id,{scrollWheelZoom:!1}).setView([20,-40],2);var i=this.$map.find(".leaflet-control-container .leaflet-bottom.leaflet-right");i.css({height:"auto",width:"auto"}).find(".leaflet-control-attribution").css({display:"block"}),L.tileLayer("https://otile{s}-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png",{maxZoom:18,attribution:e,subdomains:["1","2","3","4"]}).addTo(this.mapInst),this.drawPoints(),t('.leaflet-clickable[stroke-width="5"]',this.$map).attr("stroke-width",2)},drawPoints:function(){for(var t,e,i,s=29300,a=0;a<this.values.length;a++)i=(this.total>0?.9*this.values[a].percent:.4)+.1,t=[this.values[a].latitude,this.values[a].longitude],e=L.circle(t,s,{color:"#"+this.color,fillColor:"#"+this.color,fillOpacity:i}).addTo(this.mapInst)}}),ExplorerMapES.Defaults={}}(jQuery,window);
!function(e,t){
// !-- Test --
this.BuildTest=jInterface.extend({init:function(t){this.options=e.extend({},BuildTest.Defaults,t||{}),this.$form=e("#test-pane-form"),this.$generateTest=e("#generate-test-data"),this.$dataForm=e("#generate-data-form"),this.$previewFrame=e(".survey-preview-inline .preview-page"),this.$previewPar=this.$previewFrame.parent(),this.$modes=e("a[data-mode]"),this.$checkList=e("#test-checklist :input"),this.listen()},listen:function(){var t=this;this.$dataForm.on("submit",_.bind(function(t){t.preventDefault();var s=this.$dataForm.serialize();this.generateData(s),
//disable button
e(".js-generate-data").attr("disabled","disabled")},this)),e("#view-warnings").on("click",function(){e("#warning-messages").toggleClass("hide")}),
//limit test responses to 1000	
e("#population").keyup(function(){pop=e(this).val(),pop>1e3?(e(".js-data-limit").removeClass("hide"),e(this).parent().addClass("has-error"),e(".btn-primary").addClass("disabled")):(e(this).parent().removeClass("has-error"),e(".js-data-limit").addClass("hide"),e(".btn-primary").removeClass("disabled"))}),
// $('.js-edit').click(function(e){
// 	var leave = confirm('This will end your current test session')
// 	if(!leave)
// 		e.preventDefault()
// })
//limit to 10 test emails
e("#email-to").keyup(function(t){var s=0;emails=e(this).val().split("\n"),e(emails).each(function(){e(this).length&&s++}),s>10?(e(".js-email-limit").removeClass("hide"),e(this).parent().addClass("has-error"),e(".btn-primary").addClass("disabled")):(e(this).parent().removeClass("has-error"),e(".js-email-limit").addClass("hide"),e(".btn-primary").removeClass("disabled"))}),e("input[name=save-test]").click(function(){var t=e(this).val();"true"==t?(e("#start-page").attr("disabled",!0),e("#start-page option:selected").removeAttr("selected")):e("#start-page").removeAttr("disabled")});var t=this;
// Refire actions
e("#js-log-dump").on("click","[data-refire]",function(){e.post("/response/refire",{sid:t.options.projectID,qid:e(this).data().refire,rid:e(this).data().response}).done(function(){new AlertSuccess("Your action was refired!")})}),this.$checkList.click(function(){e.post("/builder/test-checklist/",{field:this.name,status:this.checked,id:t.options.projectID})});
//preview modal setup
var s=e("#preview-page"),i=e("iframe",s);e("body").on("click",".js-preview-page",function(a){a.preventDefault();var r=e(this).data("page"),o=e(this).next(".pg-header-icon").text(),n=.8*e(window).height(),d=e("#share-link").val(),p=e(this).data("store"),c=e.param({id:t.options.projectID,__sgtarget:r||"",__sg_collab_test:1,__sg_build_test:1,link_id:d,__sg_tester:t.options.userEmail,__sg_tester_name:t.options.userName,__sg_tester_id:t.options.userID});if(p)var l="/builder/test-link-proxy?";else var l="/projects/previewbottom?";i.attr("src",l+c),e(".modal-body",s).css("height",n+10),e(".modal-content",s).find(".page-number").text(o),s.modal("show"),e("#save-response",s).attr("checked","checked"),
//survey settings popover
e("#preview-page #survey-settings").popover({placement:"bottom",html:!0,trigger:"click",content:e("#settings-options").html()}),e("#preview-page").on("hidden.bs.popover",function(){e(".popover:not(.in)").hide().detach()}),Pref.get("close-preview-settings",!0,t.options.projectID,function(s){"true"!=s&&(i.load(function(){e("#preview-page #survey-settings").popover("show")}),Pref.set("close-preview-settings","true",!0,t.options.projectID))}),
// close the pane
s.on("click",".js-close-settings",function(t){e("#preview-page #survey-settings").popover("hide")}),
//update page in testing tools
e("#preview-page #start-page option:selected").removeAttr("selected"),e('#preview-page #start-page option[value="'+r+'"]').attr("selected","selected"),e(".js-style-page",s).off().click(function(){window.location="/builder/style/id/"+t.options.projectID+"/p/"+r})}),this.$modes.click(function(){t.$modes.parent().removeClass("active"),e(this).parent().addClass("active"),e("#preview-wrapper").attr("class","").addClass(e(this).data("mode"));var s=i.attr("src");"desktop"==e(this).data("mode")?
// make sure there is no mobi
s=s.replace("&__mobi=true",""):s+="&__mobi=true",i.attr("src",s)}),s.on("hidden.bs.modal",function(t){i.attr("src","about:blank"),e("#preview-page #survey-settings").popover("destroy")}),
//hide if invite to test modal is opened
s.on("click","#send-test",function(e){s.modal("hide")}),s.on("click","#show-comments",function(e){i.contents().find(".sg-body").toggleClass("sg-cc-show"),i.contents().find(".collab-dialog").hide()}),s.on("click","#save-response",function(t){e("#save-response").prop("checked")?e("#ignore-entry-logic").parent().addClass("hide"):e("#ignore-entry-logic").parent().removeClass("hide")}),
//reload preview iframe src when popover settings change
s.on("click",".js-start-test",function(a){var r=e("#start-page option:selected").val(),o=e("#save-response").prop("checked"),n=e("#fire-actions").prop("checked")?"":"&__sg_skip_actions=1",d=e("#ignore-entry-logic").prop("checked")?"&__ignore_entry_logic=1":"",p=e("#language option:selected").val(),c=e("#share-link").val(),l=e("#url-vars").val(),h=e(".view-modes li.active > a",s).data("mode");if(o)var g="/builder/test-link-proxy/id/"+t.options.projectID+"?__sgtarget="+r;else var g="/projects/previewbottom?id="+t.options.projectID+"&__sgtarget="+r;var u=e.param({__sg_tester:t.options.userEmail,__sg_tester_name:t.options.userName,__sg_tester_id:t.options.userID});g=g+"&sLanguage="+p+"&__sg_build_test=1&__sg_collab_test=1&"+u+"&link_id="+c+n+d+"&"+l,"desktop"!=h&&(g+="__mobi=true"),i.attr("src",g)})},generateData:function(t){e(".progress").removeClass("hide"),this.checkProgress(),e.ajax({type:"post",url:"/builder/generate-data/",data:t,success:function(e,t){}})},checkProgress:function(){var t=this;total=e("#population").val(),e.ajax({url:"/builder/generate-data-percent-check?id="+this.options.projectID,cache:!1,success:function(s){var i=s.response.percent;if(e("#generate-progress").css("width",i+"%"),100>i)setTimeout(_.bind(t.checkProgress,t),200);else{t.$generateTest.modal("hide"),e(".progress").addClass("hide"),e("#generate-progress").css("width","0%"),t.options.reportView||new AlertSuccess(T("Check them out in Results -> Individual Responses"),{title:T("Created "+total+" new test responses")});var a=e("#test_count").val()||0,r=parseInt(a)+parseInt(total);e("#test_count").val(r),t.$form.find("h4").html(r+" Tests performed"),e(".js-generate-data").removeAttr("disabled"),t.options.reportView&&location.reload()}}})}}),BuildTest.Defaults={},BuildTest.previewHasLoaded=function(e){}}(jQuery,window);