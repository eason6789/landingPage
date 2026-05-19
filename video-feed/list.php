<?php
header('Content-Type: application/json');
header('Cache-Control: public, max-age=300');

$cmd = 'python3 -c "
from qcloud_cos import CosConfig, CosS3Client
import json
c = CosS3Client(CosConfig(Region=\"ap-guangzhou\", SecretId=\"AKIDJbhaGhusb6avDzjT3XqvnSu75oTt41C8\", SecretKey=\"jdN6fGrSs6GDydVCh4GKE2hDYklaEpy1\"))
resp = c.list_objects(Bucket=\"single-az-1251416377\", Prefix=\"video-feed/\", MaxKeys=100)
files = [obj[\"Key\"].replace(\"video-feed/\", \"\") for obj in resp.get(\"Contents\", []) if obj[\"Key\"] != \"video-feed/\"] if \"Contents\" in resp else []
print(json.dumps({\"videos\": files, \"cosBase\": \"https://single-az-1251416377.cos.ap-guangzhou.myqcloud.com/video-feed/\"}))
" 2>/dev/null';
$output = shell_exec($cmd);
echo $output;
