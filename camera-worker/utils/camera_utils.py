import requests
import cv2
import numpy as np
from requests.auth import HTTPBasicAuth

class CameraUtils:
  @staticmethod
  def fetch_frame(camera, path=None, timeout=3):
    if camera['type'] == "IP_CAM":
      return CameraUtils.__fetch_img_ip_cam(camera, path, timeout)
    elif camera['type'] == "DVR":
      return CameraUtils.__fetch_img_rtsp(camera, path)
    return None

  @staticmethod
  def __fetch_img_ip_cam(camera, path=None, timeout=3):
    url = "http://{}:{}{}".format(
      camera['host'],
      camera['port'],
      camera['snapshotUrl']
    )
    img_bytes = requests.get(
      url,
      timeout=timeout,
      auth=HTTPBasicAuth(camera['username'], camera['password'])
    ).content
    arr = np.asarray(bytearray(img_bytes), dtype=np.uint8)
    frame = cv2.imdecode(arr, -1)
    if path:
      cv2.imwrite(path, frame)
    return frame

  @staticmethod
  def __fetch_img_rtsp(camera, path):
    url = "rtsp://{}:{}@{}:{}/chID={}&{}".format(
      camera['username'],
      camera['password'],
      camera['host'],
      camera['port'],
      camera['channel'],
      camera['urlParams']
    )
    vcap = cv2.VideoCapture(url)
    _, frame = vcap.read()
    if path:
      cv2.imwrite(path, frame)
    vcap.release()
    return frame
