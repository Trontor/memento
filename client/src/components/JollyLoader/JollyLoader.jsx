import React, { useEffect, useState } from "react";
import { PageSpinnerWrapper } from "ui/Loaders";
import { JollyQuote } from "./JollyLoaderStyles";
import { ReactComponent as Pig } from "./pig.svg";
import { ReactComponent as Brain } from "./brain.svg";

let usedQuotes = [];

/**
 * The JollyLoader component renders a spinner and a quote from a list of
 * supplied quotes.
 */
export default function JollyLoader(props) {
  let quotes = props.quotes || ["Loading..."];
  const [currentQuote, setQuote] = useState(quotes[0]);
  const { brain } = props;
  useEffect(() => {
    if (props.quotes)
      setQuote(props.quotes[Math.floor(Math.random() * props.quotes.length)]);
  }, [props.quotes]);
  useEffect(() => {
    const tick = () => {
      if (usedQuotes.length === quotes.length) usedQuotes = [];
      const unusedQuotes = quotes.filter(q => !usedQuotes.includes(q));
      const nextQuote =
        unusedQuotes[Math.floor(Math.random() * unusedQuotes.length)];
      usedQuotes.push(nextQuote);
      setQuote(nextQuote);
    };
    const id = setInterval(tick, props.interval || 1000);
    return () => clearInterval(id);
  }, [currentQuote, quotes, props.interval]);

  return (
    <PageSpinnerWrapper>
      {/* Pig is an actual React component */}
      {brain ? <Brain /> : <Pig />}
      {/* <Spinner size="large" /> */}
      <JollyQuote>{currentQuote}</JollyQuote>
    </PageSpinnerWrapper>
  );
}
