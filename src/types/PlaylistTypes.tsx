import { PlaylistTrackObject, Track } from "./TrackTypes";

export type Playlist = SimplifiedPlaylistObject & {
    primary_color : string;
}

export type SimplifiedPlaylistObject = {
    collaborative : boolean;
    description : string;
    external_urls : ExternalURL;
    href : string;
    id : string;
    images : Image[];
    name : string;
    owner : string;
    public : boolean;
    snapshot_id : string;
    tracks : TrackPage;
    type : string;
    uri : string
}

export type Image = {
    height : number; 
    width : number; 
    url : string;
}

export type Person = {
    display_name : string;
    external_urls : ExternalURL,
    href : string;
    id : string;
    type : string;
    uri : string;
    name: string;
}

export type ExternalURL = {
    spotify : string;
}

export type TrackPage = {
    href: string,
    limit: number, 
    next: string,
    offset: number,
    previous: string,
    total: string,
    items : PlaylistTrackObject[]
}