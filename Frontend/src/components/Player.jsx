import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause, // Added for play/pause toggle
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Retained as per your request
import { useEffect } from "react";

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio, // This prop will be the audio source URL
}) => {
  // useRef to get a direct reference to the audio DOM element
  const audioPlayer = useRef();
  // useState to manage the playing state of the audio

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(timeInSeconds - minutes * 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const timeInSeconds = (timeString) => {
    const splitArray = timeString.split(":");
    const minutes = Number(splitArray[0]);
    const seconds = Number(splitArray[1]);

    return seconds + minutes * 60;
  };

  const progressBar = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const durationInSeconds = timeInSeconds(duration);

  /**
   * Toggles the play and pause state of the audio.
   * If currently paused, it attempts to play. If playing, it pauses.
   */
  const togglePlayPause = () => {
    // Check if the audio element exists
    if (audioPlayer.current) {
      if (isPlaying) {
        // If currently playing, pause the audio
        audioPlayer.current.pause();
      } else {
        // If currently paused, play the audio
        // The play() method returns a Promise which can be caught for errors
        audioPlayer.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          // You might want to show a user-friendly message here,
          // for example, if the browser requires a user gesture to play audio.
        });
      }
      // Toggle the isPlaying state
      setIsPlaying(!isPlaying);
    }
    setCurrentTime(formatTime(audioPlayer.current.currentTime));

    console.log(formatTime(audioPlayer.current.currentTime));
  };

  const changeSong = () => {
    console.log("tentou trocar a musica");
    audioPlayer.current.pause();
    setIsPlaying(false);

    // Alterações visuais
    setCurrentTime(formatTime(0));
    progressBar.current.style.setProperty("--_progress", "0%");
    console.log("Tentou mudar a música");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying)
        setCurrentTime(formatTime(audioPlayer.current.currentTime));

      progressBar.current.style.setProperty(
        "--_progress",
        (audioPlayer.current.currentTime / durationInSeconds) * 100 + "%"
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <div className="player bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center m-4 max-w-lg w-full">
      <div className="player__controllers flex items-center justify-center space-x-6 mb-4">
        {/* Backward Step Icon - Uses Link for navigation */}
        <Link
          to={`/song/${randomIdFromArtist}`}
          onClick={() => changeSong()}
          className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
        >
          <FontAwesomeIcon
            className="player__icon text-4xl cursor-pointer"
            icon={faBackwardStep}
          />
        </Link>

        {/* Play/Pause Icon - Toggles playback */}
        <button
          onClick={togglePlayPause}
          className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 focus:outline-none"
        >
          <FontAwesomeIcon
            className="player__icon player__icon--play text-6xl cursor-pointer"
            // Change icon based on playing state
            icon={isPlaying ? faCirclePause : faCirclePlay}
          />
        </button>

        {/* Forward Step Icon - Uses Link for navigation */}
        <Link
          to={`/song/${randomId2FromArtist}`}
          onClick={() => changeSong()}
          className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
        >
          <FontAwesomeIcon
            className="player__icon text-4xl cursor-pointer"
            icon={faForwardStep}
          />
        </Link>
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>

        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>

        <p>{duration}</p>
      </div>

      {/* Audio element - Hidden but controlled by React component */}
      {/* The src prop is passed from the parent component */}
      <audio ref={audioPlayer} src={audio} preload="auto"></audio>
    </div>
  );
};

export default Player;
