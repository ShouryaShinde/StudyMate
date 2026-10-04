import { Button } from "@workspace/ui/components/button";
import StudyMateLogo from "../public/StudyMateLogo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={StudyMateLogo} alt="StudyMate Logo" className="h-9 w-9" />
          <span className="text-xl text-black font-bold">
            StudyMate
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/">
            <Button className="bg-blue-600 text-white text-md hover:bg-blue-700">
              Home
            </Button>
          </a>

          <a
            href="/notes"
            className="text-md font-medium text-blue-600 hover:text-blue-700"
          >
            Notes
          </a>

          <a
            href="/quiz"
            className="text-md font-medium text-blue-600 hover:text-blue-700"
          >
            Quiz
          </a>
        </nav>
      </div>
    </header>
  );
}