import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import collectionsIcon from "../../assets/profile/drops/FolderPlus.svg";
import collectorsIcon from "../../assets/profile/drops/collectorsIcon.svg";
import sparksIcon from "../../assets/profile/drops/sparksIcon.svg";
import calendarIcon from "../../assets/profile/drops/calendarIcon.svg";
import hashIcon from "../../assets/profile/drops/hashIcon.svg";

function DropsTable(props) {
  return (
    <div className="w-full max-w-[1260px] text-white">
      <Table>
        {/* <TableCaption>leaderboard</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">
              <div className="flex shrink-0 text-nowrap justify-start items-center gap-1">
                <img src={collectionsIcon} alt="" />
                <p>Collections</p>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex shrink-0 text-nowrap justify-center items-center gap-1">
                <img src={collectorsIcon} alt="" />
                <p>Collectors</p>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex shrink-0 text-nowrap justify-center items-center gap-1">
                <img src={sparksIcon} alt="" />
                <p>Sparks</p>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex shrink-0 text-nowrap justify-center items-center gap-1">
                <img src={calendarIcon} alt="" />
                <p>Date</p>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex shrink-0 text-nowrap justify-center items-center gap-1">
                <img src={hashIcon} alt="" />
                <p>No of Mints</p>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-semibold">
          {props.content.map((item) => {
            return (
              <TableRow key={item.position}>
                <TableCell className="text-center">
                  <div className="w-fit flex justify-start items-center gap-4">
                    <div className="w-6 aspect-square bg-[#493481] rounded-md text-center flex justify-center items-center shrink-0">
                      <p className="text-sm">{item.position}</p>
                    </div>
                    <img src={item.image} alt="" />
                    <p>{item.collectionName}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {item.collectorCount}
                </TableCell>
                <TableCell className="text-center">{item.sparks}</TableCell>
                <TableCell className="text-center">{item.date}</TableCell>
                <TableCell className="text-center">{item.mints}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default DropsTable;
