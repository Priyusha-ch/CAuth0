import { LoginButton } from "./LoginButton";
import {LogoutButton} from "./LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


const Home = () => {

    const { isAuthenticated,getAccessTokenSilently } = useAuth0();
    async function getData(){
        try{
        const token = await getAccessTokenSilently()
        const data = await axios.get("http://localhost:3006/api/data",{
        headers:{
            Authorization: `Bearer ${token}` 
        }
        });
        console.log(data);
        }catch(err){
        console.log(err.message);
        }
    }

    return (
        <div>
            <header>
                {isAuthenticated && (
                <>
                    <p>You are logged in.</p>
                    <LogoutButton/>
                    <button onClick={getData}>Click me</button>
                </>
                )}
                {!isAuthenticated && (
                <>
                    <p>You are not logged in.</p>
                    <LoginButton/>
                    <button onClick={getData}>Click me</button>
                    
                </>
                )}
            </header>
        </div>
    )
}

export default Home;