// import { auth, currentUser } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import usernameFromEmail from "@/utils/formatName";

// export async function getCurrentUser() {
//   const clerkUser = await currentUser();
//   console.log("clerk user:", clerkUser)
//   if (!clerkUser) return null;

//   let user = await prisma.user.findUnique({
//     where: {
//       clerkId: clerkUser.id
//     },
//     select: {
//       id: true,
//       clerkId: true,
//       fullname: true,
//       username: true,
//       email: true,
//       avatarUrl: true,
//       role: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   if (!user) {
//     const name = usernameFromEmail(clerkUser.emailAddresses[0].emailAddress);
//     user = await prisma.user.create({
//       data: {
//         clerkId: clerkUser.id,
//         username: name,
//         email: clerkUser.emailAddresses[0].emailAddress,
//         avatarUrl: clerkUser.imageUrl,
//         role: "STUDENT",
//       }
//     })
//   }
//   console.log("new user created:", user)
  
//   return user;
// }
