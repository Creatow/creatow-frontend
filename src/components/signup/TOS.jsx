import React from "react";

function TOS() {
  // Links
  const TosLink = "";
  const PrivacyPoliclyLink = "";

  return (
    <div className="space-y-2">
      <h2 className="text-[32px] font-bold font-readex-pro">
        Terms of Services
      </h2>
      <p className="text-[#D0AAFF]">
        By clicking below you agree to our
        <a href={TosLink} className="underline"> Terms of Service </a>and
        <a href={PrivacyPoliclyLink} className="underline"> Privacy Policy.</a>
      </p>
    </div>
  );
}

export default TOS;
