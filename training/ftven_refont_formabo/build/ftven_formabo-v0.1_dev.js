/*---------------
 * jQuery iToggle Plugin by Engage Interactive
 * Examples and documentation at: http://labs.engageinteractive.co.uk/itoggle/
 * Copyright (c) 2009 Engage Interactive
 * Version: 1.0 (10-JUN-2009)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.3 or later
 ---------------*/

(function($){
    $.fn.iToggle = function(options) {

        clickEnabled = true;

        var defaults = {
                type: 'checkbox',
                keepLabel: true,
                easing: false,
                speed: 200,
                onClick: function(){},
                onClickOn: function(){},
                onClickOff: function(){},
                onSlide: function(){},
                onSlideOn: function(){},
                onSlideOff: function(){}
            },
            settings = $.extend({}, defaults, options);

        this.each(function(){
            var $this = $(this);
            if(this.tagName == 'INPUT'){
                var id=$this.attr('id');
                label(settings.keepLabel, id);
                $this.addClass('iT_checkbox').before('<label class="itoggle" for="'+id+'"><span></span></label>');
                if($this.attr('checked')){
                    $this.prev('label').addClass('iTon');
                }else{
                    $this.prev('label').addClass('iToff');
                }
            }else{
                $this.children('input:'+settings.type).each(function(){
                    var id = $(this).attr('id');
                    label(settings.keepLabel, id);
                    $(this).addClass('iT_checkbox').before('<label class="itoggle" for="'+id+'"><span></span></label>');
                    if($(this).attr('checked')){
                        $(this).prev('label').addClass('iTon');
                    }else{
                        $(this).prev('label').addClass('iToff');
                    }
                    if(settings.type == 'radio'){
                        $(this).prev('label').addClass('iT_radio');
                    }
                });
            }
        });

        function label(e, id){
            if(e == true){
                if(settings.type == 'radio'){
                    $('label[for='+id+']').addClass('ilabel_radio');
                }else{
                    $('label[for='+id+']').addClass('ilabel');
                }
            }else{
                $('label[for='+id+']').remove();
            }
        }

        $('label.itoggle').click(function(){
            if(clickEnabled == true){
                clickEnabled = false;
                if($(this).hasClass('iT_radio')){
                    if($(this).hasClass('iTon')){
                        clickEnabled = true;
                    }else{
                        slide($(this), true);
                    }
                }else{
                    slide($(this));
                }
            }
            return false;
        });
        $('label.ilabel').click(function(){
            if(clickEnabled == true){
                clickEnabled = false;
                slide($(this).next('label.itoggle'));
            }
            return false;
        });

        function slide($object, radio){
            settings.onClick.call($object); //Generic click callback for click at any state
            h=$object.innerHeight();
            t=$object.attr('for');
            if($object.hasClass('iTon')){
                settings.onClickOff.call($object); //Click that turns the toggle to off position
                $object.animate({backgroundPosition:'100% -'+h+'px'}, settings.speed, settings.easing, function(){
                    $object.removeClass('iTon').addClass('iToff');
                    clickEnabled = true;
                    settings.onSlide.call(this); //Generic callback after the slide has finnished
                    settings.onSlideOff.call(this); //Callback after the slide turns the toggle off
                });
                $('input#'+t).removeAttr('checked');
            }else{
                settings.onClickOn.call($object);
                $object.animate({backgroundPosition:'0% -'+h+'px'}, settings.speed, settings.easing, function(){
                    $object.removeClass('iToff').addClass('iTon');
                    clickEnabled = true;
                    settings.onSlide.call(this); //Generic callback after the slide has finnished
                    settings.onSlideOn.call(this); //Callback after the slide turns the toggle on
                });
                $('input#'+t).attr('checked','checked');
            }
            if(radio == true){
                name = $('#'+t).attr('name');
                slide($object.siblings('label[for]'));
            }
        }

    };
})(jQuery);

(function() {

    // Date values
    var todayDate = new Date();
    var dayOfWeek = todayDate.getDay();

    // Get configuration value from archimade meta
    var id_site = $("meta[name=archimade_idsite]").attr("content");
    var token = $("meta[name=archimade_token]").attr("content");

    var urlSubscription = 'http://jaguar-api.lereferentiel.ftv-preprod.fr/users/formulaire-abonnement-newsletter/neolane/subscription';
    var urlApiConfiguration = 'http://jaguar-api.lereferentiel.ftv-preprod.fr/pages/formulaire-abonnement-newsletter/configuration/';

    var email;
    var okTry = false;
    var nbNewsletters;

    var detailSource;

    $(document).ready(function() {
        if (1 != getCookie('ftven-nl-' + id_site + '_' + token) && (6 === dayOfWeek ||0 === dayOfWeek)) {
            detailSource = 'popin,idSite=' + id_site + ',token=' + token;
            openFormAbo();

            var cookieExpireDate = getCookieExpireDate();
            setCookie('ftven-nl-' + id_site + '_' + token, 1, cookieExpireDate);
        }
    });


    function bindButtons(data)
    {
        $('#ftven_formabo_close').click(function() {
            $("#ftven_formabo").dialog("close");
            return false;
        });

        $('#ftven_formabo_form_submit').click(function() {
            $("#ftven_formabo_form").submit();
        });

        $('#ftven_formabo_form_submit_1NL').click(function() {
            if ('' !== $('#ftven_formabo_option').val())
            {
                return false;
            }
            valid_one_newsletter();
            return false;
        });


        $.each( data, function( key, configJson ) {

            $('#' + configJson.produit_optin_name).iToggle({
                onClickOn: function(){
                    $('#' + configJson.produit_optin_name).prop('checked', true);

                },
                onClickOff: function(){
                    $('#' + configJson.produit_optin_name).prop('checked', false);

                }
             });

        });


        $( "#ftven_formabo_form" ).submit(function( event ) {
            if ('' !== $('#ftven_formabo_option').val())
            {
                return false;
            }
            if (1 === nbNewsletters)
            {
                valid_one_newsletter();
                return false;
            }
            var emailResponse = checkMail();
            if (false === checkNoOptinChoosen()) {
                return false;
            }
            if ( emailResponse === true) {
                var optinList = $('#ftven_formabo_form input:checked').map(function () {
                    return {
                        optin: this.value,
                        action: 'A'
                    };
                }).get();
                var formData = {
                    email: email,
                    detailSource: detailSource,
                    json: optinList
                };
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: urlSubscription,
                    data: JSON.stringify(formData),
                    success: function(data) {
                        $.each( data, function( key, neolaneJson ) {
                            checkNeolaneJson(neolaneJson, emailResponse);
                        });
                    }
                });
            } else {
                messageBox(emailResponse, 'Email Incorrect');
            }
            return false;
        });
    }

    /**
     * This function display a box color for success and error message
     * @param {boolean} response - true or false
     * @param {string} message - The message given
     */
    function messageBox( response, message ) {
        var msgContainer = $('#ftven_formabo_message');

        if (response === false) {
            msgContainer.children().remove();
            msgContainer.append("<div class='ftven_error_message'><p>"+ message + "</p></div>");
        } else {
            msgContainer.children().remove();
            msgContainer.append("<div class='ftven_success_message'><p>"+ message + "</p></div>");
        }
        $('#ftven_formabo_message').show();
    }


    /**
     * This function set the cookieName cookie to the given cookieValue
     * @param {string} cookieName - The cookie Name
     * @param {string} cookieValue - The given cookie value
     * @param {Date} cookieDate- The given duration
     */
    function setCookie(cookieName, cookieValue, cookieDate) {

        var cookieExpires = 'expires=' + cookieDate.toGMTString();
        document.cookie = cookieName + '=' + cookieValue + '; ' + cookieExpires + ';path=/';
    }


    /**
     * This function return true if the given param_name exists in the current query string
     * @param {String} param_name - The needed param_name from the current query string
     * @returns (String) the cookie value
     */
    function getCookie(cookieName) {
        var cookieSearch = cookieName + "=",
            cookieList = document.cookie.split(';'),
            cookieNb = cookieList.length;
        for(var i = 0; i < cookieNb; i++) {
            var cookieItem = cookieList[i].trim();
            if (cookieItem.indexOf(cookieSearch) == 0) {
                return cookieItem.substring(cookieSearch.length, cookieItem.length);
            }
        }
        return '';
    }


    function valid_one_newsletter()
    {
        var jsonOptin = {
            optin: $('#ften_formabo_optin').val(),
            action: 'A'
        };
        var emailResponse = checkMail();
        if ( emailResponse === true) {
            var formData = {
                email: email,
                detailSource: detailSource,
                json: jsonOptin
            };

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: urlSubscription,
                data: JSON.stringify(formData),
                success: function(data) {
                    $.each( data, function( key, neolaneJson ) {
                        checkNeolaneJson(neolaneJson, emailResponse);
                    });
                }
            });
        } else {
            messageBox(emailResponse, 'Email Incorrect');
        }
    }



    /**
     * this function open the form abo popin (generate all html)
     */
    function openFormAbo()
    {
        var formAboConfUrl = urlApiConfiguration + id_site + ':' + token;
        $.ajax({
            async: true,
            cache: true,
            jsonpCallback: 'callbackJsonp',
            contentType: "application/json",
            dataType: 'jsonp',
            type: 'GET',
            url: formAboConfUrl,
            success: function(data) {
                var html, content, htmlFinal;
                var keys = Object.keys(data);
                nbNewsletters = keys.length;
                var header =  '<div id="ftven_formabo_header">' +
                    '<div id="ftven_formabo_title"><h1>S\'abonner à la newsletter</h1></div>' +
                    '<div id="ftven_formabo_logo"><h2 class="ftven_alt">Culturebox</h2><a href="#" id="ftven_formabo_close"></a></div>' +
                    '</div>';
                var footer = '<div id="ftven_formabo_footer">' +
                    '<div id="ftven_formabo_message" class="ftven_success_message"><p>Inscription réussie</p></div>' +
                    '</div>';
                if (2 <= nbNewsletters) {
                    var nl1 = data[keys[0]];
                    var nl2 = data[keys[1]];
                    content = '<div id="ftven_formabo_content">' +
                        '<div id="leftNewsletter">' +
                            '<p class="title">' + nl1.produit_name + '</p>' +
                            '<img src="' + nl1.produit_picture + '"  class="ftven_formabo_nl_preview">' +
                            '<p class="desciption">' + nl1.produit_description + '</p>' +
                        '</div>' +
                        '<div id="rightNewsletter">' +
                            '<p class="title">' + nl2.produit_name + '</p><img src="' + nl2.produit_picture + '" class="ftven_formabo_nl_preview">' +
                            '<p class="desciption">' + nl2.produit_description + '</p>' +
                        '</div>' +
                        '<form id="ftven_formabo_form">' +
                        '<div id="itoggle">' +
                            '<div class="titre_bloc_left"><label class="label_detail">Abonnez vous à la newsletter ' + nl1.produit_name + ' </label></div>' +
                            '<div class="titre_bloc_right"><input type="checkbox" id="' + nl1.produit_optin_name + '" value="' + nl1.produit_optin_name + '" checked="checked"></div>' +
                            '<div class="titre_bloc_left"><label class="label_detail">Abonnez vous à la newsletter ' + nl2.produit_name + '</label></div>' +
                            '<div class="titre_bloc_right"><input type="checkbox" id="' + nl2.produit_optin_name + '" value="' + nl2.produit_optin_name + '" checked="checked"></div>' +
                        '</div>' +
                        '<div class="ftven_formabo_email_bloc_submit2NL">' +
                        '<div class="ftven_formabo_form_email_bloc">' +
                            '<div class="titre_bloc_left"><input type="text" id="ftven_formabo_form_email" class="ftven_formabo_form_email_2NL" placeholder="Votre adresse email"/></div>' +
                           '<div class="titre_bloc_right"><a href="#" id="ftven_formabo_form_submit" class="ftven_formabo_form_submit_link">S\'abonnner</a></div>' +
                        '</div>' +
                        '<input type="text" id="ftven_formabo_option" />' +
                        '</div>' +

                        '</form>' +
                    '</div>';
                    var width = 680;
                    var height = 800;
                } else if (1 == nbNewsletters) {
                    var nl1 = data[keys[0]];
                    content = '<div id="ftven_formabo_content_1NL">' +
                        '<div class="ftven_formabo_picture">' +
                        '<img src="' + nl1.produit_picture + '"  />' +
                        '</div>' +
                            '<div class="ftven_formabo_subscription">' +
                                '<h3 class="ftven_formabo_product_name">' + nl1.produit_name + '</h3>' +
                                '<div class="ftven_formabo_product_descritpion"><p>' + nl1.produit_description + '</p></div>' +
                                    '<input type="hidden" id="ften_formabo_optin" value="' + nl1.produit_optin_name + '"/>' +
                                    '<input type="text" id="ftven_formabo_option" />' +
                                    '<div class="ftven_formabo_email_bloc_submit1NL">' +
                                        '<form id="ftven_formabo_form">' +
                                        '<div class="ftven_formabo_mail_block">' +
                                            '<input type="text" id="ftven_formabo_form_email" class="ftven_formabo_form_email" placeholder="Votre adresse email"/>' +
                                        '</div>' +
                                        '<div class="ftven_formabo_mail_button">' +
                                            '<a href="#" id="ftven_formabo_form_submit_1NL" class="ftven_formabo_form_submit_link">S\'abonnner</a>' +
                                        '</div>' +
                                        '</form>' +
                                    '</div>' +
                            '</div>' +
                        '</div>';
                    var width = 800;
                    var height = 700;
                }

                htmlFinal = '<div id="ftven_formabo">' +
                    header +
                    content +
                    footer +
                    '</div>';
                $('body').prepend(htmlFinal);
                openModal(width, height);
                bindButtons(data);
                $("#ftven_formabo_message").hide();

            }
        });
    }


    /**
     * @param (Int) width - The modal width
     * @param (Int) height - The modal height
     */
    function openModal(width, height)
    {
           $("#ftven_formabo").dialog({
            autoOpen: true,
            modal: true,
            draggable: false,
            resizable: false,
            closeOnEscape: true,
            width: width,
            height: height,
            show: {
                effect: "blind",
                duration: 1000
            }
        });
    }


    /**
     * This function return the form abo cookie lifetime (days) 6 or 7 days depending on the current day
     * @returns (Date) cookie expiration date => next saturday
     */
    function getCookieExpireDate()
    {
        var nbDayToAdd = ((6 == dayOfWeek) ? 6 : 5);
        var nextSaturdayDate = new Date();
        nextSaturdayDate.setDate(todayDate.getDate() + nbDayToAdd);
        nextSaturdayDate.setHours(23,59,59);
        return nextSaturdayDate;
    }

    /**
     * This function check the mail format
     * @returns (bool) true / false if given mail is correct
     */
    function checkMail()
    {
        email = $('#ftven_formabo_form_email').val();
        var emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return (emailPattern.test(email));
    }

    /**
     * This function check json statut and set cookie if OK
     * @param {Object} neolaneJson - The needed param_name from the current query string
     * @param {Bool} emailResponse - True or False if mail was correctly filled
     */
    function checkNeolaneJson(neolaneJson, emailResponse)
    {
        if (neolaneJson.statut == 'OK') {
            okTry = true;
            messageBox(emailResponse, 'Inscription réussie');
            if (1 === nbNewsletters)
            {
                $('#ftven_formabo_form_submit_1NL').unbind('click');
                $('#ftven_formabo_form_submit_1NL').css('opacity', '0.4');
            } else {
                $('#ftven_formabo_form_submit').unbind('click');
                $('#ftven_formabo_form_submit').css('opacity', '0.4');
            }
        } else {
            if (false === okTry)
            {
                messageBox(false, 'Email déjà existant');
            }
        }
    }

    /**
     * This function check if user choosed at once one optin or return false
     * @returns (bool) return true if user checked one or more optin
     */
    function checkNoOptinChoosen()
    {
        if (0 === $('#ftven_formabo_form').find('input[checked="checked"]').length) {
            messageBox(false, 'Vous devez sélectionner au moins 1 abonnement');
            return false;
        } else {
            return true;
        }
    }

})();