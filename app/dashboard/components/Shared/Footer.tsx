import { Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-10 border-t bg-card">
      <div className="w-full h-full flex justify-center items-center flex-col text-center">
        <p className="flex items-center">
          Made with {" "} <Heart className="size-4" /> by students for students
        </p>
        <p className="flex items-center">
          Source code available on Github <Github className="size-4" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
