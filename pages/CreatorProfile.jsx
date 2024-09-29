import React, { useState } from "react";
import Navbar from "../src/components/navbar/navbar";
import cardItems from "../src/constants/card";
import Card from "../src/components/card/card";
import leaderboardItems from "../src/constants/leaderboardConstants";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../src/components/ui/accordion";
import subscriberContent from "../src/constants/subscribersTableConstants";
import dropsContent from "../src/constants/dropsTableContent";

import aboutIcon from "../src/assets/accordion/about.svg";
import perksIcon from "../src/assets/accordion/perks.svg";
import walletIcon from "../src/assets/profile/WalletOutline.svg";
import ElixirIcon from "../src/assets/profile/ElixirIcon.svg";
import FolderIcon from "../src/assets/profile/FolderIcon.svg";
import sparkIconWhite from "../src/assets/profile/sparkIconWhite.svg";
import subsIconWhite from "../src/assets/profile/subsIconWhite.svg";
import collectorsIconWhite from "../src/assets/profile/collectorsIconWhite.svg";
import viewsIconWhite from "../src/assets/profile/viewsIconWhite.svg";

import DashProfileCard from "../src/components/profile/profile-card/DashProfileCard";
import LeaderboardCard from "../src/components/profile/leaderboard-card/LeaderboardCard";
import DropsTable from "../src/components/profile/DropsTable";
import SubscribersTable from "../src/components/profile/SubscribersTable";
import ActivitiesTable from "../src/components/profile/ActivitiesTable";
import CreatorMintForm from "../src/components/mint-form/CreatorMintForm";
import Graph from "../src/components/profile/Graph";

function Profile() {
  const [isCreator, setIsCreator] = useState(true);
  const [showMintForm, setShowMintForm] = useState(false);
  const [graphValue, setGraphValue] = useState("sparks");
  return (
    <>
      {/* Show NFT Mint form modal */}
      {showMintForm && <CreatorMintForm setShowMintForm={setShowMintForm} />}

      <main className="min-h-screen bg-[#0d0a1b] pb-10">
        <Navbar />

        {/* Top purple banner */}
        <section className="w-full max-w-[1400px] h-[50vh] lg:h-[200px] bg-gradient-to-r from-[#5247af] to-[#4b40ae] via-[#7620ee] lg:rounded-b-2xl mx-auto"></section>

        {/* Content */}
        <section className="w-full max-w-[1300px] flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 mx-auto">
          {/* Profile card */}
          <DashProfileCard isCreator={isCreator} />

          {/* Cards tab group */}
          <section className="w-full max-w-[1260px] h-fit mt-10 mx-auto space-y-8">
            {/* Accordion - about, perks */}
            {!isCreator && (
              <div className="bg-[#0d0a1b] text-white space-y-8">
                <Accordion
                  type="single"
                  collapsible
                  className="bg-[#1D1538] font-semibold border border-[#6D53B5] rounded-lg px-4"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex justify-center items-center gap-2">
                        <img src={aboutIcon} alt="" height={20} width={20} />
                        <p className="text-base leading-[24px]">About</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#94A3B8] text-sm">
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion
                  type="single"
                  collapsible
                  className="bg-[#1D1538] font-semibold border border-[#6D53B5] rounded-lg px-4"
                >
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex justify-center items-center gap-2">
                        <img src={perksIcon} alt="" height={20} width={20} />
                        <p className="text-base leading-[24px]">Perks</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#94A3B8] text-sm">
                      Top 20 Thankers will receive a Legendary.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* Top graphs, create NFT button */}
            {isCreator && (
              <>
                <section className="flex justify-between px-4 lg:px-0">
                  <div className="flex items-center gap-[10px] leading-5 font-medium bg-[#150A32] rounded-lg px-4 py-3">
                    <span className="flex gap-2">
                      <img
                        src={walletIcon}
                        alt="wallet-icon"
                        width={20}
                        height={20}
                      />
                      <p className="text-[#9A8FFF]">Balance</p>
                    </span>
                    <span className="flex gap-1">
                      <p className="text-white">5000</p>
                      <img
                        src={ElixirIcon}
                        alt="elixir-icon"
                        width={16}
                        height={16}
                      />
                    </span>
                  </div>
                  <button
                    onClick={() => setShowMintForm(true)}
                    className="flex items-center gap-2 bg-[#D0AAFF] font-readex-pro font-medium rounded-lg px-6 py-3"
                  >
                    <img
                      src={FolderIcon}
                      alt="create-nft icon"
                      width={20}
                      height={20}
                    />
                    <p>Create NFT</p>
                  </button>
                </section>

                {/* Graph section */}
                <section className="w-full flex flex-col lg:flex-row gap-4">
                  {/* Graph - buttons */}
                  <div className="w-full lg:w-[200px] grid grid-cols-2 lg:grid-cols-1 place-content-center gap-4 px-4 lg:px-0">
                    <button
                      onClick={() => setGraphValue("sparks")}
                      className={
                        (graphValue === "sparks" ? "!bg-[#27204D]" : "") +
                        " text-white text-left bg-[#151329] rounded-xl px-6 py-4 space-y-3 hover:bg-[#27204D] border border-[#D8CBFF] border-opacity-10"
                      }
                    >
                      <span className="flex gap-1">
                        <img
                          src={sparkIconWhite}
                          alt="spark-icon"
                          width={16}
                          height={16}
                        />
                        <p className="text-sm text-nowrap">Sparks Earned</p>
                      </span>
                      <p className="text-[18px] font-medium">673</p>
                    </button>
                    <button
                      onClick={() => setGraphValue("subs")}
                      className={
                        (graphValue === "subs" ? "!bg-[#27204D]" : "") +
                        " text-white text-left bg-[#151329] rounded-xl px-6 py-4 space-y-3 hover:bg-[#27204D] border border-[#D8CBFF] border-opacity-10"
                      }
                    >
                      <span className="flex gap-1">
                        <img
                          src={subsIconWhite}
                          alt="subscribers-icon"
                          width={16}
                          height={16}
                        />
                        <p className="text-sm text-nowrap">Subscribers</p>
                      </span>
                      <p className="text-[18px] font-medium">3,076</p>
                    </button>
                    <button
                      onClick={() => setGraphValue("collectors")}
                      className={
                        (graphValue === "collectors" ? "!bg-[#27204D]" : "") +
                        " text-white text-left bg-[#151329] rounded-xl px-6 py-4 space-y-3 hover:bg-[#27204D] border border-[#D8CBFF] border-opacity-10"
                      }
                    >
                      <span className="flex gap-1">
                        <img
                          src={collectorsIconWhite}
                          alt="collectors-icon"
                          width={16}
                          height={16}
                        />
                        <p className="text-sm text-nowrap">Collectors</p>
                      </span>
                      <p className="text-[18px] font-medium">124</p>
                    </button>
                    <button
                      onClick={() => setGraphValue("views")}
                      className={
                        (graphValue === "views" ? "!bg-[#27204D]" : "") +
                        " text-white text-left bg-[#151329] rounded-xl px-6 py-4 space-y-3 hover:bg-[#27204D] border border-[#D8CBFF] border-opacity-10"
                      }
                    >
                      <span className="flex gap-1">
                        <img
                          src={viewsIconWhite}
                          alt="views-icon"
                          width={16}
                          height={16}
                        />
                        <p className="text-sm text-nowrap">Views</p>
                      </span>
                      <p className="text-[18px] font-medium">12,320</p>
                    </button>
                  </div>

                  {/* Actual graph */}
                  <div className="w-full h-[300px] lg:h-auto bg-[#151329] rounded-lg lg:py-6">
                    <Graph value={graphValue} />
                  </div>
                </section>
              </>
            )}

            <Tabs
              defaultValue="drops"
              className="w-full flex flex-col justify-center items-start bg-[#151329]"
            >
              <TabsList className="bg-[#0d0a1b] overflow-x-auto overflow-y-hidden flex justify-center items-center lg:justify-start lg:gap-6">
                <TabsTrigger value="drops">Drops</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                {isCreator && (
                  <>
                    <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                  </>
                )}
              </TabsList>

              {/* Drops tab - User POV */}
              <TabsContent value="drops" className="w-full">
                {!isCreator && (
                  <div className="w-fit max-w-[1260px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5 place-items-center px-4 lg:px-8 lg:pt-4 pb-8 mx-auto">
                    {cardItems.map((item) => {
                      return (
                        <Card
                          key={item.id}
                          id={item.id}
                          imageURL={item.imageURL}
                          publishedDate={item.publishedDate}
                          collectors={item.collectors}
                          collectionName={item.collectionName}
                          creatorName={item.creatorName}
                          likes={item.likes}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Drops tab - Creator POV */}
                {isCreator && <DropsTable content={dropsContent} />}
              </TabsContent>
              <TabsContent value="leaderboard" className="w-full">
                <div className="w-full max-w-[1260px] px-4 lg:px-8 lg:pt-4 pb-8 space-y-4 mx-auto">
                  {leaderboardItems.map((item) => {
                    return (
                      <LeaderboardCard
                        position={item.position}
                        pfp={item.pfp}
                        name={item.name}
                        sparks={item.sparks}
                      />
                    );
                  })}
                </div>
              </TabsContent>

              {/* Subscribers tab - Creator POV */}
              <TabsContent value="subscribers" className="w-full">
                <SubscribersTable content={subscriberContent} />
              </TabsContent>

              {/* Activities tab - Creator POV */}
              <TabsContent value="activities" className="w-full">
                <ActivitiesTable />
              </TabsContent>
            </Tabs>
          </section>
        </section>
      </main>
    </>
  );
}

export default Profile;
