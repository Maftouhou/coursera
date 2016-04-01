<?php
$data = '[{"action":"A", "optin": "ftvOptPrgIntSerFic", "statut": "OK"}]';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo $data;

?>