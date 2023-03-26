import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const PaulMorris = () =>{

    return (
        <div className="fixed bottom-5 right-5 text-white font-semibold-800 flex flex-row justify-center items-center gap-3">
            <p>
            <span className="font-extralight text-sm">By</span> Paul Morris <span className="font-extralight text-sm">2023</span>
            </p>
            <a className="hover:scale-150 transition transform" href="https://github.com/creative2012" target="__new">
                <FaGithub size={25}/>
            </a>
            <a className="hover:scale-150 transition transform" href="https://www.linkedin.com/in/paul-morris-1b938230" target="__new">
                <FaLinkedin size={25}/>
            </a>
        </div>
    )
}


export default PaulMorris;