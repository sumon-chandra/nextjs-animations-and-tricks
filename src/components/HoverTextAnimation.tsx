
const HoverTextAnimation = () => {
   return (
      <main className="flex min-h-screen flex-col items-center justify-center">
         <div className="text-4xl font-light">
            {
               "Hello World".split("").map((child, idx) => (
                  <span
                     key={idx}
                     className="hoverText text-slate-400 hover:font-black hover:text-slate-100 transition-all duration-300"
                  >
                     {child}
                  </span>
               ))
            }
         </div>
      </main>
   )
}

export default HoverTextAnimation
