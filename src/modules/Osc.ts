import osc from 'osc/dist/osc-browser';

import oscConfig from '../../osc.config.json';

const Osc = () => {
  const wsPort = new osc.WebSocketPort({
    url: oscConfig.serverUrl,
    metadata: true,
  });

  wsPort.open();

  wsPort.on('message', (msg: any) => {
    if (msg.args[1]) {
      const trackedDevice = {
        id: msg.args[0].value,
        identify: msg.args[1].value,
        x: msg.args[2].value,
        y: msg.args[3].value,
        rot: msg.args[4].value,
        intens: msg.args[5].value,
      };
      if (msg.address === '/tracker/add') {
        wsPort.emit('addDevice', trackedDevice);
      } else if (msg.address === '/tracker/update') {
        wsPort.emit('updateDevice', trackedDevice);
      } else if (msg.address === '/tracker/remove') {
        wsPort.emit('removeDevice', trackedDevice);
      }
    }
  });

  return { wsPort };
};

export default Osc;
