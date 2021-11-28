import os
import json
from utils.logger import logger

class OpMiddleware:
  CONFIG_PATH = os.path.join(os.path.dirname(__file__), '../conf/opSpec.json')
  DEFAULT_CONFIG = {
      'default': {
        'name': '',
        'unit': '',
        'processor': '',
        'sensor_name': '',
        'calibration_offset': -1,
        'calibration_value': -1
      }
    }

  def __init__(self):
    try:
      with open(self.CONFIG_PATH) as config_file:
        self.config = json.load(config_file)
    except Exception as e:
      logger.log(logger.LOG_LEVEL['ERROR'], str(e))
      self.config = self.DEFAULT_CONFIG

  def process(self, op='', value_raw=-1):
    meta = self.DEFAULT_CONFIG['default']
    processor_name = 'plain'
    if (op and op in self.config):
      meta = self.config[op]
      if (self.config[op]['processor']):
        processor_name = self.config[op]['processor']
    processor = getattr(self, f"processor_{processor_name}", self.processor_plain)
    value_processed = round(processor(value_raw, meta['calibration_offset'], meta['calibration_value']), 3)
    return {
      'tags': {
        'name': meta['name'] or '',
        'unit': meta['unit'] or '',
        'processor': processor_name,
        'sensor_name': meta['sensor_name'] or ''
      },
      'fields': {
        'value_raw': value_raw,
        'value_processed': value_processed
      }
    }
  
  def processor_plain(self, value_raw=0, calibration_offset=0, calibration_value=0):
    return (value_raw - calibration_value) + calibration_offset
  
  def processor_ph(self, value_raw=0, calibration_offset=7, calibration_value=0):
    return ((value_raw - calibration_value) / -59.2) + calibration_offset

  def processor_galvanicDo(self, value_raw=0, calibration_offset=-1, calibration_value=0):
    return value_raw * calibration_value

  def processor_mvToCt10aPerV(self, value_raw=0, *_):
    return (value_raw / 1000) * 10

  def processor_mvToCt15aPerV(self, value_raw=0, *_):
    return (value_raw / 1000) * 15

  def processor_winSpeed(self, value_raw=0, *_):
    return value_raw * 0.34

  def processor_winDirection(self, value_raw=0, *_):
    return value_raw

  def processor_rainfall(self, value_raw=0, *_):
    return value_raw * 0.33

  def processor_flowRateYfdn50(self, value_raw=0, *_):
    return value_raw * 5

  def processor_feedAmountCmToPercentage(self, value_raw=0, *_):
    return (45 - value_raw) * 20 / 9

opMiddleware = OpMiddleware()
