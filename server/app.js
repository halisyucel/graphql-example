require('dotenv').config()
require('./helpers/db')();
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const app = express();
const port = 3000;

app.use(cors());
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
});