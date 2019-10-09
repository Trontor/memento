import React, { useEffect, useState } from "react";
import { PageSpinnerWrapper, Spinner } from "ui/Loaders";
import { JollyQuote } from "./JollyLoaderStyles";

let usedQuotes = [];

/**
 * The JollyLoader component renders a spinner and a quote from a list of
 * supplied quotes.
 */
export default function JollyLoader(props) {
  let quotes = props.quotes || ["Loading..."];
  const [currentQuote, setQuote] = useState(quotes[0]);
  useEffect(() => {
    if (props.quotes)
      setQuote(props.quotes[Math.floor(Math.random() * props.quotes.length)]);
  }, [props.quotes]);
  useEffect(() => {
    const tick = () => {
      if (usedQuotes.length === quotes.length) usedQuotes = [];
      let randomQuote;
      console.log(usedQuotes, quotes);
      const unusedQuotes = quotes.filter(q => !usedQuotes.includes(q));
      randomQuote = unusedQuotes[Math.floor(Math.random() * quotes.length)];
      usedQuotes.push(randomQuote);
      setQuote(randomQuote);
    };
    const id = setInterval(tick, 2500);
    return () => clearInterval(id);
  }, [currentQuote, quotes]);

  return (
    <PageSpinnerWrapper>
      <Spinner size="large" />
      <JollyQuote>{currentQuote}</JollyQuote>
    </PageSpinnerWrapper>
  );
}
