/** @format */

import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { NewPost } from "../components/new-post";
import { Post } from "../components/post/post";
import Layout from "../sections/Layout";

import axios from "axios";
import moment from "moment";
import {
  ProgramContextInterface,
  UseProgramContext,
} from "../contexts/programContextProvider";
import { Leaderboard } from "../types/leaderboard";
import { SERVER_URL } from "../../config";
import { client } from "../utils/api";
import { trpc } from "../utils/trpc";

// const test = await client.getUser.query("hi");
export default function Home() {
  const hello = trpc.getUser.useQuery("hi");
  const create = trpc.createUser.useMutation({});

  console.log(create.data);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [fetchedLeaderboard, setFetchedLeaderboard] = useState(false);
  useEffect(() => {
    if (!fetchedLeaderboard) {
      fetchLeaderboard();
      setFetchedLeaderboard(true);
    }
    create.mutate({ name: "hisdasdasdsadasd" });
  }, []);

  async function fetchLeaderboard() {
    try {
      const response = await axios.post(
        `${SERVER_URL}/public/get-leaderboard?skip=0`
      );
      response.data;
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>Social Block</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout active={1}>
        <main
          style={{ width: 1700 }}
          className="  bg-slate-900 w flex justify-center flex-row"
        >
          <LeaderboardTable leaderboard={leaderboard} />
          {leaderboard.length < 7 && (
            <div style={{ marginBottom: 999 }} className=""></div>
          )}
        </main>
      </Layout>
    </>
  );
}

function LeaderboardTable({ leaderboard }: { leaderboard: Leaderboard[] }) {
  return (
    <div style={{}} className="w-1/2 overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              username
            </th>
            <th scope="col" className="py-3 px-6">
              Points
            </th>
            <th scope="col" className="py-3 px-6">
              Posts
            </th>
            <th scope="col" className="py-3 px-6">
              Captcha Solved
            </th>
            <th scope="col" className="py-3 px-6">
              Likes
            </th>
            <th scope="col" className="py-3 px-6">
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 &&
            leaderboard.map((l) => (
              <TableRow
                key={l.user_id}
                username={l.username}
                user_id={l.user_id}
                points={l.points}
                posts={l.posts}
                captchaSolved={l.captchaSolved}
                comments={l.comments}
                likes={l.likes}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
function TableRow({
  username,
  points,
  posts,
  captchaSolved,
  likes,
  comments,
}: Leaderboard) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {username}
      </th>
      <td className="py-4 px-6">{points}</td>
      <td className="py-4 px-6">{posts}</td>
      <td className="py-4 px-6">{captchaSolved}</td>
      <td className="py-4 px-6">{likes}</td>
      <td className="py-4 px-6"> {comments} </td>
    </tr>
  );
}
