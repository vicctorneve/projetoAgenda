const moongose = require('mongoose');

const HomeSchema = new moongose.Schema({
   titulo: {type: String, required: true},
   descricao: String
});

const HomeModel = moongose.model('Home', HomeSchema);

class Home {

}

module.exports = Home;
