(function($) {
    'use strict';

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
    var nl1;
    var nl2;
    var optinKeys;
    var popinWidth, popinHeight;


    $(document).ready(function() {



        if (typeof id_site === 'undefined') {
            return false;
        }

        if (typeof token === 'undefined') {
            token = 'default';
        }

        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (false === isMobile) {
                openFormAbo();
        }

        $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
               return null;
            }else{
               return results[1] || 0;
            }
        }

        if ( $.urlParam('popin') == '1' ) {
            console.log('----- The parameter debug popin is active -----');
            var debug = true;
            openFormAbo(debug);
        }

    });


    function bindButtons()
    {
        $('#ftven_formabo_form_email')
            .blur(function () {
                    if (this.value === '') {
                            this.value = 'Saisissez votre adresse email';
                    }
                }
            )
            .focus(function () {
                if (this.value === 'Saisissez votre adresse email') {
                        this.value = '';
                }
            });

        $('#ftven_formabo_close').click(function() {
            $("#ftven_formabo").trigger('closeModal');
            return false;
        });

        $('#ftven_formabo_form_submit').click(function() {
            $("#ftven_formabo_form").submit();
            return false;
        });

        $('#ftven_formabo_form_email').keypress(function (e) {
            if (this.value && this.value.indexOf('Saisissez votre adresse email') >= 0) {
                this.value = this.value.replace('Saisissez votre adresse email', '');
            }

            if (e.which === 13) {
                $('#ftven_formabo_form_submit').click();
            }
        });

        $( "#ftven_formabo_form" ).submit(function() {
            if ('' === $('#ftven_formabo_option').val())
            {
                return false;
            }
            var emailResponse = checkMail();
            if (false === emailResponse) {
                messageBox(emailResponse, 'Adresse email incorrecte');
                return false;
            }
            if (1 === nbNewsletters)
            {
                valid_one_newsletter();
                return false;
            }
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
            $('#ftven_formabo_form_email').addClass('ftven_formabo_form_email_error');
        } else {
            msgContainer.children().remove();
            msgContainer.append("<div class='ftven_success_message'><p>"+ message + "</p></div>");
            $('#ftven_formabo_form_email').removeClass('ftven_formabo_form_email_error');
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
            if (cookieItem.indexOf(cookieSearch) === 0) {
                return cookieItem.substring(cookieSearch.length, cookieItem.length);
            }
        }
        return '';
    }


    function valid_one_newsletter()
    {
        var jsonOptin = {
            optin: $('#ftven_formabo_option').val(),
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
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(thrownError);
                        console.log(JSON.stringify(formData));
                    }

            });
        } else {
            messageBox(emailResponse, 'Adresse email incorrecte');
        }
    }


    /**
     * this function return a newsletter block content
     * @param {object} nl - the newsletter object
     * @param {integer} idNl - the newsletter identifier
     *
     * @returns (String) the html content for the newsletter block
     */
    function getOneNl(nl, idNl) {
        return ('<div class="ftven_formabo_content_2NL">' +
                    '<div class="ftven_formabo_picture_2NL">' +
                        '<img src="' + nl.produit_picture + '"  />' +
                    '</div>' +
                    '<div class="ftven_formabo_subscription ">' +
                    '<div class="ftven_formabo_product_descritpion_2NL">' +
                    '<p class="ftven_formabo_product_descritpion_block">' + nl.produit_description + '</p>' +
                    '</div>' +
                    '<div class="ftven_formabo_subscription_choice">' +
                    getCheckBox(idNl, nl.produit_optin_name) +
                    '</div>'+
                    '</div>' +
            '</div>');
    }

    /**
     * this function return a checkbox identified by given Id
     * @param {Int} idCheckBox - the current checkbox idenfier
     * @param {String} optinString - the optin content
     *
     * @returns (String) the html content for the checkbox
     */
    function getCheckBox(idCheckbox, optinValue){

        return (
         '<div class="ftven_formabo_checkbox">' +
            '<input id="ftven_formabo_option' + idCheckbox + '_cb" type="checkbox" value="' + optinValue + '" class="ftven_formabo_checkbox">' +
            '<label for="ftven_formabo_option' + idCheckbox + '_cb">' +
                '<span  class="ftven_formabo_option" id="ftven_formabo_option' + idCheckbox + '">' +
                    '<span></span>' +
                '</span>' +
            '</label>' +
            '<div id="ftven_formabo_option' + idCheckbox + '_cb_choose" class="ftven_formabo_option_choose_txt">' +
                '<p >Je souhaite m\'abonner à la newsletter</p>' +
            '</div>'+
          '</div>'
          );
    }



    /**
     * This function returns the submit button
     *
     * @returns (String) the html content for the submit button
     */
    function getSubmitButton() {
        return (
            '<div class="ftven_formabo_mail_block">' +
                '<input type="text" id="ftven_formabo_form_email"  value="Saisissez votre adresse email"/>' +
            '</div>' +
            '<div class="ftven_formabo_mail_button">' +
                '<a href="#" id="ftven_formabo_form_submit" class="ftven_formabo_form_submit_link">S\'abonner</a>' +
            '</div>');
    }


    /**
     * this function set the newsletter objects
     * @param {Object} data - the data sent from WS configuration call
     *
     * @returns (String) the html content for the checkbox
     */
    function setNewslettersConfig(data){
        var keys = Object.keys(data);
        nbNewsletters = keys.length;
        nl1 = data[keys[0]];
        optinKeys = nl1.produit_optin_name;
        popinWidth = 'auto';
        popinHeight = 650;
        if (1 !== nbNewsletters) {
            nl2 = data[keys[1]];
            popinWidth = 'auto';
            popinHeight = 735;
            optinKeys += '_' + nl2.produit_optin_name;
        }
    }


    /**
     * this function open the form abo popin (generate all html)
     */
    function openFormAbo(debug)
    {
        var formAboConfUrl = urlApiConfiguration + id_site + ':' + token;
        $.ajax({
            async: true,
            cache: true,
            jsonpCallback: 'callbackJsonpFormAbo',
            contentType: "application/json",
            dataType: 'jsonp',
            type: 'GET',
            url: formAboConfUrl,
            success: function(data) {
                if (typeof data.message != 'undefined' &&
                    data.message === 'unavailable configuration for this site') {
                    console.log('[POPIN NL] - no popin bad configuration');
                    console.log('[POPIN NL] - DEBUG :' + JSON.stringify(data));
                    console.log('[POPIN NL] - URL TO CHECK DATA :' + formAboConfUrl);
                } else {
                    setNewslettersConfig(data);

                    if ( debug === true ) {
                        detailSource = 'popin,idSite=' + id_site + ',token=' + token;
                        getPopinHtml();
                        bindButtons();
                        $("#ftven_formabo_message").hide();
                        $("#ftven_formabo_option1_cb_ok").hide();
                        $("#ftven_formabo_option2_cb_ok").hide();
                    }else{
                        if (( (1 != getCookie('ftven-nl-' + id_site + '_' + optinKeys)) &&
                            (6 === dayOfWeek || 0 === dayOfWeek) &&
                            (1 != getCookie('ftven-nl-' + id_site + '_' + optinKeys + '_done')))) {
                            detailSource = 'popin,idSite=' + id_site + ',token=' + token;
                            getPopinHtml();
                            bindButtons();
                            $("#ftven_formabo_message").hide();
                            $("#ftven_formabo_option1_cb_ok").hide();
                            $("#ftven_formabo_option2_cb_ok").hide();
                            setCookie('ftven-nl-' + id_site + '_' + optinKeys, 1, getCookieExpireDate());
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }


    function getPopinHtml() {
        var content, htmlFinal, header = '';

        var footer = '' +
            '<div id="ftven_formabo_footer">' +
            '<div id="ftven_formabo_message" class="ftven_success_message">' +
            '<p>Inscription réussie</p>' +
            '</div>' +
            '<div id="ftven_formabo_collecte_info" class="ftven_collecte_info">' +
            '<p>FRANCE TELEVISIONS, en sa qualité de responsable du traitement, collecte vos données à caractère personnel à des fins de gestion de votre compte utilisateur. Ces données sont nécessaires pour pouvoir vous offrir un espace personnalisé. Conformément à la loi Informatique et libertés du 6 janvier 1978, vous bénéficiez d\'un droit d\'accès, de rectification et de suppression de vos données. Vous pouvez également vous opposer, pour un motif légitime, à l\'utilisation de vos données. Vous seul pouvez exercer ces droits sur vos propres données en écrivant à France Télévisions - Editions Numériques Service Inscription Internet - 7 Esplanade Henri de France 75015 Paris et en joignant une photocopie de votre pièce d\'identité</p>' +
            '</div>' +
            '</div>';

        if (2 <= nbNewsletters) {
            header = getHeader('francetv');
            content =
                '<div id="ftven_formabo_main_content">' +
                    '<form id="ftven_formabo_form">' +
                    getOneNl(nl1, 1) +
                    '<hr class="ftven_formabo_h_separator">'+
                    getOneNl(nl2, 2) +
                    '<div class="ftven_formabo_email_bloc_submit2NL">' +
                    getSubmitButton() +
                    '</div>' +
                    '</form>' +
                    '</div>';
        } else if (1 == nbNewsletters) {
            header = getHeader(nl1.produit_logo);
            var main_title = nl1.produit_print_title == '1' ? '<h3 class="ftven_formabo_product_name">' + nl1.produit_name + '</h3>' : '';
            var addonCss = ((nl1.produit_name != '' && nl1.produit_print_title == '1') ? '_with_title' : '');
            content = '<div class="ftven_formabo_content_1NL">' +
                '<div class="ftven_formabo_picture">' +
                '<img src="' + nl1.produit_picture + '"  />' +
                '</div>' +
                '<div class="ftven_formabo_subscription' + addonCss + '">' +
                main_title +
                '<div class="ftven_formabo_product_descritpion' + addonCss + '"><p class="ftven_formabo_product_descritpion_block">' + nl1.produit_description + '</p></div>' +
                '<div class="ftven_formabo_email_bloc_submit1NL">' +
                '<form id="ftven_formabo_form">' +
                '<input type="hidden" id="ftven_formabo_option" value="' + nl1.produit_optin_name + '"/>' +
                getSubmitButton() +
                '</form>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        htmlFinal = '<div id="ftven_formabo">' +
            header +
            content +
            footer +
            '</div>';
        $('body').prepend(htmlFinal);
        openModal(popinWidth, popinHeight);
    }


    /**
     * This function return the header with the given title css classname
     * @param {String} titleClass - The Css class for the header title
     * @return (String) header - the custom header
     */
    function getHeader(titleClass) {
        return ('<div id="ftven_formabo_header">' +
            '<div id="ftven_formabo_title">' +
            '<h1>S\'abonner à la newsletter</h1>' +
            '</div>' +
            '<div class="ftven_main_logo">'+
            '<div class="ftven_formabo_separator">' +
            '</div>' +
            '<div id="ftven_formabo_' + titleClass + '">' +
            '</div>' +
            '<div class="ftven_formabo_v_separator">'+
            '</div>' +
            '<div class="ftven_formabo_close" id="ftven_formabo_close">'+
            '</div>' +
            '</div>' +
        '</div>');
    }

    /**
     * @param (Int) popinWidth - The modal width
     * @param (Int) popinHeight - The modal height
     */
    function openModal(popinWidth, popinHeight)
    {
        $("#ftven_formabo").easyModal({
            top: 31,
            autoOpen: true,
            overlay: 0.3,
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
            $('#ftven_formabo_form_submit')
                .addClass('ftven_formabo_form_submit_finish')
                .click(function() {
                    return false;
                });
            $('#ftven_formabo_form_email').addClass('ftven_formabo_form_email_finish').attr('disabled', true);
            var nextYearDate = new Date();
            nextYearDate.setDate(todayDate.getDate() + 365);
            setCookie('ftven-nl-' + id_site + '_' + optinKeys + '_done', 1, nextYearDate);


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
        if (0 === $('#ftven_formabo_form input:checked').length) {
            messageBox(false, 'Vous devez sélectionner au moins 1 abonnement');
            return false;
        } else {
            return true;
        }
    }



})(jQuery);