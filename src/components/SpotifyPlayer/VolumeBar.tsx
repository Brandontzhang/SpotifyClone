import { useState } from "react";

export const VolumeBar = (props : any) => {
    // TODO (if you wanna lose your mind later) change the background color of the volume scroll
    return (
        <div>
            <input
                className="accent-highlight"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={props.initialVolume}
                onChange={event => {
                    props.setVolume(event.target.valueAsNumber)
                }}
            >
            </input>
        </div>
    )

}