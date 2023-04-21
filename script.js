mo = ['j', 'f', 's']
function getMonthNames(month) {
    if (mo[month]) {
        return mo[month].toLowerCase();
    } else {
        throw "Invalid month"
    }
}
try { 
    nameOf = getMonthNames();
    console.log(nameOf);
    alert(nameOf)
}catch(e) {
    alert(e);
    monthName='invalid';
}