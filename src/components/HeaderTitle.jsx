import { Pacifico  } from "next/font/google";

const fontTitle = Pacifico({
  weight: "400",
  subsets: ["latin"]
})

function HeaderTitle({ children }) {
    return (
            <h1 className={`
                text-4xl font-bold text-center mx-5 my-3 leading-[1.8em]
                bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent
                ${fontTitle.className}`}>
                {children}
            </h1>
    )
}

export default HeaderTitle
