import { useEffect } from "react";

export const LoginPage = () => {

    useEffect(() => {
        // const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        // document.documentElement.style.setProperty('--primary-color', 'red');
        // console.log(color);
    }, []);

    return (
        <div>
            <div className="flex flex-col justify-center items-center p-20">
                <div className="p-5">
                <span className="text-primary text-3xl">My Spotify Clone! (The theme is <span className="text-highlight">pink!</span>)</span>
                </div>
                <div className="h-[200px] w-[200px] m-20">
                    <img className="object-contain" src='src\assets\spotifyPink.svg'></img>
                </div>
                <button className="min-w-fit w-[310px] m-10 border border-primary rounded-xl transition ease-in-out hover:scale-110 duration-300">
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