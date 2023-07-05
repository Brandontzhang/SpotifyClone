export const LoginPage = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center p-20">
                <button className="w-fit border border-white rounded-xl">
                    <div className="p-5">
                        <a href="http://localhost:5000/auth/login">
                            <span className="text-primary text-3xl">Log In</span>
                        </a>
                    </div>
                </button>
                <div>
                    <p></p>
                </div>
            </div>
        </div>
    );
}