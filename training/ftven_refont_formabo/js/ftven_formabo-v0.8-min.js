!function(e){"use strict";function o(){e("#ftven_formabo_form_email").blur(function(){""===this.value&&(this.value="Saisissez votre adresse email")}).focus(function(){"Saisissez votre adresse email"===this.value&&(this.value="")}),e("#ftven_formabo_close").click(function(){return e("#ftven_formabo").trigger("closeModal"),!1}),e("#ftven_formabo_form_submit").click(function(){return e("#ftven_formabo_form").submit(),!1}),e("#ftven_formabo_form_email").keypress(function(o){this.value&&this.value.indexOf("Saisissez votre adresse email")>=0&&(this.value=this.value.replace("Saisissez votre adresse email","")),13===o.which&&e("#ftven_formabo_form_submit").click()}),e("#ftven_formabo_form").submit(function(){if(""===e("#ftven_formabo_option").val())return!1;var o=u();if(!1===o)return n(o,"Adresse email incorrecte"),!1;if(1===g)return r(),!1;if(!1===b())return!1;if(o===!0){var t=e("#ftven_formabo_form input:checked").map(function(){return{optin:this.value,action:"A"}}).get(),i={email:h,detailSource:k,json:t};e.ajax({type:"POST",dataType:"json",url:P,data:JSON.stringify(i),success:function(n){e.each(n,function(e,n){p(n,o)})}})}return!1})}function n(o,n){var t=e("#ftven_formabo_message");o===!1?(t.children().remove(),t.append("<div class='ftven_error_message'><p>"+n+"</p></div>"),e("#ftven_formabo_form_email").addClass("ftven_formabo_form_email_error")):(t.children().remove(),t.append("<div class='ftven_success_message'><p>"+n+"</p></div>"),e("#ftven_formabo_form_email").removeClass("ftven_formabo_form_email_error")),e("#ftven_formabo_message").show()}function t(e,o,n){var t="expires="+n.toGMTString();document.cookie=e+"="+o+"; "+t+";path=/"}function i(e){for(var o=e+"=",n=document.cookie.split(";"),t=n.length,i=0;t>i;i++){var r=n[i].trim();if(0===r.indexOf(o))return r.substring(o.length,r.length)}return""}function r(){var o={optin:e("#ftven_formabo_option").val(),action:"A"},t=u();if(t===!0){var i={email:h,detailSource:k,json:o};e.ajax({type:"POST",dataType:"json",url:P,data:JSON.stringify(i),success:function(o){e.each(o,function(e,o){p(o,t)})},error:function(e,o,n){console.log(e.status),console.log(n),console.log(JSON.stringify(i))}})}else n(t,"Adresse email incorrecte")}function a(e,o){return'<div class="ftven_formabo_content_2NL"><div class="ftven_formabo_picture_2NL"><img src="'+e.produit_picture+'"  /></div><div class="ftven_formabo_subscription "><div class="ftven_formabo_product_descritpion_2NL"><p class="ftven_formabo_product_descritpion_block">'+e.produit_description+'</p></div><div class="ftven_formabo_subscription_choice">'+s(o,e.produit_optin_name)+"</div></div></div>"}function s(e,o){return'<div class="ftven_formabo_checkbox"><input id="ftven_formabo_option'+e+'_cb" type="checkbox" value="'+o+'" class="ftven_formabo_checkbox"><label for="ftven_formabo_option'+e+'_cb"><span  class="ftven_formabo_option" id="ftven_formabo_option'+e+'"><span></span></span></label><div id="ftven_formabo_option'+e+'_cb_choose" class="ftven_formabo_option_choose_txt"><p >Je souhaite m\'abonner à la newsletter</p></div></div>'}function f(){return'<div class="ftven_formabo_mail_block"><input type="text" id="ftven_formabo_form_email"  value="Saisissez votre adresse email"/></div><div class="ftven_formabo_mail_button"><a href="#" id="ftven_formabo_form_submit" class="ftven_formabo_form_submit_link">S\'abonner</a></div>'}function _(e){var o=Object.keys(e);g=o.length,y=e[o[0]],N=y.produit_optin_name,O="auto",A=650,1!==g&&(S=e[o[1]],O="auto",A=735,N+="_"+S.produit_optin_name)}function c(n){var r=T+x+":"+w;e.ajax({async:!0,cache:!0,jsonpCallback:"callbackJsonpFormAbo",contentType:"application/json",dataType:"jsonp",type:"GET",url:r,success:function(a){"undefined"!=typeof a.message&&"unavailable configuration for this site"===a.message?(console.log("[POPIN NL] - no popin bad configuration"),console.log("[POPIN NL] - DEBUG :"+JSON.stringify(a)),console.log("[POPIN NL] - URL TO CHECK DATA :"+r)):(_(a),n===!0?(k="popin,idSite="+x+",token="+w,v(),o(),e("#ftven_formabo_message").hide(),e("#ftven_formabo_option1_cb_ok").hide(),e("#ftven_formabo_option2_cb_ok").hide()):1==i("ftven-nl-"+x+"_"+N)||6!==j&&0!==j||1==i("ftven-nl-"+x+"_"+N+"_done")||(k="popin,idSite="+x+",token="+w,v(),o(),e("#ftven_formabo_message").hide(),e("#ftven_formabo_option1_cb_ok").hide(),e("#ftven_formabo_option2_cb_ok").hide(),t("ftven-nl-"+x+"_"+N,1,m())))},error:function(e,o,n){console.log(e.status),console.log(n)}})}function v(){var o,n,t="",i='<div id="ftven_formabo_footer"><div id="ftven_formabo_message" class="ftven_success_message"><p>Inscription réussie</p></div><div id="ftven_formabo_collecte_info" class="ftven_collecte_info">'+"<p>FRANCE TELEVISIONS, en sa qualité de responsable du traitement, collecte vos données à caractère personnel à des fins de gestion de votre compte utilisateur. Ces données sont nécessaires pour pouvoir vous offrir un espace personnalisé. Conformément à la loi Informatique et libertés du 6 janvier 1978, vous bénéficiez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez également vous opposer, pour un motif légitime, à l'utilisation de vos données. Vous seul pouvez exercer ces droits sur vos propres données en écrivant à France Télévisions - Editions Numériques Service Inscription Internet - 7 Esplanade Henri de France 75015 Paris et en joignant une photocopie de votre pièce d'identité</p></div></div>";if(g>=2)t=d("francetv"),o='<div id="ftven_formabo_main_content"><form id="ftven_formabo_form">'+a(y,1)+'<hr class="ftven_formabo_h_separator">'+a(S,2)+'<div class="ftven_formabo_email_bloc_submit2NL">'+f()+"</div></form></div>";else if(1==g){t=d(y.produit_logo);var r="1"==y.produit_print_title?'<h3 class="ftven_formabo_product_name">'+y.produit_name+"</h3>":"",s=""!=y.produit_name&&"1"==y.produit_print_title?"_with_title":"";o='<div class="ftven_formabo_content_1NL"><div class="ftven_formabo_picture"><img src="'+y.produit_picture+'"  /></div><div class="ftven_formabo_subscription'+s+'">'+r+'<div class="ftven_formabo_product_descritpion'+s+'"><p class="ftven_formabo_product_descritpion_block">'+y.produit_description+'</p></div><div class="ftven_formabo_email_bloc_submit1NL"><form id="ftven_formabo_form"><input type="hidden" id="ftven_formabo_option" value="'+y.produit_optin_name+'"/>'+f()+"</form></div></div></div>"}n='<div id="ftven_formabo">'+t+o+i+"</div>",e("body").prepend(n),l(O,A)}function d(e){return'<div id="ftven_formabo_header"><div id="ftven_formabo_title"><h1>S\'abonner à la newsletter</h1></div><div class="ftven_main_logo"><div class="ftven_formabo_separator"></div><div id="ftven_formabo_'+e+'"></div><div class="ftven_formabo_v_separator"></div><div class="ftven_formabo_close" id="ftven_formabo_close"></div></div></div>'}function l(){e("#ftven_formabo").easyModal({top:31,autoOpen:!0,overlay:.3})}function m(){var e=6==j?6:5,o=new Date;return o.setDate(z.getDate()+e),o.setHours(23,59,59),o}function u(){h=e("#ftven_formabo_form_email").val();var o=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;return o.test(h)}function p(o,i){if("OK"==o.statut){E=!0,n(i,"Inscription réussie"),e("#ftven_formabo_form_submit").addClass("ftven_formabo_form_submit_finish").click(function(){return!1}),e("#ftven_formabo_form_email").addClass("ftven_formabo_form_email_finish").prop("disabled",!0);var r=new Date;r.setDate(z.getDate()+365),t("ftven-nl-"+x+"_"+N+"_done",1,r)}else!1===E&&n(!1,"Email déjà existant")}function b(){return 0===e("#ftven_formabo_form input:checked").length?(n(!1,"Vous devez sélectionner au moins 1 abonnement"),!1):!0}var h,g,k,y,S,N,O,A,z=new Date,j=z.getDay(),x=e("meta[name=archimade_idsite]").attr("content"),w=e("meta[name=archimade_token]").attr("content"),P="http://api.lereferentiel.francetv.fr/users/formulaire-abonnement-newsletter/neolane/subscription",T="http://api.lereferentiel.francetv.fr/pages/formulaire-abonnement-newsletter/configuration/",E=!1;e(document).ready(function(){if("undefined"==typeof x)return!1;"undefined"==typeof w&&(w="default");var o=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);if(!1===o&&c(),e.urlParam=function(e){var o=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.href);return null==o?null:o[1]||0},"1"==e.urlParam("popin")){console.log("----- The parameter debug popin is active -----");var n=!0;c(n)}})}(jQuery);