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

function DropsTable(props) {
  return (
    <div className="w-full max-w-[1260px] text-white">
      <Table>
        {/* <TableCaption>leaderboard</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Collections</TableHead>
            <TableHead className="text-center">Collectors</TableHead>
            <TableHead className="text-center">Sparks</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">No. of Mints</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-semibold">
          {props.content.map((item) => {
            return (
              <TableRow key={item.position}>
                <TableCell className="text-center">
                  <div className="w-fit flex justify-start items-center gap-4">
                    <div className="w-6 aspect-square bg-[#493481] rounded-md text-center flex justify-center items-center">
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
