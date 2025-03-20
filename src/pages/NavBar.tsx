import { useEffect, useState, useMemo } from "react";

const NavigationBar = () => {
  const taglines = useMemo(() => ["Organize.", "Prioritize.", "Conquer."], []);

  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const delay = isDeleting && currentText === "" ? 1000 : typingSpeed;

    const handleTyping = () => {
      if (!isDeleting && charIndex < taglines[wordIndex].length) {
        setCurrentText((prev) => prev + taglines[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        if (!isDeleting) {
          setIsDeleting(true);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % taglines.length);
          setCharIndex(0);
        }
      }
    };

    const timeout = setTimeout(handleTyping, delay);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, currentText, taglines]);

  return (
    <nav className="bg-transparent flex justify-center items-center  w-full text-center inset-0 z-50">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src="/assets/todoLogo.svg"
          alt="Logo"
          className="w-16 sm:w-20 h-16 sm:h-20"
        />

        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 flex flex-col text-center sm:text-left">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            TaskTrack
          </span>

          <span className="text-gray-600 text-lg italic tracking-wide min-h-[24px]">
            {currentText}
            <span className="inline-block w-1 bg-gray-600 animate-blink">
              &nbsp;
            </span>
          </span>
        </h1>
      </div>
    </nav>
  );
};

export default NavigationBar;
