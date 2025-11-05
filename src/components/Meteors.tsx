interface MeteorsProps {
  count?: number;
}

export function Meteors({ count = 10 }: MeteorsProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const randomLeft = Math.floor(Math.random() * 100);
        const randomDelay = Math.random() * 3;
        const randomDuration = Math.random() * 2 + 3;
        
        return (
          <span
            key={`meteor-${index}`}
            className="absolute pointer-events-none"
            style={{
              left: `${randomLeft}%`,
              top: `-5px`,
              animationDelay: `${randomDelay}s`,
              animation: `meteorFall ${randomDuration}s linear infinite`,
            }}
          >
            {/* Meteor head */}
            <span 
              className="block w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-[0_0_10px_2px_rgba(96,165,250,0.5)]"
            />
            
            {/* Meteor trail */}
            <span 
              className="absolute top-0 left-1 block h-[1px] w-[80px] bg-gradient-to-r from-blue-400 via-purple-400 to-transparent opacity-70"
              style={{
                transform: 'rotate(45deg) translateY(-0.5px)',
                transformOrigin: 'left center',
              }}
            />
          </span>
        );
      })}
      
      <style>{`
        @keyframes meteorFall {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translate(300px, 300px) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
