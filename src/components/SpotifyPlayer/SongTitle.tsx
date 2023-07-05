import { usePlaybackState, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";

export const SongTitle = () => {

    const webPlaybackSDKReady = useWebPlaybackSDKReady();
    const playbackState = usePlaybackState();

    if (!webPlaybackSDKReady) return <div>Loading...</div>;

    if (playbackState === null) return null;

    return <p>Current song: {playbackState.track_window.current_track.name}</p>;
}