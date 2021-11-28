import os
import shutil
from datetime import datetime

class Logger:
  LOG_PATH = os.path.join(os.path.dirname(__file__), '../log/mqtt_bridge.log')
  ARCHIVED_LOG_PATH = os.path.join(os.path.dirname(__file__), '../log/mqtt_bridge_archived.log')
  LOG_LEVEL = {
    'INFO': 'INFO',
    'WARN': 'WARN',
    'ERROR': 'ERROR'
  }

  def __init__(self):
    self.create_log()

  def create_log(self):
    # move log to archived path if exists
    if os.path.isfile(self.LOG_PATH):
      shutil.move(self.LOG_PATH, self.ARCHIVED_LOG_PATH)
    # create empty log file
    with open(self.LOG_PATH, 'w') as log_file:
      log_file.close()

  def log(self, level='INFO', message=''):
    time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(self.LOG_PATH, 'a') as log_file:
      lv = self.LOG_LEVEL[level.upper()] or self.LOG_LEVEL['INFO']
      log_file.write(f'{time} [{lv}] {message}\n')
      log_file.close()

logger = Logger()
