import { Google } from '@mui/icons-material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { auth, provider } from '../../firebase';
import './index.css'

function Index() {
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSignInGoogle = () => {
        signInWithPopup(auth, provider).then((res)=>{
            console.log(res);
            history.push('/');
        }).catch((error)=>{
            console.log(error.code)
            setError(error.message)
            setLoading(false)
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if(email==='' || password === '' || username==='' || confirmPassword===''){
            setError('Required field is missing');
            setLoading(false);
        }
        else if(password!==confirmPassword){
            setError('Password should be same in both field');
            setLoading(false);
        }
        else{
            createUserWithEmailAndPassword(auth,email,password).then((res)=>{
                console.log(res);
                setLoading(false);
                history.push('/');
            }).catch((error)=>{
                console.log(error);
                setError(error.message);
                setLoading(false);
            })
        }
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if(email==='' || password === ''){
            setError('Required field is missing');
            setLoading(false);
        }
        else{
            signInWithEmailAndPassword(auth,email,password).then((res)=>{
                console.log(res);
                setLoading(false);
                history.push('/')
            }).catch((error)=>{
                console.log(error.code)
                setError(error.message)
                setLoading(false)
            })
        }
    }
  return (
    <div className='auth'>
        <div className="auth-container">
            <p>Login using any of the following services</p>
            <div className="sign-options">
                <div onClick={handleSignInGoogle} className="single-option box-shadow">
                    <Google />
                    <p>Login with Google</p>
                </div>
            </div>
            <div className="auth-login">
                <div className="auth-login-container">
                {
                    register? (<>
                        <div className="input-field">
                            <p>Username</p>
                            <input 
                            className='box-shadow' 
                            type="text" 
                            name="register-username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <p>Email</p>
                            <input 
                            className='box-shadow' 
                            type="email" 
                            name="register-email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <p>Password</p>
                            <input 
                            className='box-shadow' 
                            type="password" 
                            name="register-password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <p>Confirm Password</p>
                            <input 
                            className='box-shadow' 
                            type="password" 
                            name="register-password"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className='register-btn' 
                        onClick={handleRegister} 
                        disabled={loading}>
                        {loading?"Registering...":"Register"}
                        </button>
                    </>):(<>
                        <div className="input-field">
                            <p>Email</p>
                            <input 
                            className='box-shadow' 
                            type="email" 
                            name="signin-email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <p>Password</p>
                            <input 
                            className='box-shadow' 
                            type="password" 
                            name="signin-password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <button 
                        className='register-btn' 
                        onClick={handleSignIn}
                        disabled={loading}
                        >
                        {loading?"Signing in...":"Login"}
                        </button>
                    </>)
                }
                <p className='login-register-text' 
                onClick={()=>setRegister(!register)}>
                {register?"Login?":"Register?"}
                </p>
                </div>
            </div>
            {
                error !=='' && (
                    <p style={{color:'red', fontSize:'14px'}}>
                        {error}
                    </p>
                )
            }
        </div>
    </div>
  )
}

export default Index