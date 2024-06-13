import React from "react";
// chakra
import { Box } from "@chakra-ui/react";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
const Right = () => {
  const randomTweet = [
    "1801087095340986476",
    "1801177693590839323",
    "1801087656027357577",
    "1654011089804464129",
    "1800529677326663996",
    "1800387052577677351",
    "1799717968311677320",
    "1799818364879356181",
  ];
  const randomTweeter = ["yayoiken_com", "livedoornews"];
  return (
    <Box pos="fixed" maxW={"80%"} ml={10}>
      <TwitterTweetEmbed
        tweetId={randomTweet[Math.floor(Math.random() * randomTweet.length)]}
        // options={{ width: 600, theme: "dark" }}
        options={{ width: 600 }}
      />

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={
          randomTweeter[Math.floor(Math.random() * randomTweeter.length)]
        }
        options={{ height: 600, theme: "dark" }}
        data-theme="dark"
      />
    </Box>
  );
};

export default Right;
