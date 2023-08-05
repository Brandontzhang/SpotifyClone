import { createContext } from "react";
import { Track } from "../types/TrackTypes";
import { ArtistObject, SimplifiedAlbumObject } from "../types/SpotifyTypes";
import { SimplifiedPlaylistObject } from "../types/PlaylistTypes";

type SearchResults = {
    href : string;
    limit : number;
    next : string;
    offset : number;
    previous : string;
    total : number;
}

export type TrackResults = SearchResults & {
    items : Track[]
};

export type ArtistResults  = SearchResults & {
    items : ArtistObject[];
}

export type AlbumResults = SearchResults & {
    items : SimplifiedAlbumObject[];
}

export type PlaylistResults = SearchResults & {
    items : SimplifiedPlaylistObject[];
}


type searchResultContext = {
    tracks? : TrackResults;
    artists? : ArtistResults;
    albums? : AlbumResults;
    playlists? : PlaylistResults;

    setTrackResults : (tr : TrackResults) => void;
    setArtistResults : (ar : ArtistResults) => void;
    setAlbumResults : (ar : AlbumResults) => void;
    setPlaylistResults : (pr : PlaylistResults) => void;
}

const defaultSearchResult : searchResultContext = {
    tracks : {} as TrackResults,
    artists : {} as ArtistResults,
    albums : {} as AlbumResults,
    playlists : {} as PlaylistResults,

    setTrackResults : (tr : TrackResults) => {},
    setArtistResults : (ar : ArtistResults) => {},
    setAlbumResults : (ar : AlbumResults) => {},
    setPlaylistResults : (pr : PlaylistResults) => {},
}

export const SearchResultsContext = createContext<searchResultContext>(defaultSearchResult);