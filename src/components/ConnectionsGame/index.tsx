import React, { useEffect, useMemo, useState } from "react";

import { cx } from "@/helpers";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export type ConnectionsGameProps = {};

const MAX_SELECTIONS = 4;
const MAX_CHANCES = 4;
const Yellow = {
  title: "Chat, Informally",
  words: ["gab", "jaw", "yap", "yak"],
  color: "bg-yellow-300",
};
const Blue = {
  title: "Palindromes",
  words: ["bib", "eye", "gag", "pop"],
  color: "bg-blue-300",
};
const Green = {
  title: "Female Animals",
  words: ["cow", "doe", "ewe", "hen"],
  color: "bg-green-300",
};
const Purple = {
  title: "Starts of Planet Names",
  words: ["ear", "mar", "mer", "sat"],
  color: "bg-purple-300",
};

export const ConnectionsGame: React.FC<ConnectionsGameProps> = () => {
  const [shuffled, setShuffled] = useState<string[]>();
  const [chancesLeft, setChancesLeft] = useState(4);
  const [selections, setSelections] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[][]>([]);
  const winningWords = useMemo(() => {
    return winners.flat();
  }, [winners]);

  const handleNoop = () => {};
  const handleDeselectAll = () => {
    setSelections([]);
  };
  const handleClickCard = (word: string) => () => {
    if (!selections.includes(word)) setSelections([...selections, word]);
    else setSelections(selections.filter((item) => item !== word));
  };
  const verifyMatch = (group: string[]) => {
    return (
      group.length === selections.length &&
      group.every((word) => selections.includes(word))
    );
  };
  const handleSubmit = () => {
    if (chancesLeft <= 0) return;

    if (verifyMatch(Yellow.words)) {
      setWinners([...winners, Yellow.words]);
    } else if (verifyMatch(Blue.words)) {
      setWinners([...winners, Blue.words]);
    } else if (verifyMatch(Green.words)) {
      setWinners([...winners, Green.words]);
    } else if (verifyMatch(Purple.words)) {
      setWinners([...winners, Purple.words]);
    } else {
      setChancesLeft(chancesLeft - 1);
    }

    setSelections([]);
  };

  const getWinningGroup = (group: string[]) => {
    if (group.every((word) => Yellow.words.includes(word))) {
      return Yellow;
    } else if (group.every((word) => Blue.words.includes(word))) {
      return Blue;
    } else if (group.every((word) => Green.words.includes(word))) {
      return Green;
    } else if (group.every((word) => Purple.words.includes(word))) {
      return Purple;
    }
  };
  const handleShuffle = () => {
    const allWords = [
      ...Yellow.words,
      ...Blue.words,
      ...Green.words,
      ...Purple.words,
    ];
    const remainingWords = allWords.filter(
      (word) => !winningWords.includes(word)
    );

    // Shuffle algo found on stack overflow
    let currentIndex = remainingWords.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [remainingWords[currentIndex], remainingWords[randomIndex]] = [
        remainingWords[randomIndex],
        remainingWords[currentIndex],
      ];
    }

    setShuffled(remainingWords);
  };

  useEffect(() => {
    handleShuffle();
  }, [winningWords.length]);

  return (
    <main
      className={cx(
        "flex min-h-screen flex-col items-center justify-start p-12 gap-3 max-w-[1400px] mx-auto"
      )}
    >
      <div className="flex flex-col flex-1 items-center justify-center gap-6">
        <div className="text-lg">Create four groups of four!</div>

        <div className="flex flex-col gap-4 h-[512px]">
          {winners.map((winningGroup, idx) => {
            const group = getWinningGroup(winningGroup);

            if (!group) return null;

            return (
              <Card
                disabled
                onClick={handleNoop}
                key={`winningGroup-${idx}`}
                className={cx(
                  "w-full flex flex-col h-[110px] opacity-100 gap-1 min-w-[488px]",
                  group.color
                )}
              >
                <div className="font-bold text-slate-800">{group.title}</div>
                <div className="flex flex-row gap-3">
                  <div className="text-slate-800">{group.words.join(", ")}</div>
                </div>
              </Card>
            );
          })}
          <div className="w-full grid grid-cols-4 gap-4">
            {shuffled?.map((word, idx) => {
              const isSelected = selections.includes(word);

              return (
                <Card
                  disabled={
                    !chancesLeft ||
                    (!isSelected && selections.length >= MAX_SELECTIONS)
                  }
                  selected={isSelected}
                  onClick={handleClickCard(word)}
                  key={`word-${idx}`}
                  className="w-[110px] h-[110px]"
                >
                  {word}
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={cx(
          "h-10 w-full text-center font-bold transition-opacity duration-700",
          !chancesLeft ? "text-red-500" : "text-green-600",
          !chancesLeft || winners.length === 4 ? "opacity-100" : "opacity-0"
        )}
      >
        {!chancesLeft ? "Sorry :(" : "Winner! Winner! 🎉"}
      </div>

      <div className="w-full h-20 bg-slate-100 px-5 items-center flex rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-3 flex-1 min-w-[100px]">
          <span>Chances left: </span>
          <div className="flex flex-1 items-center gap-1">
            {new Array(MAX_CHANCES).fill(0).map((_, idx) => (
              <div
                key={`guess-${idx}`}
                className={cx(
                  "w-5 h-5 rounded-full",
                  idx >= chancesLeft ? "bg-slate-300" : "bg-emerald-500"
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            disabled={!chancesLeft || winners.length >= 4}
            onClick={handleShuffle}
          >
            Shuffle
          </Button>
          <Button disabled={!selections.length} onClick={handleDeselectAll}>
            Deselect All
          </Button>
          <Button
            border
            disabled={selections.length !== MAX_CHANCES || chancesLeft <= 0}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
};
