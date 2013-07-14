var DimensionApi = function(apiUrl) {

    this.apiUrl = apiUrl;

    this.checkPassword = function (login, password, callback) {
        $.soap({
            url: this.apiUrl,
            method: 'checkAccountPassword',
            appendMethodToURL: false,
            params: {
                login: login,
                password: password,
            },
            success: function(SOAPResponse) {
                var valid_credentials = SOAPResponse.toJSON().Body.checkAccountPasswordResponse.return.text == 'true';

                callback(valid_credentials);
            },
            error: function(SOAPResponse) {
                alert(JSON.stringify(SOAPResponse.toJSON()));
            }
        });
    };

    this.loadMarks = function (login, password, callback) {
        $.soap({
            url: this.apiUrl,
            method: 'getStudentMarks',
            appendMethodToURL: false,
            params: {
                login: login,
                password: password,
            },
            success: function(SOAPResponse) {
                var return_value = [];

                $.each(SOAPResponse.toJSON().Body.getStudentMarksResponse.return.item, function(index, year) {

                    var marks_array = [];

                    $.each(year.value.item, function(index, mark) {
                        marks_array.push({
                            unit:        mark.unit.text,
                            description: mark.description.text,
                            value:       mark.note.text,
                        });
                    });

                    return_value.push({ name: year.key.text, marks: marks_array});
                });
                callback(return_value);
            },
            error: function(SOAPResponse) {
                alert(JSON.stringify(SOAPResponse.toJSON()));
            }
        });
    
    }

}