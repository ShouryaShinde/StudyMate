import Header from "../components/header";
import UploadNotes from "../components/uploadNotes";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="grow">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">Welcome to StudyMate!</h1>
          <p className="text-lg text-gray-700">
            Your one-stop solution for effective studying and learning.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <UploadNotes />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} StudyMate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}