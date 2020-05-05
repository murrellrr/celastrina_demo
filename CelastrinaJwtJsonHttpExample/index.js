/*
 * Copyright (c) 2020, Robert R Murrell.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

const {LOG_LEVEL, StringProperty, BooleanProperty, FunctionRoleProperty, ApplicationAuthorizationProperty,
    Configuration} = require("@celastrina/core");
const {JSONHTTPContext, JSONHTTPFunction, IssuerProperty, HeaderParameterFetch, JwtConfiguration,
       JwtJSONHTTPFunction} = require("@celastrina/http");

const config = new Configuration(new StringProperty("ExampleJwtJSONHTTPFunction_Name"),
                                 new BooleanProperty("ExampleJwtJSONHTTPFunction_Managed"));

const jwt = new JwtConfiguration([new IssuerProperty("ExampleJwtJSONHTTPFunction_Issuer")]);
jwt.setRemoveScheme(true);

config.addFunctionRole(new FunctionRoleProperty("ExampleJwtJSONHTTPFunction_Role"))
      .addApplicationAuthorization(new ApplicationAuthorizationProperty("ExampleJwtJSONHTTPFunction_AppAuth"))
      .addValue(JwtConfiguration.CELASTRINAJS_CONFIG_JWT, jwt);

class ExampleJwtJSONHTTPFunction extends JwtJSONHTTPFunction {

    async _get(context) {
        return new Promise((resolve, reject) => {
            context.send({"message": "_get invoked."});
            resolve();
        });
    }

    async _post(context) {
        return new Promise((resolve, reject) => {
            context.send({"message": "_post invoked."});
            resolve();
        });
    }
}

module.exports = new ExampleJwtJSONHTTPFunction(config);
