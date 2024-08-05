import WordCloud from 'react-wordcloud';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import React, { useMemo } from 'react';
import 'react-tooltip/dist/react-tooltip.css';

// List of common stopwords
const stopwords = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your',
  'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she',
  'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
  'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that',
  'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an',
  'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of',
  'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
  'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will',
  'just', 'don', 'should', 'now'
]);

const WordCloudGraph = ({ sentences }) => {
  const words = useMemo(() => {
    const text = sentences.join(' ');

    // Split the text into words and count the occurrences of each word
    const wordCounts = text.split(/\s+/).reduce((counts, word) => {
      const cleanedWord = word.replace(/[^\w\s]|_/g, '').toLowerCase(); // Remove punctuation and convert to lowercase

      // Remove URLs and stopwords
      if (
        !stopwords.has(cleanedWord) &&
        cleanedWord.length > 1 &&
        !cleanedWord.match(/http[s]?:\/\//)
      ) {
        counts[cleanedWord] = (counts[cleanedWord] || 0) + 1;
      }

      return counts;
    }, {});

    return Object.keys(wordCounts).map((word) => ({
      text: word,
      value: wordCounts[word],
    }));
  }, [sentences]);

  // Get sentences for each word
  const wordToSentences = useMemo(() => {
    return sentences.reduce((acc, sentence) => {
      sentence.split(/\s+/).forEach((word) => {
        const cleanedWord = word.replace(/[^\w\s]|_/g, '').toLowerCase();
        if (
          !stopwords.has(cleanedWord) &&
          cleanedWord.length > 1 &&
          !cleanedWord.match(/http[s]?:\/\//)
        ) {
          if (!acc[cleanedWord]) {
            acc[cleanedWord] = [];
          }
          acc[cleanedWord].push(sentence);
        }
      });
      return acc;
    }, {});
  }, [sentences]);

  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [20, 60],
    enableOptimizations: true,
    deterministic: true,
    padding: 2,
  };

  return (
    <div style={{ height: 400, width: 600, position: 'relative' }}>
      <WordCloud
        words={words}
        options={options}
        callbacks={{
          getWordTooltip: (word) => {
            const sentencesForWord = wordToSentences[word.text] || [];
            return sentencesForWord.join('<br />');
          },
        }}
      />
      <ReactTooltip
        html={true}
        effect="solid"
        backgroundColor="rgba(0, 0, 0, 0.75)"
        textColor="#fff"
        border={true}
        borderColor="#fff"
      />
    </div>
  );
};

export default WordCloudGraph;
