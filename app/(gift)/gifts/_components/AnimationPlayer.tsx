import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const AnimationPlayer = ({ global }: { global: string[] }) => {
  const giveRandom = () => {
    return Math.floor(Math.random() * (350 + 100) - 100);
  };

  const giveRandomY = () => {
    return Math.floor(Math.random() * (100 - 0) + 0);
  };
  return (
    <div className="relative h-[300px] grow">
      <div className="absolute z-10 top-1/4 left-1/2 -translate-x-[100px] w-[400px] h-[150px]">
        {global.map((item, i) => (
          <motion.div
          key={i}
            animate={{ y: 10, opacity: 1, scale: 1 }}
            style={{
              opacity: 0,
              scale: 0,
              left: `${Math.floor(Math.cos(i) * 110)}px`,
              top: `${Math.floor(Math.sin(i) * 50)}px`,
            }}
            className={`w-[150px] absolute`}
          >
            <Image
              className="w-full relative z-10 h-full object-cover"
              alt="img"
              height={150}
              width={150}
              src={`/${item}.png`}
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-2/4">
        <Image alt="img" height={500} width={500} src={`/basket.png`} />
        <div className="absolute top-0 z-50">
          <Image
            className="relative z-40"
            alt="img"
            height={400}
            width={400}
            src={`/basketf.png`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimationPlayer;
