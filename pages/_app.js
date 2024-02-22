// import Layout from '../components/layout/layout';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

// export default MyApp;


import { SessionProvider, Provider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      {/* <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider> */}
    </>
  );
}

export default MyApp;

export async function getServerSideProps(context) {
  const session = await getSession(context); // Fetch session data
  return {
    props: { session },
  };
}
