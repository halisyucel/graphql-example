const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const port = 3000;

app.use('/graphql', graphqlHTTP({

}));

app.get('/', (req, res) => {
	res.send('Hello World!')
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
});