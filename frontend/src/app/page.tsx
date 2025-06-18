import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-5 p-4 text-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-700">Axel Hedman</h1>
      <p className="max-w-xl text-gray-500 text-lg">
        Research Scientist/CS Student
      </p>
      <Image
        src="/axel.jpg"
        alt="Axel Hedman"
        width={300}
        height={300}
        priority
        className="rounded-full border-4 border-gray-200 shadow-md select-none"
      />
      <p className="max-w-xl text-gray-700 text-lg">
        I’m a MSc student at{" "}
        <a
          href="https://www.aalto.fi/en"
          className="text-blue-500 hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aalto University
        </a>{" "}
        with a strong background in data science and machine learning. I love
        solving health tech challenges with code. When I’m not coding, you’ll
        find me outdoors — hiking, skiing, or playing any sport that involves a
        ball.
      </p>
      <p className="max-w-xl text-gray-700 text-lg">
        Currently, I'm writing my master's thesis in the{" "}
        <a
          href="https://research.cs.aalto.fi/pml/"
          className="text-blue-500 hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Probabilistic Machine Learning Group{" "}
        </a>{" "}
        at Aalto University Department of Computer Science. During my master's I
        also spent a semester at{" "}
        <a
          href="https://ethz.ch/en.html"
          className="text-blue-500 hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          ETH Zürich
        </a>{" "}
        Department of Health Sciences and Technology.
      </p>
      <p className="max-w-xl text-gray-700 text-lg">
        Additionally, I bring software engineering experience from my time at{" "}
        <a
          href="https://www.mirka.com/en"
          className="text-blue-500 hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mirka
        </a>{" "}
        and{" "}
        <a
          href="https://www.op.fi/en/home-page"
          className="text-blue-500 hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          OP Financial Group
        </a>
        . If you want to take a closer look at my CV, feel free to shoot me an
        email.
      </p>
      <div className="flex space-x-6 select-none">
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
          href="mailto:axelhedman00@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          <FaEnvelope className="mr-2 text-xl" />
          Email
        </a>
      </div>
    </main>
  );
}
