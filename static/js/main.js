$(function(){
    var mod = function(n, m) {
        return (n + m) % m;
    }
    var padding = function(str) {
        if ((''+str).length == 1) return '0'+str;
        else return str;
    };
    var updateTime = function(){
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        //hours = seconds % 24;

        $('.js-clock').text(padding(hours) + ':' + padding(minutes) + ':' + padding(seconds));
        $('.js-date').text(date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear());
        setTimeout(updateTime, 1000);
    };
    var updateWeather = function(){
        $.getJSON(
            '/weather'
        ).success(function(data){
            console.log();
            var icon = data.weather[0].icon;
            var temperature = Math.round((data.main.temp - 273.15)*10)/10;
            $('.js-weather').text(temperature);
            $('#js-weather-icon').attr(
                'src',
                'http://openweathermap.org/img/w/' + icon + '.png'
            );
            $('.js-weather-desc').text(
                data.weather[0].main
            )
            setTimeout(function(){
                updateWeather();
            }, 1000*60*15);
        }).error(function(err){
            $('#update-container').text(err);
        });
    };

    var updateRoutes = function(){
        $('#update-container').load('/routes');
        setTimeout(function(){
            updateRoutes();
        }, 1000*60*5);
    };
    var howOften = 20*1000;
    var slideCounter = 0;
    var lastSwitch = 0;
    var updateSlides = function(){
        lastSwitch = Date.now();
        slideCounter += 1;
        var i = slideCounter;
        var slideCount = $('.slide').length
        var previousSlide = mod(i-1, slideCount);
        var activeSlide = i%slideCount;
        $('.slide'+previousSlide).css('opacity', 0).css('z-index', 10);
        $('.slide'+activeSlide).css('opacity', 1).css('z-index', 11);
    };
    $('html').on('click', function(e){
        updateSlides();
    });
    setInterval(function(){
        if ((Date.now() - lastSwitch) > howOften) {
            lastSwitch = Date.now();
            updateSlides();
        }
    }, 1000);

    $('.slide').css('opacity', 0);
    updateRoutes();
    updateWeather();
    updateTime();
    updateSlides();
});
