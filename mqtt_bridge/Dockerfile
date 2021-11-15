FROM python

RUN pip3 install --no-cache --upgrade pip setuptools influxdb-client paho-mqtt

WORKDIR /
COPY utils ./utils
COPY influx_bridge.py .

CMD [ "python", "/influx_bridge.py" ]
