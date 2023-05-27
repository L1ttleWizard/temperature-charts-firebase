$('#appo').change(function() {
    if(this.value == "battery") {
        $('#battery').removeClass('hidden');
    } else {
        $('#battery').addClass('hidden');
    };
    console.log(this.value);

    if(this.value == "wo") {
        $('#without-battery').removeClass('hidden');
    } else {
        $('#without-battery').addClass('hidden');
    };

    if(this.value == "all") {
        $('#without-battery').removeClass('hidden');
        $('#battery').removeClass('hidden');

    }
    console.log(this.value);
});
console.log('HELLO')