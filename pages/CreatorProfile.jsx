import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../src/components/navbar/navbar";
import Card from "../src/components/card/card";
import LeaderboardCard from "../src/components/profile/leaderboard-card/LeaderboardCard";
import DashProfileCard from "../src/components/profile/profile-card/DashProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../src/components/ui/accordion";
import aboutIcon from "../src/assets/accordion/about.svg";
import perksIcon from "../src/assets/accordion/perks.svg";

function CreatorProfile() {
  const [creatorData, setCreatorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const { creatorUsername } = useParams();

  const fetchCreatorData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/creators/${creatorUsername}`);
      setCreatorData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching creator data:", err);
      setError("Failed to fetch creator data. Please try again.");
      setLoading(false);
    }
  }, [creatorUsername]);

  const fetchLeaderboardData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/v1/creators/${creatorUsername}/leaderboard`);
      setLeaderboardData(response.data);
    } catch (err) {
      console.error("Error fetching leaderboard data:", err);
      // Don't set an error state here, as this is not critical data
    }
  }, [creatorUsername]);

  useEffect(() => {
    Promise.all([fetchCreatorData(), fetchLeaderboardData()]);
  }, [fetchCreatorData, fetchLeaderboardData]);

  const handleSubscribe = useCallback(async () => {
    // Implement subscription logic here
    console.log("Subscribe clicked");
  }, []);

  const handleSpark = useCallback(async () => {
    // Implement spark logic here
    console.log("Spark clicked");
  }, []);

const renderCollections = useMemo(() => {
  if (!creatorData || !creatorData.collections) return null;
  return creatorData.collections.map((collection) => (
    <Card
      key={collection.id}
      id={collection.id}
      imageURL={collection.image || "placeholder-url"}
      publishedDate={new Date(collection.createdAt).toLocaleDateString()}
      collectors={collection.collectorsCount || 0}
      collectionName={collection.name}
      creatorName={creatorData.name}
      likes={collection.likesCount || 0}
    />
  ));
}, [creatorData]);

  if (loading) return <div className="min-h-screen bg-[#0d0a1b] flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#0d0a1b] flex items-center justify-center text-white">Error: {error}</div>;
  if (!creatorData) return <div className="min-h-screen bg-[#0d0a1b] flex items-center justify-center text-white">Creator not found</div>;

  return (
    <main className="min-h-screen bg-[#0d0a1b] pb-10">
      <Navbar />

      <section className="w-full max-w-[1400px] h-[50vh] lg:h-[200px] bg-gradient-to-r from-[#5247af] to-[#4b40ae] via-[#7620ee] lg:rounded-b-2xl mx-auto"></section>

      <section className="w-full max-w-[1300px] flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 mx-auto">
        <DashProfileCard
          name={creatorData.name}
          username={creatorData.username}
          profilePicture={creatorData.profilePicture}
          walletAddress={creatorData.walletAddress}
          joinedDate={creatorData.joinedDate}
          isCreator={true}
          sparksEarned={creatorData.sparksEarned}
          subscribersCount={creatorData.subscribersCount}
          collectorsCount={creatorData.collectorsCount}
          viewsCount={creatorData.viewsCount}
          onSubscribe={handleSubscribe}
          onSpark={handleSpark}
          owner={false}
        />

        <section className="w-full max-w-[1260px] h-fit mt-10 mx-auto space-y-8">
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
                  {creatorData.creatorDescription || "No description available."}
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
                  {creatorData.perks?.length > 0 ? creatorData.perks.join(", ") : "No perks available."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Tabs
            defaultValue="drops"
            className="w-full flex flex-col justify-center items-start bg-[#151329]"
          >
            <TabsList className="bg-[#0d0a1b] flex justify-center items-center lg:justify-start lg:gap-6">
              <TabsTrigger value="drops">Drops</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            <TabsContent value="drops" className="w-full">
              <div className="w-fit max-w-[1260px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5 place-items-center px-4 lg:px-8 lg:pt-4 pb-8 mx-auto">
                {renderCollections}
              </div>
            </TabsContent>
            <TabsContent value="leaderboard" className="w-full">
              <div className="w-full max-w-[1260px] px-4 lg:px-8 lg:pt-4 pb-8 space-y-4 mx-auto">
                {leaderboardData.length > 0 ? (
                  leaderboardData.map((item, index) => (
                    <LeaderboardCard
                      key={item.id}
                      position={index + 1}
                      pfp={item.profilePicture}
                      name={item.name}
                      sparks={item.sparks}
                    />
                  ))
                ) : (
                  <p className="text-center text-white">No leaderboard data available.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </section>
    </main>
  );
}

export default CreatorProfile;
