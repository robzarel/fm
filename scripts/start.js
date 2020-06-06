const spawn = require('child_process').spawn;

spawn('node', ['./scripts/start-back'], { stdio: 'inherit' });
spawn('node', ['./scripts/start-front'], { stdio: 'inherit' });
