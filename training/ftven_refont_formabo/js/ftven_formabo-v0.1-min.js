(function(e){e.fn.iToggle=function(n){function s(t,n){if(t==true){if(i.type=="radio"){e("label[for="+n+"]").addClass("ilabel_radio")}else{e("label[for="+n+"]").addClass("ilabel")}}else{e("label[for="+n+"]").remove()}}function o(n,r){i.onClick.call(n);h=n.innerHeight();t=n.attr("for");if(n.hasClass("iTon")){i.onClickOff.call(n);n.animate({backgroundPosition:"100% -"+h+"px"},i.speed,i.easing,function(){n.removeClass("iTon").addClass("iToff");clickEnabled=true;i.onSlide.call(this);i.onSlideOff.call(this)});e("input#"+t).removeAttr("checked")}else{i.onClickOn.call(n);n.animate({backgroundPosition:"0% -"+h+"px"},i.speed,i.easing,function(){n.removeClass("iToff").addClass("iTon");clickEnabled=true;i.onSlide.call(this);i.onSlideOn.call(this)});e("input#"+t).attr("checked","checked")}if(r==true){name=e("#"+t).attr("name");o(n.siblings("label[for]"))}}clickEnabled=true;var r={type:"checkbox",keepLabel:true,easing:false,speed:200,onClick:function(){},onClickOn:function(){},onClickOff:function(){},onSlide:function(){},onSlideOn:function(){},onSlideOff:function(){}},i=e.extend({},r,n);this.each(function(){var t=e(this);if(this.tagName=="INPUT"){var n=t.attr("id");s(i.keepLabel,n);t.addClass("iT_checkbox").before('<label class="itoggle" for="'+n+'"><span></span></label>');if(t.attr("checked")){t.prev("label").addClass("iTon")}else{t.prev("label").addClass("iToff")}}else{t.children("input:"+i.type).each(function(){var t=e(this).attr("id");s(i.keepLabel,t);e(this).addClass("iT_checkbox").before('<label class="itoggle" for="'+t+'"><span></span></label>');if(e(this).attr("checked")){e(this).prev("label").addClass("iTon")}else{e(this).prev("label").addClass("iToff")}if(i.type=="radio"){e(this).prev("label").addClass("iT_radio")}})}});e("label.itoggle").click(function(){if(clickEnabled==true){clickEnabled=false;if(e(this).hasClass("iT_radio")){if(e(this).hasClass("iTon")){clickEnabled=true}else{o(e(this),true)}}else{o(e(this))}}return false});e("label.ilabel").click(function(){if(clickEnabled==true){clickEnabled=false;o(e(this).next("label.itoggle"))}return false})}})(jQuery);(function(){function l(e){$("#ftven_formabo_close").click(function(){$("#ftven_formabo").dialog("close");return false});$("#ftven_formabo_form_submit").click(function(){$("#ftven_formabo_form").submit()});$("#ftven_formabo_form_submit_1NL").click(function(){if(""!==$("#ftven_formabo_option").val()){return false}d();return false});$.each(e,function(e,t){$("#"+t.produit_optin_name).iToggle({onClickOn:function(){$("#"+t.produit_optin_name).prop("checked",true)},onClickOff:function(){$("#"+t.produit_optin_name).prop("checked",false)}})});$("#ftven_formabo_form").submit(function(e){if(""!==$("#ftven_formabo_option").val()){return false}if(1===a){d();return false}var t=y();if(false===w()){return false}if(t===true){var n=$("#ftven_formabo_form input:checked").map(function(){return{optin:this.value,action:"A"}}).get();var r={email:o,detailSource:f,json:n};$.ajax({type:"POST",dataType:"json",url:i,data:JSON.stringify(r),success:function(e){$.each(e,function(e,n){b(n,t)})}})}else{c(t,"Email Incorrect")}return false})}function c(e,t){var n=$("#ftven_formabo_message");if(e===false){n.children().remove();n.append("<div class='ftven_error_message'><p>"+t+"</p></div>")}else{n.children().remove();n.append("<div class='ftven_success_message'><p>"+t+"</p></div>")}$("#ftven_formabo_message").show()}function h(e,t,n){var r="expires="+n.toGMTString();document.cookie=e+"="+t+"; "+r+";path=/"}function p(e){var t=e+"=",n=document.cookie.split(";"),r=n.length;for(var i=0;i<r;i++){var s=n[i].trim();if(s.indexOf(t)==0){return s.substring(t.length,s.length)}}return""}function d(){var e={optin:$("#ften_formabo_optin").val(),action:"A"};var t=y();if(t===true){var n={email:o,detailSource:f,json:e};$.ajax({type:"POST",dataType:"json",url:i,data:JSON.stringify(n),success:function(e){$.each(e,function(e,n){b(n,t)})}})}else{c(t,"Email Incorrect")}}function v(){var e=s+n+":"+r;$.ajax({async:true,cache:true,jsonpCallback:"callbackJsonp",contentType:"application/json",dataType:"jsonp",type:"GET",url:e,success:function(e){var t,n,r;var i=Object.keys(e);a=i.length;var s='<div id="ftven_formabo_header">'+'<div id="ftven_formabo_title"><h1>S\'abonner à la newsletter</h1></div>'+'<div id="ftven_formabo_logo"><h2 class="ftven_alt">Culturebox</h2><a href="#" id="ftven_formabo_close"></a></div>'+"</div>";var o='<div id="ftven_formabo_footer">'+'<div id="ftven_formabo_message" class="ftven_success_message"><p>Inscription réussie</p></div>'+"</div>";if(2<=a){var u=e[i[0]];var f=e[i[1]];n='<div id="ftven_formabo_content">'+'<div id="leftNewsletter">'+'<p class="title">'+u.produit_name+"</p>"+'<img src="'+u.produit_picture+'"  class="ftven_formabo_nl_preview">'+'<p class="desciption">'+u.produit_description+"</p>"+"</div>"+'<div id="rightNewsletter">'+'<p class="title">'+f.produit_name+'</p><img src="'+f.produit_picture+'" class="ftven_formabo_nl_preview">'+'<p class="desciption">'+f.produit_description+"</p>"+"</div>"+'<form id="ftven_formabo_form">'+'<div id="itoggle">'+'<div class="titre_bloc_left"><label class="label_detail">Abonnez vous à la newsletter '+u.produit_name+" </label></div>"+'<div class="titre_bloc_right"><input type="checkbox" id="'+u.produit_optin_name+'" value="'+u.produit_optin_name+'" checked="checked"></div>'+'<div class="titre_bloc_left"><label class="label_detail">Abonnez vous à la newsletter '+f.produit_name+"</label></div>"+'<div class="titre_bloc_right"><input type="checkbox" id="'+f.produit_optin_name+'" value="'+f.produit_optin_name+'" checked="checked"></div>'+"</div>"+'<div class="ftven_formabo_email_bloc_submit2NL">'+'<div class="ftven_formabo_form_email_bloc">'+'<div class="titre_bloc_left"><input type="text" id="ftven_formabo_form_email" class="ftven_formabo_form_email_2NL" placeholder="Votre adresse email"/></div>'+'<div class="titre_bloc_right"><a href="#" id="ftven_formabo_form_submit" class="ftven_formabo_form_submit_link">S\'abonnner</a></div>'+"</div>"+'<input type="text" id="ftven_formabo_option" />'+"</div>"+"</form>"+"</div>";var c=680;var h=800}else if(1==a){var u=e[i[0]];n='<div id="ftven_formabo_content_1NL">'+'<div class="ftven_formabo_picture">'+'<img src="'+u.produit_picture+'"  />'+"</div>"+'<div class="ftven_formabo_subscription">'+'<h3 class="ftven_formabo_product_name">'+u.produit_name+"</h3>"+'<div class="ftven_formabo_product_descritpion"><p>'+u.produit_description+"</p></div>"+'<input type="hidden" id="ften_formabo_optin" value="'+u.produit_optin_name+'"/>'+'<input type="text" id="ftven_formabo_option" />'+'<div class="ftven_formabo_email_bloc_submit1NL">'+'<form id="ftven_formabo_form">'+'<div class="ftven_formabo_mail_block">'+'<input type="text" id="ftven_formabo_form_email" class="ftven_formabo_form_email" placeholder="Votre adresse email"/>'+"</div>"+'<div class="ftven_formabo_mail_button">'+'<a href="#" id="ftven_formabo_form_submit_1NL" class="ftven_formabo_form_submit_link">S\'abonnner</a>'+"</div>"+"</form>"+"</div>"+"</div>"+"</div>";var c=800;var h=700}r='<div id="ftven_formabo">'+s+n+o+"</div>";$("body").prepend(r);m(c,h);l(e);$("#ftven_formabo_message").hide()}})}function m(e,t){$("#ftven_formabo").dialog({autoOpen:true,modal:true,draggable:false,resizable:false,closeOnEscape:true,width:e,height:t,show:{effect:"blind",duration:1e3}})}function g(){var n=6==t?6:5;var r=new Date;r.setDate(e.getDate()+n);r.setHours(23,59,59);return r}function y(){o=$("#ftven_formabo_form_email").val();var e=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;return e.test(o)}function b(e,t){if(e.statut=="OK"){u=true;c(t,"Inscription réussie");if(1===a){$("#ftven_formabo_form_submit_1NL").unbind("click");$("#ftven_formabo_form_submit_1NL").css("opacity","0.4")}else{$("#ftven_formabo_form_submit").unbind("click");$("#ftven_formabo_form_submit").css("opacity","0.4")}}else{if(false===u){c(false,"Email déjà existant")}}}function w(){if(0===$("#ftven_formabo_form").find('input[checked="checked"]').length){c(false,"Vous devez sélectionner au moins 1 abonnement");return false}else{return true}}var e=new Date;var t=e.getDay();var n=$("meta[name=archimade_idsite]").attr("content");var r=$("meta[name=archimade_token]").attr("content");var i="http://api.lereferentiel.francetv.fr/users/formulaire-abonnement-newsletter/neolane/subscription";var s="http://api.lereferentiel.francetv.fr/pages/formulaire-abonnement-newsletter/configuration/";var o;var u=false;var a;var f;$(document).ready(function(){if(1!=p("ftven-nl-"+n+"_"+r)&&(6===t||0===t)){f="popin,idSite="+n+",token="+r;v();var e=g();h("ftven-nl-"+n+"_"+r,1,e)}})})()