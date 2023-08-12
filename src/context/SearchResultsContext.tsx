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
    query : string;
    tracks? : TrackResults;
    artists? : ArtistResults;
    albums? : AlbumResults;
    playlists? : PlaylistResults;
    searchTypes : string[];

    setTrackResults : (tr : TrackResults) => void;
    setArtistResults : (ar : ArtistResults) => void;
    setAlbumResults : (ar : AlbumResults) => void;
    setPlaylistResults : (pr : PlaylistResults) => void;
    setQuery : (query : string) => void;
    setSearchTypes : (types : string[]) => void;
}

const defaultSearchResult : searchResultContext = {
    query : "",
    tracks : {} as TrackResults,
    artists : {} as ArtistResults,
    albums : {} as AlbumResults,
    playlists : {} as PlaylistResults,
    searchTypes : [],

    setTrackResults : (_tr : TrackResults) => {},
    setArtistResults : (_ar : ArtistResults) => {},
    setAlbumResults : (_ar : AlbumResults) => {},
    setPlaylistResults : (_pr : PlaylistResults) => {},
    setQuery : (_query : string) => {},
    setSearchTypes : (_types : string[]) => {}
}

export const SearchResultsContext = createContext<searchResultContext>(defaultSearchResult);