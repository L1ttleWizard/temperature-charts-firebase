(()=>{let e;!async function(){function t(e){return Object.keys(e).forEach((a=>{e[a]&&"object"==typeof e[a]?t(e[a]):void 0!==e[a]&&null!==e[a]&&""!==e[a]||delete e[a]})),e}function a(e){const t=e.split("/"),a=new Date(`${t[1]}/${t[2]}/${t[0]}`),l=String(a.getDate()).padStart(2,"0");return`${String(a.getMonth()+1).padStart(2,"0")}/${l}/${a.getFullYear()}`}const l=(t,a)=>(e=new Chart(document.getElementById("bar-chart"),{type:"line",data:{labels:t,datasets:[{label:"Temperature battery",fill:!1,borderColor:"rgb(75, 192, 192)",tension:.5,data:a,hoverBackgroundColor:"rgb(75, 192, 192)",hoverBorderColor:"#357878"}]},options:{legend:{display:!1},title:{display:!0,text:"Temperature battery"}}}),e);function n(e,t){for(let a=e.length-1;a>=0;a--)if(e[a]===t)return a}const r=await fetch("https://esp-32-demo-f34e1-default-rtdb.europe-west1.firebasedatabase.app/test_bat.json");let o=await r.json();console.log(o),o=(e=>{news=new Array,news=t(news);for(const t in e)news.push(e[t]);let a=new Array;return news.forEach((e=>{"date_time"in e&&"temp"in e&&a.push(e)})),a})(o),console.log(o);let s=[];const d=[];for(const e in o)s.push(o[e].date_time),d.push(o[e].temp);s=s.map((e=>function(e){let[t,a]=e.split(" "),[l,n,r]=t.split("-");n=n.padStart(2,"0"),r=r.padStart(2,"0");let[o,s]=a.split(":");return o=o.padStart(2,"0"),s=s.padStart(2,"0"),`${l}-${n}-${r} ${o}:${s}`}(e)));let i=s.map((e=>function(e){let[t,a,l]=e.split("-");return a<10&&(a="0"+parseInt(a)),l<10&&(l="0"+parseInt(l)),`${t}-${a}-${l}`}(e).slice(0,10).replace(/\s+/g,"")));console.log(i),$("#demo").daterangepicker({minYear:2022,timePicker24Hour:!0,autoApply:!0,startDate:`${a(s[0].slice(0,10).replace(/\s+/g,"").replaceAll("-","/"))}`,endDate:`${a(s[s.length-1].slice(0,10).replace(/\s+/g,"").replaceAll("-","/"))}`},(function(t,a,r){dateRangeStart=t.format("YYYY-MM-DD"),dateRangeEnd=a.format("YYYY-MM-DD"),console.log(dateRangeStart),labels=s.slice(i.indexOf(dateRangeStart),n(i,dateRangeEnd)),console.log(labels),values=d.slice(i.indexOf(dateRangeStart),n(i,dateRangeEnd)),console.log(values),e.destroy(),l(labels,values),console.log("New date range selected: "+t.format("YYYY-MM-DD")+" to "+a.format("YYYY-MM-DD")+" (predefined range: "+r+")")})),length=o.length,labels=s,values=d,document.getElementById("current").innerHTML=`Последнее измерение ${labels[labels.length-1]} -  ${values[values.length-1]}°C`,l(labels,values)}()})();