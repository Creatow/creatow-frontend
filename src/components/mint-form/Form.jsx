import React, { useState } from "react";
import uploadIcon from "../../assets/uploadIcon.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

function Form({
  nftImage,
  nftName,
  description,
  category,
  tags,
  walletAddress,
  updateFields,
}) {
  const [previewImage, setPreviewImage] = useState();

  function getImage(event) {
    updateFields({ nftImage: URL.createObjectURL(event.target.files[0]) });
    // setPreviewImage(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <div className="text-white font-readex-pro space-y-6">
      <h3 className="text-[24px] lg:text-[32px]">Mint NFT</h3>

      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-[72px]">
        {/* Left section */}
        <span>
          <label htmlFor="collection-image">
            <div className="text-sm space-y-6">
              <p>Upload your collection image</p>
              <div className="min-h-[250px] lg:max-w-[250px] lg:aspect-square  flex justify-center items-center bg-[#27194E] rounded-2xl border-[#D0AAFF] border cursor-pointer overflow-hidden">
                <img
                  src={nftImage ? nftImage : uploadIcon}
                  alt="upload-icon"
                  className="object-cover"
                />
              </div>
              <p className="text-[#6C6C89]">
                Resolution: 560x480px. <br /> Maximum size: 100MB. <br />
                Supported file types: .jpeg, .gif, .webp, .png, .html, .glb, and
                .mp4.
              </p>
            </div>
          </label>
          <input
            onChange={getImage}
            type="file"
            name="collection-image"
            id="collection-image"
            className="hidden"
          />
        </span>

        {/* Right section */}
        <div className="w-full space-y-6">
          <span className="flex flex-col gap-2">
            <label htmlFor="nft-name">Name your NFT</label>
            <input
              type="text"
              value={nftName}
              onChange={(e) => updateFields({ nftName: e.target.value })}
              placeholder="NFT Name"
              className="py-2 px-4 text-sm lg:text-base bg-transparent border-[#363355] border rounded-lg"
              id="nft-name"
              maxLength={22}
              required
            />
          </span>
          <span className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              value={description}
              onChange={(e) => updateFields({ description: e.target.value })}
              placeholder="Enter the description of your NFT here"
              className="py-2 px-4 text-sm lg:text-base bg-transparent border-[#363355] border rounded-lg"
              id="description"
              maxLength={324}
              required
            />
          </span>

          <span className="flex flex-col gap-2">
            <label htmlFor="categories">Categories</label>
            <Select
              value={category}
              onValueChange={(value) => updateFields({ category: value })}
            >
              <SelectTrigger className="border border-[#363355] text-white text-opacity-50  bg-transparent gap-2">
                <SelectValue placeholder="Choose categories" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1B48] font-semibold text-white border border-[#9a8fff] rounded-lg z-[9999]">
                <SelectItem
                  value="All"
                  className="focus:bg-[#D0AAFF33] focus:text-white py-3"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="Art"
                  className="focus:bg-[#D0AAFF33] focus:text-white py-3"
                >
                  Art
                </SelectItem>
                <SelectItem
                  value="Audio"
                  className="focus:bg-[#D0AAFF33] focus:text-white py-3"
                >
                  Audio
                </SelectItem>
                <SelectItem
                  value="3D"
                  className="focus:bg-[#D0AAFF33] focus:text-white py-3"
                >
                  3D
                </SelectItem>
                <SelectItem
                  value="GenAI"
                  className="focus:bg-[#D0AAFF33] focus:text-white py-3"
                >
                  GenAI
                </SelectItem>
              </SelectContent>
            </Select>
          </span>

          <span className="flex flex-col gap-2">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => updateFields({ tags: e.target.value })}
              placeholder="Add tags"
              className="py-2 px-4 text-sm lg:text-base bg-transparent border-[#363355] border rounded-lg"
              id="tags"
              required
            />
          </span>

          <span className="flex flex-col gap-2">
            <label htmlFor="wallet-address">Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              // onChange={(e) => updateFields({ walletAddress: e.target.value })}
              placeholder="Your wallet address"
              className="py-2 px-4 text-sm lg:text-base bg-transparent border-[#363355] text-slate-400 border rounded-lg cursor-not-allowed"
              id="wallet-address"
              required
              disabled
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Form;
