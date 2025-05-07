import React from "react";

interface Player {
  nom: string;
  points: number;
  rebonds: number;
  passes: number;
  interceptions: number;
}

interface CardProps {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

const Card: React.FC<CardProps> = ({
  id,
  abbreviation,
  city,
  conference,
  division,
  full_name,
}) => {
  return (
    <div className="flex min-h-screen  justify-center bg-slate-100 cursor-pointer ">
      <div className="group h-96 w-96 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 ">
            <img
              src="https://images.unsplash.com/photo-1519861531473-9200262188bf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFza2V0fGVufDB8fDB8fHww"
              alt="NBA Logo"
              className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40 bg-red-500"
            />
          </div>

          <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)][backface-visibility:hidden]">
            <div className="flex min-h-full flex-col items-center justify-center">
              {/* <Link
                to={`/team/${id}`}
              > */}
                <h2 className="text-3xl font-bold">{full_name}</h2>
              {/* </Link> */}
                  <p className="text-lg">{city}</p>
                  <p className="text-lg">{abbreviation}</p>
                  <p className="text-lg">{conference}</p>
                  <p className="text-base">{division}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
