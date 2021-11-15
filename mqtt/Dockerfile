FROM eclipse-mosquitto

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools influxdb-client paho-mqtt

WORKDIR /
COPY utils ./utils
COPY influx_bridge.py .

CMD [ "python", "/influx_bridge.py" ]
