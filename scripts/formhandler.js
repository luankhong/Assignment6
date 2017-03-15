(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var emailSaved;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);

        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};

            var strengthSlider = document.getElementById('strengthLevel');

            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);

            //Chapter 10 Gold Challenge
            if(data['size'] == 'coffeeZilla' && strengthSlider.value == 100 && data['flavor'] != '')
            {
                emailSaved = data['emailAddress'];
                $('#myModal').modal('show');
            }

            this.reset();
            this.elements[0].focus();
        });
    };

    $('#saveAchievement').on('click', function () {
        console.log('email saved was ' + emailSaved);
        $('#myModal').modal('hide');
    });


    //Chapter 10 Silver Challenge
    window.onload = function() {
        var strengthSlider = document.getElementById('strengthLevel');
        $('#strengthLevelLabel').text('Caffeine Rating ' + strengthSlider.value);
        document.getElementById('strengthLevelLabel').style.color = 'rgb(' + 0 + ',' + 195 + ',0)';
    };

    $('#strengthLevel').on('input change', function() {
        var greenLevel;
        var redLevel;
        if (this.value <= 33) {
            greenLevel = +255 - (+this.value * 2);
            redLevel = 0;
        } else if (this.value >= 33 && this.value <= 67) {
            greenLevel = +255 - (+this.value * 2);
            redLevel = +55 + (+this.value * 2);
        } else {
            greenLevel = 0;
            redLevel = +55 + (+this.value * 2);
        }

        console.log(greenLevel);
        document.getElementById('strengthLevelLabel').style.color = 'rgb(' + redLevel + ',' + greenLevel + ',0)';

        $('#strengthLevelLabel').text('Caffeine Rating ' + this.value);
    });

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
