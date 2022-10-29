getData();
console.log('something');
 const removeEmptyOrNull = (obj) => {
      Object.keys(obj).forEach(k =>
        (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
        (!obj[k] && obj[k] !== undefined) && delete obj[k]
      );
      return obj;
    };
async function getData() {
    const response = await fetch('https://esp-32-demo-f34e1-default-rtdb.europe-west1.firebasedatabase.app/test.json');
    const data = await response.json();
    
    removeEmptyOrNull(data);
    data.sort((a, b) => new Date(a["date_time"].slice(0, -1)) - new Date(b["date_time"].slice(0, -1)));
    console.log(data);
    length = data.length;
    console.log(length);
    labels = [];
    values = [];
    
    for (i = 0; i < length; i++) {
        
        labels.push(data[i].date_time);
        values.push(data[i].temp);
    }
    labels.sort();
    console.log(labels)
    new Chart(document.getElementById("bar-chart"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Temperature inside",                            
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.5,
                    data: values,
                    hoverBackgroundColor:'rgb(75, 192, 192)',
                    hoverBorderColor:'#357878'
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Temperature inside'
            }
        }
    });
}
