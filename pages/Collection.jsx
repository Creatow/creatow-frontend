import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../src/components/navbar/navbar";
import CollectionModal from "/src/components/modal/collectionModal";

function Collection() {
  const { collectionID } = useParams();
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/collections/${collectionID}`);
        console.log('Collection data:', response.data);
        setCollectionData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching collection data:", err);
        setError("Failed to fetch collection data. Please try again.");
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [collectionID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="bg-[#19162f] space-y-8">
      <Navbar />
      {collectionData && <CollectionModal collectionData={collectionData} />}
    </main>
  );
}

export default Collection;
