import { ExternalURL, Image, Person } from "./PlaylistTypes";

export type PlaylistTrackObject = {
    added_at : string;
    added_by : Person
    primary_color : string;
    track : Track;
    video_thumbnail : string;
}

export type Track = {
    album : Album;
    artists : Person[];
    duration_ms : number;
    episode : boolean;
    explicit : boolean;
    href : string;
    id : string;
    is_local : boolean;
    name : string;
    popularity : number;
    preview_url : string;
    track : boolean;
    track_number : number;
    type : string;
    uri : string;
}

export type Album = {
    album_type : string;
    artists : Person[];
    external_urls : ExternalURL,
    href : string;
    id : string;
    images : Image[];
    name : string;
    release_date : string;
    release_date_precision : string;
    total_tracks : number;
    type : string;
    uri : string;
}

export type TrackData = {
    href : string;
    limit : number;
    next : string;
    offset : string;
    previous : string;
    total : number;
    items : SavedTrackObject[];
}

export type SavedTrackObject = {
    added_at : string;
    track : Track;
}