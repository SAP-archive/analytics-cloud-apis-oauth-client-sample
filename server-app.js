const express = require('express');
const path = require('path');
const oauth = require('simple-oauth2');
const favicon = require('express-favicon');
const session = require('express-session');
const to = require('connect-timeout');

const app = express();

app.use(express.static(__dirname + '/public')); //serve contents of the public folder
app.use(favicon(__dirname + '/public/icon.ico'));
app.use(to(300000)); //times out after 10 min

//load the properties file
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./server-config/config.properties');

const credentials = {
    client: {
        id: properties.get('clientId'),
        secret: properties.get('secret')
    },
    auth: {
        tokenHost: properties.get('tokenHost'),
        tokenPath: '/oauth2/api/v1/token',
        authorizeHost: properties.get('authorizeHost'),
        authorizePath: 'oauth2/api/v1/authorize'
    }
};

const oauth2 = oauth.create(credentials);

//log each incoming request
app.use(function (req, res, next) {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(session({
    secret: 'raysources-secret-19890913007',
    resave: true,
    saveUninitialized: true
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.use('/authorize', function (req, res) {
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: properties.get('callbackUrl')
    });
    res.redirect(authorizationUri);
});

app.use('/callback', function (req, res) {
    const code = req.query.code;
    const session = req.session;
    const tokenConfig = {
        code: code,
        redirect_uri: properties.get('callbackUrl')
    };

    oauth2.authorizationCode.getToken(tokenConfig)
        .then((result) => {
            const token = oauth2.accessToken.create(result);
            console.log('Access token for this session: ' + token.token.access_token);
            session['tokens'] = token;
            res.redirect('sac_api_demo');
        })
        .catch((error) => {
            console.log('Access Token Error', error.message);
        });
});

app.get('/sac_api_demo', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/api-demo.html'));
});

app.use('/getToken', function (req, res) {
    let tken = req.session['tokens'].token;
    // Check if the token is expired. If expired it is refreshed.
    if (tken.expired) {
        try {
            tken = tken.refresh();
        } catch (error) {
            console.log('Error refreshing access token: ', error.message);
        }
    }
    res.send(JSON.stringify(tken));
});

app.listen(8080);
console.log('server listening on port 8080');

module.exports = app;
