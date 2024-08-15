import React from "react";
import Navbar from "./components/Navbar";
import IndieArcade from "./IndieArcade.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <br />
      <div className="text-center text-3xl">Indie Arcade</div>
      <div className="text-center text-2xl">Project overview:</div>
      <div className="text-center mx-auto max-w-lg">
        We aim to create an online game store that focuses on selling and
        storing games for users, particularly those from smaller developers and
        older titles that often struggle to gain recognition on larger
        platforms.
      </div>
      <div className="flex justify-center items-center">
        <img
          alt="Indie Arcade"
          src="https://cdn.discordapp.com/attachments/1256096132829024289/1257538944749535372/Z.png?ex=66be1f28&is=66bccda8&hm=3d5f76366f94a5e3a96583c417a8a09bcdd5d14af94de8074f61a7487727ece0&"
          className="h-64 w-auto"
        />
      </div>
      <div className="text-center text-2xl">Group Info:</div>
      <div className="text-center">
        Charankamal Brar, Ethan Taira, Jose Rodriguez
      </div>
    </>
  );
}
