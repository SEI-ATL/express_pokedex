var db = require('./models');

db.favorite.destroy({
    where: {
        name: 'Mr. Mime'
    }
}).then((res) => {
    console.log(res);
})