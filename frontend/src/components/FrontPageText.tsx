import ExternalLink from "./ExternalLink";

export default function FrontPageText() {
  return (
    <>
      <p className="max-w-xl text-gray-700 text-lg">
        I’m a MSc student at{" "}
        <ExternalLink href="https://www.aalto.fi/en">
          Aalto University
        </ExternalLink>{" "}
        with a strong background in data science and machine learning. I love
        solving health tech challenges with code. When I'm not coding, you'll
        find me outdoors hiking, skiing, or playing any sport that involves a
        ball.{" "}
      </p>
      <p className="max-w-xl text-gray-700 text-lg">
        I'm currently working on my master's thesis in the{" "}
        <ExternalLink href="https://research.cs.aalto.fi/pml/">
          Probabilistic Machine Learning Group
        </ExternalLink>{" "}
        at Aalto, investigating how Graph Neural Networks can be applied to
        analyze population-scale doctor-patient interaction data. During my master's I also spent
        a semester at{" "}
        <ExternalLink href="https://ethz.ch/en.html">ETH Zürich</ExternalLink>{" "}
        Department of Health Sciences and Technology.
      </p>
      <p className="max-w-xl text-gray-700 text-lg">
        Additionally, I bring software engineering experience from{" "}
        <ExternalLink href="https://www.mirka.com/en">Mirka</ExternalLink> and{" "}
        <ExternalLink href="https://www.op.fi/en/home-page">
          OP Financial Group
        </ExternalLink>
        . If you want to take a closer look at my CV, feel free to shoot me an
        email.
      </p>
    </>
  );
}
