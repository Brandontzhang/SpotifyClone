export type Playlist = {
    collaborative : boolean;
    description : string;
    external_urls : ExternalURL;
    href : string;
    images : [Image];
    name : string;
    owner : Person;
    primary_color : string;
    public : boolean;
    snapshot_id : string;
    tracks : TrackData;
    type : string;
    uri : string;
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
}

export type ExternalURL = {
    spotify : string;
}

export type TrackData = {
    href : string;
    total : number;
}