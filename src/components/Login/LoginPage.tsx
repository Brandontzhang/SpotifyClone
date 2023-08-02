import { useEffect } from "react";
import { SpotifyPink } from "../../assets";

export const LoginPage = () => {

    useEffect(() => {
        // const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        // document.documentElement.style.setProperty('--primary-color', 'red');
        // console.log(color);
    }, []);

    return (
        <div className="h-screen">
            <div className="flex flex-col justify-center items-center p-20 h-full">
                <div className="pt-0 p-10">
                    <span className="text-primary text-3xl">My Spotify Clone! (The theme is <span className="text-highlight">pink!</span>)</span>
                </div>
                <div className="p-10">
                    <SpotifyPink />
                </div>
                <button className="min-w-fit w-[310px] mt-20 border border-primary rounded-xl transition ease-in-out hover:scale-110 duration-300">
                    <div className="p-5">
                        <a href="http://localhost:5000/auth/login">
                            <span className="text-primary text-3xl">Sign-in with Spotify</span>
                        </a>
                    </div>
                </button>
                <button className="min-w-fit w-[310px] m-10 border border-primary rounded-xl transition ease-in-out hover:scale-110 duration-300">
                    <div className="p-5">
                        <a href="https://github.com/Brandontzhang/SpotifyClone">
                            <span className="text-primary text-3xl">Github Repository</span>
                        </a>
                    </div>
                </button>
            </div>
        </div>
    );
}