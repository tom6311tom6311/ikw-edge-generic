import paho.mqtt.client as mqtt

class MqttClient:
  def __init__(self):
    self.client = None

  def subscribeForever(self, msgCallback):
    def on_connect(client, userdata, flags, rc):
      print(f"[MqttClient] Connected with result code {rc}")
      client.subscribe("/#")
    def on_message(client, userdata, msg):
      if (not callable(msgCallback)):
        return
      msgCallback(msg.topic, str(msg.payload, 'ascii'))

    self.client = mqtt.Client()
    self.client.on_connect = on_connect
    self.client.on_message = on_message
    self.client.connect("mqtt", 1883, 60)
    self.client.loop_forever()

mqttClient = MqttClient()
