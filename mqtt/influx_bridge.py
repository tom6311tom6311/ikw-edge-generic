# import paho.mqtt.client as mqtt
import os
import time
from datetime import datetime
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

INFLUX_ORG=os.getenv('INFLUX_ORG')
INFLUX_TOKEN=os.getenv('INFLUX_TOKEN')
INFLUX_BUCKET=os.getenv('INFLUX_BUCKET')


influx_client = InfluxDBClient(
  url=f"http://influxdb:8086",
  token=INFLUX_TOKEN,
  org=INFLUX_ORG
)
write_api = influx_client.write_api(write_options=SYNCHRONOUS)

while True:
  point = Point("61_101") \
      .tag("device_id", "61") \
      .tag("op", "101") \
      .field("chip_id", "IKW_IR1_001") \
      .field("value", 40) \
      .time(datetime.utcnow(), WritePrecision.NS)
  write_api.write(INFLUX_BUCKET, INFLUX_ORG, point)
  time.sleep(3)


# client = mqtt.Client()

# client.on_connect = lambda self, mosq, obj, rc: self.subscribe("/pot")
# client.on_message = lambda client, userdata, msg: persists(msg)

# client.connect("docker", 1883, 60)

# client.loop_forever()