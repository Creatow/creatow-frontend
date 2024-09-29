import React from "react";
import ActivityCard from "./ActivityCard";

function ActivitiesTable() {
  return (
    <section className="px-4 overflow-auto">
      <ActivityCard type="subscription" date="30/09/2023" elixir="5000" />
      <ActivityCard type="subscription" date="30/09/2023" elixir="50" />
    </section>
  );
}

export default ActivitiesTable;
