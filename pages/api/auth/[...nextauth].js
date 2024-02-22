// import NextAuth from "next-auth";
// // import Providers from 'next-auth/providers';
// // import Providers from `next-auth/providers`;
// // Import each provider you want to use
// import CredentialsProvider from 'next-auth/providers/credentials';

// import { verifyPassword } from '../../../lib/auth';
// import { connectToDatabase } from "../../../lib/db";

// export default NextAuth({
//     session: {
//         jwt: true
//     },
//     providers: [
//         // Providers.Credentials
//         CredentialsProvider({
//             async authorize(credentials) {
//                 const client = await connectToDatabase();

//                 const usersCollection = client.db().collection('users');

//                 const user = await usersCollection.findOne({email: credentials.email});

//                 if(!user) {
//                     throw new Error('No user found!');
//                 }

//                 const isValid = await verifyPassword(credentials.password, user.password);

//                 if(!isValid) {
//                     client.close();
//                     throw new Error('Could not log you in!');
//                 }

//                 client.close();
//                 return { email: user.email }
//             }
//         })
//     ]
// })


// // import NextAuth from 'next-auth';
// // import Providers from 'next-auth/providers';
// // // import { providers } from 'next-auth'


// // import { verifyPassword } from '../../../lib/auth';
// // import { connectToDatabase } from '../../../lib/db';

// // export default NextAuth({
// //   session: {
// //     jwt: true,
// //   },
// //   providers: [
// //     Providers.Credentials({
// //       async authorize(credentials) {
// //         const client = await connectToDatabase();

// //         const usersCollection = client.db().collection('users');

// //         const user = await usersCollection.findOne({
// //           email: credentials.email,
// //         });

// //         if (!user) {
// //           client.close();
// //           throw new Error('No user found!');
// //         }

// //         const isValid = await verifyPassword(
// //           credentials.password,
// //           user.password
// //         );

// //         if (!isValid) {
// //           client.close();
// //           throw new Error('Could not log you in!');
// //         }

// //         client.close();
// //         return { email: user.email };
        
// //       },
// //     }),
// //   ],
// // // providers: [
// // //     Providers.Twitter({
// // //       clientId: process.env.TWITTER_ID,
// // //       clientSecret: process.env.TWITTER_SECRET
// // //     })
// // //   ],
// // });


// // import NextAuth from 'next-auth'
// // // Import each provider you want to use
// // import CredentialsProvider from 'next-auth/providers/credentials';

// // import { verifyPassword } from '../../../lib/auth';
// // import { connectToDatabase } from '../../../lib/db';

// // export default NextAuth({
// //   session: {
// //     // strategy: 'jwt',
// //     jwt: true,
// //   },
// //   providers: [
// //     CredentialsProvider({
// //       // name: "Credentials",
// //       // credentials: {
// //       //   email: { label: "Email", type: "email" },
// //       //   password: { label: "Password", type: "password" },
// //       // },
// //       async authorize(credentials, req) {
// //         const client = await connectToDatabase();

// //         const usersCollection = client.db().collection('users');

// //         const user = await usersCollection.findOne({
// //           email: credentials.email,
// //         });

// //         if (!user) {
// //           client.close();
// //           throw new Error('No user found!');
// //         }

// //         const isValid = await verifyPassword(
// //           credentials.password,
// //           user.password
// //         );

// //         if (!isValid) {
// //           client.close();
// //           throw new Error('Could not log you in!');
// //         }

// //         client.close();
// //         return { email: user.email };
// //       },
// //     }),
// //   ],
// //   // Add other NextAuth options here
// //   debug: true,
// // });



import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth'; // Adjust the import path as necessary
import { connectToDatabase } from '../../../lib/db'; // Adjust the import path as necessary

export default NextAuth({
  session: {
    jwt: true,
  },
  name: 'credentials',
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials, req) {
    const user = await authenticateUser(credentials.email, credentials.password);
    if (user) {
      return user;
    } else {
      return null;
    }
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');
        
        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();
        return { email: user.email };
      },
    }),
    // Providers.Credentials({
    //   authorize: async (credentials) => {
    //     if (credentials.email === "test@example.com" && credentials.password === "password") {
    //       return { id: 1, name: "Test User", email: "test@example.com" };
    //     }
    //     return null; // Return null to indicate unauthorized access
    //   }
    // })
  ],
  // Additional NextAuth configuration...
  debug: true,
});
