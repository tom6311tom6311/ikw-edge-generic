import os
from datetime import datetime
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

INFLUX_ORG=os.getenv('INFLUX_ORG')
INFLUX_TOKEN=os.getenv('INFLUX_TOKEN')
INFLUX_BUCKET=os.getenv('INFLUX_BUCKET')

class InfluxClient:
  def __init__(self):
    dbClient = InfluxDBClient(
      url=f"http://influxdb:8086",
      token=INFLUX_TOKEN,
      org=INFLUX_ORG
    )
    self.writer = dbClient.write_api(write_options=SYNCHRONOUS)
  def writeDataPoint(self, measurement, tags, fields):
    point = Point(measurement)
    for tagKey in tags:
      point = point.tag(tagKey, tags[tagKey])
    for fieldKey in fields:
      point = point.field(fieldKey, fields[fieldKey])
    point = point.time(datetime.now(), WritePrecision.NS)
    self.writer.write(INFLUX_BUCKET, INFLUX_ORG, point)

influxClient = InfluxClient()
