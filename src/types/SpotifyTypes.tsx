import { ExternalURL, Image } from "./PlaylistTypes"

export type ArtistObject = SimplifiedArtistObject & {
    followers : {
        href : string,
        total : number
    }
    genres : string[];
    images : Image[];
    popularity : number;
}

export type SimplifiedArtistObject = {
    external_urls : ExternalURL;
    href : string;
    id : string;
    name : string;
    type : string;
    uri : string;
}

export type SimplifiedAlbumObject = {
    album_type : string;
    total_tracks : number;
    available_markets : string[];
    external_urls : ExternalURL,
    href : string;
    id : string;
    images : Image[];
    name : string;
    release_data : string;
    release_data_precision : string;
    restrictions : {
        reason : string;
    }
    type : string;
    uri : string;
    copyrights : CopyrightObject[];
    genres : string[];
    label : string;
    popularity : number;
    album_group : string;
    artists : SimplifiedArtistObject[];
}

export type CopyrightObject = {
    text : string;
    type : string;
}