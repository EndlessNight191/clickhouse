const { Kafka } = require('kafkajs');
const { v4 } = require('uuid');

// total messages
const totalCount = 2_500_000;
// total messages


// Создаем экземпляр клиента Kafka
const kafka = new Kafka({
  clientId: '1',
  brokers: ['localhost:9092']
});

// Создаем экземпляр продюсера
const producer = kafka.producer();

// Функция для отправки сообщения в топик
const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic: topic,
      messages: [
        { value: message }
      ]
    });
    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Генерация случайной строки
const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Генерация случайной даты
const randomDate = () => {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  return formatDate(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
};

// Генерация случайного числа
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерация случайного булевого значения
const randomBoolean = () => {
  return Math.random() < 0.5;
};

function getRandomNumber() {
  // Генерируем случайное число от 0 до 100000
  const randomNumber = Math.random() * 100000;
  // Округляем число до двух знаков после запятой
  const roundedNumber = Math.round(randomNumber * 100) / 100;
  return roundedNumber;
}

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];

// Функция для выбора случайной валюты из списка
const randomCurrency = () => {
  const index = Math.floor(Math.random() * currencies.length);
  return currencies[index];
};

// Генерация данных сообщения
const generateMessageData = () => {
  return {
    uuid: v4(),
    createdAt: randomDate(),
    dateAction: randomDate(),
    ban: randomBoolean() ? 1 : 0,
    reg: randomBoolean() ? 1 : 0,
    dateReg: randomBoolean() ? randomDate() : null,
    idClient: randomNumber(10000, 99999),
    email: randomBoolean() ? `${randomString(8)}@example.com` : null,
    clickId: randomString(8),
    utmSource: randomString(8),
    utmMedium: randomString(8),
    utmCampaign: randomString(8),
    wd: randomBoolean() ? 1 : 0,
    wdSum: getRandomNumber(),
    dep: randomBoolean() ? 1 : 0,
    depSum: getRandomNumber(),
    ftdSum: getRandomNumber() * 4,
    dateFtd: randomBoolean() ? randomDate() : null,
    sDepSum: getRandomNumber() * 5,
    dateSDep: randomBoolean() ? randomDate() : null,
    tDepSum: getRandomNumber() * 11,
    dateTDep: randomBoolean() ? randomDate() : null,
    idOperation: randomString(8),
    pSystemLag: randomNumber(1, 100),
    pSystemId: randomNumber(1, 100),
    dateFirstSpin: randomBoolean() ? randomDate() : null,
    dateLastSpin: randomBoolean() ? randomDate() : null,
    newGamer: randomBoolean() ? 1 : 0,
    gamer: randomBoolean() ? 1 : 0,
    gameUuid: randomString(8),
    bets: getRandomNumber(),
    wins: getRandomNumber(),
    refunds: getRandomNumber(),
    rollbacks: getRandomNumber(),
    ggr: getRandomNumber(),
    idTicket: randomString(8),
    countOfSpins: randomNumber(500, 1500),
    missInGame: randomNumber(10, 50),
    currency: randomCurrency(),
    currencyRate: randomNumber(1, 100)
  };
};

// Подключаемся к Kafka и отправляем сообщения
const run = async () => {
  await producer.connect();
  for (let i = 0; i < totalCount; i++) {
    const messageData = generateMessageData();
    await sendMessage('analytics', JSON.stringify(messageData));
    console.log(`Sent message ${i + 1}`);
  }
  await producer.disconnect();
};

run().catch(console.error);