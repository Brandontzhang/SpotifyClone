import { Request, Response } from "express";

import express from 'express';
import dotenv from 'dotenv';
import request from "request";
import cors from 'cors';

const port = 5000

dotenv.config()

const spotify_client_id : string | undefined = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret : string | undefined = process.env.SPOTIFY_CLIENT_SECRET;

let access_token = "";
let refresh_token = "";

const app = express();
app.use(cors());

const generateRandomString = (length : number) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/**
 * Sends request to Spotify Authorization in order to receive token
 */
app.get('/auth/login', (_req : Request, res : Response) => {
    var scope = "streaming \
               user-read-email \
               user-read-private \
               user-modify-playback-state \
               "

    var state = generateRandomString(16);

    var auth_query_parameters = new URLSearchParams();
    auth_query_parameters.append("response_type", "code");
    auth_query_parameters.append("client_id", spotify_client_id ? spotify_client_id : "");
    auth_query_parameters.append("scope", scope);
    auth_query_parameters.append("redirect_uri", "http://localhost:5000/auth/callback");
    auth_query_parameters.append("state", state);

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

/**
 * Callback route which Spotify Authorization will call once it validates the login request. 
 * A token is returned and we redirect back to the main page of the app with the access token saved
 */
app.get('/auth/callback', (req : Request, res : Response) => {
    var code = req.query.code;

    var authOptions = {
        url : 'https://accounts.spotify.com/api/token',
        form : {
            code : code,
            redirect_uri: "http://localhost:5000/auth/callback",
            grant_type : 'authorization_code'
        },
        headers : {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        json : true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            access_token = body.access_token;
            refresh_token = body.refresh_token;
            res.redirect("http://localhost:5173");
        } else {
            // TODO: Error handling on bad login
            res.redirect("http://localhost:5173/");
        }
    });
});

/**
 * The current access token is saved on the server and can be fetched using this endpoint
 */
app.get('/auth/token', (_req : Request, res : Response) => {
    res.json({
        access_token : access_token,
        refresh_token : refresh_token
    })
});

/**
 * Call for refreshing a token. Requires the refresh_token supplied with the initial access_token.
 */
app.get('/refresh_token', function(req, res) {
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
});


/**
 * Clears out the current tokens to logout. Would need to fetch a new token. 
 */
app.get('/logout', (_req : Request, res : Response) => {
    access_token = "";
    refresh_token = "";

    res.send(200);
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});