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

const {StringProperty, FunctionRoleProperty, ApplicationAuthorizationProperty,
       Configuration} = require("@celastrina/core");
const {IssuerProperty, JwtConfiguration,
       JwtJSONHTTPFunction, CookieSessionResolver, SecureCookieSessionResolverProperty} = require("@celastrina/http");

const config = new Configuration(new StringProperty("ExampleJwtSecureRoleJSONHTTPFunction_Name"));

const jwt = new JwtConfiguration([new IssuerProperty("ExampleJwtSecureRoleJSONHTTPFunction_Issuer")]);

config.addFunctionRole(new FunctionRoleProperty("ExampleJwtSecureRoleJSONHTTPFunction_Role"))
    .addApplicationAuthorization(new ApplicationAuthorizationProperty("ExampleJwtSecureRoleJSONHTTPFunction_AppAuth"))
    .setValue(JwtConfiguration.CELASTRINAJS_CONFIG_JWT, jwt)
    .setValue(CookieSessionResolver.CELASTRINA_CONFIG_HTTP_SESSION_RESOLVER,
              new SecureCookieSessionResolverProperty("ExampleJwtSecureSessionJSONHTTPFunction_Resolver"));

class ExampleJwtSecureRoleJSONHTTPFunction extends JwtJSONHTTPFunction {
    async initialize(context) {
        return new Promise((resolve, reject) => {
            // Do some initialization stuff
            resolve();
        });
    }

    async load(context) {
        return new Promise((resolve, reject) => {
            // Load some objects from your data store
            resolve();
        });
    }

    async _get(context) {
        return new Promise(async (resolve, reject) => {
            context.send({message: "_get invoked."});
            resolve();
        });
    }

    async _post(context) {
        return new Promise((resolve, reject) => {
            context.send({message: "_post invoked."});
            resolve();
        });
    }

    async save(context) {
        return new Promise((resolve, reject) => {
            // Save some objects to your data store
            resolve();
        });
    }

    async terminate(context) {
        return new Promise((resolve, reject) => {
            // Do your cleanup.
            resolve();
        });
    }
}

module.exports = new ExampleJwtSecureRoleJSONHTTPFunction(config);
