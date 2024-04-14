"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("🚀 Todo App in Next-JS.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🤖 Connected with FASTAPI.")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
