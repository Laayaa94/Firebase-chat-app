import React, { useState } from 'react';
import './Login.css';
import avatarImg from '../../Assets/avatar.png';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth';
import { auth,db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';
const Login = () => {
    
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const [loading,setLoading]= useState(false)
    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleClick = () => {
        document.getElementById('file').click();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        setLoading(true);
    
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
    
        try {
            await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!")
        
        } catch (err) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                toast.error("Invalid email or password. Please try again.");
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };
    

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            const imgUrl=await upload(avatar.file)
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar:imgUrl,
                id:res.user.uid,
                blocked:[],
              });
              
              await setDoc(doc(db, "userchats", res.user.uid), {
               chats:[],
              });
              
              toast.success("Succuesfully Account Created, Login Now")
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className='login'>
            <div className="itemLS">
                <h2>Welcome back!</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <button disabled={loading}>{loading?"Loading": "Sign In"}</button>
                </form>
            </div>

            <div className="separator"></div>

            <div className="itemLS">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="avatar-upload" onClick={handleClick}>
                        <img src={avatar.url || avatarImg} alt="" className="avatar-img" />
                        <span>Upload an Image</span>
                    </div>
                    <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" placeholder='User Name' name='username' />
                    <input type="email" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <button  disabled={loading}>{loading?"Loading": "Sign Up"}</button>
                </form>
            </div>
        </div>
    )

}
export default Login;
