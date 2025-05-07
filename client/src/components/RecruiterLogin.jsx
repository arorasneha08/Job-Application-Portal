// import React, { useContext, useEffect, useState } from 'react'
// import { assets } from '../assets/assets';
// import { AppContext } from '../context/AppContext';
// import axios from "axios"; 

// function RecruiterLogin() {
//     const [state, setState] = useState("Login") ;
//     const [name , setName] = useState("") ; 
//     const [password , setPassword] = useState(""); 
//     const [email , setEmail] = useState("") ; 

//     const [image , setImage] = useState(false); 
//     const [isTextDataSubmitted , setIsTextDataSubmitted] = useState(false); 

//     const {setShowRecruiterLogin , backendUrl} = useContext(AppContext); 

//     const onSubmitHandler = async(e) =>{
//         e.preventDefault();
//         if(state == "Sign Up" && !isTextDataSubmitted){
//             setIsTextDataSubmitted(true); 
//         }

//         try{
//             if(state == "Login"){
//                 const {data} = await axios.post(backendUrl + "/api/company/login" , {email , password}); 
//                 if(data.success){
//                     console.log(data);
//                 }
//             }
//         }
//         catch(error){

//         }
//     }

//     useEffect(() =>{
//         document.body.style.overflow = "hidden"; 
//         return () =>{
//             document.body.style.overflow = "unset"; 
//         }
//     },  []); 
//   return (
//     <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
//         <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
//             <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
//             <p className='text-sm'>Welcome back! Please sign in to continue</p>

//             {state == "Sign Up" && isTextDataSubmitted 
//             ?  <>
//                 <div className='flex items-center gap-4 my-10'>
//                     <label htmlFor="image">
//                         <img src={image ? URL.createObjectURL(image) : assets.upload_area } alt="" className='w-16 rounded-full' />
//                         <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden/>
//                     </label>
//                     <p>Upload Company <br /> logo </p>
//                 </div>
//             </>
//             :
//             <>
//             {state != "Login" && (
//             <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
//                 <img src={assets.person_icon} alt="" />
//                 <input onChange={(e) => setName(e.target.value)} type="text"placeholder='Company Name' value={name} className='outline-none text-sm'  required/>
//             </div>)}
//             <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
//                 <img src={assets.email_icon} alt="" />
//                 <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email Id' value={email} className='outline-none text-sm' required/>
//             </div>
//             <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
//                 <img src={assets.lock_icon} alt="" />
//                 <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' value={password} className='outline-none text-sm' required/>
//             </div>
//             </>
//             }
//             {state == "Login" && <p className='text-sm text-blue-600 cursor-pointer mt-4'>Forgot Password ?</p>}
            
//             <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
//                 {state == "Login" ? "Login" : isTextDataSubmitted ? 'Create Account' : "next"}
//             </button>

//             { state == "Login" ? <p className='mt-5 text-center'>Don't have an account <span className='text-blue-600 cursor-pointer' onClick={() => setState("Sign Up")}>Sign Up</span></p> : 
//             <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span></p>}

//             <img onClick={(e) => setShowRecruiterLogin(false)} src={assets.cross_icon} alt=""  className='absolute top-5 right-5 cursor-pointer'/>
//         </form>
//     </div>
//   )
// }

// export default RecruiterLogin ; 



// import React, { useContext, useEffect, useState } from 'react';
// import { assets } from '../assets/assets';
// import { AppContext } from '../context/AppContext';
// import axios from "axios";

// function RecruiterLogin() {
//     const [state, setState] = useState("Login");
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [image, setImage] = useState(false);
//     const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

//     const { setShowRecruiterLogin, backendUrl } = useContext(AppContext);

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         console.log(`Form submitted. Current State: ${state}`);
    
//         if (state === "Sign Up" && !isTextDataSubmitted) {
//             console.log("First step of Sign Up: submitting text details.");
//             setIsTextDataSubmitted(true);
//             return;
//         }
    
//         try {
//             if (state === "Login") {
//                 console.log("Attempting to log in with:", { email });
//                 const { data } = await axios.post(backendUrl + "/api/company/login", { email, password });
//                 if (data.success) {
//                     console.log("Login successful:", data);
//                     // handle login success
//                 } else {
//                     console.log("Login failed:", data.message);
//                 }
//             } else if (state === "Sign Up" && isTextDataSubmitted) {
//                 console.log("Submitting company details and logo...");
    
//                 const formData = new FormData();
//                 formData.append("name", name);
//                 formData.append("email", email);
//                 formData.append("password", password);
//                 formData.append("logo", image);  // 'logo' is the field name expected by your backend
    
//                 const { data } = await axios.post(backendUrl + "/api/company/register", formData, {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });
    
//                 if (data.success) {
//                     console.log("Registration successful:", data);
//                     // maybe redirect or close signup
//                 } else {
//                     console.log("Registration failed:", data.message);
//                 }
//             }
//         } catch (error) {
//             console.error("Error during authentication:", error.response?.data || error.message);
//         }
//     };
    

//     useEffect(() => {
//         console.log("RecruiterLogin mounted: disabling page scroll.");
//         document.body.style.overflow = "hidden";
//         return () => {
//             console.log("RecruiterLogin unmounted: enabling page scroll.");
//             document.body.style.overflow = "unset";
//         }
//     }, []);

//     return (
//         <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
//             <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
//                 <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
//                 <p className='text-sm'>Welcome back! Please sign in to continue</p>

//                 {state === "Sign Up" && isTextDataSubmitted
//                     ? <>
//                         <div className='flex items-center gap-4 my-10'>
//                             <label htmlFor="image">
//                                 <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className='w-16 rounded-full' />
//                                 <input onChange={e => {
//                                     console.log("Company logo selected:", e.target.files[0]);
//                                     setImage(e.target.files[0]);
//                                 }} type="file" id='image' hidden />
//                             </label>
//                             <p>Upload Company <br /> logo </p>
//                         </div>
//                     </>
//                     :
//                     <>
//                         {state !== "Login" && (
//                             <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
//                                 <img src={assets.person_icon} alt="" />
//                                 <input
//                                     onChange={(e) => setName(e.target.value)}
//                                     type="text"
//                                     placeholder='Company Name'
//                                     value={name}
//                                     className='outline-none text-sm'
//                                     required
//                                 />
//                             </div>)}
//                         <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
//                             <img src={assets.email_icon} alt="" />
//                             <input
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 type="email"
//                                 placeholder='Email Id'
//                                 value={email}
//                                 className='outline-none text-sm'
//                                 required
//                             />
//                         </div>
//                         <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
//                             <img src={assets.lock_icon} alt="" />
//                             <input
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type="password"
//                                 placeholder='Password'
//                                 value={password}
//                                 className='outline-none text-sm'
//                                 required
//                             />
//                         </div>
//                     </>
//                 }

//                 {state === "Login" && <p className='text-sm text-blue-600 cursor-pointer mt-4'>Forgot Password ?</p>}

//                 <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
//                     {state === "Login" ? "Login" : isTextDataSubmitted ? 'Create Account' : "Next"}
//                 </button>

//                 {state === "Login" ? (
//                     <p className='mt-5 text-center'>Don't have an account <span className='text-blue-600 cursor-pointer' onClick={() => {
//                         console.log("Switching to Sign Up form.");
//                         setState("Sign Up");
//                     }}>Sign Up</span></p>
//                 ) : (
//                     <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => {
//                         console.log("Switching to Login form.");
//                         setState("Login");
//                     }}>Login</span></p>
//                 )}

//                 <img onClick={(e) => {
//                     console.log("Closing Recruiter login popup.");
//                     setShowRecruiterLogin(false);
//                 }} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
//             </form>
//         </div>
//     );
// }

// export default RecruiterLogin;


import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

const RecruiterLogin = () => {

    const navigate = useNavigate()

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false)

    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state == "Sign Up" && !isTextDataSubmited) {
            return setIsTextDataSubmited(true)
        }

        try {

            if (state === "Login") {

                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    // toast.error(data.message)
                }

            } else {

                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    // toast.error(data.message)
                }

            }

        } catch (error) {
            // toast.error(error.message)
        }

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue </p>
                {state === "Sign Up" && isTextDataSubmited
                    ? <>

                        <div className='flex items-center gap-4 my-10'>
                            <label htmlFor="image">
                                <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                            </label>
                            <p>Upload Company <br /> logo</p>
                        </div>

                    </>
                    : <>

                        {state !== 'Login' && (
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.person_icon} alt="" />
                                <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required />
                            </div>
                        )}

                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.email_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
                        </div>

                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.lock_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                        </div>


                    </>}

                {state === "Login" && <p className='text-sm text-blue-600 mt-4 cursor-pointer'>Forgot password?</p>}

                <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
                    {state === 'Login' ? 'login' : isTextDataSubmited ? 'create account' : 'next'}
                </button>

                {
                    state === 'Login'
                        ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Sign Up")}>Sign Up</span></p>
                        : <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span></p>
                }

                <img onClick={e => setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />

            </form>
        </div>
    )
}

export default RecruiterLogin