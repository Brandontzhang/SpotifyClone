import { useContext, useEffect, useState } from "react";
import { SearchResultsContext } from "../../context/SearchResultsContext";
import { ArtistObject } from "../../types/SpotifyTypes";

export const ArtistResults = () => {

    const { artists } = useContext(SearchResultsContext);
    const [gridItems, setGridItems] = useState<ArtistObject[]>([])

    useEffect(() => {
        if (artists) {
            setGridItems(artists.items);
        }
        console.log(artists?.items);
    }, [artists]);

    return (
        <div className="h-[55vh] xl:h-[60vh] overflow-y-scroll grid grid-cols-4 place-items-center">
            {
                gridItems.map(artist => 
                    <div className="flex flex-col justify-center items-center bg-background100 h-fit w-fit rounded-lg m-4">
                        {<img className="h-52 w-52 rounded-lg m-4" src={artist.images[0]?.url} />}
                        <div className="flex flex-col w-52 overflow-hidden">
                            <span className="overflow-hidden px-2 text-xl w-52 h-8 text-ellipsis">{artist.name}</span>
                            <span className="overflow-hidden px-2 text-sm w-52 h-8 text-ellipsis">Genres: {artist.genres.join(",")}</span>
                        </div>
                    </div>    
                )
            }
        </div>
    )
}