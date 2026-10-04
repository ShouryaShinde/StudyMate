import { Button } from "@workspace/ui/components/button";
import StudyMateLogo from "../public/StudyMateLogo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={StudyMateLogo}
            alt="StudyMate Logo"
            className="h-10 w-10 object-contain"
          />

          <span className="text-xl font-bold text-blue-600">
            StudyMate
          </span>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-3 md:flex">

          <a href="/">
            <Button className="bg-blue-600 text-md text-white hover:bg-blue-700">
              Home
            </Button>
          </a>

          <a href="/notes">
            <Button
              variant="ghost"
              className="text-md text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              Notes
            </Button>
          </a>

          <a href="/quiz">
            <Button
              variant="ghost"
              className="text-md text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              Quiz
            </Button>
          </a>

        </nav>
      </div>
    </header>
  );
}