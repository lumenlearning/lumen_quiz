"use strict";
module.exports  = new class Index{
    constructor(){

        this.options = {
            method: ['GET'],
            path: "/{p*}",
            handler: {catchall:{}}
        }

    }

    getHandler(){
        const fs = require('fs');

        var register = function(Server, options, next){

            var handler = function(route, options){

                return function (req, res){
                    let dir = __dirname + '/../../assets/index.html';

                    let index = fs.readFileSync(dir);

                    res(index)
                        .type('text/html')
                        .header('X-Custom', 'some-value');

                }

            };

            Server.handler("catchall", handler);
            next();
        };

        register.attributes = {
            name: "handler-catchall",
            version: "1.0.0"
        };

        return register;

    } //handler

    getOptions(){

        return this.options;
    }

};