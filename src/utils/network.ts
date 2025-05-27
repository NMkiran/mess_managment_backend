import os from 'os';

export function getLocalIPv4Address() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (let i = 0; i < iface.length; i++) {
      const { family, address } = iface[i];
      if (family === 'IPv4' && !address.includes('127.0.0.1')) {
        return address;
      }
    }
  }
  return 'No IPv4 address found';
}