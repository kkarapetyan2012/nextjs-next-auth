// import { useRef, useState } from 'react';
// import { signIn } from 'next-auth/react';
// import classes from './auth-form.module.css';

// // async function createUser(email, password) {
// //   const response = await fetch('/api/auth/signup', {
// //     method: 'POST',
// //     body: JSON.stringify({ email, password }),
// //     headers: {
// //       'Content-Type': 'application/json'
// //     }
// //   });

// //   const data = await response.json();

// //   if(!response.ok) {
// //     throw new Error(data.message || 'Something went wrong!')
// //   }

// //   return data;
// // }

// async function createUser(email, password) {
//   const response = await fetch('/api/auth/signup', {
//     method: 'POST',
//     body: JSON.stringify({ email, password }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Something went wrong!');
//   }

//   return data;
// }

// function AuthForm() {
//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();
//   const [isLogin, setIsLogin] = useState(true);

//   function switchAuthModeHandler() {
//     setIsLogin((prevState) => !prevState);
//   }

//   async function submitHandler(event) {
//     event.preventDefault();

//     const enteredEmail = emailInputRef.current.value;
//     const enteredPassword = passwordInputRef.current.value;

//     if(isLogin) {
//       const result = await signIn('credentials', {
//         redirect: false,
//         email: enteredEmail,
//         password: enteredPassword
//       })
//     } else {
//       try {
//         const result = await createUser(enteredEmail, enteredPassword);
//         console.log(result)
//       }
//       catch(error) {
//         console.log(error)
//       }
//     }
//   }

//   return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor='email'>Your Email</label>
//           <input type='email' id='email' required ref={emailInputRef} />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='password'>Your Password</label>
//           <input type='password' id='password' required ref={passwordInputRef} />
//         </div>
//         <div className={classes.actions}>
//           <button>{isLogin ? 'Login' : 'Create Account'}</button>
//           <button
//             type='button'
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? 'Create new account' : 'Login with existing account'}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }

// export default AuthForm;

// import { useState, useRef } from 'react';
// // import { signIn } from 'next-auth/client';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';

// import classes from './auth-form.module.css';

// async function createUser(email, password) {
//   const response = await fetch('/api/auth/signup', {
//     method: 'POST',
//     body: JSON.stringify({ email, password }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Something went wrong!');
//   }

//   return data;
// }

// function AuthForm() {
//   const emailInputRef = useRef();
//   const passwordInputRef = useRef();

//   const [isLogin, setIsLogin] = useState(true);
//   const router = useRouter();

//   function switchAuthModeHandler() {
//     setIsLogin((prevState) => !prevState);
//   }

//   async function submitHandler(event) {
//     event.preventDefault();

//     const enteredEmail = emailInputRef.current.value;
//     const enteredPassword = passwordInputRef.current.value;

//     // optional: Add validation

//     if (isLogin) {
//       const result = await signIn('credentials', {
//         redirect: false,
//         email: enteredEmail,
//         password: enteredPassword,
//       });

//       console.log('result', result)

//       if (!result.error) {
//         // set some auth state
//         router.replace('/profile');
//       }
//     } else {
//       try {
//         const result = await createUser(enteredEmail, enteredPassword);
//         console.log(result);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }

//   return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor='email'>Your Email</label>
//           <input type='email' id='email' required ref={emailInputRef} />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='password'>Your Password</label>
//           <input
//             type='password'
//             id='password'
//             required
//             ref={passwordInputRef}
//           />
//         </div>
//         <div className={classes.actions}>
//           <button>{isLogin ? 'Login' : 'Create Account'}</button>
//           <button
//             type='button'
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? 'Create new account' : 'Login with existing account'}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }

// export default AuthForm;



import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import classes from './auth-form.module.css';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log('response', response)

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');


  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  // async function submitHandler(event) {
  //   event.preventDefault();

  //   const enteredEmail = emailInputRef.current.value;
  //   const enteredPassword = passwordInputRef.current.value;

  //   // optional: Add validation

  //   if (isLogin) {
  //     const result = await signIn('credentials', {
  //       redirect: false,
  //       email: enteredEmail,
  //       password: enteredPassword,
  //     });

  //     console.log('result', result)

  //     if (!result.error) {
  //       // set some auth state
  //       router.replace('/profile');
  //     }
  //   } else {
  //     try {
  //       const result = await createUser(enteredEmail, enteredPassword);
  //       console.log(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // const submitHandler = async (event) => {
  //   event.preventDefault();

  //   const enteredEmail = emailInputRef.current.value;
  //   const enteredPassword = passwordInputRef.current.value;

  //   try {
  //     console.log('Attempting sign in with email:', enteredEmail);
  //     console.log('Attempting sign in with password:', enteredPassword);
  //     const result = await signIn('credentials', {
  //       redirect: false,
  //       email: enteredEmail,
  //       password: enteredPassword,
  //     });

  //     if (result.error) {
  //       setErrorMessage(result.error);
  //     } else {
  //       // Successfully logged in, redirect to profile page
  //       router.replace('/profile');
  //     }
  //   } catch (error) {
  //     console.log('Attempting sign in with email:', enteredEmail);
  //     console.log('Attempting sign in with password:', enteredPassword);
  //     console.error('Failed to sign in:', error);
  //     setErrorMessage('Failed to sign in');
  //   }
  // };

  const submitHandler = async (event) => {
    event.preventDefault();
  
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
  
    if (isLogin) {
      // Attempt to sign in with the provided email and password
  try {
    const result = await signIn('credentials', {
      redirect: false, // Prevent NextAuth from automatically redirecting
      email: enteredEmail, // The user's email
      password: enteredPassword, // The user's password
    });

    if (result.error) {
      // If there's an error (e.g., user not found or wrong password),
      // display it to the user without redirecting
      setErrorMessage(result.error);
    } else {
      // If sign-in was successful, NextAuth will handle the session creation.
      // You can then redirect the user to their profile page or another destination.
      router.replace('/profile');
    }
  } catch (error) {
    // Log any unexpected errors and update the UI as necessary
    console.error('Sign-in error:', error);
    setErrorMessage('An unexpected error occurred during sign-in.');
  }
    } else {
      // Sign up logic
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log('Signup successful, result:', result);
        // Attempt to automatically sign the user in after successful signup
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
  
        if (signInResult.error) {
          setErrorMessage(signInResult.error);
        } else {
          // Successfully signed in after signup, redirect to profile page
          router.replace('/profile');
        }
      } catch (error) {
        console.error('Signup failed:', error);
        setErrorMessage(error.message || 'Failed to sign up');
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;