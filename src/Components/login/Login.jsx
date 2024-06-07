import React, { useState } from 'react';
import './Login.css';
import avatarImg from '../../Assets/avatar.png';
import { toast } from 'react-toastify';

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

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

    const handleLogin=e=>{
        e.preventDefault();
        toast.success("Hello!");
    }

    return (
        <div className='login'>
            <div className="itemLS">
                <h2>Welcome back!</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <button>Sign In</button>
                </form>
            </div>

            <div className="separator"></div>

            <div className="itemLS">
                <h2>Create an Account</h2>
                <form >
                    <div className="avatar-upload" onClick={handleClick}>
                        <img src={avatar.url || avatarImg} alt="" className="avatar-img" />
                        <span>Upload an Image</span>
                    </div>
                    <input type="file" id='file' style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" placeholder='User Name' name='username' />
                    <input type="email" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
