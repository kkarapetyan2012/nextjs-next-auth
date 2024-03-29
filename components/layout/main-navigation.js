import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import classes from './main-navigation.module.css';

function MainNavigation() {
  // const [session, loading] = useSession();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log('loading', loading);
  console.log('session', session);

  function logautHandler() {
    signOut();
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && !loading && <li>
            <Link href="/auth">Login</Link>
          </li>}
          {session && <li>
            <Link href="/profile">Profile</Link>
          </li>}
          {session && <li>
            <button onClick={logautHandler}>Logout</button>
          </li>}
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
