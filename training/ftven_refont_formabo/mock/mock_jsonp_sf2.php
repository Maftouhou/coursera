<?php
$data = 'callbackJsonp ({"1": {"produit_name": "Allo Docteur","produit_optin_name": "ftvOptPrgIntSerFic","produit_picture": "img/alloDocteur.jpg","produit_description": "Allo Docteur....Led imperdiet ."}, "2": {"produit_name": "Vie Pratique","produit_optin_name": "ftvOptPrgIntViePra","produit_picture": "img/viepratique.jpg","produit_description":"Vie Pratique..imperdiet vel..."} })';
//$data = 'callbackJsonp ({"1": {"produit_name": "Allo Docteur","produit_optin_name": "ftvOptPrgIntSerFic","produit_picture": "img/alloDocteur.jpg","produit_description": "Allo Docteur....Led risus nisl, convallis sed imperdiet ."}} )';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo $data;

?>