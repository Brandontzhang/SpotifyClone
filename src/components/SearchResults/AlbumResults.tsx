import { useContext, useEffect, useState } from "react";
import { SearchResultsContext } from "../../context/SearchResultsContext";
import { SimplifiedAlbumObject } from "../../types/SpotifyTypes";

export const AlbumResults = () => {

    const { albums } = useContext(SearchResultsContext);
    const [gridItems, setGridItems] = useState<SimplifiedAlbumObject[]>([]);

    useEffect(() => {
        if (albums) {
            setGridItems(albums.items);
        }
    }, [albums]);

    return (
        <div className="grid grid-cols-4 place-items-center">
            {
                gridItems.map(album => 
                    <div className="flex flex-col justify-center items-center bg-background100 h-fit w-fit rounded-lg m-4">
                        {<img className="h-52 w-52 rounded-lg m-4" src={album.images[0].url} />}
                        <div className="flex flex-col w-52 overflow-hidden">
                            <span className="overflow-hidden px-2 text-xl w-52 h-8 text-ellipsis">{album.name}</span>
                            <span className="overflow-hidden px-2 text-sm w-52 h-8 text-ellipsis">{album.artists.map(artist => artist.name).join(",")}</span>
                        </div>
                    </div>    
                )
            }
        </div>
    )
}