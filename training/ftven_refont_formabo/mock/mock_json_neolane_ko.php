<?php
$data = '[{"action":"A", "optin": "ftvOptPrgIntSerFic", "statut": "EXISTE_DEJA"}]';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo $data;

?>