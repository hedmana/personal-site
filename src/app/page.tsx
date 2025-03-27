import Image from "next/image";
import { FaGithub, FaLinkedin, FaFilePdf  } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-16 p-4 text-center space-y-6">
      <Image
        src="/axel.jpg"
        alt="Axel Hedman"
        width={300}
        height={300}
        className="rounded-full border-4 border-gray-200 shadow-md"
      />
      <h1 className="text-4xl font-bold text-gray-700">Hi, I'm Axel Hedman</h1>
      <p className="max-w-xl text-gray-700 text-lg">
        I’m a bioinformatics student with a strong background in software engineering, 
        data science, and machine learning. I love solving health tech challenges with code. When I’m not coding, 
        you’ll find me outdoors — hiking, skiing, or playing any sport that involves a ball.
      </p>
      <div className="flex space-x-6">
        <a
          href="https://github.com/hedmana"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          <FaGithub className="mr-2 text-xl" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/axel7/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          <FaLinkedin className="mr-2 text-xl" />
          LinkedIn
        </a>
        <a
          href="/axel_hedman_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          <FaFilePdf  className="mr-2 text-xl" />
          CV
        </a>
      </div>
    </main>
  );
}
