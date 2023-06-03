getData();
let myChart;
// import dateRangeStart from './jq.js'
// import dateRangeEnd from './jq.js'
async function getData() {
    const removeEmptyOrNull = (obj) => {
        Object.keys(obj).forEach(k =>
            (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
            (!obj[k] && obj[k] !== undefined) && delete obj[k]
        );

        return obj;
    };

    function removeEmptyElements(obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] && typeof obj[key] === 'object') removeEmptyElements(obj[key]);
            else if (obj[key] === undefined || obj[key] === null || obj[key] === '') delete obj[key];
        });
        return obj;
    };
    function removeNull(array) {
        return array.filter(x => x !== null)
        };
    const validate = (obj) => { //validates object to figure out if it contains both temp and date to avoid chart crash
        news =new Array();
        obj = removeEmptyElements(obj);
        for (const key in obj){news.push(obj[key])};
        
        let fill = new Array();
        news.forEach((thing) => {
            if ('date_time' in thing && 'temp' in thing) {
                fill.push(thing);
            };
        });
        return fill;
    };

    function convertDate(inputDate) {
        // Разделяем дату на год, месяц и день
        const parts = inputDate.split('/');
        // Создаем новую дату, используя значения в обратном порядке
        const outputDate = new Date(`${parts[1]}/${parts[2]}/${parts[0]}`);
        // Форматируем дату в виде DD/MM/YYYY
        const dd = String(outputDate.getDate()).padStart(2, '0');
        const mm = String(outputDate.getMonth() + 1).padStart(2, '0');
        const yyyy = outputDate.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    function formatZeroes(dateString) {
        let [year, month, day] = dateString.split('-');

        if (month < 10) {
            month = '0' + parseInt(month); // преобразуем в число и добавляем 0
        }

        if (day < 10) {
            day = '0' + parseInt(day); // преобразуем в число и добавляем 0
        }

        return `${year}-${month}-${day}`;
    };
    function formatDate(dateString) {
        let [date, time] = dateString.split(' ');

        let [year, month, day] = date.split('-');
        month = month.padStart(2, '0');
        day = day.padStart(2, '0');

        let [hour, minute] = time.split(':');
        hour = hour.padStart(2, '0');
        minute = minute.padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}`;
    };
    const renderChart = (labels, values) => {

        myChart = new Chart(document.getElementById("bar-chart"), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Temperature battery",
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.5,
                    data: values,
                    hoverBackgroundColor: 'rgb(75, 192, 192)',
                    hoverBorderColor: '#357878'
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Temperature battery'
                }
            }

        });
        return myChart;
    };
    function lastIndexOf(arr, elem) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === elem) {
                return i;
            }
        }
    };


    const response = await fetch('https://esp-32-demo-f34e1-default-rtdb.europe-west1.firebasedatabase.app/test_bat.json');

    let data1 = await response.json();
    console.log(data1);
    data1 = validate(data1);
    console.log(data1);
    let dateTimes = [];
    const temps = [];


    for (const key in data1) {
        dateTimes.push(data1[key].date_time);
        temps.push(data1[key].temp);
    };
    dateTimes = dateTimes.map((item) => {
        return formatDate(item);
    });
    let dateTimesMini = dateTimes.map((item) => {
        return formatZeroes(item).slice(0, 10).replace(/\s+/g, '');
    });
    console.log(dateTimesMini);
    $('#demo').daterangepicker({
        "minYear": 2022,
        "timePicker24Hour": true,
        "autoApply": true,
        "startDate": `${convertDate(dateTimes[0].slice(0,10).replace(/\s+/g, '').replaceAll('-','/'))}`,
        "endDate": `${convertDate(dateTimes[dateTimes.length-1].slice(0,10).replace(/\s+/g, '').replaceAll('-','/'))}`
    }, function (start, end, label) {
        dateRangeStart = start.format('YYYY-MM-DD');
        dateRangeEnd = end.format('YYYY-MM-DD');
        console.log(dateRangeStart)
        labels = dateTimes.slice(dateTimesMini.indexOf(dateRangeStart), lastIndexOf(dateTimesMini, dateRangeEnd));
        console.log(labels);
        values = temps.slice(dateTimesMini.indexOf(dateRangeStart), lastIndexOf(dateTimesMini, dateRangeEnd));
        console.log(values);
        myChart.destroy();
        renderChart(labels, values);
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });



    length = data1.length;
    labels = dateTimes;
    values = temps;

    let latestData = document.getElementById('current');
    latestData.innerHTML = `Последнее измерение ${labels[labels.length - 1]} -  ${values[values.length-1]}°C`
    renderChart(labels, values);

}
// console.log(`${dateRangeStart} to ${dateRangeEnd}` );