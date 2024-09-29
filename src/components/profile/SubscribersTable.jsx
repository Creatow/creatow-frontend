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
import userIcon from "../../assets/profile/subscribers/userIcon.svg";
import walletIcon from "../../assets/profile/subscribers/walletIcon.svg";
import calendarIcon from "../../assets/profile/subscribers/calendarIcon.svg";

function SubscribersTable(props) {
  return (
    <div className="w-full max-w-[1260px] text-white">
      <Table>
        {/* <TableCaption>leaderboard</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">
              <div className="flex justify-start items-center gap-1">
                <img src={userIcon} alt="" />
                <p>Subscriber</p>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="w-max flex shrink-0 text-nowrap justify-start items-center gap-1">
                <img src={walletIcon} alt="" />
                <p>Wallet Address</p>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="w-max flex shrink-0 text-nowrap justify-start items-center gap-1">
                <img src={calendarIcon} alt="" />
                <p>Subscribed On</p>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-semibold">
          {props.content.map((item) => {
            return (
              <TableRow>
                <TableCell className="text-center">
                  <div className="w-max flex justify-start items-center gap-4">
                    <img src={item.image} alt="" />
                    <p>{item.subscriberName}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center w-[150px]">
                  <p className="w-max mx-auto truncate max-w-[100px]">
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
