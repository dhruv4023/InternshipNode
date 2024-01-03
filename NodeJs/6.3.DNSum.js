const dns = require('dns');

// DNS lookup
dns.lookup('www.google.com', (err, address, family) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`IP Address for www.google.com: ${address}`);
});

// DNS resolve (supports multiple IP addresses)
dns.resolve('www.google.com', 'A', (err, addresses) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`IP Addresses for www.google.com: ${JSON.stringify(addresses)}`);
});

// Reverse DNS lookup
dns.reverse('8.8.8.8', (err, hostnames) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Hostnames for 8.8.8.8: ${JSON.stringify(hostnames)}`);
});

// DNS resolve4 (IPv4 addresses)
dns.resolve4('www.google.com', (err, addresses) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`IPv4 Addresses for www.google.com: ${JSON.stringify(addresses)}`);
});

// DNS resolve6 (IPv6 addresses)
dns.resolve6('www.google.com', (err, addresses) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`IPv6 Addresses for www.google.com: ${JSON.stringify(addresses)}`);
});
