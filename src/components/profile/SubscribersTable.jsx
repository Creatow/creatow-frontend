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

function SubscribersTable(props) {
  return (
    <div className="w-full max-w-[1260px] text-white">
      <Table>
        {/* <TableCaption>leaderboard</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Subscriber</TableHead>
            <TableHead className="text-center">Wallet Address</TableHead>
            <TableHead className="text-center">Subscribed On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-semibold">
          {props.content.map((item) => {
            return (
              <TableRow>
                <TableCell className="text-center">
                  <div className="w-fit flex justify-start items-center gap-4">
                    <img src={item.image} alt="" />
                    <p>{item.subscriberName}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center w-[150px]">
                  <p className="w-fit mx-auto truncate max-w-[100px]">
                    {item.walletAddress}
                  </p>
                </TableCell>
                <TableCell className="text-center w-[150px]">
                  {item.subscribedOnDate}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default SubscribersTable;
