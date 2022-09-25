import os
import json
import time
import imutils
import cv2
import numpy as np
from utils.camera_utils import CameraUtils
from pathlib import Path

CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'config/conf.json')
CAMERAS_CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'config/cameras.json')
SNAPSHOT_DIR_PATH = os.path.join(os.path.dirname(__file__), 'snapshots/')

def loadJsonConfig(path):
  config = {}
  with open(path) as configFile:
    config = json.load(configFile)
    configFile.close()
  return config

appConfig = loadJsonConfig(CONFIG_PATH)
camerasConfig = loadJsonConfig(CAMERAS_CONFIG_PATH)

def rotateImage(imgPath, angle):
  image = cv2.imread(imgPath)
  rotatedImage = imutils.rotate_bound(image, angle)
  cv2.imwrite(imgPath, rotatedImage)

def fetchImageFromCamera(cameraConfig, path):
  try:
    if isinstance(CameraUtils.fetch_frame(cameraConfig, path, appConfig['TIMING']['FETCH_TIMEOUT']), np.ndarray):
      return True
  except Exception as e:
    print(f"['ERROR'] {str(e)}")
  return False

while True:
  try:
    Path(SNAPSHOT_DIR_PATH).mkdir(parents=True, exist_ok=True)
    for cameraConfig in camerasConfig:
      cameraId = cameraConfig['cameraId']
      name = cameraConfig['name']
      imgPath = f"{SNAPSHOT_DIR_PATH}camera_{cameraId}.jpg"
      print(f"['INFO'] Fetching Camera ID #{cameraId} ({name})...")
      fetchSucceeded = fetchImageFromCamera(
        cameraConfig,
        imgPath
      )
      if (not fetchSucceeded):
        print(f"['WARN'] Image fetching failed.")
        continue
      print(f"['INFO'] Image fetched: {imgPath}")
      if (cameraConfig['rotate']):
        rotateImage(imgPath, cameraConfig['rotate'])
        print(f"['INFO'] Rotated image by {cameraConfig['rotate']} degree")
  except Exception as e:
    print(f"['ERROR'] {str(e)}")
    continue
  finally:
    time.sleep(appConfig['TIMING']['COMPUTE_INTERVAL'])
