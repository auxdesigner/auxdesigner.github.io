(this.webpackJsonpcurve=this.webpackJsonpcurve||[]).push([[0],{14:function(t,e){var n=.1,o="function"===typeof Float32Array;function a(t,e){return 1-3*e+3*t}function r(t,e){return 3*e-6*t}function s(t){return 3*t}function c(t,e,n){return((a(e,n)*t+r(e,n))*t+s(e))*t}function i(t,e,n){return 3*a(e,n)*t*t+2*r(e,n)*t+s(e)}function u(t){return t}t.exports=function(t,e,a,r){if(!(0<=t&&t<=1&&0<=a&&a<=1))throw new Error("bezier x values must be in [0, 1] range");if(t===e&&a===r)return u;for(var s=o?new Float32Array(11):new Array(11),l=0;l<11;++l)s[l]=c(l*n,t,a);function d(e){for(var o=0,r=1;10!==r&&s[r]<=e;++r)o+=n;--r;var u=o+(e-s[r])/(s[r+1]-s[r])*n,l=i(u,t,a);return l>=.001?function(t,e,n,o){for(var a=0;a<4;++a){var r=i(e,n,o);if(0===r)return e;e-=(c(e,n,o)-t)/r}return e}(e,u,t,a):0===l?u:function(t,e,n,o,a){var r,s,i=0;do{(r=c(s=e+(n-e)/2,o,a)-t)>0?n=s:e=s}while(Math.abs(r)>1e-7&&++i<10);return s}(e,o,o+n,t,a)}return function(t){return 0===t||1===t?t:c(d(t),e,r)}}},22:function(t,e,n){},27:function(t,e,n){},28:function(t,e,n){"use strict";n.r(e);var o=n(6),a=n.n(o),r=n(16),s=n.n(r),c=(n(22),n(2)),i=n(3),u=n(5),l=n(4),d=n(12),h=n.n(d),p=n(1),v=n(17),j=n(8),b=n(9),f=n(7);function O(t,e,n){return t*(1-n)+e*n}var x=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(c.a)(this,n);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))).x=function(e){return Math.round(O(t.props.xFrom,t.props.xTo,e))},t.y=function(e){return Math.round(O(t.props.yFrom,t.props.yTo,e))},t}return Object(i.a)(n,[{key:"shouldComponentUpdate",value:function(t){var e=this.props,n=e.xFrom,o=e.yFrom,a=e.xTo,r=e.yTo;return t.xFrom!==n||t.yFrom!==o||t.xTo!==a||t.yTo!==r}}]),n}(a.a.Component),g=n(0);function y(t,e,n){for(var o=[],a=t;a<e;a+=n)o.push(a);return o}var k=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(i.a)(n,[{key:"gridX",value:function(t){return y(0,1,1/t).map(this.x)}},{key:"gridY",value:function(t){return y(0,1,1/t).map(this.y)}},{key:"shouldComponentUpdate",value:function(t){if(Object(b.a)(Object(f.a)(n.prototype),"shouldComponentUpdate",this).call(this,t))return!0;var e=this.props,o=e.background,a=e.gridColor,r=e.textStyle;return t.background!==o||t.gridColor!==a||!function(t,e){var n=Object.keys(t),o=Object.keys(e);if(n.length!==o.length)return!1;for(var a in t)if(t[a]!==e[a])return!1;return!0}(t.textStyle,r)}},{key:"render",value:function(){var t=this.x,e=this.y,n=this.props,o=n.background,a=n.gridColor,r=n.textStyle,s=t(0),c=e(0),i=t(1),u=e(1),l=this.gridX(2),d=this.gridY(2),h=this.gridX(10),v=this.gridY(10),j="M".concat(s,",").concat(c," L").concat(s,",").concat(u," L").concat(i,",").concat(u," L").concat(i,",").concat(c," Z"),b=h.map((function(t){return"M".concat(t,",").concat(c," L").concat(t,",").concat(u)})).concat(v.map((function(t){return"M".concat(s,",").concat(t," L").concat(i,",").concat(t)}))).join(" "),f=l.map((function(t){return"M".concat(t,",").concat(c," L").concat(t,",").concat(u)})).concat(d.map((function(t){return"M".concat(s,",").concat(t," L").concat(i,",").concat(t)}))).concat(["M".concat(s,",").concat(c," L").concat(i,",").concat(u)]).join(" ");return Object(g.jsxs)("g",{children:[Object(g.jsx)("path",{fill:o,d:j}),Object(g.jsx)("path",{strokeWidth:"1px",stroke:a,d:b}),Object(g.jsx)("path",{strokeWidth:"2px",stroke:a,d:f}),Object(g.jsx)("text",{style:Object(p.a)({textAnchor:"end"},r),transform:"rotate(-90)",x:-this.y(1),y:this.x(0)-8,children:"Progress %"}),Object(g.jsx)("text",{style:Object(p.a)({dominantBaseline:"text-before-edge"},r),textAnchor:"end",x:this.x(1),y:this.y(0)+5,children:"Time %"})]})}}]),n}(x),m=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(i.a)(n,[{key:"shouldComponentUpdate",value:function(t){if(Object(b.a)(Object(f.a)(n.prototype),"shouldComponentUpdate",this).call(this,t))return!0;var e=this.props,o=e.index,a=e.handleRadius,r=e.handleColor,s=e.hover,c=e.down,i=e.background,u=e.handleStroke,l=e.xval,d=e.yval,h=e.onMouseEnter,p=e.onMouseLeave,v=e.onMouseDown;return t.index!==o||t.handleRadius!==a||t.handleColor!==r||t.hover!==s||t.down!==c||t.background!==i||t.handleStroke!==u||t.xval!==l||t.yval!==d||t.onMouseDown!==v||t.onMouseLeave!==p||t.onMouseEnter!==h}},{key:"render",value:function(){var t=this.x,e=this.y,n=this.props,o=n.index,a=n.handleRadius,r=n.handleColor,s=n.hover,c=n.down,i=n.background,u=n.handleStroke,l=n.xval,d=n.yval,h=n.onMouseEnter,p=n.onMouseLeave,v=n.onMouseDown,j=t(o),b=e(o),f=t(l),O=e(d),x=Math.atan2(O-b,f-j),y=f-a*Math.cos(x),k=O-a*Math.sin(x);return Object(g.jsxs)("g",{children:[Object(g.jsx)("line",{stroke:r,strokeWidth:s||c?1+u:u,x1:y,y1:k,x2:j,y2:b}),Object(g.jsx)("circle",{cx:f,cy:O,r:a,stroke:r,strokeWidth:s||c?2*u:u,fill:c?i:r,onMouseEnter:h,onMouseLeave:p,onMouseDown:v})]})}}]),n}(x),C=n(15),M=n(14),w=n.n(M),S=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(c.a)(this,n);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))).easing=w.a.apply(void 0,Object(C.a)(t.props.value)),t}return Object(i.a)(n,[{key:"componentDidUpdate",value:function(){this.props.progressCustomProp((100*this.easing(this.props.input/100)).toFixed(0))}},{key:"shouldComponentUpdate",value:function(t){if(Object(b.a)(Object(f.a)(n.prototype),"shouldComponentUpdate",this).call(this,t))return!0;var e=this.props,o=e.value,a=e.progress,r=e.progressColor;return t.progress!==a||t.progressColor!==r||t.value!==o}},{key:"UNSAFE_componentWillUpdate",value:function(t){this.props.value!==t.value&&(this.easing=w.a.apply(void 0,Object(C.a)(t.value)))}},{key:"render",value:function(){var t=this.props,e=t.progress,n=t.progressColor;if(!e)return Object(g.jsx)("path",{});var o=this.x(0),a=this.y(0),r=this.x(e),s=this.y(this.easing?this.easing(e):0),c="M".concat(r,",").concat(a," L").concat(r,",").concat(s," L").concat(o,",").concat(s),i=this.x(this.props.input/100),u=this.y(this.easing?this.easing(this.props.input/100):0),l="M".concat(i,",").concat(u," L").concat(o,",").concat(u),d="M".concat(i,",").concat(a," L").concat(i,",").concat(u);return Object(g.jsxs)("g",{children:[Object(g.jsx)("path",{fill:"none",strokeWidth:"1px",stroke:n,d:c}),Object(g.jsx)("path",{fill:"none",strokeDasharray:"4,4",strokeWidth:"2px",stroke:"#4285f4",d:l}),Object(g.jsx)("path",{fill:"none",strokeDasharray:"4,4",strokeWidth:"2px",stroke:"#4285f4",d:d})]})}}]),n}(x),D=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(i.a)(n,[{key:"shouldComponentUpdate",value:function(t){if(Object(b.a)(Object(f.a)(n.prototype),"shouldComponentUpdate",this).call(this,t))return!0;var e=this.props,o=e.curveColor,a=e.curveWidth,r=e.value;return t.curveColor!==o||t.curveWidth!==a||t.value!==r}},{key:"render",value:function(){var t=this.props,e=t.curveColor,n=t.curveWidth,o=t.value,a=this.x,r=this.y,s=a(0),c=r(0),i=a(1),u=r(1),l=a(o[0]),d=r(o[1]),h=a(o[2]),p=r(o[3]),v="M".concat(s,",").concat(c," C").concat(l,",").concat(d," ").concat(h,",").concat(p," ").concat(i,",").concat(u);return Object(g.jsx)("path",{fill:"none",stroke:e,strokeWidth:n,d:v})}}]),n}(x);function L(t){this.state.down||this.setState({hover:t})}function I(t,e){e.preventDefault(),this.setState({hover:null,down:t})}function E(){this.state.down||this.setState({hover:null})}var U=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var o;return Object(c.a)(this,n),(o=e.call(this,t)).state={down:0,hover:0,output:"waiting"},o.handleProgressData=function(t){o.setState({output:t})},o.onEnterHandle1=L.bind(Object(j.a)(o),1),o.onEnterHandle2=L.bind(Object(j.a)(o),2),o.onLeaveHandle1=E.bind(Object(j.a)(o),1),o.onLeaveHandle2=E.bind(Object(j.a)(o),2),o.onDownHandle1=I.bind(Object(j.a)(o),1),o.onDownHandle2=I.bind(Object(j.a)(o),2),o.onDownLeave=function(t){o.state.down&&(o.onDownMove(t),o.setState({down:null}))},o.onDownMove=function(t){if(o.state.down){t.preventDefault();var e=2*(o.state.down-1),n=[].concat(o.props.value),a=o.positionForEvent(t),r=Object(v.a)(a,2),s=r[0],c=r[1];n[e]=o.inversex(s),n[e+1]=o.inversey(c),o.props.onChange(n)}},o.onDownUp=function(){o.setState({down:0})},o.positionForEvent=function(t){var e=o.refs.root.getBoundingClientRect();return[t.clientX-e.left,t.clientY-e.top]},o.x=function(t){var e=o.props.padding,n=o.props.width-e[1]-e[3];return Math.round(e[3]+t*n)},o.inversex=function(t){var e=o.props.padding,n=o.props.width-e[1]-e[3];return Math.max(0,Math.min((t-e[3])/n,1))},o.y=function(t){var e=o.props.padding,n=o.props.height-e[0]-e[2];return Math.round(e[0]+(1-t)*n)},o.inversey=function(t){var e=o.props,n=e.height,a=e.handleRadius,r=e.padding,s=2*a,c=n-r[0]-r[2];return 1-((t=Math.max(s,Math.min(t,n-s)))-r[0])/c},o.state={inputBox:50},o.handleChange=o.handleChange.bind(Object(j.a)(o)),o}return Object(i.a)(n,[{key:"handleChange",value:function(t){this.setState({inputBox:t.target.value})}},{key:"render",value:function(){var t=this.x,e=this.y,o=this.props,a=o.value,r=o.width,s=o.height,c=o.handleRadius,i=o.style,u=o.className,l=o.progress,d=o.handleStroke,h=o.background,v=o.gridColor,j=o.curveColor,b=o.curveWidth,f=o.handleColor,O=o.textStyle,x=o.progressColor,y=o.readOnly,C=o.pointers,M=this.state,w=M.down,L=M.hover,I={xFrom:t(0),yFrom:e(0),xTo:t(1),yTo:e(1)},E=Object(p.a)({},C),U=Object(p.a)({background:h,cursor:w?E.down:L?E.hover:E.def,userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none"},i),W=y||!w?{}:{onMouseMove:this.onDownMove,onMouseUp:this.onDownUp,onMouseLeave:this.onDownLeave},F=y||w?{}:{onMouseDown:this.onDownHandle1,onMouseEnter:this.onEnterHandle1,onMouseLeave:this.onLeaveHandle1},H=y||w?{}:{onMouseDown:this.onDownHandle2,onMouseEnter:this.onEnterHandle2,onMouseLeave:this.onLeaveHandle2};return Object(g.jsxs)("div",{id:"container",children:[Object(g.jsxs)("svg",Object(p.a)(Object(p.a)({ref:"root",className:u,style:U,width:r,height:s},W),{},{children:[Object(g.jsx)(k,Object(p.a)(Object(p.a)({},I),{},{background:h,gridColor:v,textStyle:Object(p.a)(Object(p.a)({},n.defaultProps.textStyle),O)})),Object(g.jsx)(S,Object(p.a)(Object(p.a)({},I),{},{value:a,input:this.state.inputBox,progressCustomProp:this.handleProgressData,progress:l,progressColor:x})),Object(g.jsx)(D,Object(p.a)(Object(p.a)({},I),{},{value:a,curveColor:j,curveWidth:b})),this.props.children,y?void 0:Object(g.jsxs)("g",{children:[Object(g.jsx)(m,Object(p.a)(Object(p.a)(Object(p.a)({},I),F),{},{index:0,xval:a[0],yval:a[1],handleRadius:c,handleColor:f,down:1===w,hover:1===L,handleStroke:d,background:h})),Object(g.jsx)(m,Object(p.a)(Object(p.a)(Object(p.a)({},I),H),{},{index:1,xval:a[2],yval:a[3],handleRadius:c,handleColor:f,down:2===w,hover:2===L,handleStroke:d,background:h}))]})]})),Object(g.jsxs)("div",{id:"ui",children:[Object(g.jsx)("label",{children:"Time %"}),Object(g.jsx)("div",{id:"inputRow",children:Object(g.jsx)("input",{type:"text",id:"inputBox",name:"inputBox",onChange:this.handleChange,value:this.state.inputBox,autoComplete:"off",autoFocus:!0})}),Object(g.jsx)("label",{children:"Progress %"}),Object(g.jsx)("div",{id:"outputRow",children:Object(g.jsx)("div",{id:"outputNum",children:this.state.output})})]})]})}}]),n}(o.Component);U.defaultProps={value:[.25,.25,.75,.75],width:300,height:300,padding:[25,5,25,18],progress:0,background:"#1d1d1d",color:"#000",gridColor:"#3d3d3d",curveColor:"#fff",progressColor:"#9d9d9d",handleColor:"#4285f4",curveWidth:2,handleRadius:5,handleStroke:2,textStyle:{fontSize:"10px",fill:"#6d6d6d"},pointers:{down:"none",hover:"pointer",def:"default"}};n(27);var W=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(c.a)(this,n);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))).state={value:[Math.random()/2,Math.random()/2,(1+Math.random())/2,(1+Math.random())/2],progress:0,activeID:null},t.onChange=function(e){t.setState({value:e}),t.setState({activeID:null})},t.field=function(e){return function(n){var o=t.state.value;o[e]=n.target.value,t.setState({value:o})}},t.ease=function(){t.setState({value:[.25,.1,.25,1]}),t.setState({activeID:"ease"})},t.easeIn=function(){t.setState({value:[.42,0,1,1]}),t.setState({activeID:"easeIn"})},t.easeOut=function(){t.setState({value:[0,0,.58,1]}),t.setState({activeID:"easeOut"})},t.easeInOut=function(){t.setState({value:[.42,0,.58,1]}),t.setState({activeID:"easeInOut"})},t}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var t=this;this._loopId=h()((function e(n){t._loopId=h()(e),t.setState({progress:n/2e3%1})}))}},{key:"componentWillUnmount",value:function(){h.a.cancel(this._loopId)}},{key:"render",value:function(){var t=this,e=this.state,n=e.value,o=e.progress;return Object(g.jsxs)("div",{id:"content",children:[Object(g.jsx)(U,{className:"bezier",value:n,onChange:this.onChange,progress:o,handleStroke:3,handleRadius:6,curveWidth:3}),Object(g.jsx)("div",{id:"value",children:this.state.value.map((function(e,n){return Object(g.jsx)("span",{children:Object(g.jsx)("input",{type:"text",onChange:t.field(n),value:Number(e).toFixed(2)})},n)}))}),Object(g.jsxs)("div",{id:"buttons",children:[Object(g.jsx)("button",{id:"ease",onClick:this.ease,className:"ease"===this.state.activeID?"active":null,children:"Ease"}),Object(g.jsx)("button",{id:"easeIn",onClick:this.easeIn,className:"easeIn"===this.state.activeID?"active":null,children:"Ease in"}),Object(g.jsx)("button",{id:"easeOut",onClick:this.easeOut,className:"easeOut"===this.state.activeID?"active":null,children:"Ease out"}),Object(g.jsx)("button",{id:"easeInOut",onClick:this.easeInOut,className:"easeInOut"===this.state.activeID?"active":null,children:"Ease in out"})]})]})}}]),n}(o.Component);s.a.render(Object(g.jsx)(W,{}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.2b2d8986.chunk.js.map