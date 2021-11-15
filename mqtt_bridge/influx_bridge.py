import time
import json
from utils.InfluxClient import influxClient
from utils.MqttClient import mqttClient

def parseMsgAndWriteToDb(topic='', msg=''):
  print(f"[influx_bridge] Received a message from topic `{topic}`: {msg}")
  print(topic, msg)
  device_id = topic.split('/')[-1]
  record = None
  try:
    record = json.loads(msg)
  except:
    print("[influx_bridge] Error while decoding as json:", msg)

  if (not device_id or not (record and record['raw_data'])):
    return
  for op in record['raw_data']:
    influxClient.writeDataPoint(
      f"{device_id}_{op}",
      {
        'chip_id': record['chip_id']
      },
      {
        'device_id': device_id,
        'op': op,
        'value': record['raw_data'][op]
      }
    )

print("[influx_bridge] Start the bridge")
connSuccess = False
while (not connSuccess):
  try:
    mqttClient.subscribeForever(parseMsgAndWriteToDb)
    connSuccess = True
  except:
    print("[influx_bridge] MQTT broker not ready yet. Retry subscription later...")
    time.sleep(3)
