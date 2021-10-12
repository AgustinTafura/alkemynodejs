# Development Challenge for ALKEMY - Node.js

Challenge based on [Improve-in
](https://drive.google.com/file/d/1XCUYgTFaE9uBNI-FqKDWIa4RCztooz_X/view ) directives.

## Requirements

Steps before initialization


- Clone repository
```bash
git clone https://github.com/AgustinTafura/alkemynodejs.git
```

- Install dependencies
```bash
npm install
```

- Set environment variables (.env file)

- Install Sequelize [CLI](https://www.npmjs.com/package/sequelize-cli)
```bash
npm install --save-dev sequelize-cli
```

- Create DB (MySQL)

```bash
# set DB config (config/config.json )

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all (OPTIONAL)
```

## Run

```bash
npm start
# or npm run dev 
# see package.json for all scripts 
```

## API 

[API Documentation](https://documenter.getpostman.com/view/17880007/UV5TFKNX)


