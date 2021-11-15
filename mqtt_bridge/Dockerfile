FROM python:3.8

RUN pip install setuptools influxdb-client paho-mqtt

WORKDIR /
COPY utils ./utils
COPY influx_bridge.py .

CMD [ "python", "/influx_bridge.py" ]
