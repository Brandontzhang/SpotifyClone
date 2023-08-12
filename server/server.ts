import { Request, Response } from "express";

import express from 'express';
import dotenv from 'dotenv';
import request from "request";
import cors from 'cors';

const port = 5000

dotenv.config()

const spotify_client_id : string | undefined = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret : string | undefined = process.env.SPOTIFY_CLIENT_SECRET;

let token_info : any = {
    access_token : "",
    token_type : "",
    scope: "",
    expires_in: 0,
};

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const generateRandomString = (length : number) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const getSpotifyAPIAuthOptions = (url : string) => {
    let {access_token, token_type} = token_info;

    var authOptions = {
        url : `https://api.spotify.com/${url}`,
        headers: { 'Authorization': `${token_type} ${access_token}` },
        json: true,
    }

    return authOptions;
};

/**
 * Sends request to Spotify Authorization in order to receive token
 */
app.get('/auth/login', (_req : Request, res : Response) => {
    var scope = "streaming \
               user-read-email \
               user-read-private \
               user-library-read \
               user-read-playback-state \
               user-modify-playback-state \
               playlist-read-private \
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
            token_info = body;
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
    res.json(token_info)
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
        token_info = body;
        res.send({
          'access_token': token_info.access_token
        });
      }
    });
});


/**
 * Clears out the current tokens to logout. Would need to fetch a new token. 
 */
app.get('/logout', (_req : Request, res : Response) => {
    token_info = {};
    res.send(200);
});

/**
 * Play array of songs given
 */
app.put('/me/player/play', (req : Request, res : Response) => {
    let contextURI = req.body.contextURI; // playlist, artists, or albums
    let uris = req.body.uris; // tracks to play
    let offset = req.body.offset; // track to start at

    let body = {}

    if (contextURI != "") {
        body = {
            context_uri : contextURI,
            offset : {"uri" : offset},
            position_ms : 0
        }
    } else {
        body = {
            uris : uris,
            offset : {"uri" : offset},
        }
    }

    let authOptions = {
        ...getSpotifyAPIAuthOptions('v1/me/player/play'),
        body : body
    }

    request.put(authOptions, function(error, response, _body) {
        if (!error && response.statusCode === 202) {
            res.sendStatus(200);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    })
});

/**
 * Get a playlist owned by a Spotify User
 */
app.get('/playlists', (_req : Request, res : Response) => {
    request.get(getSpotifyAPIAuthOptions('v1/me/playlists'), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send(response);
        }
      });
});

/**
 * Get saved tracks
 */
app.get('/me/tracks/:offset', (req : Request, res : Response) => {
    
    let offset = req.params.offset;

    request.get(getSpotifyAPIAuthOptions(`v1/me/tracks?offset=${offset}&limit=20`), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    })
});

/**
 * Get the songs associated with the playlist id provided
 */
app.get('/playlist/:playlistid/tracks/:offset', (req : Request, res : Response) => {
    let offset = req.params.offset;
    request.get(getSpotifyAPIAuthOptions(`v1/playlists/${req.params.playlistid}/tracks?offset=${offset}&limit=20`), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.send(response);
        }
    });
});

/**
 * Add a song to the playback queue
 */
app.post('/player/queue', (req : Request, res : Response) => {
    let trackURI = req.body.URI;

    request.post(getSpotifyAPIAuthOptions(`v1/me/player/queue?uri=${trackURI}`), function(error, response) {
        if (!error && response.statusCode == 204) {
            res.sendStatus(response.statusCode);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    });
});

/**
 * Check if the given list of songs are in the playlist 
 * (Max 50 ids)
 */
app.post('/me/playlist/contains', (req : Request, res : Response) => {
    let songIds = req.body;
    request.get(getSpotifyAPIAuthOptions(`v1/me/tracks/contains?ids=${songIds.join(',')}`), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    })
});

/**
 * Gets the users queue
 */
app.get('/me/player/queue', (_req : Request, res : Response) => {
    request.get(getSpotifyAPIAuthOptions(`v1/me/player/queue`), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    })
});

/**
 * Add a song to the end of the queue
 */
app.post('/me/player/queue/:songuri', (req : Request, res : Response) => {
    let songURI = req.params.songuri;

    request.post(getSpotifyAPIAuthOptions(`v1/me/player/queue?uri=${songURI}`), function(error, response) {
        if (!error && response.statusCode === 204) {
            res.sendStatus(response.statusCode);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    })
});

/**
 * Set player to repeat
 * state can be one of:
 * track : repeat current track
 * context : repeat current context
 * off : turn repeat off
 */
app.put('/me/player/repeat', (req : Request, res : Response) => {
    let state : string =req.body.state;

    request.put(getSpotifyAPIAuthOptions(`v1/me/player/repeat?state=${state}`), function(error, response){
        if (!error && response.statusCode === 204) {
            res.sendStatus(response.statusCode);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    })
});

/**
 * Search request
 */
app.get('/search/:query/:type', (req : Request, res : Response) => {
    let q = req.params.query;
    let type = req.params.type;

    request.get(getSpotifyAPIAuthOptions(`v1/search?q=${q}&type=${type}`), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    })
});

/**
 * Send request to get recommendations
 */
app.put('/recommendations', (req : Request, res : Response) => {
    const seed_tracks = req.body.seed_tracks;

    request.get(getSpotifyAPIAuthOptions(`v1/recommendations?seed_tracks=${seed_tracks.join(",")}`), function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            if (response) {
                res.sendStatus(response.statusCode);
            } else {
                res.send(error);
            }
        }
    })
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});