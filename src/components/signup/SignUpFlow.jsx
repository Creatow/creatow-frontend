import React, { useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import crossIcon from "../../assets/modal/crossIcon.svg";
import TOS from "./TOS";
import CreateUserProfile from "./CreateUserProfile";
import HowElixirWorkInfo from "./HowElixirWorkInfo";
import ElixirClaim from "./ElixirClaim";
import FollowChannels from "./FollowChannels";
import YoureIn from "./YoureIn";

const INITIAL_DATA = {
  TOSAgree: false,
  username: "",
  avatar: "avatar1",
  elixr: 0,
  followedChannels: [{}],
};

const stepCTAs = [
  "I Agree",
  "Create Profile",
  "Claim Elixir",
  "Next",
  "Next",
  "Explore the app",
];

function SignUpFlow(props) {
  // State for data
  const [data, setData] = useState(INITIAL_DATA);
  // State to hide next button
  const [hideNext, setHideNext] = useState(false);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, step, next, back, isFirstStep, isLastStep, currentStepIndex } =
    useMultistepForm([
      <TOS {...data} updateFields={updateFields} />,
      <CreateUserProfile {...data} updateFields={updateFields} />,
      <HowElixirWorkInfo {...data} updateFields={updateFields} />,
      <ElixirClaim
        setHideNext={setHideNext}
        {...data}
        updateFields={updateFields}
      />,
      <FollowChannels {...data} updateFields={updateFields} />,
      <YoureIn {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(event) {
    event.preventDefault();
    // Submit form only if not at last step
    if (!isLastStep) return next();

    // TODO: some fetch request here
    console.log(data);
    props.setShowSignUpFlow(false);
  }

  return (
    <main className="h-screen w-screen fixed left-0 top-0 z-[999] bg-black text-white bg-opacity-50 backdrop-blur-lg overflow-auto">
      <section className="z-[9999] relative lg:top-20 lg:w-fit lg:max-w-[550px] lg:h-fit bg-[#19162F] mx-auto px-4 lg:px-[40px] py-12 lg:py-10 lg:rounded-2xl">
        {/* Modal close button */}

        <form onSubmit={onSubmit}>
          {/* Actual content */}
          {step}

          {/* Next Button */}
          <button
            type="submit"
            className={
              hideNext
                ? "hidden"
                : "block" +
                  " w-full lg:w-full px-6 py-3 mt-6 bg-[#D0AAFF] text-black font-readex-pro font-semibold rounded-lg"
            }
          >
            {stepCTAs[currentStepIndex]}
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUpFlow;
