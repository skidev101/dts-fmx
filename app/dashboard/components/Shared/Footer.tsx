"use client";

import { Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-10 border-t border-neutral-700 bg-card">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Made with Love */}
        <p className="flex items-center text-sm text-muted-foreground gap-2">
          Made with
          <Heart className="size-4 text-red-500 animate-pulse" />
          by students for students
        </p>

        {/* Right: Github link */}
        <a
          href="https://github.com/skidev101/dts-fmx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-500 transition-colors font-mono"
        >
          Source code
          <Github className="size-4" />
        </a>
      </div>

      {/* Optional: subtle bottom text */}
      <div className="mt-4 text-xs text-muted-foreground ml-6">
        &copy; {new Date().getFullYear()} DTS-FMX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
