var faker = require('faker');
const fs = require('fs');

const data = { contacts: [] };

for (let i = 0; i < 10; i++) {
  data.contacts.push({
    id: i,
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
  });
}

// const genData = require('./data.js');
const json = JSON.stringify(data);

fs.writeFileSync('./db.json', json);
