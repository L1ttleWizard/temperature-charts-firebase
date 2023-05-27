window.onload = ()=>{

let select = document.getElementById("appo");
let charts = document.querySelectorAll('.chart-item');
chartss = Array.from(charts);
let ids = chartss.map(item=>{ return item.id});
console.log(ids);
const obj = {
    battery:charts[0],
    withoutBattery:charts[1]
};
console.log(obj)
};
