export default function usernameFromEmail (email: string) {
    const name = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "_");
    const randomNum = Math.floor(Math.random() * 1000);
    return `${name}${randomNum}`
}