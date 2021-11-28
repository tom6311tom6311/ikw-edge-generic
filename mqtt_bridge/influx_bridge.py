import time
import json
from utils.logger import logger
from utils.InfluxClient import influxClient
from utils.MqttClient import mqttClient
from utils.OpMiddleware import opMiddleware

def parseMsgAndWriteToDb(topic='', msg=''):
  logger.log('INFO', f"[influx_bridge] Received a message from topic `{topic}`: {msg}")
  device_id = topic.split('/')[-1]
  record = None
  try:
    record = json.loads(msg)
  except:
    logger.log('ERROR', "[influx_bridge] Error while decoding as json:", msg)

  if (not device_id or not (record and record['raw_data'])):
    return
  for op in record['raw_data']:
    opData = opMiddleware.process(op, record['raw_data'][op])
    influxClient.writeDataPoint(
      f"{device_id}_{op}",
      {
        **opData['tags'],
        'chip_id': record['chip_id'],
        'device_id': device_id,
        'op': op,
      },
      opData['fields']
    )

logger.log('INFO', "[influx_bridge] Start the bridge")
connSuccess = False
while (not connSuccess):
  try:
    mqttClient.subscribeForever(parseMsgAndWriteToDb)
    connSuccess = True
  except Exception as e:
    logger.log('ERROR', f"[influx_bridge] Error occurred: {e}")
    logger.log('INFO', "[influx_bridge] Retry subscription in 3 sec...")
    time.sleep(3)
