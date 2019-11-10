let data = undefined;

module.exports = {

    init: function () {
        if (data === undefined) {

            data = new Map();
            var parse = require('csv-parse');

            require("fs").createReadStream("./lib/data.csv")
                .pipe(parse({delimiter: ';'}))
                .on('data', function (csvrow) {
                    data = data || new Map();
                    data.set(csvrow[1], {
                        "id": csvrow[0],
                        "question": csvrow[1],
                        "type": csvrow[2],
                        "answer": csvrow[3]
                    });
                })
                .on('end', function () {

                });
        } else {
        }
    },

    hears: function (question) {
        if (data === undefined) {
            this.init();
        }
        data = data || new Map();

        var result = data.get(question);
        return result !== undefined ? result.answer : 'Извините пожалуйста, я видимо что-то не так понял. Пожалуйста повторите Ваш вопрос.';
    }
}
