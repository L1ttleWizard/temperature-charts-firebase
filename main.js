getData();


async function getData() {
    const removeEmptyOrNull = (obj) => {
        Object.keys(obj).forEach(k =>
            (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
            (!obj[k] && obj[k] !== undefined) && delete obj[k]
        );

        return obj;
    };

    const response = await fetch('https://esp-32-demo-f34e1-default-rtdb.europe-west1.firebasedatabase.app/test_bat.json');

    const data1 = await response.json();
    const dateTimes = [];
    const temps = [];

    for (const key in data1) {
        dateTimes.push(data1[key].date_time);
        temps.push(data1[key].temp);
    }
    length = data1.length;
    console.log(length);
    labels = dateTimes;
    values = temps;
    let currentTemp = document.getElementById('current-data');
    currentTemp.innerHTML = `${labels[labels.length - 1]}        ${values[values.length-1]}°C`;
    new Chart(document.getElementById("bar-chart"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Temperature battery",
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.5,
                    data: values,
                    hoverBackgroundColor: 'rgb(75, 192, 192)',
                    hoverBorderColor: '#357878'
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Temperature battery'
            }
        }
    });
}
