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
    print("Error while decoding as json:", msg)

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

mqttClient.subscribeForever(parseMsgAndWriteToDb)
